/// <reference types="@webgpu/types" />
import type { SegmentOptions, SegmentResult } from './types.js';
export { BrainchompError } from './error.js';
export type { BrainchompErrorCode } from './error.js';
export { checkSupport, acquireDevice, ACTIVATION_BYTES, V4_STD_BUFFER_BYTES, WEBGPU_MIN_BUFFER_BYTES, SOFTWARE_RENDERER, } from './device.js';
export type { DeviceReport, AdapterInfoSummary } from './device.js';
export { checkWebgl2Support, acquireGlContext, releaseGlContext, GL_ACTIVATION_BYTES, } from './webgl2.js';
export type { Webgl2Report } from './webgl2.js';
export type { Backend, ProgressStage, ProgressEvent, WebGpuMode, WebGpuExecMode, SegmentOptions, SegmentResult, } from './types.js';
/**
 * Whether the threaded CPU module can be instantiated at all.
 *
 * The module is pthreads, so it imports SHARED memory, and a page that is not
 * cross-origin isolated cannot instantiate that. Worse, the failure is not an
 * exception -- emscripten's pool spawn rejects a promise nobody holds and
 * initialisation never completes -- so this is checked BEFORE the module is
 * fetched. `!== true` rather than `=== false`: node has SharedArrayBuffer and
 * no `crossOriginIsolated` at all, and must be refused, not admitted to a hang.
 */
export declare function checkCpuSupport(): {
    supported: boolean;
    reasons: string[];
};
/**
 * Extract the brain from one rodent MRI volume.
 *
 * Takes a NIfTI file image (gzipped or not) and returns two: the skull-stripped
 * image and the binary brain mask. On hardware WebGPU it runs the pure-JS V4
 * 8-bit engine (zero WASM) with 3-tier f16/subgroups/f32 shaders, 128 MiB
 * LowMem128 layout, 3-layer auto-detection, WDDM TDR-safe pacing, and Layer 3
 * safe-mode retry; on browsers without WebGPU (or after a runtime GPU failure
 * in `auto` mode) it falls back to the WebGL2 or threaded-CPU WASM modules.
 *
 * The input must carry its real voxel size: rodent scans whose headers were
 * scaled x10 for human tools have to be fixed first.
 *
 * Pass `worker: true` from a UI. The WebGL2 module is synchronous and holds
 * the calling thread for the whole run; in a worker the page stays responsive
 * on every backend.
 *
 * @example
 * const { brain, mask, backend } = await segment(await file.arrayBuffer(), { worker: true })
 */
export declare function segment(input: ArrayBuffer | ArrayBufferView, options?: SegmentOptions): Promise<SegmentResult>;
