import type { Backend, ProgressEvent, SegmentOptions } from './types.js';
/** Everything the main thread sends. `options` is already structured-clonable. */
export interface WorkerRequest {
    input: Uint8Array;
    options: Omit<SegmentOptions, 'device' | 'glContext' | 'onLog' | 'onProgress' | 'worker'>;
    pageSearch?: string;
    profileCache?: Record<string, string>;
}
export type WorkerResponse = {
    type: 'log';
    line: string;
} | {
    type: 'progress';
    event: ProgressEvent;
} | {
    type: 'storage';
    op: 'set' | 'remove';
    key: string;
    value?: string;
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
