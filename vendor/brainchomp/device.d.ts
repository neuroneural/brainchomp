/** Minimum WebGPU buffer / storage binding size required by V4 LowMem128 (128 MiB). */
export declare const WEBGPU_MIN_BUFFER_BYTES: number;
/** Largest single activation buffer used by V4 standard layout for 16ch (160 MiB). */
export declare const V4_STD_BUFFER_BYTES: number;
/** 256^3 voxels x the channel stride x 2 bytes: one f16 activation, 512 MiB (used by WebGL2). */
export declare const ACTIVATION_BYTES: number;
/**
 * CPU rasterisers behind a GPU API. They pass capability probes, then run ~100x
 * slower than the threaded CPU module, so `auto` never picks them.
 */
export declare const SOFTWARE_RENDERER: RegExp;
export interface AdapterInfoSummary {
    vendor: string;
    architecture: string;
    device: string;
    description: string;
}
export interface DeviceReport {
    supported: boolean;
    /** Why not, in the caller's terms. Empty when supported. */
    reasons: string[];
    maxBufferSize?: number;
    maxStorageBufferBindingSize?: number;
    hasShaderF16?: boolean;
    hasSubgroups?: boolean;
    /** True when the adapter needs LowMem128 (< 160 MiB buffer/binding limit). */
    lowMemoryRequired?: boolean;
    /** True when the adapter appears to be a CPU/software rasteriser. */
    software?: boolean;
    adapterInfo?: AdapterInfoSummary | null;
}
/**
 * Ask whether this browser can run the model on pure-JS WebGPU V4, without
 * running it. Requests an adapter but never a device, so it is cheap and
 * side-effect free.
 */
export declare function checkSupport(): Promise<DeviceReport>;
/**
 * Acquire a WebGPU device sized for V4, requesting optional `shader-f16` and
 * `subgroups` features and the adapter's reported limits.
 */
export declare function acquireDevice(): Promise<GPUDevice>;
/** Refuse a caller-supplied device that cannot fit even V4 LowMem128 (128 MiB). */
export declare function checkDevice(device: GPUDevice): void;
