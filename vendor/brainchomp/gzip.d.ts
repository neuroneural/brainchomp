export declare function isGzip(bytes: Uint8Array): boolean;
export declare function gunzip(bytes: Uint8Array): Promise<Uint8Array>;
export declare function gzip(bytes: Uint8Array): Promise<Uint8Array>;
