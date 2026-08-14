#!/usr/bin/env python3
"""Create a TF.js layers-model fallback from a non-affine GroupNorm MeshNet.

The native WebGPU and WebGL2 paths consume ``model.safetensors`` directly.
This converter writes the equivalent TF.js topology and fp32 weight shard so
the legacy fallback remains honest instead of silently loading another model.
"""

import argparse
import json
import os
import struct

import numpy as np


DTYPES = {"F16": np.float16, "F32": np.float32}


def read_safetensors(path):
    with open(path, "rb") as source:
        header_size = struct.unpack("<Q", source.read(8))[0]
        header = json.loads(source.read(header_size))
        payload = source.read()
    tensors = {}
    for name, metadata in header.items():
        if name == "__metadata__":
            continue
        start, end = metadata["data_offsets"]
        tensors[name] = np.frombuffer(
            payload[start:end], dtype=DTYPES[metadata["dtype"]]
        ).reshape(metadata["shape"])
    return tensors


def conv3d(name, filters, dilation, use_bias, inbound, kernel_size=3):
    return {
        "class_name": "Conv3D",
        "config": {
            "name": name,
            "trainable": False,
            "dtype": "float32",
            "filters": filters,
            "kernel_size": [kernel_size] * 3,
            "strides": [1, 1, 1],
            "padding": "same",
            "data_format": "channels_last",
            "dilation_rate": [dilation] * 3,
            "groups": 1,
            "activation": "linear",
            "use_bias": use_bias,
        },
        "name": name,
        "inbound_nodes": [[[inbound, 0, 0, {}]]],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--weights", required=True)
    parser.add_argument("--config", required=True)
    parser.add_argument("--outdir", required=True)
    args = parser.parse_args()

    weights = read_safetensors(args.weights)
    with open(args.config, encoding="utf-8") as source:
        config = json.load(source)

    hidden = config["layers"][:-1]
    layers = [
        {
            "class_name": "InputLayer",
            "config": {
                "batch_input_shape": [None, 256, 256, 256, 1],
                "dtype": "float32",
                "sparse": False,
                "ragged": False,
                "name": "input",
            },
            "name": "input",
            "inbound_nodes": [],
        }
    ]
    manifest = []
    previous = "input"

    for index, layer in enumerate(hidden):
        conv_name = f"conv3d_{index}_gn"
        activation_name = f"activation_{index}"
        layers.append(
            conv3d(
                conv_name,
                int(layer["out_channels"]),
                int(layer["dilation"]),
                False,
                previous,
            )
        )
        torch_kernel = weights[f"m.model.{3 * index}.weight"]
        keras_kernel = np.transpose(torch_kernel, (2, 3, 4, 1, 0)).astype(np.float32)
        manifest.append((f"{conv_name}/kernel", keras_kernel))
        layers.append(
            {
                "class_name": "Activation",
                "config": {
                    "name": activation_name,
                    "trainable": False,
                    "dtype": "float32",
                    "activation": "gelu",
                },
                "name": activation_name,
                "inbound_nodes": [[[conv_name, 0, 0, {}]]],
            }
        )
        previous = activation_name

    final_index = 3 * len(hidden)
    final_name = "output"
    final_weight = weights[f"m.model.{final_index}.weight"]
    final_bias = weights[f"m.model.{final_index}.bias"]
    layers.append(
        conv3d(final_name, int(final_weight.shape[0]), 1, True, previous, kernel_size=1)
    )
    manifest.append(
        (f"{final_name}/kernel", np.transpose(final_weight, (2, 3, 4, 1, 0)).astype(np.float32))
    )
    manifest.append((f"{final_name}/bias", final_bias.astype(np.float32)))

    topology = {
        "format": "layers-model",
        "generatedBy": "brainchomp non-affine GroupNorm MeshNet converter",
        "convertedBy": None,
        "modelTopology": {
            "keras_version": "2.6.0",
            "backend": "tensorflow",
            "model_config": {
                "class_name": "Functional",
                "config": {
                    "name": "rodent_brain_extraction",
                    "layers": layers,
                    "input_layers": [["input", 0, 0]],
                    "output_layers": [[final_name, 0, 0]],
                },
            },
        },
        "weightsManifest": [
            {
                "paths": ["model.bin"],
                "weights": [
                    {"name": name, "shape": list(array.shape), "dtype": "float32"}
                    for name, array in manifest
                ],
            }
        ],
    }

    os.makedirs(args.outdir, exist_ok=True)
    with open(os.path.join(args.outdir, "model.json"), "w", encoding="utf-8") as output:
        json.dump(topology, output)
    with open(os.path.join(args.outdir, "model.bin"), "wb") as output:
        for _, array in manifest:
            output.write(np.ascontiguousarray(array).tobytes())

    print(f"wrote {len(hidden)} hidden blocks and {final_weight.shape[0]} classes")


if __name__ == "__main__":
    main()
