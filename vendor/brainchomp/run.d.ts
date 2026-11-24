export type WasmBackend = 'webgl2' | 'cpu';
export declare const CPU_TIMEOUT_MS = 900000;
/**
 * Where runtime assets (`rodent.bin`, `worker.js`, and the fallback emscripten
 * glue + `.wasm` files) are served from.
 *
 * Defaults to this module's own directory, which is right for an unbundled ES
 * module. Hosts that bundle should copy the files somewhere served and point
 * `assetPath` at it. Same-origin only.
 */
export declare function assetUrl(file: string, assetPath?: string): string;
export interface RunRequest {
    backend: WasmBackend;
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
    log: string[];
}
/** Run one WebGL2 or CPU WASM segmentation to completion. */
export declare function run(request: RunRequest): Promise<RunResult>;
