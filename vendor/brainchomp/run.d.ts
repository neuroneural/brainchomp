import type { Backend } from './types.js';
export declare const CPU_TIMEOUT_MS = 900000;
/**
 * Where the emscripten glue and its .wasm are served from.
 *
 * Defaults to this module's own directory, which is right for an unbundled ES
 * module. It is an option because a bundler cannot follow the import: the URL
 * is computed, so Vite and Rollup neither rewrite it nor emit the assets, and
 * the glue additionally locates its own `.wasm` through its own
 * `import.meta.url` at run time -- so the pair has to stay adjacent and
 * unhashed. Hosts that bundle should copy the files somewhere served and
 * point `assetPath` at it, rather than fighting the bundler.
 */
export declare function assetUrl(file: string, assetPath?: string): string;
export interface RunRequest {
    backend: Backend;
    /** Required for the webgpu backend. */
    device?: GPUDevice;
    /** Required for the webgl2 backend. */
    glContext?: WebGL2RenderingContext;
    input: Uint8Array;
    /** CLI arguments, excluding the input path and `-o`. */
    args: string[];
    /** Extra files to collect from MEMFS afterwards, by path. */
    extraOutputs?: string[];
    /** Base URL for the emscripten glue and .wasm; see moduleUrl(). */
    assetPath?: string;
    /** Abort if the module has not exited within this many ms. */
    timeoutMs?: number;
    onLog?: (line: string) => void;
}
export interface RunResult {
    image: Uint8Array;
    extras: Map<string, Uint8Array>;
    elapsedMs: number;
}
/**
 * Run one segmentation to completion.
 *
 * The subtlety is the exit: the module is built with ASYNCIFY so the C can wait
 * synchronously on the GPU readback, and under ASYNCIFY `callMain` RETURNS at
 * the first yield rather than at exit. Awaiting it would resolve before any GPU
 * work had happened and report success on an empty output. The module is linked
 * with `-sEXIT_RUNTIME=1` so `onExit` fires for real, and that is what is
 * awaited here.
 */
export declare function run(request: RunRequest): Promise<RunResult>;
