import type { Backend, SegmentOptions } from './types.js';
/** Everything the main thread sends. `options` is already structured-clonable. */
export interface WorkerRequest {
    input: Uint8Array;
    options: Omit<SegmentOptions, 'device' | 'glContext' | 'onLog' | 'worker'>;
}
export type WorkerResponse = {
    type: 'log';
    line: string;
} | {
    type: 'done';
    brain: ArrayBuffer;
    mask: ArrayBuffer;
    elapsedMs: number;
    backend: Backend;
} | {
    type: 'error';
    code: string;
    message: string;
    log?: string[];
};
