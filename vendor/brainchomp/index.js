// src/error.ts
var BrainchompError = class extends Error {
  code;
  /** The module's own output, when the failure came from inside it. */
  log;
  constructor(code, message, log) {
    super(message);
    this.name = "BrainchompError";
    this.code = code;
    this.log = log;
  }
};

// src/device.ts
var CHANNEL_STRIDE = 16;
var WEBGPU_MIN_BUFFER_BYTES = 128 * 1024 * 1024;
var V4_STD_BUFFER_BYTES = 256 * 256 * (CHANNEL_STRIDE / 2) * 80 * 4;
var ACTIVATION_BYTES = 256 * 256 * 256 * CHANNEL_STRIDE * 2;
var MiB = (n) => `${Math.round(n / (1024 * 1024))} MiB`;
var SOFTWARE_RENDERER = /SwiftShader|llvmpipe|lavapipe|softpipe|Software|Basic Render/i;
var NO_GPU = "navigator.gpu is undefined: either this browser has no WebGPU, or the page is not a secure context. about:blank and file:// are NOT secure contexts and look exactly like a browser without WebGPU; serve over https or localhost.";
async function checkSupport() {
  if (typeof navigator === "undefined" || !navigator.gpu)
    return { supported: false, reasons: [NO_GPU] };
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) return { supported: false, reasons: ["requestAdapter returned null"] };
  const reasons = [];
  const hasShaderF16 = adapter.features.has("shader-f16");
  const hasSubgroups = adapter.features.has("subgroups");
  const { maxBufferSize, maxStorageBufferBindingSize } = adapter.limits;
  const need = WEBGPU_MIN_BUFFER_BYTES;
  if (maxStorageBufferBindingSize < need)
    reasons.push(
      `maxStorageBufferBindingSize is ${MiB(maxStorageBufferBindingSize)}, but WebGPU V4 requires at least ${MiB(need)}`
    );
  if (maxBufferSize < need)
    reasons.push(
      `maxBufferSize is ${MiB(maxBufferSize)}, but WebGPU V4 requires at least ${MiB(need)}`
    );
  const lowMemoryRequired = Math.min(maxBufferSize, maxStorageBufferBindingSize) < V4_STD_BUFFER_BYTES;
  const info = adapter.info;
  const infoFallback = info?.isFallbackAdapter;
  const adapterFallback = adapter.isFallbackAdapter;
  const software = Boolean(infoFallback ?? adapterFallback) || SOFTWARE_RENDERER.test(`${info?.vendor ?? ""} ${info?.architecture ?? ""} ${info?.description ?? ""}`);
  return {
    supported: reasons.length === 0,
    reasons,
    maxBufferSize,
    maxStorageBufferBindingSize,
    hasShaderF16,
    hasSubgroups,
    lowMemoryRequired,
    software,
    adapterInfo: info ? {
      vendor: info.vendor ?? "",
      architecture: info.architecture ?? "",
      device: info.device ?? "",
      description: info.description ?? ""
    } : null
  };
}
async function acquireDevice() {
  if (typeof navigator === "undefined" || !navigator.gpu)
    throw new BrainchompError("no-webgpu", NO_GPU);
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) throw new BrainchompError("no-adapter", "requestAdapter returned null");
  const { maxBufferSize, maxStorageBufferBindingSize } = adapter.limits;
  const need = WEBGPU_MIN_BUFFER_BYTES;
  if (maxStorageBufferBindingSize < need || maxBufferSize < need)
    throw new BrainchompError(
      "device-too-small",
      `this device allows ${MiB(maxStorageBufferBindingSize)} per storage binding and ${MiB(maxBufferSize)} per buffer, but WebGPU V4 needs at least ${MiB(need)}`
    );
  const requiredFeatures = [];
  if (adapter.features.has("shader-f16")) requiredFeatures.push("shader-f16");
  if (adapter.features.has("subgroups"))
    requiredFeatures.push("subgroups");
  const limitKeys = [
    "maxBufferSize",
    "maxStorageBufferBindingSize",
    "maxStorageBuffersPerShaderStage",
    "maxUniformBufferBindingSize",
    "maxComputeInvocationsPerWorkgroup",
    "maxComputeWorkgroupSizeX",
    "maxComputeWorkgroupSizeY",
    "maxComputeWorkgroupSizeZ",
    "maxComputeWorkgroupStorageSize",
    "maxComputeWorkgroupsPerDimension"
  ];
  const adapterLimits = adapter.limits;
  const requiredLimits = {};
  for (const key of limitKeys) {
    const val = adapterLimits[key];
    if (typeof val === "number" && Number.isFinite(val)) {
      requiredLimits[key] = val;
    }
  }
  const device = await adapter.requestDevice({
    requiredFeatures,
    requiredLimits
  });
  device.__adapterInfo = adapter.info ?? null;
  device.__isLost = false;
  if (device.lost && typeof device.lost.then === "function") {
    void device.lost.then(() => {
      device.__isLost = true;
    });
  }
  return device;
}
function checkDevice(device) {
  const { maxStorageBufferBindingSize, maxBufferSize } = device.limits;
  const need = WEBGPU_MIN_BUFFER_BYTES;
  if (maxStorageBufferBindingSize < need || maxBufferSize < need)
    throw new BrainchompError(
      "device-too-small",
      `the supplied device allows ${MiB(maxStorageBufferBindingSize)} per storage binding and ${MiB(maxBufferSize)} per buffer, but WebGPU V4 needs at least ${MiB(need)}. Request it with acquireDevice(), which asks for the right limits.`
    );
}

// src/webgl2.ts
var GL_ACTIVATION_BYTES = ACTIVATION_BYTES * 2;
var DIM = 256;
var PLANE_BYTES = DIM * DIM * DIM * 4 * 2;
var LABEL_W = 2048;
var MiB2 = (n) => `${Math.round(n / (1024 * 1024))} MiB`;
function newContext() {
  const canvas = typeof OffscreenCanvas !== "undefined" && typeof document === "undefined" ? new OffscreenCanvas(1, 1) : typeof document !== "undefined" ? document.createElement("canvas") : null;
  if (!canvas) return null;
  return canvas.getContext("webgl2", {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance"
  });
}
function checkWebgl2Support() {
  const gl = newContext();
  if (!gl)
    return {
      supported: false,
      reasons: ["a webgl2 context could not be created; this browser is either too old or has WebGL disabled or blocklisted"]
    };
  const reasons = [];
  const debug = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  const software = SOFTWARE_RENDERER.test(String(renderer || "")) ? true : debug ? false : void 0;
  const float = gl.getExtension("EXT_color_buffer_float");
  if (!float)
    reasons.push("this device lacks EXT_color_buffer_float, which the kernels require in order to render into float textures");
  const max3d = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
  const drawBuffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);
  const attachments = gl.getParameter(gl.MAX_COLOR_ATTACHMENTS);
  const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const viewport = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
  if (max3d < DIM)
    reasons.push(`MAX_3D_TEXTURE_SIZE is ${max3d}, but the model needs ${DIM}`);
  const planes = ACTIVATION_BYTES / PLANE_BYTES;
  if (drawBuffers < planes || attachments < planes)
    reasons.push(`this device allows ${drawBuffers} draw buffers and ${attachments} colour attachments, but the model writes ${planes} at once`);
  if (maxTexture < LABEL_W || viewport[0] < LABEL_W || viewport[1] < LABEL_W)
    reasons.push(`MAX_TEXTURE_SIZE is ${maxTexture} and MAX_VIEWPORT_DIMS ${viewport[0]}x${viewport[1]}, but the label texture is ${LABEL_W}x${LABEL_W}`);
  let allocates;
  if (float && max3d >= DIM) {
    while (gl.getError() !== gl.NO_ERROR) {
    }
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_3D, tex);
    gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGBA16F, DIM, DIM, DIM);
    allocates = gl.getError() === gl.NO_ERROR && !gl.isContextLost();
    gl.deleteTexture(tex);
    if (!allocates)
      reasons.push(`this device could not allocate even one ${MiB2(PLANE_BYTES)} activation plane; a run needs ${MiB2(GL_ACTIVATION_BYTES)} of them`);
  }
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return {
    supported: reasons.length === 0,
    reasons,
    renderer,
    software,
    max3dTextureSize: max3d,
    maxDrawBuffers: drawBuffers,
    maxColorAttachments: attachments,
    maxTextureSize: maxTexture,
    allocates
  };
}
function releaseGlContext(gl) {
  gl.getExtension("WEBGL_lose_context")?.loseContext();
}
function acquireGlContext() {
  const gl = newContext();
  if (!gl)
    throw new BrainchompError(
      "no-webgpu",
      "a webgl2 context could not be created; this browser is either too old or has WebGL disabled or blocklisted"
    );
  if (!gl.getExtension("EXT_color_buffer_float"))
    throw new BrainchompError(
      "no-f16",
      "this device lacks EXT_color_buffer_float, which the segmentation kernels require in order to render into float textures"
    );
  const max3d = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
  if (max3d < DIM)
    throw new BrainchompError(
      "device-too-small",
      `this device allows 3D textures up to ${max3d}, but the model needs ${DIM}`
    );
  return gl;
}

// src/gzip.ts
var GZIP_MAGIC = [31, 139];
function isGzip(bytes) {
  return bytes.length >= 2 && bytes[0] === GZIP_MAGIC[0] && bytes[1] === GZIP_MAGIC[1];
}
async function through(bytes, stream) {
  const copy = new Uint8Array(bytes);
  const body = new Blob([copy]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(body).arrayBuffer());
}
async function gunzip(bytes) {
  if (typeof DecompressionStream === "undefined")
    throw new BrainchompError(
      "bad-input",
      "the input is gzipped but this environment has no DecompressionStream; decompress it before calling, or pass an uncompressed NIfTI"
    );
  return through(bytes, new DecompressionStream("gzip"));
}
async function gzip(bytes) {
  if (typeof CompressionStream === "undefined")
    throw new BrainchompError(
      "bad-input",
      "gzip output was requested but this environment has no CompressionStream"
    );
  return through(bytes, new CompressionStream("gzip"));
}

// src/run.ts
var DEFAULT_TIMEOUT_MS = 12e4;
var INITIALIZATION_TIMEOUT_MS = 12e4;
var CPU_TIMEOUT_MS = 9e5;
var MODULE_FILE = {
  webgl2: "./brainchomp-gl.js",
  // No suffix: the CPU module is the only one built with -pthread.
  cpu: "./brainchomp.js"
};
var factories = /* @__PURE__ */ new Map();
function assetUrl(file, assetPath) {
  if (!assetPath) return new URL(file, import.meta.url).href;
  const base = assetPath.endsWith("/") ? assetPath : `${assetPath}/`;
  const here = typeof location !== "undefined" ? location.href : "file:///";
  const url = new URL(`${base}${file.replace(/^\.\//, "")}`, here);
  if (typeof location !== "undefined") {
    if (location.origin === "null")
      throw new BrainchompError(
        "unsupported-option",
        "assetPath cannot be used from an opaque origin (file:// or a sandboxed iframe); serve the page over http(s)"
      );
    if (url.origin !== location.origin)
      throw new BrainchompError(
        "unsupported-option",
        `assetPath must be same-origin; ${url.origin} is not ${location.origin}`
      );
  }
  return url.href;
}
function moduleUrl(backend, assetPath) {
  return assetUrl(MODULE_FILE[backend], assetPath);
}
function loadFactory(url) {
  let pending = factories.get(url);
  if (!pending) {
    pending = import(
      /* @vite-ignore */
      url
    ).then((m) => m.default);
    factories.set(url, pending);
    void pending.catch(() => {
      if (factories.get(url) === pending) factories.delete(url);
    });
  }
  return pending;
}
async function run(request) {
  const log = [];
  const record = (line) => {
    log.push(line);
    request.onLog?.(line);
  };
  let settle;
  const exited = new Promise((resolve) => {
    settle = resolve;
  });
  let timer;
  const config = {
    noInitialRun: true,
    // bm_cli_parse takes the program name from argv[0]; without this the module
    // would identify itself as whatever host script loaded it.
    thisProgram: "brainchomp",
    print: record,
    printErr: record,
    onExit: (code2) => settle(code2)
  };
  if (request.backend === "webgl2") {
    config.preinitializedWebGLContext = request.glContext;
  }
  const limit = request.timeoutMs ?? (request.backend === "cpu" ? CPU_TIMEOUT_MS : DEFAULT_TIMEOUT_MS);
  const initializationLimit = Math.min(limit, INITIALIZATION_TIMEOUT_MS);
  const url = moduleUrl(request.backend, request.assetPath);
  const factoryPromise = loadFactory(url);
  let initializationTimedOut = false;
  const module = await Promise.race([
    factoryPromise.then((createModule) => createModule(config)),
    new Promise((_, reject) => {
      timer = setTimeout(() => {
        initializationTimedOut = true;
        reject(new BrainchompError(
          "initialization-failed",
          `the ${request.backend} module did not finish initialising within ${initializationLimit} ms`,
          log
        ));
      }, initializationLimit);
    })
  ]).finally(() => {
    clearTimeout(timer);
    if (initializationTimedOut && factories.get(url) === factoryPromise) factories.delete(url);
  });
  if (request.backend === "webgl2") {
    if (!module.specialHTMLTargets)
      throw new BrainchompError(
        "inference-failed",
        "this WebGL2 module was built without specialHTMLTargets exported; rebuild it with the flags in src/Makefile",
        log
      );
    module.specialHTMLTargets["#brainchomp-webgl2"] = request.glContext.canvas;
  }
  module.FS.writeFile("/in.nii", request.input);
  const started = performance.now();
  try {
    module.callMain([
      ...request.args,
      "-backend",
      request.backend,
      "-o",
      "/out.nii",
      "/in.nii"
    ]);
  } catch (e) {
    if (e && typeof e.status === "number") {
      settle(e.status);
    } else {
      record(`threw: ${e instanceof Error ? e.stack ?? e.message : String(e)}`);
      settle(-1);
    }
  }
  const code = request.backend === "webgl2" ? await exited : await Promise.race([
    exited,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new BrainchompError(
        "inference-failed",
        `the ${request.backend} module did not finish within ${limit} ms; this machine may simply be slower than the limit allows`,
        log
      )), limit);
    })
  ]).finally(() => clearTimeout(timer));
  const elapsedMs = performance.now() - started;
  if (request.backend === "webgl2" && request.glContext?.isContextLost())
    throw new BrainchompError(
      "inference-failed",
      "the WebGL2 context was lost during the run; the GPU or its driver reset. Any output from this run is meaningless.",
      log
    );
  if (code !== 0)
    throw new BrainchompError(
      "inference-failed",
      `the ${request.backend} module exited with status ${code}`,
      log
    );
  const primary = "/out.nii";
  if (!module.FS.analyzePath(primary).exists)
    throw new BrainchompError(
      "inference-failed",
      `the ${request.backend} module exited cleanly but wrote no output`,
      log
    );
  const extras = /* @__PURE__ */ new Map();
  for (const path of request.extraOutputs ?? [])
    if (module.FS.analyzePath(path).exists) extras.set(path, module.FS.readFile(path));
  return { image: module.FS.readFile(primary), extras, elapsedMs, log };
}

// src/webgpu/gpu-compatibility.js
var V4_CALIB_SCHEMA_VERSION = "v1";
var V4_CALIB_STORAGE_PREFIX = "brainchomp:webgpu-v4-profile:";
var V4_CALIB_TTL_MS = 30 * 24 * 60 * 60 * 1e3;
var V4_PROBE_TOTAL_STRIPS = 256 * 64;
var V4_PROBE_Z_SLAB = 4;
var V4_PROBE_PASSES = 2;
var V4_PROBE_STRIPS = V4_PROBE_Z_SLAB * 64 * V4_PROBE_PASSES;
var V4_PROBE_WARMUP_STRIPS = 16;
var V4_PROBE_WARMUP_ABORT_MS = 120;
var V4_PROBE_SAMPLE1_SKIP2_MS = 140;
var V4_PROBE_FAST_MAX_MS = 220;
var V4_PROBE_SLOW_MAX_MS = 550;
var V4_PROBE_MASKED_MODERATE_LOWMEM_MS = 450;
var X4_VALID = 64;
var X4_HALO = 8;
var X4_PAD = X4_VALID + 2 * X4_HALO;
var PROBE_CS = 24;
var PROBE_CS_HALF = 12;
var PROBE_OC4 = 6;
var PROBE_W_VEC4S = 9 * PROBE_CS * 3 * PROBE_OC4;
var PROBE_W_U32X4S = PROBE_W_VEC4S / 2;
var memoryProfileStore = /* @__PURE__ */ new Map();
var probePipeCache = /* @__PURE__ */ new WeakMap();
var inflightProbeByDevice = /* @__PURE__ */ new WeakMap();
var RECOGNIZED_GPU_RE = /\b(?:nvidia|geforce|rtx|gtx|quadro|tesla|amd|radeon|ryzen|intel|arc|uhd|iris|apple|qualcomm|adreno|arm|mali|immortalis|powervr|microsoft|swiftshader|llvmpipe|mesa)\b/i;
function getEnvNavigator(env) {
  return env?.navigator ?? globalThis.navigator;
}
function getEnvStorage(env) {
  if (env && "storage" in env) return env.storage;
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}
function getEnvSearch(env) {
  if (env && typeof env.search === "string") return env.search;
  try {
    return globalThis.location?.search || "";
  } catch {
    return "";
  }
}
function getNow(env) {
  if (typeof env?.now === "function") return env.now();
  if (typeof globalThis.performance?.now === "function") return globalThis.performance.now();
  return Date.now();
}
function getWallClockMs(env) {
  return typeof env?.wallNow === "function" ? env.wallNow() : Date.now();
}
function isLinuxMesaIntelGen9(renderer, platform = void 0) {
  const plat = String(
    platform ?? globalThis.navigator?.userAgentData?.platform ?? globalThis.navigator?.platform ?? ""
  );
  const text = String(renderer || "");
  return /Linux/i.test(plat) && !/Android/i.test(plat) && /\bMesa\b/i.test(text) && /\bIntel\b/i.test(text) && /\b(?:WHL|KBL|CFL|SKL|CML)\b/i.test(text);
}
function normalizeV4ExecMode(value) {
  const s = String(value || "").trim().toLowerCase();
  if (s === "single" || s === "pipelined" || s === "paced" || s === "calibrate") return s;
  if (s === "chunked") return "paced";
  return "";
}
function parseWebGpuUrlOverrides(search = void 0) {
  let rawSearch = search;
  if (rawSearch === void 0) {
    try {
      rawSearch = globalThis.location?.search || "";
    } catch {
      rawSearch = "";
    }
  }
  const result = { mode: "", exec: "" };
  if (!rawSearch) return result;
  try {
    const params = new URLSearchParams(rawSearch);
    const rawMode = (params.get("webgpuMode") || "").trim().toLowerCase();
    if (rawMode === "low-memory" || rawMode === "lowmem" || rawMode === "low_memory" || rawMode === "128m") {
      result.mode = "low-memory";
    } else if (rawMode === "standard" || rawMode === "std") {
      result.mode = "standard";
    } else if (rawMode === "recalibrate" || rawMode === "reset") {
      result.mode = "recalibrate";
    } else if (rawMode === "probe") {
      result.mode = "probe";
    }
    result.exec = normalizeV4ExecMode(params.get("webgpuExec"));
  } catch {
  }
  return result;
}
function probeGlRendererHint(device, env = null) {
  if (!device) return "";
  if (typeof device.__glRenderer === "string") return device.__glRenderer;
  let renderer = "";
  try {
    const nav = getEnvNavigator(env);
    const isFirefox = Boolean(nav && /Firefox/i.test(nav.userAgent || ""));
    const canvas = typeof globalThis.OffscreenCanvas !== "undefined" ? new globalThis.OffscreenCanvas(1, 1) : typeof globalThis.document !== "undefined" ? globalThis.document.createElement("canvas") : null;
    const gl = canvas?.getContext?.("webgl2", { powerPreference: "high-performance" });
    if (gl) {
      if (isFirefox) {
        renderer = String(gl.getParameter(gl.RENDERER) || "");
      } else {
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        renderer = String((dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) || "");
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
  }
  device.__glRenderer = renderer;
  return renderer;
}
function detectV4Platform(device, env = null) {
  const adInfo = device?.__adapterInfo || device?.adapterInfo || {};
  const vendor = String(adInfo.vendor || "").trim().toLowerCase();
  const arch = String(adInfo.architecture || "").trim().toLowerCase();
  const nav = getEnvNavigator(env);
  const ua = String(env?.userAgent ?? nav?.userAgent ?? "");
  const plat = String(env?.platform ?? nav?.userAgentData?.platform ?? nav?.platform ?? "");
  const isAndroid = /Android/i.test(ua) || /Android/i.test(plat);
  const isApple = !isAndroid && (vendor === "apple" || /Mac|iPhone|iPad|iPod/i.test(`${plat} ${ua}`) && !["intel", "amd", "nvidia", "microsoft"].includes(vendor));
  const isWindows = !isApple && !isAndroid && (/Win/i.test(plat) || /Windows/i.test(ua));
  const isLinux = !isApple && !isWindows && !isAndroid && (/Linux/i.test(plat) || /Linux/i.test(ua));
  const glRenderer = typeof device?.__glRenderer === "string" ? device.__glRenderer : !isApple && !vendor && !env?.skipGlProbe ? probeGlRendererHint(device, env) : "";
  const desc = `${adInfo.device || ""} ${adInfo.description || ""} ${glRenderer}`.trim();
  const effVendor = vendor || (/\bintel\b/i.test(glRenderer) ? "intel" : /\bmicrosoft\b|\bbasic render\b/i.test(glRenderer) ? "microsoft" : /\bnvidia\b/i.test(glRenderer) ? "nvidia" : /\bamd\b|\bradeon\b/i.test(glRenderer) ? "amd" : "");
  const isWindowsSharedIgpu = isWindows && (effVendor === "microsoft" || effVendor === "intel" && !/\bArc\b/i.test(desc) && (/^gen-(9|11|12lp)/i.test(arch) || /(?:UHD|HD)\s+Graphics|Iris(?:\(R\))?\s*(?:Plus|Xe)|Pentium|Celeron/i.test(desc)));
  const isLinuxIntelGen9 = isLinux && (vendor === "intel" && /^gen-9/i.test(arch) || isLinuxMesaIntelGen9(glRenderer, plat || "Linux") || isLinuxMesaIntelGen9(adInfo.description || "", plat || "Linux") || effVendor === "intel" && /\b(?:WHL|KBL|CFL|SKL|CML|UHD\s+Graphics\s+6[0-3]0|HD\s+Graphics\s+(?:5[0-3]0|6[0-3]0))\b/i.test(desc));
  const identityBlob = `${vendor} ${arch} ${adInfo.device || ""} ${adInfo.description || ""} ${glRenderer}`.trim();
  const isMaskedGpu = !isApple && (identityBlob === "" || /^(?:brave|unknown|generic|webgl|webgpu|default|\s)+$/i.test(identityBlob) || !RECOGNIZED_GPU_RE.test(identityBlob) && !/^gen-\d/i.test(arch));
  const os = isApple ? "apple" : isWindows ? "windows" : isAndroid ? "android" : isLinux ? "linux" : "other";
  return {
    os,
    vendor: effVendor,
    arch,
    desc,
    glRenderer,
    isApple,
    isWindows,
    isLinux,
    isAndroid,
    isWindowsSharedIgpu,
    isLinuxIntelGen9,
    isMaskedGpu
  };
}
function buildV4ProfileFingerprint(device, plat = null, env = null) {
  const p = plat || detectV4Platform(device, env);
  const lim = device?.limits || {};
  const adInfo = device?.__adapterInfo || device?.adapterInfo || {};
  const maxStorage = Number(lim.maxStorageBufferBindingSize || 0);
  const maxBuffer = Number(lim.maxBufferSize || 0);
  const hasF16 = device?.features?.has?.("shader-f16") ? 1 : 0;
  const hasSg = Boolean(device?.features?.has?.("subgroups"));
  const sgRange = hasSg ? `${adInfo.subgroupMinSize | 0}-${adInfo.subgroupMaxSize | 0}` : "none";
  const rawHint = [
    adInfo.vendor || "",
    adInfo.architecture || "",
    adInfo.device || "",
    adInfo.description || "",
    p.glRenderer || ""
  ].map((s) => String(s).trim().toLowerCase().replace(/\s+/g, " ")).filter(Boolean).join("/");
  const rendererHint = (rawHint || "masked").slice(0, 96);
  return [
    V4_CALIB_SCHEMA_VERSION,
    p.os,
    `sb=${maxStorage}`,
    `mb=${maxBuffer}`,
    `f16=${hasF16}`,
    `sg=${sgRange}`,
    rendererHint
  ].join("|");
}
function buildV4ProfileStorageKey(fingerprint) {
  return `${V4_CALIB_STORAGE_PREFIX}${fingerprint}`;
}
function getDeviceCalibMap(device) {
  if (!device) return null;
  if (!(device.__v4Calib instanceof Map)) {
    device.__v4Calib = /* @__PURE__ */ new Map();
  }
  return device.__v4Calib;
}
function isRecordFresh(rec, nowMs) {
  if (!rec || typeof rec !== "object") return false;
  if (rec.version !== V4_CALIB_SCHEMA_VERSION) return false;
  if (typeof rec.ts !== "number" || !Number.isFinite(rec.ts)) return false;
  return nowMs - rec.ts <= V4_CALIB_TTL_MS;
}
function readV4ProfileCache(device, storageKey, env = null) {
  const nowMs = getWallClockMs(env);
  const devMap = getDeviceCalibMap(device);
  const devRec = devMap?.get(storageKey);
  if (isRecordFresh(devRec, nowMs)) return devRec;
  const storage = getEnvStorage(env);
  let storageAccessible = false;
  if (storage && typeof storage.getItem === "function") {
    try {
      const raw = storage.getItem(storageKey);
      storageAccessible = true;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isRecordFresh(parsed, nowMs)) {
          devMap?.set(storageKey, parsed);
          return parsed;
        }
      }
    } catch {
    }
  }
  if (!storageAccessible) {
    const memRec = memoryProfileStore.get(storageKey);
    if (isRecordFresh(memRec, nowMs)) {
      devMap?.set(storageKey, memRec);
      return memRec;
    }
  }
  return null;
}
function writeV4ProfileCache(device, storageKey, record, env = null) {
  const payload = {
    version: V4_CALIB_SCHEMA_VERSION,
    ts: getWallClockMs(env),
    ...record
  };
  getDeviceCalibMap(device)?.set(storageKey, payload);
  const storage = getEnvStorage(env);
  let wroteStorage = false;
  if (storage && typeof storage.setItem === "function") {
    try {
      storage.setItem(storageKey, JSON.stringify(payload));
      wroteStorage = true;
    } catch {
    }
  }
  if (!wroteStorage) {
    memoryProfileStore.set(storageKey, payload);
  }
  return payload;
}
function clearV4ProfileCache(device, storageKey = null, env = null) {
  const key = storageKey || (device ? buildV4ProfileStorageKey(buildV4ProfileFingerprint(device, null, env)) : null);
  if (device) {
    if (device.__v4Calib instanceof Map) {
      if (key) device.__v4Calib.delete(key);
      else device.__v4Calib.clear();
    }
    delete device.__v4WinCalibrated;
    delete device.__v4WinFast;
    delete device.__v4MsPerStrip;
    delete device.__v4Recalibrated;
    delete device.__v4ProbeDone;
  }
  if (key) {
    memoryProfileStore.delete(key);
    const storage = getEnvStorage(env);
    if (storage && typeof storage.removeItem === "function") {
      try {
        storage.removeItem(key);
      } catch {
      }
    }
  } else {
    memoryProfileStore.clear();
  }
}
function persistV4SafeMode(device, safeModeReason = "device-lost", env = null) {
  if (!device) return null;
  const plat = detectV4Platform(device, env);
  const fingerprint = buildV4ProfileFingerprint(device, plat, env);
  const storageKey = buildV4ProfileStorageKey(fingerprint);
  const prev = readV4ProfileCache(device, storageKey, env) || {};
  return writeV4ProfileCache(
    device,
    storageKey,
    {
      ...prev,
      safeMode: "low-memory-paced",
      safeModeReason
    },
    env
  );
}
function classifyV4ProbeMs(estFullLayerMs) {
  if (!Number.isFinite(estFullLayerMs) || estFullLayerMs >= V4_PROBE_SLOW_MAX_MS) {
    return "very-slow";
  }
  if (estFullLayerMs >= V4_PROBE_FAST_MAX_MS) {
    return "moderate";
  }
  return "fast";
}
function buildV4MicroProbeWgsl(hasF16) {
  const rowStrideAct = PROBE_CS_HALF * X4_PAD;
  const rowStrideY = PROBE_CS_HALF * X4_VALID;
  const rep2 = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join("");
  if (hasF16) {
    const emitFmaBlock = () => {
      let s = "";
      for (let g = 0; g < PROBE_OC4; g += 2) {
        const o = g * 4;
        const hp = g / 2;
        s += `      {
        let wp0 = w_eff_u[wbu + ${hp}u];
        let wp1 = w_eff_u[wbu + ${3 + hp}u];
        let wp2 = w_eff_u[wbu + ${6 + hp}u];
        let w0a = u4_lo(wp0);
        let w0b = u4_hi(wp0);
        let w1a = u4_lo(wp1);
        let w1b = u4_hi(wp1);
        let w2a = u4_lo(wp2);
        let w2b = u4_hi(wp2);
        a_${o}     = fma(vn, vec4<f16>(w0a.x), fma(vc, vec4<f16>(w1a.x), fma(vp, vec4<f16>(w2a.x), a_${o})));
        a_${o + 1} = fma(vn, vec4<f16>(w0a.y), fma(vc, vec4<f16>(w1a.y), fma(vp, vec4<f16>(w2a.y), a_${o + 1})));
        a_${o + 2} = fma(vn, vec4<f16>(w0a.z), fma(vc, vec4<f16>(w1a.z), fma(vp, vec4<f16>(w2a.z), a_${o + 2})));
        a_${o + 3} = fma(vn, vec4<f16>(w0a.w), fma(vc, vec4<f16>(w1a.w), fma(vp, vec4<f16>(w2a.w), a_${o + 3})));
        a_${o + 4} = fma(vn, vec4<f16>(w0b.x), fma(vc, vec4<f16>(w1b.x), fma(vp, vec4<f16>(w2b.x), a_${o + 4})));
        a_${o + 5} = fma(vn, vec4<f16>(w0b.y), fma(vc, vec4<f16>(w1b.y), fma(vp, vec4<f16>(w2b.y), a_${o + 5})));
        a_${o + 6} = fma(vn, vec4<f16>(w0b.z), fma(vc, vec4<f16>(w1b.z), fma(vp, vec4<f16>(w2b.z), a_${o + 6})));
        a_${o + 7} = fma(vn, vec4<f16>(w0b.w), fma(vc, vec4<f16>(w1b.w), fma(vp, vec4<f16>(w2b.w), a_${o + 7})));
      }
`;
      }
      return s;
    };
    const emitLoop = (arrName, icBase) => `    for (var ic : u32 = 0u; ic < ${PROBE_CS_HALF}u; ic = ic + 1u) {
      let base = row_off + ic * ${X4_PAD}u;
      let uL = ${arrName}[base - 2u];
      let uN = ${arrName}[base - 1u];
      let uC = ${arrName}[base];
      let uP = ${arrName}[base + 1u];
      let uR = ${arrName}[base + 2u];
      let u_neg = (uL >> 24u) | (uN << 8u);
      let u_pos = (uP >> 8u) | (uR << 24u);
      let vn = vec4<f16>(vec2<f16>(unpack2x16float(((u_neg & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((u_neg >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(1.02734375h);
      let vc = vec4<f16>(vec2<f16>(unpack2x16float(((uC & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((uC >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(1.02734375h);
      let vp = vec4<f16>(vec2<f16>(unpack2x16float(((u_pos & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((u_pos >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(1.02734375h);
      let wbu = wbu_tap + (${icBase}u + ic) * 9u;
${emitFmaBlock()}    }
`;
    return `enable f16;
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(4) var<uniform> w_eff_u : array<vec4<u32>, ${PROBE_W_U32X4S}>;

fn u4_lo(p : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(p.x)), vec2<f16>(unpack2x16float(p.y)));
}
fn u4_hi(p : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(p.z)), vec2<f16>(unpack2x16float(p.w)));
}

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let x_pad = x4 + ${X4_HALO}u;
  let y = (wid.y * 4u + lid.y) & 255u;
  let z = wid.z & ${V4_PROBE_Z_SLAB - 1}u;
${rep2(PROBE_CS, (c) => `  var a_${c} = vec4<f16>(0.0h);
`)}
  for (var tap_yz : u32 = 0u; tap_yz < 9u; tap_yz = tap_yz + 1u) {
    let dz = tap_yz / 3u;
    let dy = tap_yz - dz * 3u;
    let z_src = (z + dz + ${V4_PROBE_Z_SLAB - 1}u) & ${V4_PROBE_Z_SLAB - 1}u;
    let y_src = (y + dy * 5u + 251u) & 255u;
    let row_off = (z_src * 256u + y_src) * ${rowStrideAct}u + x_pad;
    let wbu_tap = tap_yz * 216u;
${emitLoop("act8_0", 0)}${emitLoop("act8_1", PROBE_CS_HALF)}  }

  let y_base = (z * 256u + y) * ${rowStrideY}u + x4;
${rep2(PROBE_CS_HALF, (c) => `  y8_0[y_base + ${c * X4_VALID}u] = pack4x8unorm(vec4<f32>(a_${c}) * 0.5 + vec4<f32>(0.5));
`)}${rep2(PROBE_CS_HALF, (c) => `  y8_1[y_base + ${c * X4_VALID}u] = pack4x8unorm(vec4<f32>(a_${c + PROBE_CS_HALF}) * 0.5 + vec4<f32>(0.5));
`)}
}`;
  }
  const emitF32Entry = (entryName, gStart, outArr) => {
    const cStart = gStart * 4;
    const emitFma = () => rep2(3, (gi) => {
      const g = gStart + gi;
      const o = cStart + gi * 4;
      return `      {
        let w0 = w_eff[wb + ${g}u];
        let w1 = w_eff[wb + ${PROBE_OC4 + g}u];
        let w2 = w_eff[wb + ${2 * PROBE_OC4 + g}u];
        a_${o}     = fma(vn, vec4<f32>(w0.x), fma(vc, vec4<f32>(w1.x), fma(vp, vec4<f32>(w2.x), a_${o})));
        a_${o + 1} = fma(vn, vec4<f32>(w0.y), fma(vc, vec4<f32>(w1.y), fma(vp, vec4<f32>(w2.y), a_${o + 1})));
        a_${o + 2} = fma(vn, vec4<f32>(w0.z), fma(vc, vec4<f32>(w1.z), fma(vp, vec4<f32>(w2.z), a_${o + 2})));
        a_${o + 3} = fma(vn, vec4<f32>(w0.w), fma(vc, vec4<f32>(w1.w), fma(vp, vec4<f32>(w2.w), a_${o + 3})));
      }
`;
    });
    const emitLoop = (arrName, icBase) => `    for (var ic : u32 = 0u; ic < ${PROBE_CS_HALF}u; ic = ic + 1u) {
      let base = row_off + ic * ${X4_PAD}u;
      let uL = ${arrName}[base - 2u];
      let uN = ${arrName}[base - 1u];
      let uC = ${arrName}[base];
      let uP = ${arrName}[base + 1u];
      let uR = ${arrName}[base + 2u];
      let u_neg = (uL >> 24u) | (uN << 8u);
      let u_pos = (uP >> 8u) | (uR << 24u);
      let vn = unpack4x8unorm(u_neg) - vec4<f32>(0.02745098);
      let vc = unpack4x8unorm(uC) - vec4<f32>(0.02745098);
      let vp = unpack4x8unorm(u_pos) - vec4<f32>(0.02745098);
      let wb = wb_tap + (${icBase}u + ic) * ${3 * PROBE_OC4}u;
${emitFma()}    }
`;
    return `@compute @workgroup_size(64, 4, 1)
fn ${entryName}(@builtin(local_invocation_id) lid : vec3<u32>,
                @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let x_pad = x4 + ${X4_HALO}u;
  let y = (wid.y * 4u + lid.y) & 255u;
  let z = wid.z & ${V4_PROBE_Z_SLAB - 1}u;
${rep2(PROBE_CS_HALF, (i) => `  var a_${cStart + i} = vec4<f32>(0.0);
`)}
  for (var tap_yz : u32 = 0u; tap_yz < 9u; tap_yz = tap_yz + 1u) {
    let dz = tap_yz / 3u;
    let dy = tap_yz - dz * 3u;
    let z_src = (z + dz + ${V4_PROBE_Z_SLAB - 1}u) & ${V4_PROBE_Z_SLAB - 1}u;
    let y_src = (y + dy * 5u + 251u) & 255u;
    let row_off = (z_src * 256u + y_src) * ${rowStrideAct}u + x_pad;
    let wb_tap = tap_yz * ${PROBE_CS * 3 * PROBE_OC4}u;
${emitLoop("act8_0", 0)}${emitLoop("act8_1", PROBE_CS_HALF)}  }

  let y_base = (z * 256u + y) * ${rowStrideY}u + x4;
${rep2(PROBE_CS_HALF, (i) => `  ${outArr}[y_base + ${i * X4_VALID}u] = pack4x8unorm(a_${cStart + i} * 0.5 + vec4<f32>(0.5));
`)}
}`;
  };
  return `@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(4) var<storage, read> w_eff : array<vec4<f32>>;

${emitF32Entry("main_lo", 0, "y8_0")}

${emitF32Entry("main_hi", 3, "y8_1")}`;
}
async function getOrBuildProbePipelines(device, hasF16) {
  let devMap = probePipeCache.get(device);
  if (!devMap) {
    devMap = /* @__PURE__ */ new Map();
    probePipeCache.set(device, devMap);
  }
  const key = hasF16 ? "f16" : "f32";
  let p = devMap.get(key);
  if (!p) {
    p = (async () => {
      const code = buildV4MicroProbeWgsl(hasF16);
      const module = device.createShaderModule({ code });
      if (hasF16) {
        const main = await device.createComputePipelineAsync({
          layout: "auto",
          compute: { module, entryPoint: "main" }
        });
        return { main, bgl: main.getBindGroupLayout(0) };
      }
      const bgl = device.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
          { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
          { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
          { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
          { binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } }
        ]
      });
      const layout = device.createPipelineLayout({ bindGroupLayouts: [bgl] });
      const [lo, hi] = await Promise.all([
        device.createComputePipelineAsync({ layout, compute: { module, entryPoint: "main_lo" } }),
        device.createComputePipelineAsync({ layout, compute: { module, entryPoint: "main_hi" } })
      ]);
      return { lo, hi, bgl };
    })().catch((err) => {
      devMap.delete(key);
      throw err;
    });
    devMap.set(key, p);
  }
  return p;
}
async function runV4GpuMicroProbe(device, opts = {}) {
  const env = opts?.env || null;
  if (typeof opts?.runProbe === "function") {
    const custom = await opts.runProbe(device);
    const probeMs = Math.max(0.1, Number(custom?.probeMs ?? custom) || 0.1);
    const estFullLayerMs = Number.isFinite(custom?.estFullLayerMs) ? custom.estFullLayerMs : probeMs * (V4_PROBE_TOTAL_STRIPS / V4_PROBE_STRIPS);
    const tier = custom?.tier || classifyV4ProbeMs(estFullLayerMs);
    return {
      probeMs,
      warmupMs: Number(custom?.warmupMs ?? 0),
      estFullLayerMs,
      msPerStrip24: estFullLayerMs / V4_PROBE_TOTAL_STRIPS,
      tier,
      abortedEarly: Boolean(custom?.abortedEarly)
    };
  }
  const existing = inflightProbeByDevice.get(device);
  if (existing) return existing;
  const task = (async () => {
    const hasF16 = opts.hasF16 !== void 0 ? Boolean(opts.hasF16) : Boolean(device?.features?.has?.("shader-f16"));
    const S = GPUBufferUsage.STORAGE;
    const CD = GPUBufferUsage.COPY_DST;
    const U = GPUBufferUsage.UNIFORM;
    const actHalfBytes = V4_PROBE_Z_SLAB * 256 * PROBE_CS_HALF * X4_PAD * 4;
    const yHalfBytes = V4_PROBE_Z_SLAB * 256 * PROBE_CS_HALF * X4_VALID * 4;
    const wBytes = hasF16 ? PROBE_W_U32X4S * 16 : PROBE_W_VEC4S * 16;
    const tempBuffers = [];
    const hasScopes = typeof device.pushErrorScope === "function" && typeof device.popErrorScope === "function";
    let scopeOpen = false;
    if (hasScopes) {
      device.pushErrorScope("out-of-memory");
      scopeOpen = true;
    }
    try {
      const pipes = await getOrBuildProbePipelines(device, hasF16);
      const mk = (size, usage) => {
        const b = device.createBuffer({ size, usage });
        tempBuffers.push(b);
        return b;
      };
      const act8_0 = mk(actHalfBytes, S);
      const act8_1 = mk(actHalfBytes, S);
      const y8_0 = mk(yHalfBytes, S);
      const y8_1 = mk(yHalfBytes, S);
      const wBuf = mk(wBytes, (hasF16 ? U : S) | CD);
      if (hasF16) {
        const wHost = new Uint32Array(PROBE_W_U32X4S * 4);
        wHost.fill(2703171871);
        device.queue.writeBuffer(wBuf, 0, wHost);
      } else {
        const wHost = new Float32Array(PROBE_W_VEC4S * 4);
        for (let i = 0; i < wHost.length; i++) wHost[i] = i & 1 ? -0.01 : 0.01;
        device.queue.writeBuffer(wBuf, 0, wHost);
      }
      const bg = device.createBindGroup({
        layout: pipes.bgl,
        entries: [
          { binding: 0, resource: { buffer: act8_0 } },
          { binding: 1, resource: { buffer: act8_1 } },
          { binding: 2, resource: { buffer: y8_0 } },
          { binding: 3, resource: { buffer: y8_1 } },
          { binding: 4, resource: { buffer: wBuf } }
        ]
      });
      const encodePasses = (enc, yGroups, zGroups, repeats) => {
        for (let r = 0; r < repeats; r++) {
          if (hasF16) {
            const pass = enc.beginComputePass();
            pass.setPipeline(pipes.main);
            pass.setBindGroup(0, bg);
            pass.dispatchWorkgroups(1, yGroups, zGroups);
            pass.end();
          } else {
            const pLo = enc.beginComputePass();
            pLo.setPipeline(pipes.lo);
            pLo.setBindGroup(0, bg);
            pLo.dispatchWorkgroups(1, yGroups, zGroups);
            pLo.end();
            const pHi = enc.beginComputePass();
            pHi.setPipeline(pipes.hi);
            pHi.setBindGroup(0, bg);
            pHi.dispatchWorkgroups(1, yGroups, zGroups);
            pHi.end();
          }
        }
      };
      const wEnc = device.createCommandEncoder();
      encodePasses(wEnc, V4_PROBE_WARMUP_STRIPS, 1, 1);
      const tW0 = getNow(env);
      device.queue.submit([wEnc.finish()]);
      await device.queue.onSubmittedWorkDone();
      const warmupMs = Math.max(0.1, getNow(env) - tW0);
      let result;
      if (warmupMs >= V4_PROBE_WARMUP_ABORT_MS) {
        const estFullLayerMs = warmupMs * (V4_PROBE_TOTAL_STRIPS / V4_PROBE_WARMUP_STRIPS);
        result = {
          probeMs: warmupMs,
          warmupMs,
          estFullLayerMs,
          msPerStrip24: estFullLayerMs / V4_PROBE_TOTAL_STRIPS,
          tier: "very-slow",
          abortedEarly: true
        };
      } else {
        const runSample = async () => {
          const tEnc = device.createCommandEncoder();
          encodePasses(tEnc, 64, V4_PROBE_Z_SLAB, V4_PROBE_PASSES);
          const t0 = getNow(env);
          device.queue.submit([tEnc.finish()]);
          await device.queue.onSubmittedWorkDone();
          return Math.max(0.1, getNow(env) - t0);
        };
        const sample1Ms = await runSample();
        const sample2Ms = sample1Ms >= V4_PROBE_SAMPLE1_SKIP2_MS ? sample1Ms : await runSample();
        const probeMs = Math.min(sample1Ms, sample2Ms);
        const estFullLayerMs = probeMs * (V4_PROBE_TOTAL_STRIPS / V4_PROBE_STRIPS);
        const tier = classifyV4ProbeMs(estFullLayerMs);
        result = {
          probeMs,
          warmupMs,
          estFullLayerMs,
          msPerStrip24: estFullLayerMs / V4_PROBE_TOTAL_STRIPS,
          tier,
          abortedEarly: false
        };
      }
      if (scopeOpen) {
        scopeOpen = false;
        const oomErr = await device.popErrorScope();
        if (oomErr) {
          const err = new Error(`WebGPU micro-probe out of memory: ${oomErr.message || "allocation failed"}`);
          err.oomError = oomErr;
          throw err;
        }
      }
      return result;
    } finally {
      for (const b of tempBuffers) {
        try {
          b.destroy();
        } catch {
        }
      }
      if (scopeOpen) {
        scopeOpen = false;
        try {
          await device.popErrorScope();
        } catch {
        }
      }
    }
  })().finally(() => {
    inflightProbeByDevice.delete(device);
  });
  inflightProbeByDevice.set(device, task);
  return task;
}
function formatLimitReason(maxAllowed) {
  const mib = Math.floor(maxAllowed / 1048576);
  return mib <= 128 ? "limit<=128M" : `limit<=${mib}M`;
}
function scaledMsPerStrip(msPerStrip24, cs) {
  const ratio = Math.max(8, Number(cs) || 24) / 24;
  const scale = Math.max(0.35, Math.min(1, ratio * ratio));
  return Math.max(5e-3, Math.min(2, msPerStrip24 * scale));
}
function isMindGrabOrDeep(d) {
  return d.chan === 15 || Array.isArray(d.dilations) && d.dilations.length >= 25;
}
async function resolveV4ExecutionPlan(device, d, modelEntry = null, opts = {}) {
  const env = opts?.env || null;
  const plat = detectV4Platform(device, env);
  const fingerprint = buildV4ProfileFingerprint(device, plat, env);
  const storageKey = buildV4ProfileStorageKey(fingerprint);
  const lim = device?.limits || {};
  const maxAllowed = Math.min(
    lim.maxStorageBufferBindingSize ?? Infinity,
    lim.maxBufferSize ?? Infinity
  );
  const canLowMem128 = d.cs >= 8 && d.cs % 4 === 0;
  const actBytes = Number(opts.actBytes ?? 0);
  const outBufBytes = Number(opts.outBufBytes ?? 0);
  const mustLowMem128 = (actBytes > maxAllowed || outBufBytes > maxAllowed) && canLowMem128;
  const urlOverrides = parseWebGpuUrlOverrides(getEnvSearch(env));
  const explicitExec = normalizeV4ExecMode(modelEntry?.webgpuExecMode) || urlOverrides.exec;
  const explicitLowMem = modelEntry?.forceLowMem128 === true ? true : modelEntry?.forceLowMem128 === false ? false : urlOverrides.mode === "low-memory" ? true : urlOverrides.mode === "standard" ? false : null;
  const isUrlDriven = Boolean(
    urlOverrides.mode === "low-memory" || urlOverrides.mode === "standard" || urlOverrides.exec || modelEntry?.__v4PlanReasonOverride === "url-override"
  );
  const forceProbe = Boolean(
    modelEntry?.forceProbe === true || urlOverrides.mode === "probe" && !device?.__v4ProbeDone
  );
  const wantRecalibrate = Boolean(
    (urlOverrides.mode === "recalibrate" || urlOverrides.mode === "probe" || modelEntry?.recalibrate === true) && !device?.__v4Recalibrated
  );
  if (wantRecalibrate) {
    clearV4ProfileCache(device, storageKey, env);
    if (device) device.__v4Recalibrated = true;
  }
  const finalize = ({
    layout,
    execMode: execMode2,
    reason: reason2,
    tier = null,
    probeMs = null,
    estFullLayerMs = null,
    msPerStrip = null,
    fromCache: fromCache2 = false,
    safeMode = false
  }) => {
    const effectiveLayout = mustLowMem128 ? "LowMem128" : layout === "LowMem128" && canLowMem128 ? "LowMem128" : "std";
    const chunkableStd = effectiveLayout === "std" && (execMode2 === "paced" || execMode2 === "calibrate");
    if (device && Number.isFinite(msPerStrip)) {
      device.__v4MsPerStrip = msPerStrip;
    }
    return {
      layout: effectiveLayout,
      execMode: execMode2,
      chunkableStd,
      reason: reason2,
      tier,
      probeMs,
      estFullLayerMs,
      msPerStrip,
      fromCache: fromCache2,
      safeMode,
      fingerprint,
      storageKey,
      platform: plat
    };
  };
  if (modelEntry?.__v4PlanReasonOverride === "safe-mode-retry") {
    return finalize({
      layout: canLowMem128 ? "LowMem128" : "std",
      execMode: "paced",
      reason: "safe-mode-retry",
      safeMode: true
    });
  }
  const cached = forceProbe ? null : readV4ProfileCache(device, storageKey, env);
  if (!forceProbe && (explicitLowMem !== null || explicitExec !== "")) {
    let layout = "std";
    let layoutHintReason = "";
    if (mustLowMem128) {
      layout = "LowMem128";
      layoutHintReason = formatLimitReason(maxAllowed);
    } else if (explicitLowMem === true) {
      layout = canLowMem128 ? "LowMem128" : "std";
    } else if (explicitLowMem === false) {
      layout = "std";
    } else if (plat.isWindowsSharedIgpu && d.cs >= 24 && canLowMem128) {
      layout = "LowMem128";
      layoutHintReason = "hint:win-igpu";
    } else if (plat.isLinuxIntelGen9 && isMindGrabOrDeep(d) && canLowMem128) {
      layout = "LowMem128";
      layoutHintReason = "hint:intel-gen9";
    } else if (cached?.safeMode === "low-memory-paced" && canLowMem128) {
      layout = "LowMem128";
      layoutHintReason = "cached-safe-mode";
    } else if (cached?.tier === "very-slow" && canLowMem128) {
      layout = "LowMem128";
      layoutHintReason = "cached-probe";
    }
    let execMode2 = explicitExec;
    if (!execMode2) {
      if (explicitLowMem === true) execMode2 = "paced";
      else if (plat.isApple) execMode2 = "single";
      else if (plat.isWindowsSharedIgpu || plat.isLinuxIntelGen9) execMode2 = "paced";
      else execMode2 = "pipelined";
    }
    const reason2 = mustLowMem128 && explicitLowMem === false ? formatLimitReason(maxAllowed) : isUrlDriven ? "url-override" : layoutHintReason || "override";
    return finalize({
      layout,
      execMode: execMode2,
      reason: reason2,
      tier: cached?.tier ?? null,
      probeMs: cached?.probeMs ?? null,
      estFullLayerMs: cached?.estFullLayerMs ?? null,
      msPerStrip: cached?.msPerStrip24 ? scaledMsPerStrip(cached.msPerStrip24, d.cs) : null,
      fromCache: Boolean(cached),
      safeMode: cached?.safeMode === "low-memory-paced"
    });
  }
  if (plat.isApple && !forceProbe) {
    if (cached?.safeMode === "low-memory-paced") {
      return finalize({
        layout: canLowMem128 ? "LowMem128" : "std",
        execMode: "paced",
        reason: "cached-safe-mode",
        fromCache: true,
        safeMode: true
      });
    }
    return finalize({
      layout: mustLowMem128 ? "LowMem128" : "std",
      execMode: "single",
      reason: mustLowMem128 ? formatLimitReason(maxAllowed) : "apple"
    });
  }
  if (!forceProbe && cached?.safeMode === "low-memory-paced") {
    if (plat.isWindows && device) {
      device.__v4WinCalibrated = true;
      device.__v4WinFast = false;
    }
    return finalize({
      layout: canLowMem128 ? "LowMem128" : "std",
      execMode: "paced",
      reason: "cached-safe-mode",
      tier: cached.tier ?? "very-slow",
      probeMs: cached.probeMs ?? null,
      estFullLayerMs: cached.estFullLayerMs ?? null,
      msPerStrip: cached.msPerStrip24 ? scaledMsPerStrip(cached.msPerStrip24, d.cs) : null,
      fromCache: true,
      safeMode: true
    });
  }
  if (!forceProbe && plat.isLinuxIntelGen9) {
    const use1282 = mustLowMem128 || isMindGrabOrDeep(d) && canLowMem128;
    return finalize({
      layout: use1282 ? "LowMem128" : "std",
      execMode: "paced",
      reason: mustLowMem128 ? formatLimitReason(maxAllowed) : "hint:intel-gen9"
    });
  }
  if (!forceProbe && plat.isWindowsSharedIgpu) {
    if (device) {
      device.__v4WinCalibrated = true;
      device.__v4WinFast = false;
    }
    const use1282 = mustLowMem128 || d.cs >= 24 && canLowMem128;
    return finalize({
      layout: use1282 ? "LowMem128" : "std",
      execMode: "paced",
      reason: mustLowMem128 ? formatLimitReason(maxAllowed) : "hint:win-igpu"
    });
  }
  let calib = !forceProbe && cached && cached.tier && Number.isFinite(cached.estFullLayerMs) ? cached : null;
  let fromCache = Boolean(calib);
  if (!calib) {
    try {
      const measured = await runV4GpuMicroProbe(device, {
        hasF16: opts.hasF16,
        runProbe: opts.runProbe,
        env
      });
      calib = writeV4ProfileCache(
        device,
        storageKey,
        {
          tier: measured.tier,
          probeMs: Number(measured.probeMs.toFixed(2)),
          estFullLayerMs: Number(measured.estFullLayerMs.toFixed(1)),
          msPerStrip24: measured.msPerStrip24,
          safeMode: null,
          safeModeReason: null
        },
        env
      );
      if (device) device.__v4ProbeDone = true;
      fromCache = false;
    } catch (err) {
      const kind = classifyWebGpuFailure(err, device, Boolean(device?.__isLost));
      if (kind === "device-lost") throw err;
      const fallbackTier = kind === "oom" ? "very-slow" : "moderate";
      calib = {
        tier: fallbackTier,
        probeMs: null,
        estFullLayerMs: fallbackTier === "very-slow" ? V4_PROBE_SLOW_MAX_MS : V4_PROBE_FAST_MAX_MS,
        msPerStrip24: (fallbackTier === "very-slow" ? V4_PROBE_SLOW_MAX_MS : V4_PROBE_FAST_MAX_MS) / V4_PROBE_TOTAL_STRIPS
      };
      fromCache = false;
    }
  }
  if (plat.isWindows && device) {
    device.__v4WinCalibrated = true;
    device.__v4WinFast = calib.tier === "fast";
  }
  const estMs = Number(calib.estFullLayerMs);
  const maskedLowMemUpgrade = Boolean(
    plat.isMaskedGpu && calib.tier === "moderate" && estMs >= V4_PROBE_MASKED_MODERATE_LOWMEM_MS && (d.cs >= 24 || isMindGrabOrDeep(d))
  );
  const use128 = mustLowMem128 || canLowMem128 && (calib.tier === "very-slow" || maskedLowMemUpgrade);
  const execMode = explicitExec || (calib.tier === "fast" ? "pipelined" : "paced");
  let reason;
  if (mustLowMem128) {
    reason = formatLimitReason(maxAllowed);
  } else if (fromCache) {
    reason = "cached-probe";
  } else if (Number.isFinite(calib.probeMs)) {
    reason = `probe:${Number(calib.probeMs).toFixed(1)}ms`;
  } else {
    reason = "probe:fallback";
  }
  return finalize({
    layout: use128 ? "LowMem128" : "std",
    execMode,
    reason,
    tier: calib.tier,
    probeMs: calib.probeMs ?? null,
    estFullLayerMs: Number.isFinite(estMs) ? estMs : null,
    msPerStrip: Number.isFinite(calib.msPerStrip24) ? scaledMsPerStrip(calib.msPerStrip24, d.cs) : null,
    fromCache,
    safeMode: false
  });
}
function formatV4PlanDiagnostic(plan, d = null) {
  const modelPart = d ? ` | ${d.chan}ch(cs=${d.cs})/${d.dilations?.length ?? "?"}L` : "";
  const estPart = Number.isFinite(plan?.estFullLayerMs) ? ` | est24ch=${Math.round(plan.estFullLayerMs)}ms(${plan.tier})` : "";
  return `[WebGPU-V4] layout=${plan.layout} exec=${plan.execMode} reason=${plan.reason}${estPart}${modelPart}`;
}
async function checkDeviceLost(device, waitMs = 10) {
  if (!device) return false;
  if (device.__isLost) return true;
  if (!device.lost || typeof device.lost.then !== "function") return false;
  return Promise.race([
    device.lost.then((info) => {
      device.__isLost = true;
      return info?.reason !== "destroyed";
    }),
    new Promise((resolve) => setTimeout(() => resolve(Boolean(device.__isLost)), waitMs))
  ]);
}
function classifyWebGpuFailure(error, device = null, isLostHint = false) {
  if (isLostHint || device?.__isLost) return "device-lost";
  if (error?.oomError) return "oom";
  const msg = String(error?.message || error || "");
  if (/\bdevice(?:\s+was|\s+is)?\s+lost\b|gpu\s+reset|engine\s+reset|\btdr\b|instance\s+dropped|device\s+destroyed/i.test(msg)) {
    return "device-lost";
  }
  if (/out[- ]of[- ]memory|\boom\b|allocation\s+failed|failed\s+to\s+allocate|exceeds\s+device\s+limit|binding\s+size|maxbuffersize|maxstoragebufferbinding/i.test(msg)) {
    return "oom";
  }
  return null;
}
async function executeWithWebGpuSafeModeRetry({
  device,
  modelEntry,
  runAttempt,
  requestFreshDevice,
  onRetry = null,
  env = null
}) {
  try {
    return await runAttempt(device, modelEntry, { isRetry: false });
  } catch (err1) {
    const isV4 = Boolean(modelEntry?.quantize8Bit);
    const lostNow = await checkDeviceLost(device, env?.lostWaitMs ?? 10);
    const failureKind = classifyWebGpuFailure(err1, device, lostNow);
    const lastPlan = device?.__v4LastPlan || null;
    const alreadySafe = Boolean(
      lastPlan?.layout === "LowMem128" && lastPlan?.execMode === "paced" || modelEntry?.forceLowMem128 === true && normalizeV4ExecMode(modelEntry?.webgpuExecMode) === "paced"
    );
    const urlOverrides = parseWebGpuUrlOverrides(getEnvSearch(env));
    const explicitStandard = urlOverrides.mode === "standard" || modelEntry?.forceLowMem128 === false;
    if (!isV4 || !failureKind || alreadySafe || explicitStandard || typeof requestFreshDevice !== "function") {
      throw err1;
    }
    persistV4SafeMode(device, failureKind, env);
    const freshDevice = await requestFreshDevice({ failedDevice: device, failureKind, error: err1 });
    if (!freshDevice || freshDevice.__isLost) {
      const noDevErr = new Error(
        `WebGPU safe-mode retry aborted: could not acquire fresh GPUDevice after ${failureKind} (${err1?.message || err1})`
      );
      noDevErr.priorWebGpuError = err1;
      throw noDevErr;
    }
    const retryEntry = {
      ...modelEntry,
      forceLowMem128: true,
      webgpuExecMode: "paced",
      __v4PlanReasonOverride: "safe-mode-retry"
    };
    onRetry?.({ failureKind, error: err1, retryEntry, freshDevice });
    try {
      return await runAttempt(freshDevice, retryEntry, { isRetry: true });
    } catch (err2) {
      if (err2 && typeof err2 === "object") {
        err2.priorWebGpuError = err1;
      }
      throw err2;
    }
  }
}

// src/webgpu/nifti.ts
var NIFTI_HEADER_BYTES = 348;
var NIFTI_VOX_OFFSET = 352;
var NIFTI_INTENT_NONE = 0;
var NIFTI_INTENT_LABEL = 1002;
var NIFTI_DT = {
  UINT8: 2,
  INT16: 4,
  INT32: 8,
  FLOAT32: 16,
  FLOAT64: 64,
  INT8: 256,
  UINT16: 512,
  UINT32: 768,
  INT64: 1024,
  UINT64: 1280
};
function bytesPerVoxelForDatatype(datatypeCode) {
  switch (datatypeCode) {
    case NIFTI_DT.UINT8:
    case NIFTI_DT.INT8:
      return 1;
    case NIFTI_DT.INT16:
    case NIFTI_DT.UINT16:
      return 2;
    case NIFTI_DT.INT32:
    case NIFTI_DT.UINT32:
    case NIFTI_DT.FLOAT32:
      return 4;
    case NIFTI_DT.FLOAT64:
    case NIFTI_DT.INT64:
    case NIFTI_DT.UINT64:
      return 8;
    default:
      return 0;
  }
}
function isValidAffine4x4(m) {
  if (!m || m.length < 16) return false;
  for (let i = 0; i < 16; i++) {
    if (!Number.isFinite(m[i])) return false;
  }
  const det = m[0] * (m[5] * m[10] - m[6] * m[9]) - m[1] * (m[4] * m[10] - m[6] * m[8]) + m[2] * (m[4] * m[9] - m[5] * m[8]);
  let scale = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      scale = Math.max(scale, Math.abs(m[r * 4 + c]));
    }
  }
  return Number.isFinite(det) && scale > 0 && Math.abs(det) > 1e-9 * scale * scale * scale;
}
function quaternToMat44(qb, qc, qd, qx, qy, qz, dx, dy, dz, qfac) {
  let b = qb;
  let c = qc;
  let d = qd;
  let a = 1 - (b * b + c * c + d * d);
  if (a < 1e-7) {
    const norm = Math.sqrt(b * b + c * c + d * d);
    if (norm > 0) {
      const inv = 1 / norm;
      b *= inv;
      c *= inv;
      d *= inv;
    }
    a = 0;
  } else {
    a = Math.sqrt(a);
  }
  const xd = dx > 0 ? dx : 1;
  const yd = dy > 0 ? dy : 1;
  let zd = dz > 0 ? dz : 1;
  if (qfac < 0) zd = -zd;
  return [
    (a * a + b * b - c * c - d * d) * xd,
    2 * (b * c - a * d) * yd,
    2 * (b * d + a * c) * zd,
    qx,
    2 * (b * c + a * d) * xd,
    (a * a + c * c - b * b - d * d) * yd,
    2 * (c * d - a * b) * zd,
    qy,
    2 * (b * d - a * c) * xd,
    2 * (c * d + a * b) * yd,
    (a * a + d * d - c * c - b * b) * zd,
    qz,
    0,
    0,
    0,
    1
  ];
}
function mat33Norm1(m) {
  let best = 0;
  for (let c = 0; c < 3; c++) {
    const s = Math.abs(m[c]) + Math.abs(m[3 + c]) + Math.abs(m[6 + c]);
    if (s > best) best = s;
  }
  return best;
}
function mat33NormInf(m) {
  let best = 0;
  for (let r = 0; r < 3; r++) {
    const o = r * 3;
    const s = Math.abs(m[o]) + Math.abs(m[o + 1]) + Math.abs(m[o + 2]);
    if (s > best) best = s;
  }
  return best;
}
function mat33Inv(m) {
  const c00 = m[4] * m[8] - m[5] * m[7];
  const c01 = -(m[3] * m[8] - m[5] * m[6]);
  const c02 = m[3] * m[7] - m[4] * m[6];
  const det = m[0] * c00 + m[1] * c01 + m[2] * c02;
  if (!Number.isFinite(det) || Math.abs(det) < 1e-18) return null;
  const inv = 1 / det;
  return [
    c00 * inv,
    -(m[1] * m[8] - m[2] * m[7]) * inv,
    (m[1] * m[5] - m[2] * m[4]) * inv,
    c01 * inv,
    (m[0] * m[8] - m[2] * m[6]) * inv,
    -(m[0] * m[5] - m[2] * m[3]) * inv,
    c02 * inv,
    -(m[0] * m[7] - m[1] * m[6]) * inv,
    (m[0] * m[4] - m[1] * m[3]) * inv
  ];
}
function mat33Polar(A) {
  let X = A.slice();
  let gam = mat33Norm1(X);
  if (gam === 0) return X;
  let gami = mat33NormInf(X);
  for (let iter = 0; iter < 64; iter++) {
    const Y = mat33Inv(X);
    if (!Y) break;
    const alp = mat33Norm1(Y);
    const alpi = mat33NormInf(Y);
    const gamma = Math.sqrt(Math.sqrt(alp * alpi / (gam * gami)));
    const g1 = 0.5 * gamma;
    const g2 = 0.5 / gamma;
    let dif = 0;
    const Z = new Array(9);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const idx = r * 3 + c;
        const v = g1 * X[idx] + g2 * Y[c * 3 + r];
        dif += Math.abs(v - X[idx]);
        Z[idx] = v;
      }
    }
    X = Z;
    if (dif < 1e-12) break;
    gam = mat33Norm1(X);
    gami = mat33NormInf(X);
  }
  return X;
}
function mat44ToQuatern(m) {
  const qoffsetX = m[3];
  const qoffsetY = m[7];
  const qoffsetZ = m[11];
  let r11 = m[0], r12 = m[1], r13 = m[2];
  let r21 = m[4], r22 = m[5], r23 = m[6];
  let r31 = m[8], r32 = m[9], r33 = m[10];
  let xd = Math.sqrt(r11 * r11 + r21 * r21 + r31 * r31);
  let yd = Math.sqrt(r12 * r12 + r22 * r22 + r32 * r32);
  let zd = Math.sqrt(r13 * r13 + r23 * r23 + r33 * r33);
  if (xd === 0) {
    r11 = 1;
    r21 = 0;
    r31 = 0;
    xd = 1;
  }
  if (yd === 0) {
    r22 = 1;
    r12 = 0;
    r32 = 0;
    yd = 1;
  }
  if (zd === 0) {
    r33 = 1;
    r13 = 0;
    r23 = 0;
    zd = 1;
  }
  const dx = xd;
  const dy = yd;
  const dz = zd;
  r11 /= xd;
  r21 /= xd;
  r31 /= xd;
  r12 /= yd;
  r22 /= yd;
  r32 /= yd;
  r13 /= zd;
  r23 /= zd;
  r33 /= zd;
  const P = mat33Polar([r11, r12, r13, r21, r22, r23, r31, r32, r33]);
  r11 = P[0];
  r12 = P[1];
  r13 = P[2];
  r21 = P[3];
  r22 = P[4];
  r23 = P[5];
  r31 = P[6];
  r32 = P[7];
  r33 = P[8];
  const det = r11 * r22 * r33 - r11 * r32 * r23 - r21 * r12 * r33 + r21 * r32 * r13 + r31 * r12 * r23 - r31 * r22 * r13;
  let qfac = 1;
  if (det <= 0) {
    qfac = -1;
    r13 = -r13;
    r23 = -r23;
    r33 = -r33;
  }
  let a = r11 + r22 + r33 + 1;
  let b, c, d;
  if (a > 0.5) {
    a = 0.5 * Math.sqrt(a);
    b = 0.25 * (r32 - r23) / a;
    c = 0.25 * (r13 - r31) / a;
    d = 0.25 * (r21 - r12) / a;
  } else {
    const sx = 1 + r11 - (r22 + r33);
    const sy = 1 + r22 - (r11 + r33);
    const sz = 1 + r33 - (r11 + r22);
    if (sx > 1) {
      b = 0.5 * Math.sqrt(sx);
      c = 0.25 * (r12 + r21) / b;
      d = 0.25 * (r13 + r31) / b;
      a = 0.25 * (r32 - r23) / b;
    } else if (sy > 1) {
      c = 0.5 * Math.sqrt(sy);
      b = 0.25 * (r12 + r21) / c;
      d = 0.25 * (r23 + r32) / c;
      a = 0.25 * (r13 - r31) / c;
    } else {
      d = 0.5 * Math.sqrt(sz);
      b = 0.25 * (r13 + r31) / d;
      c = 0.25 * (r23 + r32) / d;
      a = 0.25 * (r21 - r12) / d;
    }
    if (a < 0) {
      b = -b;
      c = -c;
      d = -d;
    }
  }
  return {
    quaternB: b,
    quaternC: c,
    quaternD: d,
    qoffsetX,
    qoffsetY,
    qoffsetZ,
    dx,
    dy,
    dz,
    qfac
  };
}
function readTypedVoxels(bytes, voxOffset, nvox, datatypeCode, littleEndian) {
  const bpp = bytesPerVoxelForDatatype(datatypeCode);
  if (!bpp) {
    throw new Error(`Unsupported NIfTI-1 datatype code: ${datatypeCode}`);
  }
  const byteLen = nvox * bpp;
  if (voxOffset + byteLen > bytes.byteLength) {
    throw new Error(
      `NIfTI-1 data truncated: need ${voxOffset + byteLen} bytes, got ${bytes.byteLength}`
    );
  }
  if (littleEndian) {
    const aligned = (bytes.byteOffset + voxOffset & bpp - 1) === 0;
    const sliceBuf = aligned ? bytes.buffer : bytes.slice(voxOffset, voxOffset + byteLen).buffer;
    const off = aligned ? bytes.byteOffset + voxOffset : 0;
    switch (datatypeCode) {
      case NIFTI_DT.UINT8:
        return new Uint8Array(sliceBuf, off, nvox);
      case NIFTI_DT.INT8:
        return new Int8Array(sliceBuf, off, nvox);
      case NIFTI_DT.INT16:
        return new Int16Array(sliceBuf, off, nvox);
      case NIFTI_DT.UINT16:
        return new Uint16Array(sliceBuf, off, nvox);
      case NIFTI_DT.INT32:
        return new Int32Array(sliceBuf, off, nvox);
      case NIFTI_DT.UINT32:
        return new Uint32Array(sliceBuf, off, nvox);
      case NIFTI_DT.FLOAT32:
        return new Float32Array(sliceBuf, off, nvox);
      case NIFTI_DT.FLOAT64:
        return new Float64Array(sliceBuf, off, nvox);
      case NIFTI_DT.INT64:
        return new BigInt64Array(sliceBuf, off, nvox);
      case NIFTI_DT.UINT64:
        return new BigUint64Array(sliceBuf, off, nvox);
    }
  }
  const dv = new DataView(bytes.buffer, bytes.byteOffset + voxOffset, byteLen);
  switch (datatypeCode) {
    case NIFTI_DT.UINT8:
      return bytes.subarray(voxOffset, voxOffset + nvox);
    case NIFTI_DT.INT8:
      return new Int8Array(bytes.slice(voxOffset, voxOffset + nvox).buffer);
    case NIFTI_DT.INT16: {
      const out = new Int16Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getInt16(i * 2, false);
      return out;
    }
    case NIFTI_DT.UINT16: {
      const out = new Uint16Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getUint16(i * 2, false);
      return out;
    }
    case NIFTI_DT.INT32: {
      const out = new Int32Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getInt32(i * 4, false);
      return out;
    }
    case NIFTI_DT.UINT32: {
      const out = new Uint32Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getUint32(i * 4, false);
      return out;
    }
    case NIFTI_DT.FLOAT32: {
      const out = new Float32Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getFloat32(i * 4, false);
      return out;
    }
    case NIFTI_DT.FLOAT64: {
      const out = new Float64Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getFloat64(i * 8, false);
      return out;
    }
    case NIFTI_DT.INT64: {
      const out = new BigInt64Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getBigInt64(i * 8, false);
      return out;
    }
    case NIFTI_DT.UINT64: {
      const out = new BigUint64Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = dv.getBigUint64(i * 8, false);
      return out;
    }
    default:
      throw new Error(`Unsupported NIfTI-1 datatype code: ${datatypeCode}`);
  }
}
function readNifti1(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (bytes.byteLength < NIFTI_VOX_OFFSET) {
    throw new Error(`Invalid NIfTI-1 input: expected at least ${NIFTI_VOX_OFFSET} bytes, got ${bytes.byteLength}`);
  }
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const leSize = dv.getInt32(0, true);
  const beSize = dv.getInt32(0, false);
  let littleEndian;
  if (leSize === NIFTI_HEADER_BYTES) {
    littleEndian = true;
  } else if (beSize === NIFTI_HEADER_BYTES) {
    littleEndian = false;
  } else {
    throw new Error(`Invalid NIfTI-1 header: sizeof_hdr is ${leSize} (expected ${NIFTI_HEADER_BYTES})`);
  }
  const magic = String.fromCharCode(bytes[344], bytes[345], bytes[346], bytes[347]);
  if (magic !== "n+1\0") {
    throw new Error(`Unsupported NIfTI-1 magic '${magic.replace(/\0/g, "\\0")}'; expected single-file 'n+1\\0'`);
  }
  const dims = new Array(8);
  for (let i = 0; i < 8; i++) dims[i] = dv.getInt16(40 + i * 2, littleEndian);
  const nx = dims[1];
  const ny = dims[2];
  const nz = dims[3];
  const nt = dims[0] >= 4 && dims[4] > 0 ? dims[4] : 1;
  if (nx < 1 || ny < 1 || nz < 1 || nt !== 1) {
    throw new Error(`NIfTI-1 input must be a scalar 3D image; got dims=[${dims.slice(0, 5).join(", ")}]`);
  }
  const intentCode = dv.getInt16(68, littleEndian);
  const datatypeCode = dv.getInt16(70, littleEndian);
  const numBitsPerVoxel = dv.getInt16(72, littleEndian);
  const pixDims = new Array(8);
  for (let i = 0; i < 8; i++) pixDims[i] = dv.getFloat32(76 + i * 4, littleEndian);
  const rawVoxOffset = Math.floor(dv.getFloat32(108, littleEndian));
  const voxOffset = rawVoxOffset >= NIFTI_VOX_OFFSET ? rawVoxOffset : NIFTI_VOX_OFFSET;
  const sclSlope = dv.getFloat32(112, littleEndian);
  const sclInter = dv.getFloat32(116, littleEndian);
  const calMax = dv.getFloat32(124, littleEndian);
  const calMin = dv.getFloat32(128, littleEndian);
  const qformCode = dv.getInt16(252, littleEndian);
  const sformCode = dv.getInt16(254, littleEndian);
  const quaternB = dv.getFloat32(256, littleEndian);
  const quaternC = dv.getFloat32(260, littleEndian);
  const quaternD = dv.getFloat32(264, littleEndian);
  const qoffsetX = dv.getFloat32(268, littleEndian);
  const qoffsetY = dv.getFloat32(272, littleEndian);
  const qoffsetZ = dv.getFloat32(276, littleEndian);
  const srowX = [
    dv.getFloat32(280, littleEndian),
    dv.getFloat32(284, littleEndian),
    dv.getFloat32(288, littleEndian),
    dv.getFloat32(292, littleEndian)
  ];
  const srowY = [
    dv.getFloat32(296, littleEndian),
    dv.getFloat32(300, littleEndian),
    dv.getFloat32(304, littleEndian),
    dv.getFloat32(308, littleEndian)
  ];
  const srowZ = [
    dv.getFloat32(312, littleEndian),
    dv.getFloat32(316, littleEndian),
    dv.getFloat32(320, littleEndian),
    dv.getFloat32(324, littleEndian)
  ];
  const dx = Math.abs(pixDims[1]) || 1;
  const dy = Math.abs(pixDims[2]) || 1;
  const dz = Math.abs(pixDims[3]) || 1;
  const fallbackDiag = [
    dx,
    0,
    0,
    0,
    0,
    dy,
    0,
    0,
    0,
    0,
    dz,
    0,
    0,
    0,
    0,
    1
  ];
  const qfac = pixDims[0] < 0 ? -1 : 1;
  const qtoXyz = qformCode > 0 ? quaternToMat44(quaternB, quaternC, quaternD, qoffsetX, qoffsetY, qoffsetZ, dx, dy, dz, qfac) : fallbackDiag.slice();
  const stoXyz = sformCode > 0 ? [...srowX, ...srowY, ...srowZ, 0, 0, 0, 1] : qtoXyz.slice();
  const affine = sformCode > 0 ? stoXyz.slice() : qtoXyz.slice();
  const nvox = nx * ny * nz;
  const data = readTypedVoxels(bytes, voxOffset, nvox, datatypeCode, littleEndian);
  const rawHeader = new Uint8Array(NIFTI_VOX_OFFSET);
  rawHeader.set(bytes.subarray(0, NIFTI_HEADER_BYTES), 0);
  return {
    header: {
      dims,
      pixDims,
      datatypeCode,
      numBitsPerVoxel,
      voxOffset,
      sclSlope,
      sclInter,
      calMin,
      calMax,
      intentCode,
      qformCode,
      sformCode,
      quaternB,
      quaternC,
      quaternD,
      qoffsetX,
      qoffsetY,
      qoffsetZ,
      qtoXyz,
      stoXyz,
      affine,
      littleEndian,
      rawHeader
    },
    data
  };
}
function decodeNiftiVoxelsToFloat32(data, sclSlope, sclInter) {
  const n = data.length;
  const out = new Float32Array(n);
  const slope = Number.isFinite(sclSlope) && sclSlope !== 0 ? sclSlope : 1;
  const inter = Number.isFinite(sclInter) ? sclInter : 0;
  const isBigInt = data instanceof BigInt64Array || data instanceof BigUint64Array;
  let finiteCount = 0;
  for (let i = 0; i < n; i++) {
    const raw = isBigInt ? Number(data[i]) : data[i];
    const v = raw * slope + inter;
    if (Number.isFinite(v)) {
      out[i] = v;
      finiteCount++;
    } else {
      out[i] = 0;
    }
  }
  if (finiteCount === 0) {
    throw new Error("brainchomp: input has no finite voxels");
  }
  return out;
}
function writeNifti1(baseHeader, data, patch = {}) {
  const datatypeCode = patch.datatypeCode ?? baseHeader?.datatypeCode ?? NIFTI_DT.UINT8;
  const bpp = bytesPerVoxelForDatatype(datatypeCode);
  if (!bpp) throw new Error(`Unsupported NIfTI-1 datatype code: ${datatypeCode}`);
  const dataBytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  const out = new Uint8Array(NIFTI_VOX_OFFSET + dataBytes.byteLength);
  if (baseHeader && baseHeader.littleEndian && baseHeader.rawHeader.byteLength >= NIFTI_HEADER_BYTES) {
    out.set(baseHeader.rawHeader.subarray(0, NIFTI_HEADER_BYTES), 0);
  }
  const dv = new DataView(out.buffer);
  dv.setInt32(0, NIFTI_HEADER_BYTES, true);
  const dims = patch.dims ? [3, patch.dims[0], patch.dims[1], patch.dims[2], 1, 1, 1, 1] : baseHeader ? [3, baseHeader.dims[1], baseHeader.dims[2], baseHeader.dims[3], 1, 1, 1, 1] : [3, 1, 1, 1, 1, 1, 1, 1];
  for (let i = 0; i < 8; i++) dv.setInt16(40 + i * 2, dims[i], true);
  const intentCode = patch.intentCode ?? baseHeader?.intentCode ?? NIFTI_INTENT_NONE;
  dv.setFloat32(56, 0, true);
  dv.setFloat32(60, 0, true);
  dv.setFloat32(64, 0, true);
  dv.setInt16(68, intentCode, true);
  dv.setInt16(70, datatypeCode, true);
  dv.setInt16(72, bpp * 8, true);
  const pixDims = baseHeader ? baseHeader.pixDims.slice() : [1, 1, 1, 1, 1, 0, 0, 0];
  if (patch.pixDims) {
    pixDims[1] = patch.pixDims[0];
    pixDims[2] = patch.pixDims[1];
    pixDims[3] = patch.pixDims[2];
  }
  for (let i = 0; i < 8; i++) dv.setFloat32(76 + i * 4, pixDims[i] ?? 0, true);
  dv.setFloat32(108, NIFTI_VOX_OFFSET, true);
  dv.setFloat32(112, patch.sclSlope ?? baseHeader?.sclSlope ?? 1, true);
  dv.setFloat32(116, patch.sclInter ?? baseHeader?.sclInter ?? 0, true);
  dv.setFloat32(124, patch.calMax ?? baseHeader?.calMax ?? 0, true);
  dv.setFloat32(128, patch.calMin ?? baseHeader?.calMin ?? 0, true);
  out.fill(0, 328, 344);
  if (patch.descrip !== void 0) {
    out.fill(0, 148, 228);
    for (let i = 0; i < Math.min(80, patch.descrip.length); i++) {
      out[148 + i] = patch.descrip.charCodeAt(i) & 127;
    }
  }
  const writeAffine = patch.affine ?? (baseHeader && !baseHeader.littleEndian ? baseHeader.stoXyz : null);
  if (writeAffine) {
    const code = patch.sformCode ?? patch.qformCode ?? Math.max(baseHeader?.qformCode ?? 0, baseHeader?.sformCode ?? 0, 1);
    dv.setInt16(252, patch.qformCode ?? code, true);
    dv.setInt16(254, patch.sformCode ?? code, true);
    const q = mat44ToQuatern(writeAffine);
    dv.setFloat32(76, q.qfac, true);
    dv.setFloat32(80, patch.preservePixDims ? patch.preservePixDims[0] : q.dx, true);
    dv.setFloat32(84, patch.preservePixDims ? patch.preservePixDims[1] : q.dy, true);
    dv.setFloat32(88, patch.preservePixDims ? patch.preservePixDims[2] : q.dz, true);
    dv.setFloat32(256, q.quaternB, true);
    dv.setFloat32(260, q.quaternC, true);
    dv.setFloat32(264, q.quaternD, true);
    dv.setFloat32(268, q.qoffsetX, true);
    dv.setFloat32(272, q.qoffsetY, true);
    dv.setFloat32(276, q.qoffsetZ, true);
    for (let i = 0; i < 4; i++) dv.setFloat32(280 + i * 4, writeAffine[i], true);
    for (let i = 0; i < 4; i++) dv.setFloat32(296 + i * 4, writeAffine[4 + i], true);
    for (let i = 0; i < 4; i++) dv.setFloat32(312 + i * 4, writeAffine[8 + i], true);
  } else if (baseHeader && !baseHeader.littleEndian) {
    dv.setInt16(252, baseHeader.qformCode, true);
    dv.setInt16(254, baseHeader.sformCode, true);
    dv.setFloat32(256, baseHeader.quaternB, true);
    dv.setFloat32(260, baseHeader.quaternC, true);
    dv.setFloat32(264, baseHeader.quaternD, true);
    dv.setFloat32(268, baseHeader.qoffsetX, true);
    dv.setFloat32(272, baseHeader.qoffsetY, true);
    dv.setFloat32(276, baseHeader.qoffsetZ, true);
    for (let i = 0; i < 4; i++) dv.setFloat32(280 + i * 4, baseHeader.stoXyz[i], true);
    for (let i = 0; i < 4; i++) dv.setFloat32(296 + i * 4, baseHeader.stoXyz[4 + i], true);
    for (let i = 0; i < 4; i++) dv.setFloat32(312 + i * 4, baseHeader.stoXyz[8 + i], true);
  }
  out[344] = 110;
  out[345] = 43;
  out[346] = 49;
  out[347] = 0;
  out[348] = 0;
  out[349] = 0;
  out[350] = 0;
  out[351] = 0;
  out.set(dataBytes, NIFTI_VOX_OFFSET);
  return out;
}

// src/webgpu/bwlabels.js
var labelMetaMap = /* @__PURE__ */ new WeakMap();
var BWLabeler = class {
  /** Return cached metadata associated with a conn=6 component-label map `ls`, if any. */
  getLabelMeta(ls) {
    return labelMetaMap.get(ls) || null;
  }
  // port of https://github.com/rordenlab/niimath/blob/master/src/bwlabel.c
  // return voxel address given row A, column B, and slice C
  idx(A, B, C, DIM3) {
    return C * DIM3[0] * DIM3[1] + B * DIM3[0] + A;
  }
  // idx()
  // determine if voxels below candidate voxel have already been assigned a label
  check_previous_slice(bw, il, r, c, sl, dim, conn, tt, nabo, tn) {
    let nr_set = 0;
    if (!sl) {
      return 0;
    }
    const val = bw[this.idx(r, c, sl, dim)];
    if (conn >= 6) {
      const idx = this.idx(r, c, sl - 1, dim);
      if (val === bw[idx]) {
        nabo[nr_set++] = il[idx];
      }
    }
    if (conn >= 18) {
      if (r) {
        const idx = this.idx(r - 1, c, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
      if (c) {
        const idx = this.idx(r, c - 1, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
      if (r < dim[0] - 1) {
        const idx = this.idx(r + 1, c, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
      if (c < dim[1] - 1) {
        const idx = this.idx(r, c + 1, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
    }
    if (conn === 26) {
      if (r && c) {
        const idx = this.idx(r - 1, c - 1, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
      if (r < dim[0] - 1 && c) {
        const idx = this.idx(r + 1, c - 1, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
      if (r && c < dim[1] - 1) {
        const idx = this.idx(r - 1, c + 1, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
      if (r < dim[0] - 1 && c < dim[1] - 1) {
        const idx = this.idx(r + 1, c + 1, sl - 1, dim);
        if (val === bw[idx]) {
          nabo[nr_set++] = il[idx];
        }
      }
    }
    if (nr_set) {
      this.fill_tratab(tt, nabo, nr_set, tn);
      return nabo[0];
    } else {
      return 0;
    }
  }
  // check_previous_slice()
  // provisionally label all voxels in volume
  do_initial_labelling(bw, dim, conn, scratch = null) {
    const nx = dim[0] | 0;
    const ny = dim[1] | 0;
    const nz = dim[2] | 0;
    const plane = nx * ny;
    const nvox = plane * nz;
    let label = 1;
    const kGrowArrayBy = 8192;
    let ttn = kGrowArrayBy;
    let tt = new Uint32Array(ttn);
    let il;
    if (conn === 6 && scratch && scratch.il && scratch.il.length === nvox) {
      il = scratch.il;
      if (scratch.dirty) {
        il.fill(0);
      } else if (scratch.runs && scratch.runLen > 0) {
        const prevRuns = scratch.runs;
        const prevLen = scratch.runLen;
        for (let k = 0; k < prevLen; k += 2) {
          il.fill(0, prevRuns[k], prevRuns[k + 1]);
        }
      }
    } else {
      il = new Uint32Array(nvox);
      if (conn === 6 && scratch) {
        scratch.il = il;
        scratch.runs = null;
        scratch.runLen = 0;
        scratch.dirty = false;
      }
    }
    if (conn === 6) {
      if (scratch) scratch.dirty = true;
      const u32 = (bw instanceof Uint8Array || bw instanceof Uint8ClampedArray) && (bw.byteOffset & 3) === 0 && (nx & 3) === 0 && bw.length >= nvox ? new Uint32Array(bw.buffer, bw.byteOffset, nvox >> 2) : null;
      let runs = scratch && scratch.runs ? scratch.runs : new Uint32Array(8192);
      let runsCap = runs.length;
      let runLen = 0;
      let n0 = 0;
      let n1 = 0;
      let n2 = 0;
      let fgStart = -1;
      let fgEnd = -1;
      let minSl = nz;
      let maxSl = -1;
      for (let sl = 0; sl < nz; sl++) {
        const slOff = sl * plane;
        for (let c = 0; c < ny; c++) {
          const rowOff = slOff + c * nx;
          let r = 0;
          if (u32) {
            const qRowEnd = rowOff + nx >> 2;
            let q = rowOff >> 2;
            while (q < qRowEnd && u32[q] === 0) q++;
            if (q === qRowEnd) continue;
            r = (q << 2) - rowOff;
          }
          let inRun = false;
          for (; r < nx; r++) {
            const i = rowOff + r;
            if (u32 && !inRun && (r & 3) === 0 && u32[i >> 2] === 0) {
              r += 3;
              continue;
            }
            const val = bw[i];
            if (val === 0) {
              if (inRun) {
                runs[runLen++] = i;
                inRun = false;
              }
              continue;
            }
            if (!inRun) {
              if (runLen + 2 > runsCap) {
                runsCap <<= 1;
                const ext = new Uint32Array(runsCap);
                ext.set(runs);
                runs = ext;
              }
              runs[runLen++] = i;
              inRun = true;
            }
            if (fgStart < 0) {
              fgStart = i;
              minSl = sl;
            }
            fgEnd = i;
            maxSl = sl;
            let nr_set = 0;
            if (sl > 0 && bw[i - plane] === val) {
              n0 = il[i - plane];
              nr_set = 1;
            }
            if (r > 0 && bw[i - 1] === val) {
              const lbl = il[i - 1];
              if (nr_set === 0) n0 = lbl;
              else if (nr_set === 1) n1 = lbl;
              else n2 = lbl;
              nr_set++;
            }
            if (c > 0 && bw[i - nx] === val) {
              const lbl = il[i - nx];
              if (nr_set === 0) n0 = lbl;
              else if (nr_set === 1) n1 = lbl;
              else n2 = lbl;
              nr_set++;
            }
            if (nr_set === 0) {
              il[i] = label;
              if (label >= ttn) {
                ttn += kGrowArrayBy;
                const ext = new Uint32Array(ttn);
                ext.set(tt);
                tt = ext;
              }
              tt[label - 1] = label;
              label++;
            } else {
              il[i] = n0;
              if (nr_set === 2 && n1 !== n0) {
                let r0 = n0;
                while (tt[r0 - 1] !== r0) r0 = tt[r0 - 1];
                let r1 = n1;
                while (tt[r1 - 1] !== r1) r1 = tt[r1 - 1];
                const ltn = r0 < r1 ? r0 : r1;
                tt[r0 - 1] = ltn;
                tt[r1 - 1] = ltn;
              } else if (nr_set === 3 && (n1 !== n0 || n2 !== n0)) {
                let r0 = n0;
                while (tt[r0 - 1] !== r0) r0 = tt[r0 - 1];
                let r1 = n1;
                while (tt[r1 - 1] !== r1) r1 = tt[r1 - 1];
                let r2 = n2;
                while (tt[r2 - 1] !== r2) r2 = tt[r2 - 1];
                let ltn = r0 < r1 ? r0 : r1;
                if (r2 < ltn) ltn = r2;
                tt[r0 - 1] = ltn;
                tt[r1 - 1] = ltn;
                tt[r2 - 1] = ltn;
              }
            }
          }
          if (inRun) {
            runs[runLen++] = rowOff + nx;
          }
        }
      }
      for (let i = 0; i < label - 1; i++) {
        let j = i;
        while (tt[j] !== j + 1) {
          j = tt[j] - 1;
        }
        tt[i] = j + 1;
      }
      if (scratch) {
        scratch.runs = runs;
        scratch.runLen = runLen;
        scratch.dirty = false;
      }
      this._lastInitialRange = { conn: 6, fgStart, fgEnd, minSl, maxSl, runs, runLen };
      return [label - 1, tt, il];
    }
    const naboPS = new Uint32Array(32);
    const tn = new Uint32Array(32);
    const nabo = new Uint32Array(27);
    for (let sl = 0; sl < nz; sl++) {
      for (let c = 0; c < ny; c++) {
        for (let r = 0; r < nx; r++) {
          let nr_set = 0;
          const val = bw[this.idx(r, c, sl, dim)];
          if (val === 0) {
            continue;
          }
          nabo[0] = this.check_previous_slice(bw, il, r, c, sl, dim, conn, tt, naboPS, tn);
          if (nabo[0]) {
            nr_set += 1;
          }
          if (conn >= 6) {
            if (r) {
              const idx = this.idx(r - 1, c, sl, dim);
              if (val === bw[idx]) {
                nabo[nr_set++] = il[idx];
              }
            }
            if (c) {
              const idx = this.idx(r, c - 1, sl, dim);
              if (val === bw[idx]) {
                nabo[nr_set++] = il[idx];
              }
            }
          }
          if (conn >= 18) {
            if (c && r) {
              const idx = this.idx(r - 1, c - 1, sl, dim);
              if (val === bw[idx]) {
                nabo[nr_set++] = il[idx];
              }
            }
            if (c && r < nx - 1) {
              const idx = this.idx(r + 1, c - 1, sl, dim);
              if (val === bw[idx]) {
                nabo[nr_set++] = il[idx];
              }
            }
          }
          if (nr_set) {
            il[this.idx(r, c, sl, dim)] = nabo[0];
            this.fill_tratab(tt, nabo, nr_set, tn);
          } else {
            il[this.idx(r, c, sl, dim)] = label;
            if (label >= ttn) {
              ttn += kGrowArrayBy;
              const ext = new Uint32Array(ttn);
              ext.set(tt);
              tt = ext;
            }
            tt[label - 1] = label;
            label++;
          }
        }
      }
    }
    for (let i = 0; i < label - 1; i++) {
      let j = i;
      while (tt[j] !== j + 1) {
        j = tt[j] - 1;
      }
      tt[i] = j + 1;
    }
    this._lastInitialRange = null;
    return [label - 1, tt, il];
  }
  // do_initial_labelling()
  // translation table unifies a region that has been assigned multiple classes
  fill_tratab(tt, nabo, nr_set, tn) {
    const INT_MAX = 2147483647;
    let ltn = INT_MAX;
    for (let i = 0; i < nr_set; i++) {
      let j = nabo[i];
      while (tt[j - 1] !== j) {
        j = tt[j - 1];
      }
      tn[i] = j;
      ltn = Math.min(ltn, j);
    }
    for (let i = 0; i < nr_set; i++) {
      tt[tn[i] - 1] = ltn;
    }
  }
  // fill_tratab()
  // remove any residual gaps so label numbers are dense rather than sparse (mutates `il` in-place)
  translate_labels(il, dim, tt, ttn, bw = null, range = null) {
    const nvox = dim[0] * dim[1] * dim[2];
    if (range && (ttn === 0 || range.fgStart < 0)) {
      if (bw) {
        this._lastMeta = {
          conn: range.conn,
          cl: 0,
          fgStart: 0,
          fgEnd: -1,
          minSl: 0,
          maxSl: -1,
          ls2bw: new Uint32Array(1),
          sumls: new Uint32Array(1),
          distinctFgClasses: 0,
          bw
        };
      }
      return [0, il];
    }
    let ml = 0;
    for (let i = 0; i < ttn; i++) {
      if (tt[i] > ml) ml = tt[i];
    }
    const fl = new Uint32Array(ml + 1);
    const ls2bwTmp = bw && range ? new Uint32Array(ttn + 1) : null;
    const sumlsTmp = bw && range ? new Uint32Array(ttn + 1) : null;
    const start = range ? range.fgStart : 0;
    const end = range ? range.fgEnd : nvox - 1;
    let cl = 0;
    if (range && range.runs) {
      const runs = range.runs;
      const runLen = range.runLen;
      for (let rk = 0; rk < runLen; rk += 2) {
        const s = runs[rk];
        const e = runs[rk + 1];
        for (let i = s; i < e; i++) {
          const root = tt[il[i] - 1];
          let mapped = fl[root];
          if (!mapped) {
            cl += 1;
            mapped = cl;
            fl[root] = mapped;
            if (ls2bwTmp) ls2bwTmp[mapped] = bw[i];
          }
          il[i] = mapped;
          if (sumlsTmp) sumlsTmp[mapped]++;
        }
      }
    } else {
      for (let i = start; i <= end; i++) {
        const lbl = il[i];
        if (lbl) {
          const root = tt[lbl - 1];
          let mapped = fl[root];
          if (!mapped) {
            cl += 1;
            mapped = cl;
            fl[root] = mapped;
            if (ls2bwTmp) ls2bwTmp[mapped] = bw[i];
          }
          il[i] = mapped;
          if (sumlsTmp) sumlsTmp[mapped]++;
        }
      }
    }
    if (bw && range) {
      const ls2bw = ls2bwTmp.slice(0, cl + 1);
      const sumls = sumlsTmp.slice(0, cl + 1);
      let distinctFgClasses = 0;
      if (cl > 0) {
        const firstCls = ls2bw[1];
        distinctFgClasses = 1;
        for (let c = 2; c <= cl; c++) {
          if (ls2bw[c] !== firstCls) {
            distinctFgClasses = 2;
            break;
          }
        }
      }
      this._lastMeta = {
        conn: range.conn,
        cl,
        fgStart: range.fgStart,
        fgEnd: range.fgEnd,
        minSl: range.minSl,
        maxSl: range.maxSl,
        runs: range.runs,
        runLen: range.runLen,
        ls2bw,
        sumls,
        distinctFgClasses,
        bw
      };
    }
    return [cl, il];
  }
  // translate_labels()
  /**
   * For each SUPPRESSED component, find the most common KEPT class touching its
   * 6-neighbourhood boundary. Used by the relabel-instead-of-zero option so a
   * dropped blob inherits its surrounding surviving label rather than becoming
   * background.
   *
   * A plain contact-majority vote is biased by SURFACE AREA, which is wrong for
   * sheet-like structures. A dropped cortical fragment rests on white matter
   * across its whole inner surface, meets neighbouring parcels only along a thin
   * tangential rim, and faces background/CSF (uncounted) on the pial side - so
   * white matter wins the vote and the fragment is repainted as WM, which is
   * anatomically impossible for tissue on the pial side of the WM boundary.
   * `familyOf` fixes this: the vote is first restricted to neighbours in the
   * component's OWN class family (for the DK atlas: same-hemisphere cortex), and
   * only falls back to the unrestricted vote when that family has no candidate -
   * which is exactly the case (a true speck buried inside white matter) where
   * the unrestricted answer is the right one.
   *
   * @param {Uint32Array} ls   Component-label map (0 = background).
   * @param {number[]} dim     [nx, ny, nz].
   * @param {Uint32Array} kept Per-label surviving class id (>0) or 0 if suppressed.
   * @param {number} cl        Number of components.
   * @param {Uint32Array} [bw] Original class volume; required for `familyOf`,
   *   since it is the only place a SUPPRESSED component's own class survives.
   * @param {(cls:number)=>number} [familyOf] Maps a class id to a family id, or 0
   *   for "no restriction". Supplied by the caller so this file stays agnostic of
   *   any model's label layout. Omit (null) for the original unrestricted vote.
   * @returns {Uint32Array}    winner[comp] = class to assign (0 = leave as bg).
   */
  neighbor_winners(ls, dim, kept, cl, bw = null, familyOf = null) {
    const nx = dim[0];
    const ny = dim[1];
    const nz = dim[2];
    const sliceXY = nx * ny;
    const useFamily = !!(familyOf && bw);
    let anySuppressed = false;
    for (let c = 1; c <= cl; c++) {
      if (!kept[c]) {
        anySuppressed = true;
        break;
      }
    }
    if (!anySuppressed) {
      if (useFamily) {
        console.log(
          `[relabel] 0/0 suppressed components resolved within their own class family (0 fell back to the unrestricted neighbour vote)`
        );
      }
      return new Uint32Array(cl + 1);
    }
    const compFam = useFamily ? new Int32Array(cl + 1).fill(-1) : null;
    const hist = /* @__PURE__ */ new Map();
    const bump = (c, klass) => {
      let h = hist.get(c);
      if (!h) {
        h = /* @__PURE__ */ new Map();
        hist.set(c, h);
      }
      h.set(klass, (h.get(klass) || 0) + 1);
    };
    const meta = labelMetaMap.get(ls);
    const hasMeta = meta && meta.cl === cl && ls.length === sliceXY * nz;
    if (hasMeta && meta.runs) {
      const runs = meta.runs;
      const runLen = meta.runLen;
      for (let rk = 0; rk < runLen; rk += 2) {
        const s = runs[rk];
        const e = runs[rk + 1];
        const z = s / sliceXY | 0;
        const rem = s - z * sliceXY;
        const y = rem / nx | 0;
        let x = rem - y * nx;
        for (let i = s; i < e; i++, x++) {
          const c = ls[i];
          if (kept[c]) continue;
          if (useFamily && compFam[c] < 0) {
            compFam[c] = familyOf(bw[i]);
          }
          let k;
          if (x > 0 && (k = kept[ls[i - 1]])) bump(c, k);
          if (x < nx - 1 && (k = kept[ls[i + 1]])) bump(c, k);
          if (y > 0 && (k = kept[ls[i - nx]])) bump(c, k);
          if (y < ny - 1 && (k = kept[ls[i + nx]])) bump(c, k);
          if (z > 0 && (k = kept[ls[i - sliceXY]])) bump(c, k);
          if (z < nz - 1 && (k = kept[ls[i + sliceXY]])) bump(c, k);
        }
      }
    } else {
      const zStart = hasMeta ? meta.minSl : 0;
      const zEnd = hasMeta ? meta.maxSl : nz - 1;
      let i = zStart * sliceXY;
      for (let z = zStart; z <= zEnd; z++) {
        for (let y = 0; y < ny; y++) {
          for (let x = 0; x < nx; x++, i++) {
            const c = ls[i];
            if (c === 0 || kept[c]) {
              continue;
            }
            if (useFamily && compFam[c] < 0) {
              compFam[c] = familyOf(bw[i]);
            }
            let k;
            if (x > 0 && (k = kept[ls[i - 1]])) bump(c, k);
            if (x < nx - 1 && (k = kept[ls[i + 1]])) bump(c, k);
            if (y > 0 && (k = kept[ls[i - nx]])) bump(c, k);
            if (y < ny - 1 && (k = kept[ls[i + nx]])) bump(c, k);
            if (z > 0 && (k = kept[ls[i - sliceXY]])) bump(c, k);
            if (z < nz - 1 && (k = kept[ls[i + sliceXY]])) bump(c, k);
          }
        }
      }
    }
    const winner = new Uint32Array(cl + 1).fill(0);
    let familyResolved = 0;
    for (const [c, h] of hist) {
      const fam = useFamily ? compFam[c] : 0;
      let best = 0;
      let bestN = 0;
      if (fam > 0) {
        for (const [klass, n] of h) {
          if (familyOf(klass) !== fam) {
            continue;
          }
          if (n > bestN || n === bestN && (best === 0 || klass < best)) {
            bestN = n;
            best = klass;
          }
        }
        if (best) {
          familyResolved++;
        }
      }
      if (!best) {
        for (const [klass, n] of h) {
          if (n > bestN || n === bestN && (best === 0 || klass < best)) {
            bestN = n;
            best = klass;
          }
        }
      }
      winner[c] = best;
    }
    if (useFamily) {
      console.log(
        `[relabel] ${familyResolved}/${hist.size} suppressed components resolved within their own class family (${hist.size - familyResolved} fell back to the unrestricted neighbour vote)`
      );
    }
    return winner;
  }
  /**
   * Build the final class volume from a keep decision.
   * @param {Uint32Array} ls   Component-label map (0 = background).
   * @param {number[]} dim     [nx, ny, nz] (required when relabelSuppressed).
   * @param {Uint32Array} kept Per-label surviving class id (>0) or 0 if suppressed.
   * @param {number} cl        Number of components.
   * @param {boolean} relabelSuppressed If true, suppressed components inherit the
   *   most common kept neighbour class instead of becoming background. Components
   *   touching no kept voxel (e.g. specks floating in true exterior background)
   *   still become 0.
   * @param {Uint32Array} [bw] Original class volume (needed with `familyOf`).
   * @param {(cls:number)=>number} [familyOf] Class-family gate for the neighbour
   *   vote - see neighbor_winners. Omit for the original unrestricted vote.
   * @returns {[number, Uint32Array]} [maxClass, volume].
   */
  finalize_volume(ls, dim, kept, cl, relabelSuppressed, bw = null, familyOf = null, inPlace = false) {
    const nvox = ls.length;
    const winner = relabelSuppressed ? this.neighbor_winners(ls, dim, kept, cl, bw, familyOf) : null;
    const eff = winner ? new Uint32Array(cl + 1) : kept;
    let maxKept = 0;
    for (let c = 1; c <= cl; c++) {
      let v = kept[c];
      if (winner) {
        if (!v) v = winner[c];
        eff[c] = v;
      }
      if (v > maxKept) maxKept = v;
    }
    const meta = labelMetaMap.get(ls);
    const hasMeta = meta && meta.cl === cl && meta.ls2bw.length === cl + 1 && meta.fgEnd < nvox;
    let mxbw = 0;
    if (hasMeta && meta.runs) {
      const runs = meta.runs;
      const runLen = meta.runLen;
      for (let c = 1; c <= cl; c++) {
        if (meta.sumls[c] > 0 && eff[c] > mxbw) mxbw = eff[c];
      }
      if (meta.bw === bw && bw instanceof Uint8Array && maxKept <= 255) {
        const patchFlag = new Uint8Array(cl + 1);
        let anyPatch = false;
        for (let c = 1; c <= cl; c++) {
          if (meta.sumls[c] > 0 && eff[c] !== meta.ls2bw[c]) {
            patchFlag[c] = 1;
            anyPatch = true;
          }
        }
        const vxs3 = inPlace ? bw : bw.slice();
        if (anyPatch) {
          for (let rk = 0; rk < runLen; rk += 2) {
            const s = runs[rk];
            const e = runs[rk + 1];
            for (let i = s; i < e; i++) {
              const c = ls[i];
              if (patchFlag[c]) vxs3[i] = eff[c];
            }
          }
        }
        return [mxbw, vxs3];
      }
      const outU82 = bw instanceof Uint8Array && maxKept <= 255;
      const vxs2 = outU82 ? new Uint8Array(nvox) : new Uint32Array(nvox);
      for (let rk = 0; rk < runLen; rk += 2) {
        const s = runs[rk];
        const e = runs[rk + 1];
        for (let i = s; i < e; i++) {
          const v = eff[ls[i]];
          if (v) vxs2[i] = v;
        }
      }
      return [mxbw, vxs2];
    }
    const outU8 = bw instanceof Uint8Array && maxKept <= 255;
    const vxs = outU8 ? new Uint8Array(nvox) : new Uint32Array(nvox);
    if (hasMeta) {
      if (meta.fgStart >= 0 && meta.fgEnd >= meta.fgStart) {
        for (let i = meta.fgStart; i <= meta.fgEnd; i++) {
          const c = ls[i];
          if (c !== 0) {
            const v = eff[c];
            if (v) {
              vxs[i] = v;
              if (v > mxbw) mxbw = v;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < nvox; i++) {
        const c = ls[i];
        if (c !== 0) {
          const v = eff[c];
          if (v) {
            vxs[i] = v;
            if (v > mxbw) mxbw = v;
          }
        }
      }
    }
    return [mxbw, vxs];
  }
  /**
   * DIAGNOSTIC ONLY — does not modify the volume. Logs, per connected component,
   * its class id, size, whether it's the largest component of its class, how many
   * components its class fragments into, and what its surface touches (dominant
   * neighbouring class + how enclosed it is by that class, plus background
   * fraction). Use it to decide whether a stray region (e.g. a red blob inside
   * green) is a separate label swallowed by one neighbour (enclosure ~1, small,
   * not largest-of-class) vs. a connected protrusion of a large structure
   * (its class has 1 component / it IS the largest-of-class).
   *
   * @param {Uint32Array} bw   Original per-voxel class values.
   * @param {number} cl        Number of components.
   * @param {Uint32Array} ls   Component-label map (0 = background).
   * @param {number[]} dim     [nx, ny, nz].
   * @param {object} [options] { topN=50, minSize=1, label='diag' }.
   * @returns {object[]} the per-component rows (also printed via console.table).
   */
  diagnose_components(bw, cl, ls, dim, options = {}) {
    const topN = options.topN ?? 50;
    const minSize = options.minSize ?? 1;
    const tag = options.label ?? "diag";
    const nx = dim[0];
    const ny = dim[1];
    const nz = dim[2];
    const sliceXY = nx * ny;
    const ls2bw = new Uint32Array(cl + 1);
    const sumls = new Uint32Array(cl + 1);
    for (let i = 0; i < bw.length; i++) {
      const c = ls[i];
      if (c) {
        ls2bw[c] = bw[i];
        sumls[c]++;
      }
    }
    const fhist = /* @__PURE__ */ new Map();
    const bgContacts = new Uint32Array(cl + 1);
    const totalBoundary = new Uint32Array(cl + 1);
    const bump = (c, k) => {
      let h = fhist.get(c);
      if (!h) {
        h = /* @__PURE__ */ new Map();
        fhist.set(c, h);
      }
      h.set(k, (h.get(k) || 0) + 1);
    };
    for (let z = 0; z < nz; z++) {
      for (let y = 0; y < ny; y++) {
        for (let x = 0; x < nx; x++) {
          const i = z * sliceXY + y * nx + x;
          const c = ls[i];
          if (!c) {
            continue;
          }
          const myClass = ls2bw[c];
          const check = (j) => {
            const nc = ls[j];
            if (nc === c) {
              return;
            }
            totalBoundary[c]++;
            const ncl = nc ? ls2bw[nc] : 0;
            if (ncl === 0) {
              bgContacts[c]++;
            } else if (ncl !== myClass) {
              bump(c, ncl);
            }
          };
          if (x > 0) check(i - 1);
          if (x < nx - 1) check(i + 1);
          if (y > 0) check(i - nx);
          if (y < ny - 1) check(i + nx);
          if (z > 0) check(i - sliceXY);
          if (z < nz - 1) check(i + sliceXY);
        }
      }
    }
    const classCount = /* @__PURE__ */ new Map();
    const classMax = /* @__PURE__ */ new Map();
    for (let c = 1; c <= cl; c++) {
      const cls = ls2bw[c];
      classCount.set(cls, (classCount.get(cls) || 0) + 1);
      if (!classMax.has(cls) || sumls[c] > classMax.get(cls)) {
        classMax.set(cls, sumls[c]);
      }
    }
    const rows = [];
    for (let c = 1; c <= cl; c++) {
      if (sumls[c] < minSize) {
        continue;
      }
      const cls = ls2bw[c];
      const h = fhist.get(c);
      let dom = 0;
      let domN = 0;
      let foreignTotal = 0;
      if (h) {
        for (const [k, n] of h) {
          foreignTotal += n;
          if (n > domN) {
            domN = n;
            dom = k;
          }
        }
      }
      const tb = totalBoundary[c] || 1;
      rows.push({
        comp: c,
        class: cls,
        size: sumls[c],
        largestOfClass: sumls[c] === classMax.get(cls) ? "Y" : "n",
        compsInClass: classCount.get(cls),
        domNeighbor: dom,
        domFracForeign: foreignTotal ? +(domN / foreignTotal).toFixed(2) : 0,
        domFracBoundary: +(domN / tb).toFixed(2),
        bgFrac: +(bgContacts[c] / tb).toFixed(2)
      });
    }
    rows.sort((a, b) => b.domFracForeign - a.domFracForeign || b.size - a.size);
    const fmt = (rws, cols) => {
      const widths = cols.map((c) => Math.max(c.h.length, ...rws.map((r) => String(r[c.k]).length)));
      const line = (cells) => cells.map((s, i) => String(s).padStart(widths[i])).join("  ");
      return [line(cols.map((c) => c.h)), ...rws.map((r) => line(cols.map((c) => r[c.k])))].join("\n");
    };
    const compCols = [
      { k: "comp", h: "comp" },
      { k: "class", h: "class" },
      { k: "size", h: "size" },
      { k: "largestOfClass", h: "lrg" },
      { k: "compsInClass", h: "nComp" },
      { k: "domNeighbor", h: "domNbr" },
      { k: "domFracForeign", h: "encF" },
      { k: "domFracBoundary", h: "encB" },
      { k: "bgFrac", h: "bgF" }
    ];
    console.log(
      `[${tag}] total components=${cl}, distinct classes=${classCount.size}
[${tag}] island candidates (encF\u22481 + small size + lrg=n \u21D2 swallowed island):
` + fmt(rows.slice(0, topN), compCols)
    );
    const classRows = [...classCount.entries()].map(([cls, cnt]) => ({ class: cls, components: cnt, maxCompSize: classMax.get(cls) })).sort((a, b) => b.components - a.components);
    console.log(
      `[${tag}] per-class component counts (components=1 \u21D2 fully connected):
` + fmt(classRows.slice(0, 30), [
        { k: "class", h: "class" },
        { k: "components", h: "comps" },
        { k: "maxCompSize", h: "maxSize" }
      ])
    );
    return rows;
  }
  /** Collect per-component class id and voxel count in a single pass. */
  _collectComponentStats(bw, cl, ls) {
    const meta = labelMetaMap.get(ls);
    if (meta && meta.cl === cl && meta.bw === bw && ls.length === bw.length) {
      return [meta.ls2bw, meta.sumls];
    }
    const nvox = bw.length;
    const ls2bw = new Uint32Array(cl + 1);
    const sumls = new Uint32Array(cl + 1);
    for (let i = 0; i < nvox; i++) {
      const lsVal = ls[i];
      if (lsVal > 0) {
        ls2bw[lsVal] = bw[i];
        sumls[lsVal]++;
      }
    }
    return [ls2bw, sumls];
  }
  /** Build per-component keep map in O(cl) preserving exact tie-break semantics. */
  _buildKeptMap(ls2bw, sumls, cl, targetClasses, largerIndexWins) {
    const kept = new Uint32Array(cl + 1);
    let maxClass = 0;
    for (let i = 1; i <= cl; i++) {
      if (ls2bw[i] > maxClass) maxClass = ls2bw[i];
    }
    const filterAll = targetClasses === "all";
    if (maxClass <= 65535) {
      const bestSize = new Uint32Array(maxClass + 1);
      const bestComp = new Uint32Array(maxClass + 1);
      for (let i = 1; i <= cl; i++) {
        const klass = ls2bw[i];
        if (klass === 0) continue;
        if (filterAll || targetClasses && targetClasses.has && targetClasses.has(klass)) {
          const sz = sumls[i];
          if (!bestComp[klass] || (largerIndexWins ? sz >= bestSize[klass] : sz > bestSize[klass])) {
            bestSize[klass] = sz;
            bestComp[klass] = i;
          }
        } else {
          kept[i] = klass;
        }
      }
      for (let klass = 1; klass <= maxClass; klass++) {
        const c = bestComp[klass];
        if (c > 0) kept[c] = klass;
      }
    } else {
      const bestByClass = /* @__PURE__ */ new Map();
      for (let i = 1; i <= cl; i++) {
        const klass = ls2bw[i];
        if (klass === 0) continue;
        if (filterAll || targetClasses && targetClasses.has && targetClasses.has(klass)) {
          const sz = sumls[i];
          const prev = bestByClass.get(klass);
          if (!prev || (largerIndexWins ? sz >= prev.sz : sz > prev.sz)) {
            bestByClass.set(klass, { c: i, sz });
          }
        } else {
          kept[i] = klass;
        }
      }
      for (const [klass, { c }] of bestByClass) {
        kept[c] = klass;
      }
    }
    return kept;
  }
  // retain only the largest cluster for each region
  // dim + relabelSuppressed are optional: when relabelSuppressed is true, blobs
  // that lose the per-class "largest" contest are repainted with their
  // surrounding surviving label instead of background (requires dim).
  largest_original_cluster_labels(bw, cl, ls, dim = null, relabelSuppressed = false, familyOf = null, inPlace = false) {
    const [ls2bw, sumls] = this._collectComponentStats(bw, cl, ls);
    const kept = this._buildKeptMap(ls2bw, sumls, cl, "all", true);
    return this.finalize_volume(ls, dim, kept, cl, relabelSuppressed, bw, familyOf, inPlace);
  }
  // Filter clusters based on target classes rules
  // targetClasses: 'all', or Set of class IDs.
  // If 'all' or class in targetClasses: keep only largest component of that class.
  // Else: keep all components of that class.
  filter_clusters(bw, cl, ls, targetClasses, dim = null, relabelSuppressed = false, familyOf = null, inPlace = false) {
    const [ls2bw, sumls] = this._collectComponentStats(bw, cl, ls);
    const kept = this._buildKeptMap(ls2bw, sumls, cl, targetClasses, false);
    return this.finalize_volume(ls, dim, kept, cl, relabelSuppressed, bw, familyOf, inPlace);
  }
  /**
   * Filter clusters based on a size ratio threshold relative to the largest cluster for that class.
   * Logic:
   * 1. Find max size for each class.
   * 2. Keep component if size >= max_size_of_class * minRatio.
   * @param {Uint32Array} bw - Original voxel values (unused directly for filtering decision logic but used for return)
   * @param {number} cl - Number of regions
   * @param {Uint32Array} ls - Label map
   * @param {number} minRatio - Threshold (e.g. 0.3)
   */
  filter_clusters_by_ratio(bw, cl, ls, minRatio, dim = null, relabelSuppressed = false, familyOf = null) {
    const nvox = bw.length;
    const ls2bw = new Uint32Array(cl + 1).fill(0);
    const sumls = new Uint32Array(cl + 1).fill(0);
    for (let i = 0; i < nvox; i++) {
      const comp = ls[i];
      if (comp > 0) {
        if (ls2bw[comp] === 0) ls2bw[comp] = bw[i];
        sumls[comp]++;
      }
    }
    const classMaxSize = /* @__PURE__ */ new Map();
    for (let i = 1; i <= cl; i++) {
      const classID = ls2bw[i];
      const size = sumls[i];
      if (!classMaxSize.has(classID) || size > classMaxSize.get(classID)) {
        classMaxSize.set(classID, size);
      }
    }
    const keepLabel = new Uint8Array(cl + 1).fill(0);
    for (let i = 1; i <= cl; i++) {
      const classID = ls2bw[i];
      const size = sumls[i];
      const maxSize = classMaxSize.get(classID) || 0;
      if (size >= maxSize * minRatio) {
        keepLabel[i] = 1;
      }
    }
    const kept = new Uint32Array(cl + 1).fill(0);
    for (let i = 1; i <= cl; i++) {
      if (keepLabel[i]) kept[i] = ls2bw[i];
    }
    return this.finalize_volume(ls, dim, kept, cl, relabelSuppressed, bw, familyOf);
  }
  // given a 3D image, return a clustered label map
  /**
   * Merge 6-connected per-class guard components (`ls`, `1..cl`) into binary
   * foreground connected components via single-pass union-find, returning the
   * winning largest binary component root (larger root wins ties) along with
   * per-component sizes and optional class IDs.
   */
  _binaryComponentsFromLabels(bw, cl, ls, dim, collectClass = false) {
    const nx = dim[0] | 0;
    const ny = dim[1] | 0;
    const nz = dim[2] | 0;
    const plane = nx * ny;
    const meta = labelMetaMap.get(ls);
    const hasMeta = meta && meta.cl === cl && ls.length === plane * nz && (!collectClass || meta.bw === bw);
    if (hasMeta && meta.conn === 6 && meta.distinctFgClasses <= 1) {
      const parent2 = new Uint32Array(cl + 1);
      let bestRoot2 = 0;
      let bestBinSize2 = 0;
      for (let r = 1; r <= cl; r++) {
        parent2[r] = r;
        const sz = meta.sumls[r];
        if (sz > 0 && sz >= bestBinSize2) {
          bestBinSize2 = sz;
          bestRoot2 = r;
        }
      }
      return { parent: parent2, compSize: meta.sumls, compClass: collectClass ? meta.ls2bw : null, bestRoot: bestRoot2 };
    }
    const compSize = hasMeta ? meta.sumls : new Uint32Array(cl + 1);
    const compClass = hasMeta ? collectClass ? meta.ls2bw : null : collectClass ? new Uint32Array(cl + 1) : null;
    const parent = new Uint32Array(cl + 1);
    for (let c = 1; c <= cl; c++) parent[c] = c;
    if (hasMeta && meta.conn === 6 && meta.runs && meta.bw === bw) {
      const unite = (a, b) => {
        while (parent[a] !== a) {
          parent[a] = parent[parent[a]];
          a = parent[a];
        }
        while (parent[b] !== b) {
          parent[b] = parent[parent[b]];
          b = parent[b];
        }
        if (a !== b) {
          if (a < b) parent[b] = a;
          else parent[a] = b;
        }
      };
      const runs = meta.runs;
      const runLen = meta.runLen;
      for (let rk = 0; rk < runLen; rk += 2) {
        const s = runs[rk];
        const e = runs[rk + 1];
        const sl = s / plane | 0;
        const rem = s - sl * plane;
        const r = rem / nx | 0;
        let c0 = rem - r * nx;
        for (let i = s; i < e; i++, c0++) {
          const val = bw[i];
          let myComp = 0;
          if (sl > 0) {
            const vZ = bw[i - plane];
            if (vZ !== 0 && vZ !== val) {
              myComp = ls[i];
              unite(myComp, ls[i - plane]);
            }
          }
          if (r > 0) {
            const vY = bw[i - nx];
            if (vY !== 0 && vY !== val) {
              if (!myComp) myComp = ls[i];
              unite(myComp, ls[i - nx]);
            }
          }
          if (c0 > 0) {
            const vX = bw[i - 1];
            if (vX !== 0 && vX !== val) {
              if (!myComp) myComp = ls[i];
              unite(myComp, ls[i - 1]);
            }
          }
        }
      }
    } else {
      const slStart = hasMeta ? meta.minSl : 0;
      const slEnd = hasMeta ? meta.maxSl : nz - 1;
      let i = slStart * plane;
      for (let sl = slStart; sl <= slEnd; sl++) {
        for (let r = 0; r < ny; r++) {
          for (let c0 = 0; c0 < nx; c0++, i++) {
            const c = ls[i];
            if (c === 0) continue;
            if (!hasMeta) {
              compSize[c]++;
              if (compClass && compClass[c] === 0) compClass[c] = bw[i];
            }
            let rc = c;
            while (parent[rc] !== rc) {
              parent[rc] = parent[parent[rc]];
              rc = parent[rc];
            }
            if (sl > 0) {
              const nb = ls[i - plane];
              if (nb !== 0 && nb !== c) {
                let rn = nb;
                while (parent[rn] !== rn) {
                  parent[rn] = parent[parent[rn]];
                  rn = parent[rn];
                }
                if (rc !== rn) {
                  if (rc < rn) parent[rn] = rc;
                  else {
                    parent[rc] = rn;
                    rc = rn;
                  }
                }
              }
            }
            if (r > 0) {
              const nb = ls[i - nx];
              if (nb !== 0 && nb !== c) {
                let rn = nb;
                while (parent[rn] !== rn) {
                  parent[rn] = parent[parent[rn]];
                  rn = parent[rn];
                }
                if (rc !== rn) {
                  if (rc < rn) parent[rn] = rc;
                  else {
                    parent[rc] = rn;
                    rc = rn;
                  }
                }
              }
            }
            if (c0 > 0) {
              const nb = ls[i - 1];
              if (nb !== 0 && nb !== c) {
                let rn = nb;
                while (parent[rn] !== rn) {
                  parent[rn] = parent[parent[rn]];
                  rn = parent[rn];
                }
                if (rc !== rn) {
                  if (rc < rn) parent[rn] = rc;
                  else parent[rc] = rn;
                }
              }
            }
          }
        }
      }
    }
    const binSize = new Uint32Array(cl + 1);
    for (let c = 1; c <= cl; c++) {
      let r = c;
      while (parent[r] !== r) r = parent[r];
      parent[c] = r;
      binSize[r] += compSize[c];
    }
    let bestRoot = 0;
    let bestBinSize = 0;
    for (let r = 1; r <= cl; r++) {
      const sz = binSize[r];
      if (sz > 0 && sz >= bestBinSize) {
        bestBinSize = sz;
        bestRoot = r;
      }
    }
    return { parent, compSize, compClass, bestRoot };
  }
  /** Zero out voxels outside the largest 6-connected binary foreground component using guard labels. */
  applyLargestBinaryMaskInPlace(bw, cl, ls, dim) {
    const nvox = bw.length;
    if (cl === 0) {
      bw.fill(0);
      return bw;
    }
    const meta = labelMetaMap.get(ls);
    const hasMeta = meta && meta.cl === cl && ls.length === nvox;
    if (hasMeta && meta.conn === 6 && meta.distinctFgClasses <= 1) {
      let bestRoot2 = 0;
      let bestBinSize = 0;
      for (let r = 1; r <= cl; r++) {
        const sz = meta.sumls[r];
        if (sz > 0 && sz >= bestBinSize) {
          bestBinSize = sz;
          bestRoot2 = r;
        }
      }
      if (meta.runs && meta.bw === bw) {
        if (cl > 1) {
          const runs = meta.runs;
          const runLen = meta.runLen;
          for (let rk = 0; rk < runLen; rk += 2) {
            const s = runs[rk];
            const e = runs[rk + 1];
            for (let i = s; i < e; i++) {
              if (ls[i] !== bestRoot2) bw[i] = 0;
            }
          }
        }
        return bw;
      }
      if (meta.fgStart > 0) bw.fill(0, 0, meta.fgStart);
      if (meta.fgEnd >= meta.fgStart) {
        for (let i = meta.fgStart; i <= meta.fgEnd; i++) {
          if (ls[i] !== bestRoot2) bw[i] = 0;
        }
        if (meta.fgEnd + 1 < nvox) bw.fill(0, meta.fgEnd + 1);
      } else {
        bw.fill(0);
      }
      return bw;
    }
    const { parent, bestRoot } = this._binaryComponentsFromLabels(bw, cl, ls, dim, false);
    if (hasMeta && meta.runs && meta.bw === bw) {
      const runs = meta.runs;
      const runLen = meta.runLen;
      for (let rk = 0; rk < runLen; rk += 2) {
        const s = runs[rk];
        const e = runs[rk + 1];
        for (let i = s; i < e; i++) {
          if (parent[ls[i]] !== bestRoot) bw[i] = 0;
        }
      }
      return bw;
    }
    if (hasMeta && meta.fgEnd >= meta.fgStart) {
      if (meta.fgStart > 0) bw.fill(0, 0, meta.fgStart);
      for (let i = meta.fgStart; i <= meta.fgEnd; i++) {
        const c = ls[i];
        if (c === 0 || parent[c] !== bestRoot) bw[i] = 0;
      }
      if (meta.fgEnd + 1 < nvox) bw.fill(0, meta.fgEnd + 1);
    } else {
      for (let i = 0; i < nvox; i++) {
        const c = ls[i];
        if (c === 0 || parent[c] !== bestRoot) bw[i] = 0;
      }
    }
    return bw;
  }
  /**
   * Single-pass hierarchical filter reusing conn=6 per-class guard labels:
   * 1. Selects the largest 6-connected binary foreground component (larger root wins ties),
   *    dropping all disconnected exterior or resection-cavity islands to 0.
   * 2. Within that main binary component, retains only the largest connected component
   *    for classes in `targetClasses` ('all' or a Set of class IDs), breaking per-class
   *    size ties via `largerIndexWins` (true matches largest_original_cluster_labels;
   *    false matches filter_clusters).
   * 3. Optionally relabels suppressed components inside the main binary component via
   *    neighbor_winners (components outside bestRoot touch no kept 6-neighbors and stay 0).
   */
  filterHierarchicalFromLabels(bw, cl, ls, dim, targetClasses = "all", largerIndexWins = true, relabelSuppressed = false, familyOf = null, inPlace = false) {
    if (cl === 0) {
      const out = bw instanceof Uint8Array ? inPlace ? bw : new Uint8Array(bw.length) : new Uint32Array(bw.length);
      return [0, out];
    }
    const { parent, compSize, compClass, bestRoot } = this._binaryComponentsFromLabels(bw, cl, ls, dim, true);
    const activeCompClass = new Uint32Array(cl + 1);
    for (let c = 1; c <= cl; c++) {
      if (parent[c] === bestRoot) activeCompClass[c] = compClass[c];
    }
    const kept = this._buildKeptMap(activeCompClass, compSize, cl, targetClasses, largerIndexWins);
    return this.finalize_volume(ls, dim, kept, cl, relabelSuppressed, bw, familyOf, inPlace);
  }
  filter18ClassFromLabels(bw, cl, ls, dim, targetClasses, relabelSuppressed = false, familyOf = null, inPlace = false) {
    return this.filterHierarchicalFromLabels(bw, cl, ls, dim, targetClasses, false, relabelSuppressed, familyOf, inPlace);
  }
  // for an explanation and optimized C code see
  // https://github.com/seung-lab/connected-components-3d
  bwlabel(img, dim, conn = 26, binarize = false, onlyLargestClusterPerClass = false, scratch = null) {
    const start = Date.now();
    const nvox = dim[0] * dim[1] * dim[2];
    if (![6, 18, 26].includes(conn)) {
      console.log("bwlabel: conn must be 6, 18 or 26.");
      return [0, new Uint32Array(nvox)];
    }
    if (dim[0] < 2 || dim[1] < 2 || dim[2] < 1) {
      console.log("bwlabel: img must be 2 or 3-dimensional");
      return [0, new Uint32Array(nvox)];
    }
    let bw;
    if (binarize) {
      bw = new Uint8Array(nvox);
      for (let i = 0; i < nvox; i++) {
        if (img[i] !== 0) {
          bw[i] = 1;
        }
      }
    } else if (img instanceof Uint8Array || img instanceof Uint8ClampedArray || img instanceof Uint16Array || img instanceof Uint32Array || img instanceof Int8Array || img instanceof Int16Array || img instanceof Int32Array) {
      if (img.length === nvox) {
        bw = img;
      } else {
        bw = new Uint32Array(nvox);
        bw.set(img.subarray(0, nvox));
      }
    } else {
      bw = new Uint32Array(nvox);
      bw.set(img);
    }
    this._lastInitialRange = null;
    this._lastMeta = null;
    let [ttn, tt, il] = this.do_initial_labelling(bw, dim, conn, scratch);
    if (tt === void 0) {
      tt = new Uint32Array(0);
    }
    const [cl, ls] = this.translate_labels(il, dim, tt, ttn, bw, this._lastInitialRange);
    if (this._lastMeta) {
      labelMetaMap.set(ls, this._lastMeta);
    }
    console.log(conn + " neighbor clustering into " + cl + " regions in " + (Date.now() - start) + "ms");
    if (onlyLargestClusterPerClass) {
      const [nbw, bwMx] = this.largest_original_cluster_labels(bw, cl, ls);
      return [nbw, bwMx];
    }
    return [cl, ls];
  }
  // bwlabel()
  /**
   * Filter clusters based on rank (keep top K largest per class).
   * @param {Uint32Array} bw - Original voxel values (unused directly for filtering decision logic but used for return)
   * @param {number} cl - Number of regions
   * @param {Uint32Array} ls - Label map
   * @param {number} maxRank - Max number of components to keep per class (e.g. 2)
   */
  filter_clusters_by_rank(bw, cl, ls, maxRank, minRatio = 0, dim = null, relabelSuppressed = false, nearBrainMaxGap = null, diag = false, familyOf = null) {
    const nvox = bw.length;
    const ls2bw = new Uint32Array(cl + 1).fill(0);
    const sumls = new Uint32Array(cl + 1).fill(0);
    const useDist = nearBrainMaxGap != null && Array.isArray(dim) && dim.length === 3;
    const D0 = useDist ? dim[0] : 0;
    const D1 = useDist ? dim[1] : 0;
    const minA = useDist ? new Int32Array(cl + 1).fill(2147483647) : null;
    const maxA = useDist ? new Int32Array(cl + 1).fill(-1) : null;
    const minB = useDist ? new Int32Array(cl + 1).fill(2147483647) : null;
    const maxB = useDist ? new Int32Array(cl + 1).fill(-1) : null;
    const minC = useDist ? new Int32Array(cl + 1).fill(2147483647) : null;
    const maxC = useDist ? new Int32Array(cl + 1).fill(-1) : null;
    for (let i = 0; i < nvox; i++) {
      const comp = ls[i];
      if (comp > 0) {
        if (ls2bw[comp] === 0) ls2bw[comp] = bw[i];
        sumls[comp]++;
        if (useDist) {
          const a = i % D0;
          const t = i / D0 | 0;
          const b = t % D1;
          const c = t / D1 | 0;
          if (a < minA[comp]) minA[comp] = a;
          if (a > maxA[comp]) maxA[comp] = a;
          if (b < minB[comp]) minB[comp] = b;
          if (b > maxB[comp]) maxB[comp] = b;
          if (c < minC[comp]) minC[comp] = c;
          if (c > maxC[comp]) maxC[comp] = c;
        }
      }
    }
    let surfDist = null;
    let brainComp = 0;
    if (useDist) {
      let brainSize = -1;
      for (let i = 1; i <= cl; i++) {
        if (sumls[i] > brainSize) {
          brainSize = sumls[i];
          brainComp = i;
        }
      }
      const MAX_SCAN = Math.max(2, Math.ceil(nearBrainMaxGap) + 4);
      const D0D1 = D0 * D1;
      const dist = new Int16Array(nvox).fill(-1);
      let frontier = [];
      for (let i = 0; i < nvox; i++) {
        if (ls[i] === brainComp) {
          dist[i] = 0;
          frontier.push(i);
        }
      }
      for (let d = 1; d <= MAX_SCAN && frontier.length; d++) {
        const next = [];
        for (let f = 0; f < frontier.length; f++) {
          const v = frontier[f];
          const a = v % D0;
          const t = v / D0 | 0;
          const b = t % D1;
          if (a > 0 && dist[v - 1] === -1) {
            dist[v - 1] = d;
            next.push(v - 1);
          }
          if (a < D0 - 1 && dist[v + 1] === -1) {
            dist[v + 1] = d;
            next.push(v + 1);
          }
          if (b > 0 && dist[v - D0] === -1) {
            dist[v - D0] = d;
            next.push(v - D0);
          }
          if (b < D1 - 1 && dist[v + D0] === -1) {
            dist[v + D0] = d;
            next.push(v + D0);
          }
          if (v - D0D1 >= 0 && dist[v - D0D1] === -1) {
            dist[v - D0D1] = d;
            next.push(v - D0D1);
          }
          if (v + D0D1 < nvox && dist[v + D0D1] === -1) {
            dist[v + D0D1] = d;
            next.push(v + D0D1);
          }
        }
        frontier = next;
      }
      const FAR = MAX_SCAN + 1;
      surfDist = new Float64Array(cl + 1).fill(FAR);
      for (let i = 0; i < nvox; i++) {
        const comp = ls[i];
        if (comp > 0 && comp !== brainComp) {
          const dd = dist[i] >= 0 ? dist[i] : FAR;
          if (dd < surfDist[comp]) surfDist[comp] = dd;
        }
      }
      if (diag) {
        console.log(`[rank-filter] brain comp=${brainComp} size=${brainSize} bbox A[${minA[brainComp]},${maxA[brainComp]}] B[${minB[brainComp]},${maxB[brainComp]}] C[${minC[brainComp]},${maxC[brainComp]}] | maxGap=${nearBrainMaxGap} scan=${MAX_SCAN}`);
      }
    }
    const classComponents = /* @__PURE__ */ new Map();
    for (let i = 1; i <= cl; i++) {
      const classID = ls2bw[i];
      const size = sumls[i];
      if (!classComponents.has(classID)) {
        classComponents.set(classID, []);
      }
      classComponents.get(classID).push({ i, size });
    }
    const keepLabel = new Uint8Array(cl + 1).fill(0);
    for (const [classID, components] of classComponents.entries()) {
      components.sort((a, b) => b.size - a.size);
      const largest = components.length ? components[0].size : 0;
      const sizeFloor = minRatio > 0 ? largest * minRatio : 0;
      const count = Math.min(components.length, maxRank);
      for (let k = 0; k < count; k++) {
        const comp = components[k];
        if (comp.size < sizeFloor) {
          if (diag && k > 0) console.log(`[rank-filter] class ${classID} #${k}: size=${comp.size} DROP (below ${(minRatio * 100).toFixed(0)}% floor)`);
          break;
        }
        if (k > 0 && useDist) {
          const g = surfDist[comp.i];
          const pass = g <= nearBrainMaxGap;
          if (diag) console.log(`[rank-filter] class ${classID} #${k}: size=${comp.size} surfDist=${g} -> ${pass ? "KEEP" : "DROP (too far)"}`);
          if (!pass) continue;
        }
        keepLabel[comp.i] = 1;
      }
    }
    const kept = new Uint32Array(cl + 1).fill(0);
    for (let i = 1; i <= cl; i++) {
      if (keepLabel[i]) kept[i] = ls2bw[i];
    }
    return this.finalize_volume(ls, dim, kept, cl, relabelSuppressed, bw, familyOf);
  }
};

// src/webgpu/tensor-utils.js
function computeLinearQuantiles(data, lowerQuantile = 0.02, upperQuantile = 0.98) {
  const n = data.length;
  if (n === 0) return { qmin: 0, qmax: 0 };
  const hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) hist[data[i]]++;
  const cum = new Float64Array(256);
  let run2 = 0;
  for (let b = 0; b < 256; b++) {
    run2 += hist[b];
    cum[b] = run2;
  }
  const at = (q) => {
    const rank = q * (n - 1);
    const base = Math.floor(rank);
    const t = rank - base;
    let a = 0;
    while (a < 255 && cum[a] <= base) a++;
    let b = a;
    while (b < 255 && cum[b] <= base + 1) b++;
    return t < 0.5 ? a + (b - a) * t : b - (b - a) * (1 - t);
  };
  return { qmin: at(lowerQuantile), qmax: at(upperQuantile) };
}
function transpose3DCore(data, shape, perm, OutCtor) {
  const D0 = shape[0] | 0;
  const D1 = shape[1] | 0;
  const D2 = shape[2] | 0;
  const total = D0 * D1 * D2;
  const out = new OutCtor(total);
  if (perm[0] === 2 && perm[1] === 1 && perm[2] === 0 && total === data.length) {
    const planeIn = D1 * D2;
    const planeOut = D1 * D0;
    const B = 16;
    for (let y = 0; y < D1; y++) {
      const inY = y * D2;
      const outY = y * D0;
      for (let i0b = 0; i0b < D0; i0b += B) {
        const i0End = Math.min(i0b + B, D0);
        for (let i2b = 0; i2b < D2; i2b += B) {
          const i2End = Math.min(i2b + B, D2);
          for (let i0 = i0b; i0 < i0End; i0++) {
            let inIdx = i0 * planeIn + inY + i2b;
            let outIdx = i2b * planeOut + outY + i0;
            for (let i2 = i2b; i2 < i2End; i2++, inIdx++, outIdx += planeOut) {
              out[outIdx] = data[inIdx];
            }
          }
        }
      }
    }
    return out;
  }
  const dims = [D0, D1, D2];
  const outDims = [dims[perm[0]], dims[perm[1]], dims[perm[2]]];
  const inStrides = [D1 * D2, D2, 1];
  const s0 = inStrides[perm[0]];
  const s1 = inStrides[perm[1]];
  const s2 = inStrides[perm[2]];
  let dst = 0;
  for (let a = 0; a < outDims[0]; a++) {
    const o0 = a * s0;
    for (let b = 0; b < outDims[1]; b++) {
      const o1 = o0 + b * s1;
      for (let c = 0; c < outDims[2]; c++, dst++) {
        out[dst] = data[o1 + c * s2];
      }
    }
  }
  return out;
}
function transposeVolume3D(data, shape = [256, 256, 256], perm = [2, 1, 0]) {
  return transpose3DCore(data, shape, perm, Float32Array);
}

// src/webgpu/weights.js
function f16ToF32(h) {
  const s = h & 32768 ? -1 : 1;
  const e = (h & 31744) >> 10;
  const f = h & 1023;
  if (e === 0) return s * Math.pow(2, -14) * (f / 1024);
  if (e === 31) return f ? NaN : s * Infinity;
  return s * Math.pow(2, e - 15) * (1 + f / 1024);
}
function parseSafetensors(buffer) {
  const dv = new DataView(buffer);
  const headerLen = Number(dv.getBigUint64(0, true));
  const header = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 8, headerLen)));
  const base = 8 + headerLen;
  const out = {};
  for (const [name, info] of Object.entries(header)) {
    if (name === "__metadata__") {
      out.__metadata__ = info;
      continue;
    }
    const [start, end] = info.data_offsets;
    const n = info.shape.reduce((a, b) => a * b, 1);
    let data;
    if (info.dtype === "F32") {
      data = new Float32Array(buffer.slice(base + start, base + end));
    } else if (info.dtype === "F16") {
      const u16 = new Uint16Array(buffer.slice(base + start, base + end));
      data = new Float32Array(n);
      for (let i = 0; i < n; i++) data[i] = f16ToF32(u16[i]);
    } else if (info.dtype === "BF16") {
      const u16 = new Uint16Array(buffer.slice(base + start, base + end));
      data = new Float32Array(n);
      const u32 = new Uint32Array(1);
      const f32 = new Float32Array(u32.buffer);
      for (let i = 0; i < n; i++) {
        u32[0] = u16[i] << 16;
        data[i] = f32[0];
      }
    } else {
      throw new Error(`safetensors: unsupported dtype ${info.dtype} for tensor '${name}'`);
    }
    if (data.length !== n) {
      throw new Error(`safetensors: tensor '${name}' has ${data.length} values, shape says ${n}`);
    }
    out[name] = { dtype: info.dtype, shape: info.shape, data };
  }
  return out;
}
var MODEL_BIN_SPECS = {
  mindgrab: {
    chan: 15,
    nhidden: 25,
    nclass: 2,
    hasAffine: false,
    weightFloats: 146237
  },
  "mindmap-fast": {
    chan: 16,
    nhidden: 13,
    nclass: 18,
    hasAffine: true,
    weightFloats: 87218
  },
  mindmap: {
    chan: 24,
    nhidden: 13,
    nclass: 18,
    hasAffine: true,
    weightFloats: 195522
  },
  mindsnap: {
    chan: 24,
    nhidden: 13,
    nclass: 104,
    hasAffine: true,
    weightFloats: 197672
  },
  rodent: {
    chan: 16,
    nhidden: 13,
    nclass: 2,
    hasAffine: true,
    weightFloats: 86946
  }
};
function normalizeBinModelName(name) {
  if (name === "16chan18cls" || name === "model16chan18cls") return "mindmap-fast";
  return name;
}
function parseModelBin(buffer, canonicalModelName) {
  const key = normalizeBinModelName(canonicalModelName);
  const spec = Object.hasOwn(MODEL_BIN_SPECS, key) ? MODEL_BIN_SPECS[key] : null;
  if (!spec) {
    throw new Error(
      `parseModelBin: unknown model '${canonicalModelName}'; expected one of ${Object.keys(MODEL_BIN_SPECS).join(", ")}`
    );
  }
  let rawBytes;
  if (buffer instanceof ArrayBuffer) {
    rawBytes = new Uint8Array(buffer);
  } else if (ArrayBuffer.isView(buffer)) {
    rawBytes = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else {
    throw new Error("parseModelBin: expected an ArrayBuffer or ArrayBufferView");
  }
  const expectedBytes = spec.weightFloats * 4;
  if (rawBytes.byteLength !== expectedBytes) {
    throw new Error(
      `parseModelBin(${key}): expected ${expectedBytes} bytes (${spec.weightFloats} floats), got ${rawBytes.byteLength}`
    );
  }
  const f32 = (rawBytes.byteOffset & 3) === 0 ? new Float32Array(rawBytes.buffer, rawBytes.byteOffset, spec.weightFloats) : new Float32Array(rawBytes.slice().buffer);
  const out = {};
  let off = 0;
  for (let l = 0; l < spec.nhidden; l++) {
    const inC = l === 0 ? 1 : spec.chan;
    const outC = spec.chan;
    const convLen = 27 * inC * outC;
    const convData = new Float32Array(convLen);
    for (let oc = 0; oc < outC; oc++) {
      for (let ic = 0; ic < inC; ic++) {
        const dstBase = (oc * inC + ic) * 27;
        for (let t = 0; t < 27; t++) {
          convData[dstBase + t] = f32[off + (t * inC + ic) * outC + oc];
        }
      }
    }
    off += convLen;
    out[`m.model.${l * 3}.weight`] = {
      dtype: "F32",
      shape: [outC, inC, 3, 3, 3],
      data: convData
    };
    if (spec.hasAffine) {
      const scaleData = new Float32Array(outC);
      for (let ic = 0; ic < outC; ic++) {
        for (let oc = 0; oc < outC; oc++) {
          const val = f32[off + ic * outC + oc];
          if (ic === oc) {
            scaleData[oc] = val;
          } else if (val !== 0) {
            throw new Error(
              `parseModelBin(${key}): non-diagonal affine weight at layer ${l} [${ic},${oc}] = ${val}`
            );
          }
        }
      }
      off += outC * outC;
      const biasData = new Float32Array(outC);
      for (let oc = 0; oc < outC; oc++) {
        biasData[oc] = f32[off + oc];
      }
      off += outC;
      out[`m.model.${l * 3 + 1}.weight`] = {
        dtype: "F32",
        shape: [outC],
        data: scaleData
      };
      out[`m.model.${l * 3 + 1}.bias`] = {
        dtype: "F32",
        shape: [outC],
        data: biasData
      };
    }
  }
  const clsIdx = spec.nhidden * 3;
  const clsLen = spec.chan * spec.nclass;
  const clsW = new Float32Array(clsLen);
  for (let k = 0; k < spec.nclass; k++) {
    for (let c = 0; c < spec.chan; c++) {
      clsW[k * spec.chan + c] = f32[off + c * spec.nclass + k];
    }
  }
  off += clsLen;
  const clsBias = new Float32Array(spec.nclass);
  for (let k = 0; k < spec.nclass; k++) {
    clsBias[k] = f32[off + k];
  }
  off += spec.nclass;
  if (off !== spec.weightFloats) {
    throw new Error(`parseModelBin(${key}): parsed ${off} floats, expected ${spec.weightFloats}`);
  }
  out[`m.model.${clsIdx}.weight`] = {
    dtype: "F32",
    shape: [spec.nclass, spec.chan, 1, 1, 1],
    data: clsW
  };
  out[`m.model.${clsIdx}.bias`] = {
    dtype: "F32",
    shape: [spec.nclass],
    data: clsBias
  };
  return out;
}
function describeSafetensors(t) {
  const convs = [];
  const affines = [];
  const scalars = [];
  for (const [name, v] of Object.entries(t)) {
    if (name === "__metadata__") continue;
    const m = name.match(/^m\.model\.(\d+)\.(weight|bias)$/);
    if (!m) continue;
    const idx = Number(m[1]);
    const isW = m[2] === "weight";
    if (v.shape.length === 5) {
      const [outC, inC, kd, kh, kw] = v.shape;
      const is1x1 = kd === 1 && kh === 1 && kw === 1;
      const entry = { idx, outC, inC, kd, kh, kw, is1x1, w: v.data, bias: null };
      const slot = convs.find((c) => c.idx === idx);
      if (slot) Object.assign(slot, entry);
      else convs.push(entry);
    } else if (v.shape.length === 1) {
      scalars.push({ idx, isW, data: v.data, len: v.shape[0] });
    }
  }
  convs.sort((a, b) => a.idx - b.idx);
  for (const s of scalars) {
    const conv = convs.find((c) => c.idx === s.idx);
    if (conv && !s.isW) {
      conv.bias = s.data;
      continue;
    }
    if (conv && s.isW) continue;
    let aff = affines.find((a) => a.idx === s.idx);
    if (!aff) {
      aff = { idx: s.idx, scale: null, bias: null };
      affines.push(aff);
    }
    if (s.isW) aff.scale = s.data;
    else aff.bias = s.data;
  }
  affines.sort((a, b) => a.idx - b.idx);
  let classifier = null;
  if (convs.length && convs[convs.length - 1].is1x1) classifier = convs.pop();
  return { convs, affines, classifier };
}
function deriveDescriptor(desc, override = {}) {
  const { convs, affines, classifier } = desc;
  const chan = convs[0].outC;
  const cs = Math.ceil(chan / 4) * 4;
  const hasBias = convs.some((c) => c.bias);
  const d = {
    chan,
    cs,
    planes: cs / 4,
    nclass: classifier ? classifier.outC : 0,
    nhidden: convs.length - 1,
    norm: affines.length ? "gn" : hasBias ? "none" : "gn",
    affine: affines.length > 0,
    convBias: hasBias,
    classifierBias: !!(classifier && classifier.bias),
    centeredVariance: false,
    eps: 1e-5,
    ...override
  };
  if (d.nclass > 256) {
    throw new Error(`classifier has ${d.nclass} classes; the RGBA8 label texture holds at most 256`);
  }
  if (!d.activation) throw new Error("descriptor needs an explicit `activation`");
  if (!d.dilations) throw new Error("descriptor needs an explicit `dilations` array");
  if (d.dilations.length !== convs.length) {
    throw new Error(`descriptor has ${d.dilations.length} dilations for ${convs.length} convs`);
  }
  return d;
}

// src/webgpu/descriptors.js
var DEEP13 = [1, 3, 5, 7, 13, 19, 31, 19, 13, 7, 5, 3, 1];
var MINDGRAB25 = [
  16,
  8,
  4,
  2,
  1,
  16,
  8,
  4,
  2,
  1,
  16,
  8,
  4,
  2,
  1,
  16,
  8,
  4,
  2,
  1,
  16,
  8,
  4,
  2,
  1
];
var DESCRIPTORS = {
  // --- brainchop-core canonical model names -------------------------------
  "mindmap-fast": {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  "16chan18cls": {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  mindmap: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  mindsnap: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  rodent: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  // --- family C: gn + affine, gelu ---------------------------------------
  model16chan18cls: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  // EXPERIMENTAL A/B candidate for model16chan18cls's slot: same 18-class
  // family and topology (DEEP13, family C), 24 channels instead of 16,
  // retrained weights only (catalyst run ce_gdice_24ch_prio). Channels cost
  // is the only thing that changes here (see model24chan104cls_synth's notes
  // above) -- P=6 planes x 2 sets x 128 MiB = 1.5 GiB, same as the other 24ch
  // family-C models, so fullVolume:true is consistent with them.
  model24chan18cls_gdice_prio: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  model6chan3cls: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  model24chan104cls_synth: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    // THE 104 CLASSES COST ALMOST NOTHING HERE, and it is worth being explicit
    // because the model's name invites the opposite assumption. The classify
    // shader loops k over NCLASS keeping a running (bestv, best) pair and writes
    // ONE BYTE per voxel into the RGBA8 label texture -- a [256^3, 104] logits
    // tensor is never instantiated, exactly as in the WebGPU runner. 104 <= 256
    // so it fits the label byte. The only cost is compute: 104*24 = 2496 MACs
    // per voxel, which scales brainchopC's 18-class classify pass to ~0.36 s.
    //
    // What actually costs is the 24 CHANNELS: P=6 planes x 2 sets x 128 MiB =
    // 1.5 GiB of activations, against 1.0 GiB for the 16-channel models. That is
    // 1.5x, not a different order, so it is measured rather than assumed --
    // probeWebgl2 allocates the real working set and checks isContextLost
    // so an underspecified WebGL2 device refuses cleanly.
    //
    // No VOX=2 at P=6: it would need 12 draw buffers and no browser offers more
    // than 8, so this model permanently forfeits that 1.41x.
    fullVolume: true
  },
  // Refit-synth changes only weights; the native WebGL2 graph is identical.
  model24chan104cls_infant_refit_synth: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  // Folded RepWNConv3d + d=31 DeepSup (WiSE-RepBN v3): identical runtime graph.
  model24chan104cls_v3_repbn: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  // MindSnap-50 (id: 4): 24-channel 50-class bilateral Desikan-Killiany + full-head skull-stripping.
  model24chan50cls: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    fullVolume: true
  },
  model32chan18cls: {
    dilations: DEEP13,
    activation: "gelu_tanh",
    // 32 ch -> P=8 -> 2.0 GiB at 256^3, and P=8 exactly consumes the 8 draw
    // buffers an M1 reports (SwiftShader and some Mesa stacks report 6, where
    // this model cannot run at all). Left cropped for now purely to prove the
    // 24-channel case first -- once that holds on real hardware this is the same
    // one-word change, and the probe already answers the memory question.
    fullVolume: false
  },
  // --- family B: gn, no affine, gelu -------------------------------------
  mindgrab: {
    dilations: MINDGRAB25,
    activation: "gelu_tanh",
    fullVolume: true
  },
  // --- family A: plain MeshNet, conv+bias -> relu/elu, no norm ------------
  // Shared by three menu entries each (ids 1/10/12 and 11/13) that differ only
  // in post-processing, so one descriptor serves all of them.
  model5_gw_ae: {
    dilations: [1, 2, 4, 8, 16, 8, 4, 2, 1],
    activation: "relu",
    fullVolume: true
  },
  model11_gw_ae: {
    dilations: [1, 2, 4, 8, 4, 2, 2, 1],
    activation: "relu",
    // No safetensors export exists for this one, so it stays on the tfjs path
    // until one is generated. Listed so the omission is visible rather than
    // looking like an oversight.
    noSafetensors: true,
    fullVolume: true
  },
  model30chan18cls: {
    dilations: [1, 2, 4, 8, 16, 8, 4, 2, 1],
    activation: "elu",
    fullVolume: true
  },
  model30chan50cls: {
    dilations: [1, 2, 4, 8, 16, 8, 4, 2, 1],
    activation: "elu",
    fullVolume: true
  }
};
function descriptorNameFor(modelEntry) {
  if (modelEntry?.modelBinModel && Object.hasOwn(DESCRIPTORS, modelEntry.modelBinModel)) {
    return modelEntry.modelBinModel;
  }
  if (modelEntry?.model && Object.hasOwn(DESCRIPTORS, modelEntry.model)) {
    return modelEntry.model;
  }
  const m = String(modelEntry?.path || "").match(/\/models\/([^/]+)\//);
  return m ? m[1] : null;
}
function descriptorFor(modelEntry) {
  const name = descriptorNameFor(modelEntry);
  if (!name) return null;
  const d = DESCRIPTORS[name];
  if (!d || d.noSafetensors) return null;
  return { name, ...d };
}

// src/webgpu/probability.js
var DEFAULT_GROUPS = {
  grayMatter: [2, 6, 7, 8, 9, 10, 14, 15, 16, 17],
  whiteMatter: [1, 5],
  csf: [3, 4, 11, 12]
};
function finiteOption(options, name, fallback, low, high) {
  const value = Number(options[name] ?? fallback);
  if (!Number.isFinite(value) || value < low || value > high) {
    throw new Error(`${name} must be between ${low} and ${high}, got ${options[name]}`);
  }
  return value;
}
function maskFor(labels, nclass, name) {
  let mask = 0;
  for (const label of labels || []) {
    if (!Number.isInteger(label) || label < 0 || label >= nclass || label >= 32) {
      throw new Error(`Invalid ${name} tissue label ${label} for ${nclass} classes`);
    }
    mask = (mask | 1 << label) >>> 0;
  }
  return mask;
}
function tissueProbabilityConfig(options, nclass) {
  if (!Number.isInteger(nclass) || nclass < 2 || nclass > 32) {
    throw new Error(`Native WebGL2 grouped probabilities require 2..32 classes, got ${nclass}`);
  }
  const groups = { ...DEFAULT_GROUPS, ...options.probabilityGroups || {} };
  return {
    temperature: finiteOption(options, "softmaxTemperature", 1, 1e-6, 1e6),
    supportTemperature: finiteOption(options, "brainSupportTemperature", 1, 1e-6, 1e6),
    supportPower: finiteOption(options, "brainSupportPower", 1, 1e-6, 1e6),
    sigma: finiteOption(options, "partialVolumeSigma", 0, 0, 2),
    grayMask: maskFor(groups.grayMatter, nclass, "gray-matter"),
    whiteMask: maskFor(groups.whiteMatter, nclass, "white-matter"),
    csfMask: maskFor(groups.csf, nclass, "CSF")
  };
}
function blurAxis(source, target, shape, stride, kernel, weightSum) {
  const [nx, ny, nz] = shape;
  const plane = nx * ny;
  const radius = kernel.length - 1 >> 1;
  for (let z = 0; z < nz; z++) {
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const index = z * plane + y * nx + x;
        const coordinate = stride === 1 ? x : stride === nx ? y : z;
        const limit = stride === 1 ? nx : stride === nx ? ny : nz;
        let sum = 0;
        for (let offset = -radius; offset <= radius; offset++) {
          const sample = coordinate + offset;
          if (sample < 0 || sample >= limit) continue;
          sum += kernel[offset + radius] * source[index + offset * stride];
        }
        target[index] = sum / weightSum;
      }
    }
  }
}
function smoothAndGateTissuePriors(volumes, support, shape, options) {
  const [nx, ny, nz] = shape;
  const length = nx * ny * nz;
  if (!Array.isArray(volumes) || volumes.length !== 3 || volumes.some((volume) => volume.length !== length) || support.length !== length) {
    throw new Error("Native WebGL2 tissue-prior dimensions do not match");
  }
  const sigma = finiteOption(options, "partialVolumeSigma", 0, 0, 2);
  const supportPower = finiteOption(options, "brainSupportPower", 1, 1e-6, 1e6);
  let scratch = null;
  let kernel = null;
  let weightSum = 1;
  if (sigma > 0) {
    const radius = Math.max(1, Math.round(3 * sigma));
    kernel = new Float32Array(radius * 2 + 1);
    weightSum = 0;
    for (let offset = -radius; offset <= radius; offset++) {
      const weight = Math.exp(-0.5 * offset * offset / (sigma * sigma));
      kernel[offset + radius] = weight;
      weightSum += weight;
    }
    scratch = new Float32Array(length);
  }
  for (const volume of volumes) {
    let source = volume;
    if (kernel) {
      blurAxis(volume, scratch, shape, 1, kernel, weightSum);
      blurAxis(scratch, volume, shape, nx, kernel, weightSum);
      blurAxis(volume, scratch, shape, nx * ny, kernel, weightSum);
      source = scratch;
    }
    for (let i = 0; i < length; i++) {
      const gate = Math.pow(Math.max(0, Math.min(1, support[i])), supportPower);
      volume[i] = Math.max(0, Math.min(1, source[i] * gate));
    }
  }
  return volumes;
}

// src/webgpu/meshnet_fast_v4_runner.js
var DIM2 = 256;
var X4_VALID2 = 64;
var X4_HALO2 = 8;
var X4_PAD2 = X4_VALID2 + 2 * X4_HALO2;
var ROW_SCALARS_PAD = X4_PAD2 * 4;
var TOTAL_STRIPS = DIM2 * 64;
var TOTAL_HALF_ROWS = DIM2 * DIM2 * 2;
var MAX_EXT_STRIPS = 9216;
var MAX_EXT_HALF_ROWS = MAX_EXT_STRIPS * 8;
var DEEP132 = [1, 3, 5, 7, 13, 19, 31, 19, 13, 7, 5, 3, 1];
var rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
var WINDOWS_FAST_LAYER_MAX_MS = 280;
var PACED_TARGET_CHUNK_MS = 150;
var PACED_UI_YIELD_MS = 55;
var STD_SLOTS_PER_LAYER = 112;
var activeUserSetups = 0;
function packConvDilFlags(D, writeExtY8) {
  const q = Math.floor(D / 4);
  const r = D % 4;
  const off0 = r === 0 ? q : q + 1;
  const off1 = q;
  const shR = r * 8;
  const shL = r === 0 ? 0 : 32 - shR;
  return (D & 63 | (off0 & 15) << 6 | (off1 & 15) << 10 | (shR & 31) << 14 | (shL & 31) << 19 | (writeExtY8 ? 1 : 0) << 24) >>> 0;
}
function resolveSubgroupMode(device, modelEntry) {
  if (!device?.features?.has?.("subgroups") || modelEntry?.disableSubgroups) {
    return "none";
  }
  if (modelEntry?.forceSubgroupMode) {
    return modelEntry.forceSubgroupMode;
  }
  const adInfo = device.__adapterInfo || device.adapterInfo || {};
  const sgMin = adInfo.subgroupMinSize | 0;
  const sgMax = adInfo.subgroupMaxSize | 0;
  if (sgMin === 32 && sgMax === 32) return "sg32";
  if (sgMin === 64 && sgMax === 64) return "sg64";
  if (sgMin >= 32 && sgMax <= 64) return "sg32_64";
  if (sgMin >= 8 && sgMax <= 32) return "sg_small";
  return "none";
}
function subgroupModeLabel(subgroupMode) {
  switch (subgroupMode) {
    case "sg32":
      return "subgroups32";
    case "sg64":
      return "subgroups64-bf";
    case "sg32_64":
      return "subgroups32-64";
    case "sg_small":
      return "subgroups8-32";
    default:
      return "shared-8KiB";
  }
}
function yieldAfterPacedChunk() {
  if (typeof requestAnimationFrame !== "function") {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const timer = setTimeout(finish, 16);
    requestAnimationFrame(() => {
      clearTimeout(timer);
      setTimeout(finish, 0);
    });
  });
}
function createPacedQueueController(device, initialMsPerStrip, onUiTick) {
  let msPerStrip = initialMsPerStrip;
  let prevDone = null;
  let currDone = null;
  let lastGpuDoneAt = performance.now();
  let lastUiYieldAt = performance.now();
  async function submitChunk(enc, strips, li, { forceUiYield = false, emitTick = true } = {}) {
    if (prevDone) {
      await prevDone;
      prevDone = null;
    }
    const tSub = performance.now();
    device.queue.submit([enc.finish()]);
    const nextEnc = device.createCommandEncoder();
    const pDone = device.queue.onSubmittedWorkDone().then(() => {
      const tNow = performance.now();
      const gpuStart = Math.max(tSub, lastGpuDoneAt);
      const gpuDt = Math.max(0, tNow - gpuStart);
      if (tNow > lastGpuDoneAt) lastGpuDoneAt = tNow;
      if (strips >= 256 && gpuDt > 0.2) {
        msPerStrip = Math.max(5e-3, Math.min(2, 0.7 * msPerStrip + 0.3 * (gpuDt / strips)));
        device.__v4MsPerStrip = msPerStrip;
      }
    });
    prevDone = currDone;
    currDone = pDone;
    if (emitTick && onUiTick) onUiTick(li);
    const now = performance.now();
    if (forceUiYield || now - lastUiYieldAt >= PACED_UI_YIELD_MS) {
      await yieldAfterPacedChunk();
      lastUiYieldAt = performance.now();
    }
    return nextEnc;
  }
  async function waitBeforeFinalSubmit() {
    if (prevDone) {
      await prevDone;
      prevDone = null;
    }
  }
  return {
    submitChunk,
    waitBeforeFinalSubmit,
    getMsPerStrip: () => msPerStrip,
    setMsPerStrip: (v) => {
      msPerStrip = Math.max(5e-3, Math.min(2, v));
      device.__v4MsPerStrip = msPerStrip;
      lastGpuDoneAt = performance.now();
    }
  };
}
function estimateScheduleLayerWork(L, li, numConvs) {
  const nMain = L.isFull ? TOTAL_STRIPS : L.mainStrips.length;
  const nExt = L.isFull || !L.extStrips ? 0 : L.extStrips.length;
  const nNorm = li + 1 < numConvs ? L.isFull ? TOTAL_STRIPS : L.normStrips ? L.normStrips.length : 0 : 0;
  const normWork = Math.max(16, Math.round(nNorm * 0.12));
  if (li === 0) {
    return { convWork: Math.max(64, Math.round(nMain * 0.12)), normWork };
  }
  return { convWork: nMain + nExt, normWork };
}
function estimateScheduleTotalWork(schedule, numConvs) {
  let total = 0;
  for (let li = 0; li < numConvs; li++) {
    const w = estimateScheduleLayerWork(schedule.layers[li], li, numConvs);
    total += w.convWork + w.normWork;
  }
  const nCls = schedule.clsSkipped ? schedule.clsStrips.length : TOTAL_STRIPS;
  total += Math.max(64, Math.round(nCls * 0.2));
  return Math.max(1, total);
}
var _f32 = new Float32Array(1);
var _u32 = new Uint32Array(_f32.buffer);
function f32ToF16Bits(val) {
  _f32[0] = val;
  const x = _u32[0];
  const sign = x >>> 16 & 32768;
  const e8 = x >>> 23 & 255;
  let mant = x & 8388607;
  if (e8 === 255) return sign | 31744 | (mant ? 512 : 0);
  let exp = e8 - 127 + 15;
  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 8388608) >>> 1 - exp;
    return sign | mant + 4096 >>> 13;
  }
  if (exp >= 31) return sign | 31744;
  return sign | Math.min(31744, (exp << 10) + (mant + 4096 >>> 13));
}
function toF16Array(src) {
  const out = new Uint16Array(src.length);
  for (let i = 0; i < src.length; i++) out[i] = f32ToF16Bits(src[i]);
  return out;
}
var packCache = /* @__PURE__ */ new Map();
var MAX_PACK_CACHE = 12;
var netPipeCache = /* @__PURE__ */ new WeakMap();
var ioPipeCache = /* @__PURE__ */ new WeakMap();
function hashBytesU32(bytes) {
  let h1 = 2166136261;
  let h2 = 2654435769;
  const u32Len = bytes.byteLength >>> 2;
  if ((bytes.byteOffset & 3) === 0) {
    const u32 = new Uint32Array(bytes.buffer, bytes.byteOffset, u32Len);
    for (let i = 0; i < u32.length; i++) {
      const v = u32[i];
      h1 = Math.imul(h1 ^ v, 16777619) >>> 0;
      h2 = Math.imul(h2 ^ (v << 13 | v >>> 19), 2246822507) >>> 0;
    }
  } else {
    for (let i = 0; i < u32Len * 4; i += 4) {
      const v = bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16 | bytes[i + 3] << 24;
      h1 = Math.imul(h1 ^ v, 16777619) >>> 0;
      h2 = Math.imul(h2 ^ (v << 13 | v >>> 19), 2246822507) >>> 0;
    }
  }
  for (let i = u32Len * 4; i < bytes.byteLength; i++) {
    h1 = Math.imul(h1 ^ bytes[i], 16777619) >>> 0;
  }
  return `${bytes.byteLength}_${h1.toString(16)}_${h2.toString(16)}`;
}
function getPackedWeightsCached(bytes, desc, d, modelEntry) {
  const biasKey = modelEntry?.classifierBias ? JSON.stringify(modelEntry.classifierBias) : "";
  const key = `${hashBytesU32(bytes)}|${d.chan}|${d.cs}|${d.nclass}|${d.norm}|${d.eps}|${biasKey}`;
  if (packCache.has(key)) {
    const val = packCache.get(key);
    packCache.delete(key);
    packCache.set(key, val);
    return val;
  }
  const packed = packWeightsV4(desc, d);
  if (packCache.size >= MAX_PACK_CACHE) {
    const oldest = packCache.keys().next().value;
    packCache.delete(oldest);
  }
  packCache.set(key, packed);
  return packed;
}
function getDeviceMap(wm, device) {
  let m = wm.get(device);
  if (!m) {
    m = /* @__PURE__ */ new Map();
    wm.set(device, m);
  }
  return m;
}
function getCachedKernelGroup(cache, key, factoryFn) {
  let p = cache.get(key);
  if (!p) {
    p = factoryFn().catch((err) => {
      cache.delete(key);
      throw err;
    });
    cache.set(key, p);
  }
  return p;
}
function createBufAllocator(device, list) {
  let bytes = 0;
  const alloc = (size, usage) => {
    const alignedSize = Math.max(16, Math.ceil(size / 16) * 16);
    const buf = device.createBuffer({ size: alignedSize, usage });
    list.push(buf);
    bytes += alignedSize;
    return buf;
  };
  return { alloc, getBytes: () => bytes, resetBytes: () => {
    bytes = 0;
  } };
}
var v4WorkspacePool = /* @__PURE__ */ new WeakMap();
function releaseV4Workspace(device) {
  const ws = device ? v4WorkspacePool.get(device) : null;
  if (!ws) return;
  v4WorkspacePool.delete(device);
  ws.inUse = false;
  for (const b of ws.buffers) b.destroy();
  ws.buffers.length = 0;
}
function acquireV4Workspace(device, key, allocFn) {
  const existing = v4WorkspacePool.get(device);
  if (existing) {
    if (existing.key === key && !existing.inUse) {
      existing.inUse = true;
      return existing;
    }
    if (existing.inUse) {
      const fresh2 = allocFn();
      return { key, ...fresh2, inUse: true, pooled: false };
    }
    v4WorkspacePool.delete(device);
    for (const b of existing.buffers) b.destroy();
    existing.buffers.length = 0;
  }
  const fresh = allocFn();
  const entry = { key, ...fresh, inUse: true, pooled: true };
  v4WorkspacePool.set(device, entry);
  return entry;
}
function createShaderModuleFast(device, label, code) {
  return device.createShaderModule({ label, code });
}
async function createLayoutAndPipe(device, label, module, entryPoint, entriesSpec) {
  const bgl = device.createBindGroupLayout({
    entries: entriesSpec.map((spec, binding) => typeof spec === "string" ? { binding, visibility: GPUShaderStage.COMPUTE, buffer: { type: spec } } : { binding, visibility: GPUShaderStage.COMPUTE, buffer: spec })
  });
  try {
    const pipe = await device.createComputePipelineAsync({
      label,
      layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
      compute: { module, entryPoint }
    });
    return { bgl, pipe };
  } catch (err) {
    if (module?.getCompilationInfo) {
      const info = await module.getCompilationInfo().catch(() => null);
      const errs = info ? info.messages.filter((m) => m.type === "error") : [];
      if (errs.length) {
        throw new Error(
          `meshnet_fast_v4 [${label}] WGSL error: ` + errs.map((e) => `L${e.lineNum}:${e.linePos} ${e.message}`).join(" | ")
        );
      }
    }
    throw err;
  }
}
function buildPrepInWgsl(isU8, hasF16) {
  const f16Enable = hasF16 ? "enable f16;\n" : "";
  const T = hasF16 ? "f16" : "f32";
  const V4 = `vec4<${T}>`;
  if (isU8) {
    return `${f16Enable}
@group(0) @binding(0) var<storage, read> raw_u32 : array<u32>;
@group(0) @binding(1) var<storage, read_write> inp_4 : array<${V4}>;
@group(0) @binding(2) var<uniform> lut : array<vec4<f32>, 64>;

var<workgroup> sh : array<f32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let z4 = t & 7u;
  let xOff = t >> 3u;
  let zBase = z4 * 4u;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let xLoc = s * 8u + xOff;
    let w = raw_u32[((X0 + xLoc) * 256u + Y) * 64u + wid.z * 8u + z4];
    let b0 = w & 0xffu;
    let b1 = (w >> 8u) & 0xffu;
    let b2 = (w >> 16u) & 0xffu;
    let b3 = (w >> 24u) & 0xffu;
    sh[(zBase + 0u) * 33u + xLoc] = lut[b0 >> 2u][b0 & 3u];
    sh[(zBase + 1u) * 33u + xLoc] = lut[b1 >> 2u][b1 & 3u];
    sh[(zBase + 2u) * 33u + xLoc] = lut[b2 >> 2u][b2 & 3u];
    sh[(zBase + 3u) * 33u + xLoc] = lut[b3 >> 2u][b3 & 3u];
  }
  workgroupBarrier();

  let x4Loc = t & 7u;
  let zOff = t >> 3u;
  let xBase = x4Loc * 4u;
  let dstX4 = ${X4_HALO2}u + wid.x * 8u + x4Loc;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let zLoc = s * 8u + zOff;
    let r = zLoc * 33u + xBase;
    inp_4[((Z0 + zLoc) * 256u + Y) * ${X4_PAD2}u + dstX4] =
      ${V4}(${T}(sh[r]), ${T}(sh[r + 1u]), ${T}(sh[r + 2u]), ${T}(sh[r + 3u]));
  }
}`;
  }
  return `${f16Enable}
@group(0) @binding(0) var<storage, read> raw_f32 : array<f32>;
@group(0) @binding(1) var<storage, read_write> inp_4 : array<${V4}>;
@group(0) @binding(2) var<uniform> params : vec4<f32>;

var<workgroup> sh : array<f32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let zLoc = t & 31u;
  let xOff = t >> 5u;
  for (var s : u32 = 0u; s < 16u; s = s + 1u) {
    let xLoc = s * 2u + xOff;
    let v = raw_f32[((X0 + xLoc) * 256u + Y) * 256u + (Z0 + zLoc)];
    sh[zLoc * 33u + xLoc] = select((v - params.x) / params.y, 0.0, v == params.x);
  }
  workgroupBarrier();

  let x4Loc = t & 7u;
  let zOff = t >> 3u;
  let xBase = x4Loc * 4u;
  let dstX4 = ${X4_HALO2}u + wid.x * 8u + x4Loc;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let zl = s * 8u + zOff;
    let r = zl * 33u + xBase;
    inp_4[((Z0 + zl) * 256u + Y) * ${X4_PAD2}u + dstX4] =
      ${V4}(${T}(sh[r]), ${T}(sh[r + 1u]), ${T}(sh[r + 2u]), ${T}(sh[r + 3u]));
  }
}`;
}
function buildTransposeU8Wgsl() {
  return `
@group(0) @binding(0) var<storage, read> src_u32 : array<u32>;
@group(0) @binding(1) var<storage, read_write> dst_u32 : array<u32>;

var<workgroup> sh : array<u32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let x4Loc = t & 7u;
  let zOff = t >> 3u;
  let xBase = x4Loc * 4u;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let zLoc = s * 8u + zOff;
    let w = src_u32[((Z0 + zLoc) * 256u + Y) * 64u + wid.x * 8u + x4Loc];
    let r = zLoc * 33u + xBase;
    sh[r + 0u] = w & 0xffu;
    sh[r + 1u] = (w >> 8u) & 0xffu;
    sh[r + 2u] = (w >> 16u) & 0xffu;
    sh[r + 3u] = (w >> 24u) & 0xffu;
  }
  workgroupBarrier();

  let z4Loc = t & 7u;
  let xOff = t >> 3u;
  let zBase = z4Loc * 4u;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let xLoc = s * 8u + xOff;
    let b0 = sh[(zBase + 0u) * 33u + xLoc];
    let b1 = sh[(zBase + 1u) * 33u + xLoc];
    let b2 = sh[(zBase + 2u) * 33u + xLoc];
    let b3 = sh[(zBase + 3u) * 33u + xLoc];
    dst_u32[((X0 + xLoc) * 256u + Y) * 64u + wid.z * 8u + z4Loc] =
      b0 | (b1 << 8u) | (b2 << 16u) | (b3 << 24u);
  }
}`;
}
function buildTransposeF32Wgsl() {
  return `
@group(0) @binding(0) var<storage, read> src_f32 : array<f32>;
@group(0) @binding(1) var<storage, read_write> dst_f32 : array<f32>;

var<workgroup> sh : array<f32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let xLoc = t & 31u;
  let zOff = t >> 5u;
  for (var s : u32 = 0u; s < 16u; s = s + 1u) {
    let zLoc = s * 2u + zOff;
    sh[zLoc * 33u + xLoc] = src_f32[((Z0 + zLoc) * 256u + Y) * 256u + (X0 + xLoc)];
  }
  workgroupBarrier();

  let zLoc = t & 31u;
  let xOff = t >> 5u;
  for (var s : u32 = 0u; s < 16u; s = s + 1u) {
    let xl = s * 2u + xOff;
    dst_f32[((X0 + xl) * 256u + Y) * 256u + (Z0 + zLoc)] = sh[zLoc * 33u + xl];
  }
}`;
}
function buildProbUnpackTwoWgsl() {
  return `
@group(0) @binding(0) var<storage, read> packedSrc : array<u32>;
@group(0) @binding(1) var<storage, read_write> outA : array<f32>;
@group(0) @binding(2) var<storage, read_write> outB : array<f32>;

@compute @workgroup_size(256, 1, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let idx = wid.y * 65536u + wid.x * 256u + lid.x;
  let w = packedSrc[idx];
  let inv = 1.0 / 65535.0;
  outA[idx] = f32(w & 0xffffu) * inv;
  outB[idx] = f32(w >> 16u) * inv;
}`;
}
function buildProbBlurWgsl() {
  return `
struct BlurParams {
  axis : u32,
  radius : u32,
  weightSum : f32,
  supPow : f32,
  k : array<vec4<f32>, 8>,
};
@group(0) @binding(0) var<storage, read> src : array<f32>;
@group(0) @binding(1) var<storage, read_write> dst : array<f32>;
@group(0) @binding(2) var<storage, read> sup : array<f32>;
@group(0) @binding(3) var<uniform> p : BlurParams;

fn blurSample(idx : u32, x : u32, y : u32, z : u32) -> f32 {
  var coord : i32 = i32(x);
  var stride : i32 = 1;
  if (p.axis == 1u) {
    coord = i32(y);
    stride = 256;
  } else if (p.axis == 2u) {
    coord = i32(z);
    stride = 65536;
  }
  let rad = i32(p.radius);
  var sum : f32 = 0.0;
  for (var o : i32 = -rad; o <= rad; o = o + 1) {
    let c = coord + o;
    if (c >= 0 && c < 256) {
      let kIdx = u32(o + rad);
      let w = p.k[kIdx >> 2u][kIdx & 3u];
      sum = sum + src[u32(i32(idx) + o * stride)] * w;
    }
  }
  return sum / p.weightSum;
}

@compute @workgroup_size(64, 4, 1)
fn blur_axis(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>) {
  let x = wid.x * 64u + lid.x;
  let y = wid.y * 4u + lid.y;
  let z = wid.z;
  let idx = (z * 256u + y) * 256u + x;
  dst[idx] = blurSample(idx, x, y, z);
}

@compute @workgroup_size(64, 4, 1)
fn blur_z_gate(@builtin(local_invocation_id) lid : vec3<u32>,
               @builtin(workgroup_id) wid : vec3<u32>) {
  let x = wid.x * 64u + lid.x;
  let y = wid.y * 4u + lid.y;
  let z = wid.z;
  let idx = (z * 256u + y) * 256u + x;
  let blurred = blurSample(idx, x, y, z);
  let sv = clamp(sup[idx], 0.0, 1.0);
  var gate : f32 = 0.0;
  if (sv > 0.0) {
    gate = select(pow(sv, p.supPow), sv, p.supPow == 1.0);
  }
  dst[idx] = clamp(blurred * gate, 0.0, 1.0);
}`;
}
async function getIoPipe(device, key, wgslFn, entryPoint, entriesSpec) {
  const cache = getDeviceMap(ioPipeCache, device);
  let p = cache.get(key);
  if (!p) {
    p = (async () => {
      const mod = createShaderModuleFast(device, key, wgslFn());
      return createLayoutAndPipe(device, key, mod, entryPoint, entriesSpec);
    })().catch((err) => {
      cache.delete(key);
      throw err;
    });
    cache.set(key, p);
  }
  return p;
}
function prepareHeadMaskFromNativeInput(raw, headRow, yzActive, normOffset, detectBbox) {
  headRow.fill(0);
  const nvox = DIM2 * DIM2 * DIM2;
  const hasBgZero = detectBbox && raw[0] === normOffset && raw[nvox - 1] === normOffset;
  if (!hasBgZero) return { hasBgSkip: false };
  yzActive.fill(0);
  if ((raw instanceof Uint8Array || raw instanceof Uint8ClampedArray) && (raw.byteOffset & 3) === 0 && Number.isInteger(normOffset) && normOffset >= 0 && normOffset <= 255) {
    const rawU32 = new Uint32Array(raw.buffer, raw.byteOffset, nvox >>> 2);
    const yzU32 = new Uint32Array(yzActive.buffer, yzActive.byteOffset, DIM2 * DIM2 >>> 2);
    const off4 = (normOffset & 255) * 16843009 >>> 0;
    let p = 0;
    for (let x = 0; x < DIM2; x++) {
      for (let i = 0; i < 16384; i++) {
        yzU32[i] |= rawU32[p++] ^ off4;
      }
    }
  } else {
    let p = 0;
    const totalYZ = DIM2 * DIM2;
    for (let x = 0; x < DIM2; x++) {
      for (let yz = 0; yz < totalYZ; yz++, p++) {
        if (raw[p] !== normOffset) yzActive[yz] = 1;
      }
    }
  }
  let activeRows = 0;
  for (let y = 0; y < DIM2; y++) {
    const yOff = y * DIM2;
    for (let z = 0; z < DIM2; z++) {
      if (yzActive[yOff + z] !== 0) {
        headRow[z * DIM2 + y] = 1;
        activeRows++;
      }
    }
  }
  if (activeRows === 0 || activeRows >= 6e4) return { hasBgSkip: false };
  return { hasBgSkip: true };
}
function getProbCacheKey(probCfg) {
  return probCfg ? `${probCfg.grayMask}_${probCfg.whiteMask}_${probCfg.csfMask}_${probCfg.temperature}_${probCfg.supportTemperature}` : "seg";
}
async function getNetPipes128(device, d, packed, hasF16, subgroupMode, probCfg, shaders, { includeCls = true, sequential = false, shouldAbort = null } = {}) {
  const cache = getDeviceMap(netPipeCache, device);
  const f16Tag = hasF16 ? 1 : 0;
  const sgTag = subgroupMode || "none";
  const uWeffTag = shaders.useUniformWeff ? 1 : 0;
  const mk = (label, mod, ep, spec) => createLayoutAndPipe(device, label, mod, ep, spec);
  const initTypes = ["storage", "storage", "storage", "storage"];
  const conv0Types = ["read-only-storage", "storage", "storage", "storage", "storage", "storage", "read-only-storage", "storage", "uniform", "uniform", "uniform"];
  const prepTypes = ["read-only-storage", "read-only-storage", "storage", "storage", "read-only-storage", "uniform"];
  const flushTypes = ["storage", "storage", "storage", "storage", "read-only-storage", "read-only-storage", { type: "uniform", hasDynamicOffset: true, minBindingSize: 32 }];
  const normTypes = ["storage", "storage", "storage", "storage", "read-only-storage", "read-only-storage", "read-only-storage", "uniform"];
  const convTypes = ["read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "storage", "storage", shaders.useUniformWeff ? "uniform" : "read-only-storage", "read-only-storage", { type: "uniform", hasDynamicOffset: true, minBindingSize: 32 }];
  const clsTypes = ["read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "storage", "uniform", "uniform", "uniform"];
  const initKey = `128|init|${d.cs}|${d.activation}|${f16Tag}`;
  const conv0Key = `128|conv0|${d.cs}|${d.dilations[0]}|${d.norm}|${f16Tag}|${sgTag}`;
  const prepKey = `128|prep|${d.chan}|${d.cs}|${d.activation}|${d.norm}|${f16Tag}`;
  const flushKey = `128|flush|${d.cs}|${f16Tag}`;
  const normKey = `128|norm|${d.cs}|${d.activation}|${d.norm}|${f16Tag}`;
  const convKey = `128|conv|${d.chan}|${d.cs}|${d.activation}|${d.norm}|${uWeffTag}|${f16Tag}|${sgTag}`;
  const clsKey = `128|cls|${d.chan}|${d.cs}|${d.nclass}|${packed?.clsK4 ?? 0}|${shaders.numConvs}|${d.activation}|${d.norm}|${f16Tag}|${getProbCacheKey(probCfg)}`;
  const mkInit = () => getCachedKernelGroup(cache, initKey, () => {
    const mInit = createShaderModuleFast(device, "init_act8_128", shaders.initActWgsl());
    return mk("init_act8_128", mInit, "main", initTypes);
  });
  const mkConv0 = () => getCachedKernelGroup(cache, conv0Key, async () => {
    const mConv0 = createShaderModuleFast(device, "conv0_128", shaders.conv0Wgsl());
    const list = await Promise.all(
      shaders.halfPass0 ? [
        mk("conv0_128_lo", mConv0, "main_lo", conv0Types),
        mk("conv0_128_hi", mConv0, "main_hi", conv0Types),
        mk("conv0_128_bg_lo", mConv0, "main_bg_lo", conv0Types),
        mk("conv0_128_bg_hi", mConv0, "main_bg_hi", conv0Types)
      ] : [
        mk("conv0_128", mConv0, "main", conv0Types),
        mk("conv0_128_bg", mConv0, "main_bg", conv0Types)
      ]
    );
    return shaders.halfPass0 ? { lo: list[0], hi: list[1], bgLo: list[2], bgHi: list[3] } : { main: list[0], bg: list[1] };
  });
  const mkPrep = () => getCachedKernelGroup(cache, prepKey, async () => {
    const mPrep = createShaderModuleFast(device, "prep_128", shaders.prepWgsl());
    const [pMomFin, pPrepW] = await Promise.all([
      mk("moments_finish_128", mPrep, "moments_finish", prepTypes),
      mk("prep_weff_128", mPrep, "prep_weff", prepTypes)
    ]);
    return { pMomFin, pPrepW };
  });
  const mkFlush = () => getCachedKernelGroup(cache, flushKey, () => {
    const mFlush = createShaderModuleFast(device, "flush_128", shaders.flushWgsl());
    return mk("flush_stage_128", mFlush, "main", flushTypes);
  });
  const mkNorm = () => getCachedKernelGroup(cache, normKey, async () => {
    const mNorm = createShaderModuleFast(device, "norm_128", shaders.normWgsl());
    const [pNorm, pNormHalo] = await Promise.all([
      mk("norm_quant8_128", mNorm, "main", normTypes),
      mk("norm_halo_fill_128", mNorm, "norm_halo_fill", normTypes)
    ]);
    return { pNorm, pNormHalo };
  });
  const mkCls = () => includeCls ? getCachedKernelGroup(cache, clsKey, () => {
    const mCls = createShaderModuleFast(device, "cls_128", shaders.clsWgsl());
    return mk("classify_v4_128", mCls, "main", clsTypes);
  }) : Promise.resolve(null);
  const mkConv = () => getCachedKernelGroup(cache, convKey, async () => {
    const mod = createShaderModuleFast(device, "conv_128", shaders.convWgsl());
    if (shaders.halfPassConv) {
      const [lo, hi, extLo, extHi, bgLo, bgHi] = await Promise.all([
        mk("conv_128_lo", mod, "main_lo", convTypes),
        mk("conv_128_hi", mod, "main_hi", convTypes),
        mk("conv_128_ext_lo", mod, "main_ext_lo", convTypes),
        mk("conv_128_ext_hi", mod, "main_ext_hi", convTypes),
        mk("conv_128_bg_lo", mod, "main_bg_lo", convTypes),
        mk("conv_128_bg_hi", mod, "main_bg_hi", convTypes)
      ]);
      return { lo, hi, extLo, extHi, bgLo, bgHi };
    }
    const [main, ext, bg] = await Promise.all([
      mk("conv_128", mod, "main", convTypes),
      mk("conv_128_ext", mod, "main_ext", convTypes),
      mk("conv_128_bg", mod, "main_bg", convTypes)
    ]);
    return { main, ext, bg };
  });
  if (sequential) {
    for (const step of [mkInit, mkPrep, mkFlush, mkNorm, mkConv0, mkConv, mkCls]) {
      if (shouldAbort?.()) return null;
      await step();
    }
    return null;
  }
  const [pInit, pConv0, prepPair, pFlush, normPair, pCls, pConv] = await Promise.all([
    mkInit(),
    mkConv0(),
    mkPrep(),
    mkFlush(),
    mkNorm(),
    mkCls(),
    mkConv()
  ]);
  return {
    pInit,
    pMomFin: prepPair.pMomFin,
    pPrepW: prepPair.pPrepW,
    pFlush,
    pNorm: normPair.pNorm,
    pNormHalo: normPair.pNormHalo,
    pCls,
    pConv0,
    pConv
  };
}
async function getNetPipesStd(device, d, packed, hasF16, subgroupMode, splitHalves, probCfg, shaders, { includeCls = true, sequential = false, shouldAbort = null } = {}) {
  const cache = getDeviceMap(netPipeCache, device);
  const f16Tag = hasF16 ? 1 : 0;
  const sgTag = subgroupMode || "none";
  const splitTag = splitHalves ? 1 : 0;
  const uWeffTag = shaders.useUniformWeff ? 1 : 0;
  const chunkTag = shaders.chunkableStd ? 1 : 0;
  const mk = (label, mod, ep, types) => createLayoutAndPipe(device, label, mod, ep, types);
  const initTypes = ["storage", "storage"];
  const conv0Types = ["read-only-storage", "storage", "storage", "read-only-storage", "read-only-storage", "storage", "storage", "read-only-storage", "uniform"];
  const prepTypes = ["read-only-storage", "read-only-storage", "storage", "storage", "storage", "storage", "read-only-storage", "uniform"];
  const normTypes = ["storage", "storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "uniform"];
  const convTypes = [
    "read-only-storage",
    "read-only-storage",
    "storage",
    "storage",
    "storage",
    "storage",
    shaders.useUniformWeff ? "uniform" : "read-only-storage",
    "read-only-storage",
    shaders.chunkableStd ? { type: "uniform", hasDynamicOffset: true, minBindingSize: 32 } : "uniform"
  ];
  const clsTypes = ["read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "read-only-storage", "storage", "read-only-storage", "uniform"];
  const initKey = `std|init|${d.cs}|${d.activation}|${f16Tag}|${splitTag}`;
  const conv0Key = `std|conv0|${d.cs}|${d.dilations[0]}|${d.norm}|${f16Tag}|${sgTag}|${splitTag}`;
  const prepKey = `std|prep|${d.chan}|${d.cs}|${d.activation}|${d.norm}|${f16Tag}|${splitTag}`;
  const normKey = `std|norm|${d.cs}|${d.activation}|${d.norm}|${f16Tag}|${splitTag}`;
  const convKey = `std|conv|${d.chan}|${d.cs}|${d.activation}|${d.norm}|${uWeffTag}|${f16Tag}|${sgTag}|${splitTag}${chunkTag ? "|chk1" : ""}`;
  const clsKey = `std|cls|${d.chan}|${d.cs}|${d.nclass}|${packed?.clsK4 ?? 0}|${d.activation}|${d.norm}|${f16Tag}|${splitTag}|${getProbCacheKey(probCfg)}`;
  const mkInit = () => getCachedKernelGroup(cache, initKey, () => {
    const mInit = createShaderModuleFast(device, "init_act8", shaders.initActWgsl());
    return mk("init_act8", mInit, "main", initTypes);
  });
  const mkConv0 = () => getCachedKernelGroup(cache, conv0Key, async () => {
    const mConv0 = createShaderModuleFast(device, "conv0", shaders.conv0Wgsl());
    const list = await Promise.all(
      shaders.halfPass0 ? [
        mk("conv0_lo", mConv0, "main_lo", conv0Types),
        mk("conv0_hi", mConv0, "main_hi", conv0Types),
        mk("conv0_bg_lo", mConv0, "main_bg_lo", conv0Types),
        mk("conv0_bg_hi", mConv0, "main_bg_hi", conv0Types)
      ] : [
        mk("conv0", mConv0, "main", conv0Types),
        mk("conv0_bg", mConv0, "main_bg", conv0Types)
      ]
    );
    return shaders.halfPass0 ? { lo: list[0], hi: list[1], bgLo: list[2], bgHi: list[3] } : { main: list[0], bg: list[1] };
  });
  const mkPrep = () => getCachedKernelGroup(cache, prepKey, async () => {
    const mPrep = createShaderModuleFast(device, "prep", shaders.prepWgsl());
    const [pMomFin, pPrepW] = await Promise.all([
      mk("moments_finish", mPrep, "moments_finish", prepTypes),
      mk("prep_weff", mPrep, "prep_weff", prepTypes)
    ]);
    return { pMomFin, pPrepW };
  });
  const mkNorm = () => getCachedKernelGroup(cache, normKey, async () => {
    const mNorm = createShaderModuleFast(device, "norm", shaders.normWgsl());
    const [pNorm, pNormHalo] = await Promise.all([
      mk("norm_quant8", mNorm, "main", normTypes),
      mk("norm_halo_fill", mNorm, "norm_halo_fill", normTypes)
    ]);
    return { pNorm, pNormHalo };
  });
  const mkCls = () => includeCls ? getCachedKernelGroup(cache, clsKey, () => {
    const mCls = createShaderModuleFast(device, "cls", shaders.clsWgsl());
    return mk("classify_v4", mCls, "main", clsTypes);
  }) : Promise.resolve(null);
  const mkConv = () => getCachedKernelGroup(cache, convKey, async () => {
    const mod = createShaderModuleFast(device, "conv", shaders.convWgsl());
    if (shaders.halfPassConv) {
      const [lo, hi, extLo, extHi] = await Promise.all([
        mk("conv_lo", mod, "main_lo", convTypes),
        mk("conv_hi", mod, "main_hi", convTypes),
        mk("conv_ext_lo", mod, "main_ext_lo", convTypes),
        mk("conv_ext_hi", mod, "main_ext_hi", convTypes)
      ]);
      return { lo, hi, extLo, extHi };
    }
    const [main, ext] = await Promise.all([
      mk("conv", mod, "main", convTypes),
      mk("conv_ext", mod, "main_ext", convTypes)
    ]);
    return { main, ext };
  });
  if (sequential) {
    for (const step of [mkInit, mkPrep, mkNorm, mkConv0, mkConv, mkCls]) {
      if (shouldAbort?.()) return null;
      await step();
    }
    return null;
  }
  const [pInit, pConv0, prepPair, normPair, pCls, pConv] = await Promise.all([
    mkInit(),
    mkConv0(),
    mkPrep(),
    mkNorm(),
    mkCls(),
    mkConv()
  ]);
  return {
    pInit,
    pMomFin: prepPair.pMomFin,
    pPrepW: prepPair.pPrepW,
    pNorm: normPair.pNorm,
    pNormHalo: normPair.pNormHalo,
    pCls,
    pConv0,
    pConv
  };
}
function preparePaddedInputAndHeadMask(src, padOut, headRow, hasF16, detectBbox) {
  headRow.fill(0);
  const hasBgZero = detectBbox && src[0] === 0 && src[src.length - 1] === 0;
  let activeRows = 0;
  let sIdx = 0;
  if (!hasBgZero) {
    if (hasF16) {
      for (let z = 0; z < DIM2; z++) {
        const zBase = z * DIM2 * ROW_SCALARS_PAD;
        for (let y = 0; y < DIM2; y++) {
          let dst = zBase + y * ROW_SCALARS_PAD + 32;
          for (let x = 0; x < DIM2; x++, sIdx++, dst++) {
            const v = src[sIdx];
            padOut[dst] = v === 0 ? 0 : f32ToF16Bits(v);
          }
        }
      }
    } else {
      for (let z = 0; z < DIM2; z++) {
        const zBase = z * DIM2 * ROW_SCALARS_PAD;
        for (let y = 0; y < DIM2; y++) {
          const rowStart = z * DIM2 * DIM2 + y * DIM2;
          padOut.set(src.subarray(rowStart, rowStart + DIM2), zBase + y * ROW_SCALARS_PAD + 32);
        }
      }
    }
    return { hasBgSkip: false };
  }
  for (let z = 0; z < DIM2; z++) {
    const zBase = z * DIM2 * ROW_SCALARS_PAD;
    for (let y = 0; y < DIM2; y++) {
      let rowActive = false;
      let dst = zBase + y * ROW_SCALARS_PAD + 32;
      for (let x = 0; x < DIM2; x++, sIdx++, dst++) {
        const v = src[sIdx];
        if (v !== 0) {
          padOut[dst] = hasF16 ? f32ToF16Bits(v) : v;
          rowActive = true;
        } else {
          padOut[dst] = 0;
        }
      }
      if (rowActive) {
        headRow[z * DIM2 + y] = 1;
        activeRows++;
      }
    }
  }
  if (activeRows === 0 || activeRows >= 6e4) return { hasBgSkip: false };
  return { hasBgSkip: true };
}
function stencilExpandRows(rowMask, D) {
  const out = new Uint8Array(DIM2 * DIM2);
  for (let z = 0; z < DIM2; z++) {
    const zOff = z * DIM2;
    const z0 = z - D;
    const z2 = z + D;
    for (let y = 0; y < DIM2; y++) {
      if (!rowMask[zOff + y]) continue;
      const y0 = y - D;
      const y2 = y + D;
      if (z0 >= 0) {
        const b = z0 * DIM2;
        if (y0 >= 0) out[b + y0] = 1;
        out[b + y] = 1;
        if (y2 < DIM2) out[b + y2] = 1;
      }
      if (y0 >= 0) out[zOff + y0] = 1;
      out[zOff + y] = 1;
      if (y2 < DIM2) out[zOff + y2] = 1;
      if (z2 >= 0 && z2 < DIM2) {
        const b = z2 * DIM2;
        if (y0 >= 0) out[b + y0] = 1;
        out[b + y] = 1;
        if (y2 < DIM2) out[b + y2] = 1;
      }
    }
  }
  return out;
}
function dilateBoxRows(rowMask, R) {
  if (R <= 0) return rowMask.slice();
  const tmp = new Uint8Array(DIM2 * DIM2);
  const out = new Uint8Array(DIM2 * DIM2);
  const pref = new Int32Array(DIM2 + 1);
  for (let z = 0; z < DIM2; z++) {
    const b = z * DIM2;
    for (let y = 0; y < DIM2; y++) pref[y + 1] = pref[y] + rowMask[b + y];
    for (let y = 0; y < DIM2; y++) {
      if (pref[Math.min(DIM2 - 1, y + R) + 1] - pref[Math.max(0, y - R)] > 0) tmp[b + y] = 1;
    }
  }
  for (let y = 0; y < DIM2; y++) {
    for (let z = 0; z < DIM2; z++) pref[z + 1] = pref[z] + tmp[z * DIM2 + y];
    for (let z = 0; z < DIM2; z++) {
      if (pref[Math.min(DIM2 - 1, z + R) + 1] - pref[Math.max(0, z - R)] > 0) out[z * DIM2 + y] = 1;
    }
  }
  return out;
}
function rowsToStripMask(rm) {
  const sm = new Uint8Array(TOTAL_STRIPS);
  for (let z = 0; z < DIM2; z++) {
    const rb = z * DIM2;
    const sb = z * 64;
    for (let yw = 0; yw < 64; yw++) {
      const y = rb + (yw << 2);
      if (rm[y] | rm[y + 1] | rm[y + 2] | rm[y + 3]) sm[sb + yw] = 1;
    }
  }
  return sm;
}
function stripMaskToRows(sm) {
  const rm = new Uint8Array(DIM2 * DIM2);
  for (let z = 0; z < DIM2; z++) {
    const rb = z * DIM2;
    const sb = z * 64;
    for (let yw = 0; yw < 64; yw++) {
      if (sm[sb + yw]) {
        const y = rb + (yw << 2);
        rm[y] = 1;
        rm[y + 1] = 1;
        rm[y + 2] = 1;
        rm[y + 3] = 1;
      }
    }
  }
  return rm;
}
function stripMaskToList(sm) {
  let n = 0;
  for (let i = 0; i < TOTAL_STRIPS; i++) n += sm[i];
  const arr = new Uint32Array(n);
  let k = 0;
  for (let z = 0; z < DIM2; z++) {
    const sb = z * 64;
    for (let yw = 0; yw < 64; yw++) {
      if (sm[sb + yw]) arr[k++] = z << 8 | yw;
    }
  }
  return arr;
}
function countMask(m) {
  let s = 0;
  for (let i = 0; i < m.length; i++) s += m[i];
  return s;
}
function buildKorobovMask(nPts) {
  const m = new Uint8Array(TOTAL_STRIPS);
  if (nPts === 1024) {
    for (let tz = 0; tz < 32; tz++) {
      for (let ty = 0; ty < 32; ty++) {
        const z = tz * 8 + (tz * 3 + ty * 5 & 7);
        const yw = ty * 2 + (tz + ty & 1);
        m[z * 64 + yw] = 1;
      }
    }
  } else if (nPts === 512) {
    for (let tz = 0; tz < 32; tz++) {
      for (let ty = 0; ty < 16; ty++) {
        const z = tz * 8 + (tz * 3 + ty * 5 & 7);
        const yw = ty * 4 + (tz + ty * 3 & 3);
        m[z * 64 + yw] = 1;
      }
    }
  } else {
    for (let tz = 0; tz < 16; tz++) {
      for (let ty = 0; ty < 16; ty++) {
        const z = tz * 16 + (tz * 7 + ty * 3 & 15);
        const yw = ty * 4 + (tz + ty * 3 & 3);
        m[z * 64 + yw] = 1;
      }
    }
  }
  return m;
}
function computeConeSchedule(headRow, info, dilations, canConeSkip) {
  const numConvs = dilations.length;
  const makeFull = () => ({
    isFull: true,
    mode: "full",
    writtenMask: null,
    computedMask: null,
    mainStrips: null,
    extStrips: null,
    nMomExt: 0,
    normStrips: null,
    haloRows: null,
    bgStrip: null,
    extWeight: 0
  });
  if (!canConeSkip || !info.hasBgSkip) {
    return {
      clsSkipped: false,
      clsStrips: null,
      layers: Array.from({ length: numConvs }, makeFull)
    };
  }
  const clsStripMask = rowsToStripMask(dilateBoxRows(headRow, 3));
  const clsSkipped = countMask(clsStripMask) < 15800;
  const clsStrips = clsSkipped ? stripMaskToList(clsStripMask) : null;
  const pureStripMasks = new Array(numConvs);
  let prevNonPure = null;
  for (let li = 0; li < numConvs; li++) {
    const D = dilations[li];
    const nonPure = li === 0 ? stencilExpandRows(headRow, D) : stencilExpandRows(prevNonPure, D);
    if (li > 0) {
      for (let z = 0; z < DIM2; z++) {
        const zb = z < D || z >= DIM2 - D;
        const r = z * DIM2;
        for (let y = 0; y < DIM2; y++) {
          if (zb || y < D || y >= DIM2 - D) nonPure[r + y] = 1;
        }
      }
    }
    prevNonPure = nonPure;
    const pm = new Uint8Array(TOTAL_STRIPS);
    for (let z = 0; z < DIM2; z++) {
      const rb = z * DIM2;
      const sb = z * 64;
      for (let yw = 0; yw < 64; yw++) {
        const y = rb + (yw << 2);
        if (!(nonPure[y] | nonPure[y + 1] | nonPure[y + 2] | nonPure[y + 3])) pm[sb + yw] = 1;
      }
    }
    pureStripMasks[li] = pm;
  }
  const bwdStripMasks = new Array(numConvs);
  bwdStripMasks[numConvs - 1] = clsStripMask;
  for (let li = numConvs - 2; li >= 0; li--) {
    bwdStripMasks[li] = rowsToStripMask(stencilExpandRows(stripMaskToRows(bwdStripMasks[li + 1]), dilations[li + 1]));
  }
  const canBwd = clsSkipped && numConvs >= 4 && dilations[numConvs - 1] <= 2 && dilations[numConvs - 2] <= 4 && dilations[numConvs - 3] <= 6;
  const bwdFloor = Math.max(1, numConvs - 3);
  const bwdExtMasks = new Array(numConvs).fill(null);
  const bwdWriteExtMasks = new Array(numConvs).fill(null);
  const bwdLattices = new Array(numConvs).fill(null);
  if (canBwd) {
    const extFrac = (TOTAL_STRIPS - countMask(bwdStripMasks[numConvs - 1])) / TOTAL_STRIPS;
    const seedGrid = extFrac >= 0.52 ? 256 : 512;
    const entryMomGrid = 1024;
    const seedLat = buildKorobovMask(seedGrid);
    const entryMomLat = buildKorobovMask(entryMomGrid);
    const bmLast = bwdStripMasks[numConvs - 1];
    const emLast = new Uint8Array(TOTAL_STRIPS);
    let cntLast = 0;
    for (let i = 0; i < TOTAL_STRIPS; i++) {
      if (seedLat[i] && !bmLast[i]) {
        emLast[i] = 1;
        cntLast++;
      }
    }
    if (cntLast > 0 && cntLast <= MAX_EXT_STRIPS && countMask(bmLast) + cntLast <= 15360) {
      bwdExtMasks[numConvs - 1] = emLast;
      bwdWriteExtMasks[numConvs - 1] = new Uint8Array(TOTAL_STRIPS);
      bwdLattices[numConvs - 1] = seedLat;
      for (let li = numConvs - 2; li >= bwdFloor; li--) {
        const unionNext = new Uint8Array(TOTAL_STRIPS);
        const bmNext = bwdStripMasks[li + 1];
        const emNext = bwdExtMasks[li + 1];
        for (let i = 0; i < TOTAL_STRIPS; i++) unionNext[i] = bmNext[i] | emNext[i];
        const needSm = rowsToStripMask(stencilExpandRows(stripMaskToRows(unionNext), dilations[li + 1]));
        const writeEm = new Uint8Array(TOTAL_STRIPS);
        const bm = bwdStripMasks[li];
        for (let i = 0; i < TOTAL_STRIPS; i++) if (needSm[i] && !bm[i]) writeEm[i] = 1;
        const lat = li === bwdFloor ? entryMomLat : seedLat;
        const em = new Uint8Array(TOTAL_STRIPS);
        let cnt = 0;
        let momCnt = 0;
        for (let i = 0; i < TOTAL_STRIPS; i++) {
          if ((writeEm[i] || lat[i]) && !bm[i]) {
            em[i] = 1;
            cnt++;
            if (lat[i]) momCnt++;
          }
        }
        if (momCnt === 0 || cnt > MAX_EXT_STRIPS || countMask(bm) + cnt > 15360) {
          const liUp = li + 1;
          const bmUp = bwdStripMasks[liUp];
          const wUp = bwdWriteExtMasks[liUp];
          const emUp = new Uint8Array(TOTAL_STRIPS);
          let cntUp = 0;
          for (let i = 0; i < TOTAL_STRIPS; i++) {
            if ((wUp[i] || entryMomLat[i]) && !bmUp[i]) {
              emUp[i] = 1;
              cntUp++;
            }
          }
          if (cntUp <= MAX_EXT_STRIPS && countMask(bmUp) + cntUp <= 15360) {
            bwdExtMasks[liUp] = emUp;
            bwdLattices[liUp] = entryMomLat;
          }
          break;
        }
        bwdWriteExtMasks[li] = writeEm;
        bwdExtMasks[li] = em;
        bwdLattices[li] = lat;
      }
    }
  }
  const layers = new Array(numConvs);
  for (let li = 0; li < numConvs; li++) {
    const pureCnt = countMask(pureStripMasks[li]);
    const rpureWork = TOTAL_STRIPS - pureCnt;
    const hasBwd = bwdExtMasks[li] !== null;
    const bwdWork = hasBwd ? countMask(bwdStripMasks[li]) + countMask(bwdExtMasks[li]) : Infinity;
    if (pureCnt >= 512 && rpureWork <= bwdWork) {
      const mm = new Uint8Array(TOTAL_STRIPS);
      let bgIdx = -1;
      for (let i = 0; i < TOTAL_STRIPS; i++) {
        if (pureStripMasks[li][i]) {
          if (bgIdx < 0) bgIdx = i;
        } else {
          mm[i] = 1;
        }
      }
      const computedMask = mm.slice();
      computedMask[bgIdx] = 1;
      const bgStrip = { z: bgIdx >>> 6, yWg: bgIdx & 63, packed: bgIdx >>> 6 << 8 | bgIdx & 63 };
      const mainStrips = stripMaskToList(mm);
      layers[li] = {
        isFull: false,
        mode: "rpure",
        writtenMask: mm,
        computedMask,
        mainStrips,
        extStrips: li === 0 ? null : new Uint32Array([bgStrip.packed]),
        nMomExt: li === 0 ? 0 : 1,
        normStrips: mainStrips,
        haloRows: null,
        bgStrip,
        extWeight: pureCnt
      };
    } else if (hasBwd && bwdWork <= 15360) {
      const bm = bwdStripMasks[li];
      const em = bwdExtMasks[li];
      const wEm = bwdWriteExtMasks[li];
      const lat = bwdLattices[li];
      const mainStrips = stripMaskToList(bm);
      const uList = [];
      const supList = [];
      for (let z = 0; z < DIM2; z++) {
        const sb = z * 64;
        for (let yw = 0; yw < 64; yw++) {
          const i = sb + yw;
          if (!em[i]) continue;
          const pk = z << 8 | yw;
          if (lat[i]) uList.push(pk);
          else supList.push(pk);
        }
      }
      const nMomExt = uList.length;
      if (nMomExt === 0) {
        layers[li] = makeFull();
        continue;
      }
      const extStrips = new Uint32Array(uList.length + supList.length);
      extStrips.set(uList, 0);
      extStrips.set(supList, uList.length);
      const writtenMask = new Uint8Array(TOTAL_STRIPS);
      const computedMask = new Uint8Array(TOTAL_STRIPS);
      for (let i = 0; i < TOTAL_STRIPS; i++) {
        writtenMask[i] = bm[i] | wEm[i];
        computedMask[i] = bm[i] | em[i];
      }
      layers[li] = {
        isFull: false,
        mode: "bwd",
        writtenMask,
        computedMask,
        mainStrips,
        extStrips,
        nMomExt,
        normStrips: li + 1 < numConvs ? stripMaskToList(writtenMask) : null,
        haloRows: null,
        bgStrip: null,
        extWeight: (TOTAL_STRIPS - mainStrips.length) / nMomExt
      };
    } else {
      layers[li] = makeFull();
    }
  }
  for (let li = numConvs - 2; li >= 0; li--) {
    if (layers[li].mode === "bwd" && layers[li + 1].mode !== "bwd") {
      layers[li] = makeFull();
    }
  }
  for (let li = 0; li < numConvs - 1; li++) {
    const L = layers[li];
    if (L.mode !== "rpure") continue;
    const Lnext = layers[li + 1];
    const nextReadRows = Lnext.isFull ? new Uint8Array(DIM2 * DIM2).fill(1) : stencilExpandRows(stripMaskToRows(Lnext.computedMask), dilations[li + 1]);
    const writtenRows = stripMaskToRows(L.writtenMask);
    const list = [];
    for (let z = 0; z < DIM2; z++) {
      const rb = z * DIM2;
      for (let y = 0; y < DIM2; y++) {
        if (nextReadRows[rb + y] && !writtenRows[rb + y]) list.push(z << 8 | y);
      }
    }
    if (list.length > 0) L.haloRows = new Uint32Array(list);
  }
  return { clsSkipped, clsStrips, layers };
}
function packWeightsV4(desc, d) {
  const CHAN = d.chan;
  const CS = d.cs;
  const OC4 = CS / 4;
  const NCLASS = d.nclass;
  const clsK4 = Math.ceil(NCLASS / 4);
  const { convs, affines, classifier } = desc;
  const numConvs = convs.length;
  const w0Vec4s = 27 * OC4;
  const hiddenVec4PerLayer = 9 * CS * 3 * OC4;
  const clsVec4s = CS * clsK4;
  const totalF32 = (w0Vec4s + (numConvs - 1) * hiddenVec4PerLayer + clsVec4s) * 4;
  const wF32 = new Float32Array(totalF32);
  const metaStride = 4 * CS;
  const clsBiasOff = numConvs * metaStride;
  const qmetaF32 = new Float32Array(clsBiasOff + clsK4 * 4);
  const layerScale = (li, oc, inC) => {
    if (d.norm !== "gn" || oc >= CHAN) return 1;
    const c = convs[li];
    const stride = inC * 27;
    const base = oc * stride;
    let l1 = 0;
    for (let i = 0; i < stride; i++) l1 += Math.abs(c.w[base + i]);
    return Math.max(l1 / 16, 1e-6);
  };
  for (let oc = 0; oc < convs[0].outC; oc++) {
    const s = layerScale(0, oc, convs[0].inC);
    const invS = 1 / s;
    for (let tap = 0; tap < 27; tap++) {
      wF32[tap * CS + oc] = convs[0].w[oc * 27 + tap] * invS;
    }
    qmetaF32[2 * CS + oc] = d.eps / (s * s);
    if (convs[0].bias) qmetaF32[3 * CS + oc] = convs[0].bias[oc];
  }
  for (let oc = convs[0].outC; oc < CS; oc++) {
    qmetaF32[2 * CS + oc] = d.eps;
  }
  for (let li = 1; li < numConvs; li++) {
    const c = convs[li];
    const base = (w0Vec4s + (li - 1) * hiddenVec4PerLayer) * 4;
    const m = li * metaStride;
    for (let oc = 0; oc < c.outC; oc++) {
      const s = layerScale(li, oc, c.inC);
      const invS = 1 / s;
      const g = oc >>> 2;
      const lane = oc & 3;
      for (let tapYz = 0; tapYz < 9; tapYz++) {
        for (let ic = 0; ic < c.inC; ic++) {
          for (let dx = 0; dx < 3; dx++) {
            const tap = tapYz * 3 + dx;
            const dstIdx = base + (((tapYz * CS + ic) * 3 + dx) * OC4 + g) * 4 + lane;
            wF32[dstIdx] = c.w[(oc * c.inC + ic) * 27 + tap] * invS;
          }
        }
      }
      qmetaF32[m + 2 * CS + oc] = d.eps / (s * s);
      if (c.bias) qmetaF32[m + 3 * CS + oc] = c.bias[oc];
    }
    for (let oc = c.outC; oc < CS; oc++) {
      qmetaF32[m + 2 * CS + oc] = d.eps;
    }
  }
  for (let li = 0; li < numConvs; li++) {
    const m = li * metaStride;
    const aff = affines[li];
    for (let oc = 0; oc < CHAN; oc++) {
      if (d.norm === "gn") {
        qmetaF32[m + oc] = aff?.scale ? aff.scale[oc] : 1;
        qmetaF32[m + CS + oc] = aff?.bias ? aff.bias[oc] : 0;
      } else {
        qmetaF32[m + oc] = 1;
        qmetaF32[m + CS + oc] = 0;
      }
    }
  }
  const clsVec4Off = w0Vec4s + (numConvs - 1) * hiddenVec4PerLayer;
  const clsBase = clsVec4Off * 4;
  for (let c = 0; c < CHAN; c++) {
    for (let k = 0; k < NCLASS; k++) {
      wF32[clsBase + c * clsK4 * 4 + k] = classifier.w[k * classifier.inC + c];
    }
  }
  for (let k = 0; k < clsK4 * 4; k++) {
    qmetaF32[clsBiasOff + k] = k < NCLASS ? classifier.bias ? classifier.bias[k] : 0 : -1e30;
  }
  return {
    wF32,
    wF16: toF16Array(wF32),
    qmetaF32,
    w0Vec4s,
    hiddenVec4PerLayer,
    clsVec4Off,
    clsBiasOff,
    metaStride,
    clsK4
  };
}
function getActivationWgsl(activation) {
  if (activation === "gelu_tanh") {
    return `fn act(x : f32) -> f32 {
  let u = clamp(0.7978845608028654 * (x + 0.044715 * x * x * x), -9.0, 9.0);
  return 0.5 * x * (1.0 + tanh(u));
}`;
  }
  if (activation === "relu") {
    return `fn act(x : f32) -> f32 { return max(x, 0.0); }`;
  }
  if (activation === "elu") {
    return `fn act(x : f32) -> f32 { return select(exp(clamp(x, -20.0, 0.0)) - 1.0, x, x >= 0.0); }`;
  }
  throw new Error(`meshnet_fast_v4: unsupported activation '${activation}'`);
}
function getQuantConstants(activation) {
  if (activation === "gelu_tanh") {
    return {
      uZeroInt: 7,
      uZeroFloat: 7 / 255,
      uZeroWord: 117901063,
      sterbenzSub: "1.02734375h",
      zeroBin: 7
    };
  }
  if (activation === "relu") {
    return {
      uZeroInt: 0,
      uZeroFloat: 0,
      uZeroWord: 0,
      sterbenzSub: "1.0h",
      zeroBin: 0
    };
  }
  return {
    uZeroInt: 32,
    uZeroFloat: 32 / 255,
    uZeroWord: 538976288,
    sterbenzSub: "1.125h",
    zeroBin: 32
  };
}
function buildClassifierLoopsWgsl({
  chan,
  clsK4,
  nclass,
  V4,
  suf,
  readBiasStmt,
  biasExpr,
  probCfg
}) {
  const matmulBlock = `    var acc0 = ${V4}(0.0${suf});
    var acc1 = ${V4}(0.0${suf});
    var acc2 = ${V4}(0.0${suf});
    var acc3 = ${V4}(0.0${suf});
    for (var c : u32 = 0u; c < ${chan}u; c = c + 1u) {
      let wv = w16_4[w_cls + c * ${clsK4}u + k4];
      let f = feat[c];
      acc0 = fma(f, ${V4}(wv.x), acc0);
      acc1 = fma(f, ${V4}(wv.y), acc1);
      acc2 = fma(f, ${V4}(wv.z), acc2);
      acc3 = fma(f, ${V4}(wv.w), acc3);
    }
    let k_base = k4 * 4u;
${readBiasStmt}`;
  if (!probCfg) {
    return `  var best_v = vec4<f32>(-1.0e29);
  var best_k = vec4<u32>(0u);

  for (var k4 : u32 = 0u; k4 < ${clsK4}u; k4 = k4 + 1u) {
${matmulBlock}
${rep(4, (j) => `    let l${j} = vec4<f32>(acc${j}) + vec4<f32>(${biasExpr(j)});
    let m${j} = l${j} > best_v;
    best_v = select(best_v, l${j}, m${j});
    best_k = select(best_k, vec4<u32>(k_base + ${j}u), m${j});
`)}  }

  labels8[row_idx * ${X4_VALID2}u + x4] = best_k.x | (best_k.y << 8u) | (best_k.z << 16u) | (best_k.w << 24u);`;
  }
  const invTempExpr = `f32(${(1 / Math.max(probCfg.temperature, 1e-6)).toExponential(8)})`;
  const invSupTempExpr = `f32(${(1 / Math.max(probCfg.supportTemperature, 1e-6)).toExponential(8)})`;
  const sameTemp = probCfg.temperature === probCfg.supportTemperature;
  return `  var max_v = vec4<f32>(-1.0e29);
  for (var k4 : u32 = 0u; k4 < ${clsK4}u; k4 = k4 + 1u) {
${matmulBlock}
${rep(4, (j) => `    if (k_base + ${j}u < ${nclass}u) {
      max_v = max(max_v, vec4<f32>(acc${j}) + vec4<f32>(${biasExpr(j)}));
    }
`)}  }

  var denom = vec4<f32>(0.0);
  var sup_denom = vec4<f32>(0.0);
  var bg_w = vec4<f32>(0.0);
  var gm_num = vec4<f32>(0.0);
  var wm_num = vec4<f32>(0.0);
  var csf_num = vec4<f32>(0.0);
  for (var k4 : u32 = 0u; k4 < ${clsK4}u; k4 = k4 + 1u) {
${matmulBlock}
${rep(4, (j) => `    let k${j} = k_base + ${j}u;
    if (k${j} < ${nclass}u) {
      let l${j} = vec4<f32>(acc${j}) + vec4<f32>(${biasExpr(j)});
      let v${j} = exp(clamp((l${j} - max_v) * ${invTempExpr}, vec4<f32>(-80.0), vec4<f32>(0.0)));
      let s${j} = ${sameTemp ? `v${j}` : `exp(clamp((l${j} - max_v) * ${invSupTempExpr}, vec4<f32>(-80.0), vec4<f32>(0.0)))`};
      denom = denom + v${j};
      sup_denom = sup_denom + s${j};
      if (k${j} == 0u) { bg_w = s${j}; }
      let bit${j} = 1u << k${j};
      if ((${probCfg.grayMask}u & bit${j}) != 0u) { gm_num = gm_num + v${j}; }
      if ((${probCfg.whiteMask}u & bit${j}) != 0u) { wm_num = wm_num + v${j}; }
      if ((${probCfg.csfMask}u & bit${j}) != 0u) { csf_num = csf_num + v${j}; }
    }
`)}  }

  let inv_den = vec4<f32>(1.0) / max(denom, vec4<f32>(1.0e-20));
  let gm = clamp(gm_num * inv_den, vec4<f32>(0.0), vec4<f32>(1.0));
  let wm = clamp(wm_num * inv_den, vec4<f32>(0.0), vec4<f32>(1.0));
  let csf = clamp(csf_num * inv_den, vec4<f32>(0.0), vec4<f32>(1.0));
  let sup = clamp(vec4<f32>(1.0) - bg_w / max(sup_denom, vec4<f32>(1.0e-20)), vec4<f32>(0.0), vec4<f32>(1.0));
  let vox_base = row_idx * ${DIM2}u + x4 * 4u;
  if (cp.pad0 == 0u) {
    labels8[vox_base]      = pack2x16unorm(vec2<f32>(gm.x, wm.x));
    labels8[vox_base + 1u] = pack2x16unorm(vec2<f32>(gm.y, wm.y));
    labels8[vox_base + 2u] = pack2x16unorm(vec2<f32>(gm.z, wm.z));
    labels8[vox_base + 3u] = pack2x16unorm(vec2<f32>(gm.w, wm.w));
  } else {
    labels8[vox_base]      = pack2x16unorm(vec2<f32>(csf.x, sup.x));
    labels8[vox_base + 1u] = pack2x16unorm(vec2<f32>(csf.y, sup.y));
    labels8[vox_base + 2u] = pack2x16unorm(vec2<f32>(csf.z, sup.z));
    labels8[vox_base + 3u] = pack2x16unorm(vec2<f32>(csf.w, sup.w));
  }`;
}
function createGpuIoController({
  device,
  hasF16,
  nvox,
  outBufBytes,
  inpBuf,
  act8_0,
  labels8Buf,
  readbackBuf,
  pInit,
  bgInit,
  pCls,
  bgCls,
  clsUbo,
  packed,
  modelEntry,
  probCfg,
  canGpuProb,
  probSlots,
  ownedBuffers,
  mkBuf
}) {
  let actDirty = false;
  let inpHalosInitialized = false;
  let inpHalosDirty = false;
  let disposed = false;
  const yzActive = new Uint8Array(DIM2 * DIM2);
  let prepU8Promise = null;
  let prepF32Promise = null;
  let transposeU8Promise = null;
  let probGpuPromise = null;
  const mkBgEntries = (bgl, entries) => device.createBindGroup({
    layout: bgl,
    entries: entries.map((resource, binding) => ({
      binding,
      resource: resource && resource.buffer ? resource : { buffer: resource }
    }))
  });
  function ensurePrepU8() {
    if (!prepU8Promise) {
      const key = hasF16 ? "prep_in_u8_f16" : "prep_in_u8_f32";
      prepU8Promise = (async () => {
        const { bgl, pipe } = await getIoPipe(
          device,
          key,
          () => buildPrepInWgsl(true, hasF16),
          "main",
          ["read-only-storage", "storage", "uniform"]
        );
        if (disposed) return null;
        const ubo = mkBuf(256 * 4, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        const lutF32 = new Float32Array(256);
        const bg = mkBgEntries(bgl, [{ buffer: labels8Buf, offset: 0, size: nvox }, inpBuf, ubo]);
        return { pipe, ubo, lutF32, bg };
      })().catch((err) => {
        prepU8Promise = null;
        throw err;
      });
    }
    return prepU8Promise;
  }
  function ensurePrepF32() {
    if (!prepF32Promise) {
      const key = hasF16 ? "prep_in_f32_f16" : "prep_in_f32_f32";
      prepF32Promise = (async () => {
        const { bgl, pipe } = await getIoPipe(
          device,
          key,
          () => buildPrepInWgsl(false, hasF16),
          "main",
          ["read-only-storage", "storage", "uniform"]
        );
        if (disposed) return null;
        const ubo = mkBuf(16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
        const f32Tmp = new Float32Array(4);
        const bgLabels = outBufBytes >= nvox * 4 ? mkBgEntries(bgl, [{ buffer: labels8Buf, offset: 0, size: nvox * 4 }, inpBuf, ubo]) : null;
        const bgAct0 = act8_0.size >= nvox * 4 ? mkBgEntries(bgl, [{ buffer: act8_0, offset: 0, size: nvox * 4 }, inpBuf, ubo]) : null;
        return { pipe, ubo, f32Tmp, bgLabels, bgAct0 };
      })().catch((err) => {
        prepF32Promise = null;
        throw err;
      });
    }
    return prepF32Promise;
  }
  function ensureTransposeU8() {
    if (!transposeU8Promise) {
      transposeU8Promise = (async () => {
        const { bgl, pipe } = await getIoPipe(
          device,
          "transpose_u8_v4",
          buildTransposeU8Wgsl,
          "main",
          ["read-only-storage", "storage"]
        );
        if (disposed) return null;
        const bg = mkBgEntries(bgl, [
          { buffer: labels8Buf, offset: 0, size: nvox },
          { buffer: inpBuf, offset: 0, size: nvox }
        ]);
        return { pipe, bg };
      })().catch((err) => {
        transposeU8Promise = null;
        throw err;
      });
    }
    return transposeU8Promise;
  }
  function ensureProbGpu() {
    if (!probGpuPromise) {
      probGpuPromise = (async () => {
        const [pUnpack, pBlurAxis, pBlurZGate, pTransposeF32] = await Promise.all([
          getIoPipe(device, "prob_unpack_two", buildProbUnpackTwoWgsl, "main", ["read-only-storage", "storage", "storage"]),
          getIoPipe(device, "prob_blur_axis", buildProbBlurWgsl, "blur_axis", ["read-only-storage", "storage", "read-only-storage", "uniform"]),
          getIoPipe(device, "prob_blur_z_gate", buildProbBlurWgsl, "blur_z_gate", ["read-only-storage", "storage", "read-only-storage", "uniform"]),
          getIoPipe(device, "transpose_f32", buildTransposeF32Wgsl, "main", ["read-only-storage", "storage"])
        ]);
        if (disposed) return null;
        const UCD = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST;
        const uboBytes = (4 + 32) * 4;
        const uboX = mkBuf(uboBytes, UCD);
        const uboY = mkBuf(uboBytes, UCD);
        const uboZ = mkBuf(uboBytes, UCD);
        const s64 = (buf) => ({ buffer: buf, offset: 0, size: outBufBytes });
        const bgUnpack0 = mkBgEntries(pUnpack.bgl, [s64(probSlots.pass0HoldBuf), s64(probSlots.y0), s64(probSlots.y1)]);
        const bgUnpack1 = mkBgEntries(pUnpack.bgl, [s64(labels8Buf), s64(probSlots.b), s64(probSlots.sup)]);
        const tissues = [probSlots.y0, probSlots.y1, probSlots.b].map((tBuf) => ({
          buf: tBuf,
          bgBlurX: mkBgEntries(pBlurAxis.bgl, [s64(tBuf), s64(labels8Buf), s64(probSlots.sup), uboX]),
          bgBlurY: mkBgEntries(pBlurAxis.bgl, [s64(labels8Buf), s64(tBuf), s64(probSlots.sup), uboY]),
          bgBlurZ: mkBgEntries(pBlurZGate.bgl, [s64(tBuf), s64(labels8Buf), s64(probSlots.sup), uboZ]),
          bgTranspose: mkBgEntries(pTransposeF32.bgl, [s64(labels8Buf), s64(tBuf)])
        }));
        return {
          pUnpack: pUnpack.pipe,
          pBlurAxis: pBlurAxis.pipe,
          pBlurZGate: pBlurZGate.pipe,
          pTransposeF32: pTransposeF32.pipe,
          bgUnpack0,
          bgUnpack1,
          tissues,
          uboX,
          uboY,
          uboZ,
          uboScratch: new ArrayBuffer(uboBytes),
          lastBlurKey: null
        };
      })().catch((err) => {
        probGpuPromise = null;
        throw err;
      });
    }
    return probGpuPromise;
  }
  function warmupIoPipelines() {
    if (probCfg) {
      if (canGpuProb) ensureProbGpu().catch(() => {
      });
    } else {
      ensurePrepU8().catch(() => {
      });
      ensureTransposeU8().catch(() => {
      });
    }
  }
  function dispose() {
    disposed = true;
  }
  async function prepareInput({ volume, ioOpts, useCone, padInputHost, headRowHost, hasF16Flag }) {
    if (ioOpts?.gpuNativeInput) {
      const normOffset = ioOpts.normOffset ?? 0;
      const normRange = ioOpts.normRange || 1;
      const isU8 = volume instanceof Uint8Array || volume instanceof Uint8ClampedArray;
      const canStageF32 = outBufBytes >= nvox * 4 || act8_0.size >= nvox * 4;
      if (isU8) {
        const info3 = prepareHeadMaskFromNativeInput(volume, headRowHost, yzActive, normOffset, useCone);
        const st = await ensurePrepU8();
        const normClamp = Boolean(ioOpts.normClamp);
        for (let v = 0; v < 256; v++) {
          let val = v === normOffset ? 0 : (v - normOffset) / normRange;
          if (normClamp) {
            if (!(val > 0)) val = 0;
            else if (val > 1) val = 1;
          }
          st.lutF32[v] = val;
        }
        device.queue.writeBuffer(st.ubo, 0, st.lutF32);
        device.queue.writeBuffer(labels8Buf, 0, volume, 0, nvox);
        return {
          info: info3,
          runPrePasses(enc, passCategories) {
            if (!inpHalosInitialized || inpHalosDirty) {
              enc.clearBuffer(inpBuf);
              inpHalosInitialized = true;
              inpHalosDirty = false;
            }
            const pass = enc.beginComputePass();
            pass.setPipeline(st.pipe);
            pass.setBindGroup(0, st.bg);
            pass.dispatchWorkgroups(8, DIM2, 8);
            pass.end();
            passCategories.push("preprocess");
            if (actDirty) {
              const ip = enc.beginComputePass();
              ip.setPipeline(pInit.pipe);
              ip.setBindGroup(0, bgInit);
              ip.dispatchWorkgroups(1, DIM2, DIM2);
              ip.end();
              passCategories.push("preprocess");
              actDirty = false;
            }
          }
        };
      }
      if (canStageF32) {
        const info3 = prepareHeadMaskFromNativeInput(volume, headRowHost, yzActive, normOffset, useCone);
        const st = await ensurePrepF32();
        const stagedInAct0 = !(outBufBytes >= nvox * 4);
        const stageTarget = stagedInAct0 ? act8_0 : labels8Buf;
        const stageBg = stagedInAct0 ? st.bgAct0 : st.bgLabels;
        const f32Vol = volume instanceof Float32Array ? volume : Float32Array.from(volume);
        st.f32Tmp[0] = normOffset;
        st.f32Tmp[1] = normRange;
        st.f32Tmp[2] = 0;
        st.f32Tmp[3] = 0;
        device.queue.writeBuffer(st.ubo, 0, st.f32Tmp);
        device.queue.writeBuffer(stageTarget, 0, f32Vol, 0, nvox);
        return {
          info: info3,
          runPrePasses(enc, passCategories) {
            if (!inpHalosInitialized || inpHalosDirty) {
              enc.clearBuffer(inpBuf);
              inpHalosInitialized = true;
              inpHalosDirty = false;
            }
            const pass = enc.beginComputePass();
            pass.setPipeline(st.pipe);
            pass.setBindGroup(0, stageBg);
            pass.dispatchWorkgroups(8, DIM2, 8);
            pass.end();
            passCategories.push("preprocess");
            if (actDirty || stagedInAct0) {
              const ip = enc.beginComputePass();
              ip.setPipeline(pInit.pipe);
              ip.setBindGroup(0, bgInit);
              ip.dispatchWorkgroups(1, DIM2, DIM2);
              ip.end();
              passCategories.push("preprocess");
              actDirty = false;
            }
          }
        };
      }
      const normed = new Float32Array(nvox);
      for (let i = 0; i < nvox; i++) {
        const v = volume[i];
        normed[i] = v === normOffset ? 0 : (v - normOffset) / normRange;
      }
      const transposed = transposeVolume3D(normed, [DIM2, DIM2, DIM2], [2, 1, 0]);
      const info2 = preparePaddedInputAndHeadMask(transposed, padInputHost, headRowHost, hasF16Flag, useCone);
      device.queue.writeBuffer(inpBuf, 0, padInputHost);
      inpHalosInitialized = true;
      inpHalosDirty = false;
      return {
        info: info2,
        runPrePasses(enc, passCategories) {
          if (actDirty) {
            const ip = enc.beginComputePass();
            ip.setPipeline(pInit.pipe);
            ip.setBindGroup(0, bgInit);
            ip.dispatchWorkgroups(1, DIM2, DIM2);
            ip.end();
            passCategories.push("preprocess");
            actDirty = false;
          }
        }
      };
    }
    const info = preparePaddedInputAndHeadMask(volume, padInputHost, headRowHost, hasF16Flag, useCone);
    device.queue.writeBuffer(inpBuf, 0, padInputHost);
    inpHalosInitialized = true;
    inpHalosDirty = false;
    return {
      info,
      runPrePasses(enc, passCategories) {
        if (actDirty) {
          const ip = enc.beginComputePass();
          ip.setPipeline(pInit.pipe);
          ip.setBindGroup(0, bgInit);
          ip.dispatchWorkgroups(1, DIM2, DIM2);
          ip.end();
          passCategories.push("preprocess");
          actDirty = false;
        }
      }
    };
  }
  async function finishAndReadback({ enc, schedule, passCategories, u4Tmp, ioOpts, paced = false, onProgress = null }) {
    const nCls = schedule.clsSkipped ? schedule.clsStrips.length : DIM2;
    if (!probCfg) {
      u4Tmp[0] = packed.clsVec4Off;
      u4Tmp[1] = packed.clsBiasOff;
      u4Tmp[2] = schedule.clsSkipped ? 0 : 1;
      u4Tmp[3] = 0;
      device.queue.writeBuffer(clsUbo, 0, u4Tmp);
      {
        const pass = enc.beginComputePass();
        pass.setPipeline(pCls.pipe);
        pass.setBindGroup(0, bgCls);
        if (nCls > 0) pass.dispatchWorkgroups(1, schedule.clsSkipped ? 1 : 64, nCls);
        pass.end();
        passCategories.push("classify");
      }
      if (ioOpts?.gpuNativeOutput) {
        const tU8 = await ensureTransposeU8();
        const tp = enc.beginComputePass();
        tp.setPipeline(tU8.pipe);
        tp.setBindGroup(0, tU8.bg);
        tp.dispatchWorkgroups(8, DIM2, 8);
        tp.end();
        passCategories.push("postprocess");
        inpHalosDirty = true;
        enc.copyBufferToBuffer(inpBuf, 0, readbackBuf, 0, nvox);
        device.queue.submit([enc.finish()]);
        await readbackBuf.mapAsync(GPUMapMode.READ);
        const out2 = new Uint8Array(readbackBuf.getMappedRange()).slice();
        readbackBuf.unmap();
        if (paced && onProgress) onProgress(1, "");
        return [out2];
      }
      enc.copyBufferToBuffer(labels8Buf, 0, readbackBuf, 0, outBufBytes);
      device.queue.submit([enc.finish()]);
      await readbackBuf.mapAsync(GPUMapMode.READ);
      const u8 = new Uint8Array(readbackBuf.getMappedRange());
      const out = new Float32Array(nvox);
      for (let i = 0; i < nvox; i++) out[i] = u8[i];
      readbackBuf.unmap();
      if (paced && onProgress) onProgress(1, "");
      return [out];
    }
    if (canGpuProb) {
      const ps = await ensureProbGpu();
      u4Tmp[0] = packed.clsVec4Off;
      u4Tmp[1] = packed.clsBiasOff;
      u4Tmp[2] = schedule.clsSkipped ? 0 : 1;
      u4Tmp[3] = 0;
      device.queue.writeBuffer(clsUbo, 0, u4Tmp);
      u4Tmp[3] = 1;
      device.queue.writeBuffer(probSlots.clsUbo1, 0, u4Tmp);
      {
        const pass0 = enc.beginComputePass();
        pass0.setPipeline(pCls.pipe);
        pass0.setBindGroup(0, bgCls);
        if (nCls > 0) pass0.dispatchWorkgroups(1, schedule.clsSkipped ? 1 : 64, nCls);
        pass0.end();
        passCategories.push("classify");
      }
      enc.copyBufferToBuffer(labels8Buf, 0, probSlots.pass0HoldBuf, 0, outBufBytes);
      if (schedule.clsSkipped) enc.clearBuffer(labels8Buf, 0, outBufBytes);
      {
        const pass1 = enc.beginComputePass();
        pass1.setPipeline(pCls.pipe);
        pass1.setBindGroup(0, probSlots.bgCls1);
        if (nCls > 0) pass1.dispatchWorkgroups(1, schedule.clsSkipped ? 1 : 64, nCls);
        pass1.end();
        passCategories.push("classify");
      }
      actDirty = true;
      const blurKey = `${probCfg.sigma}|${probCfg.supportPower}`;
      const hasBlur = probCfg.sigma > 0;
      const radius = hasBlur ? Math.max(1, Math.round(3 * probCfg.sigma)) : 0;
      if (ps.lastBlurKey !== blurKey) {
        const u32 = new Uint32Array(ps.uboScratch);
        const f32 = new Float32Array(ps.uboScratch);
        f32.fill(0);
        let weightSum = 1;
        if (hasBlur) {
          weightSum = 0;
          for (let offset = -radius; offset <= radius; offset++) {
            const w = Math.exp(-0.5 * offset * offset / (probCfg.sigma * probCfg.sigma));
            f32[4 + offset + radius] = w;
            weightSum += w;
          }
        } else {
          f32[4] = 1;
        }
        u32[1] = radius;
        f32[2] = weightSum;
        u32[0] = 0;
        f32[3] = 1;
        device.queue.writeBuffer(ps.uboX, 0, ps.uboScratch);
        u32[0] = 1;
        device.queue.writeBuffer(ps.uboY, 0, ps.uboScratch);
        u32[0] = 2;
        f32[3] = probCfg.supportPower;
        device.queue.writeBuffer(ps.uboZ, 0, ps.uboScratch);
        ps.lastBlurKey = blurKey;
      }
      {
        const up0 = enc.beginComputePass();
        up0.setPipeline(ps.pUnpack);
        up0.setBindGroup(0, ps.bgUnpack0);
        up0.dispatchWorkgroups(256, 256, 1);
        up0.end();
        passCategories.push("postprocess");
        const up1 = enc.beginComputePass();
        up1.setPipeline(ps.pUnpack);
        up1.setBindGroup(0, ps.bgUnpack1);
        up1.dispatchWorkgroups(256, 256, 1);
        up1.end();
        passCategories.push("postprocess");
      }
      if (paced) {
        device.queue.submit([enc.finish()]);
        await device.queue.onSubmittedWorkDone();
        if (onProgress) onProgress(0.992, "");
        await yieldAfterPacedChunk();
        enc = device.createCommandEncoder();
      }
      const nativeOut = !!ioOpts?.gpuNativeOutput;
      for (let ti = 0; ti < 3; ti++) {
        const ts = ps.tissues[ti];
        if (hasBlur) {
          const px = enc.beginComputePass();
          px.setPipeline(ps.pBlurAxis);
          px.setBindGroup(0, ts.bgBlurX);
          px.dispatchWorkgroups(4, 64, DIM2);
          px.end();
          passCategories.push("postprocess");
          const py = enc.beginComputePass();
          py.setPipeline(ps.pBlurAxis);
          py.setBindGroup(0, ts.bgBlurY);
          py.dispatchWorkgroups(4, 64, DIM2);
          py.end();
          passCategories.push("postprocess");
        }
        const pz = enc.beginComputePass();
        pz.setPipeline(ps.pBlurZGate);
        pz.setBindGroup(0, ts.bgBlurZ);
        pz.dispatchWorkgroups(4, 64, DIM2);
        pz.end();
        passCategories.push("postprocess");
        if (nativeOut) {
          const pt = enc.beginComputePass();
          pt.setPipeline(ps.pTransposeF32);
          pt.setBindGroup(0, ts.bgTranspose);
          pt.dispatchWorkgroups(8, DIM2, 8);
          pt.end();
          passCategories.push("postprocess");
        } else if (ti < 2) {
          enc.copyBufferToBuffer(labels8Buf, 0, ts.buf, 0, outBufBytes);
        }
      }
      const resBufs = nativeOut ? [probSlots.y0, probSlots.y1, probSlots.b] : [probSlots.y0, probSlots.y1, labels8Buf];
      enc.copyBufferToBuffer(resBufs[0], 0, readbackBuf, 0, outBufBytes);
      device.queue.submit([enc.finish()]);
      await readbackBuf.mapAsync(GPUMapMode.READ);
      const gm2 = new Float32Array(readbackBuf.getMappedRange()).slice();
      readbackBuf.unmap();
      const readOne = async (buf) => {
        const ce = device.createCommandEncoder();
        ce.copyBufferToBuffer(buf, 0, readbackBuf, 0, outBufBytes);
        device.queue.submit([ce.finish()]);
        await readbackBuf.mapAsync(GPUMapMode.READ);
        const arr = new Float32Array(readbackBuf.getMappedRange()).slice();
        readbackBuf.unmap();
        return arr;
      };
      const wm2 = await readOne(resBufs[1]);
      const csf2 = await readOne(resBufs[2]);
      if (paced && onProgress) onProgress(1, "");
      return [gm2, wm2, csf2];
    }
    u4Tmp[0] = packed.clsVec4Off;
    u4Tmp[1] = packed.clsBiasOff;
    u4Tmp[2] = schedule.clsSkipped ? 0 : 1;
    u4Tmp[3] = 0;
    device.queue.writeBuffer(clsUbo, 0, u4Tmp);
    {
      const pass0 = enc.beginComputePass();
      pass0.setPipeline(pCls.pipe);
      pass0.setBindGroup(0, bgCls);
      if (nCls > 0) pass0.dispatchWorkgroups(1, schedule.clsSkipped ? 1 : 64, nCls);
      pass0.end();
      passCategories.push("classify");
      enc.copyBufferToBuffer(labels8Buf, 0, readbackBuf, 0, outBufBytes);
    }
    device.queue.submit([enc.finish()]);
    await readbackBuf.mapAsync(GPUMapMode.READ);
    const inv65535 = 1 / 65535;
    const u16Pass0 = new Uint16Array(readbackBuf.getMappedRange());
    const gm = new Float32Array(nvox);
    const wm = new Float32Array(nvox);
    for (let i = 0; i < nvox; i++) {
      gm[i] = u16Pass0[i * 2] * inv65535;
      wm[i] = u16Pass0[i * 2 + 1] * inv65535;
    }
    readbackBuf.unmap();
    u4Tmp[3] = 1;
    device.queue.writeBuffer(clsUbo, 0, u4Tmp);
    const enc2 = device.createCommandEncoder();
    if (schedule.clsSkipped) enc2.clearBuffer(labels8Buf, 0, outBufBytes);
    const pass2 = enc2.beginComputePass();
    pass2.setPipeline(pCls.pipe);
    pass2.setBindGroup(0, bgCls);
    if (nCls > 0) pass2.dispatchWorkgroups(1, schedule.clsSkipped ? 1 : 64, nCls);
    pass2.end();
    passCategories.push("classify");
    enc2.copyBufferToBuffer(labels8Buf, 0, readbackBuf, 0, outBufBytes);
    device.queue.submit([enc2.finish()]);
    await readbackBuf.mapAsync(GPUMapMode.READ);
    const u16Pass1 = new Uint16Array(readbackBuf.getMappedRange());
    const csf = new Float32Array(nvox);
    const support = new Float32Array(nvox);
    for (let i = 0; i < nvox; i++) {
      csf[i] = u16Pass1[i * 2] * inv65535;
      support[i] = u16Pass1[i * 2 + 1] * inv65535;
    }
    readbackBuf.unmap();
    const maps = smoothAndGateTissuePriors([gm, wm, csf], support, [DIM2, DIM2, DIM2], modelEntry);
    if (ioOpts?.gpuNativeOutput) {
      return maps.map((m) => transposeVolume3D(m, [DIM2, DIM2, DIM2], [2, 1, 0]));
    }
    return maps;
  }
  return { prepareInput, finishAndReadback, warmupIoPipelines, dispose };
}
function buildSubgroupOps(subgroupMode, norm) {
  if (subgroupMode === "sg32") {
    return {
      decls: "",
      entryArgs: "",
      add: (e) => `subgroupAdd(${e})`,
      min: (e) => `subgroupMin(${e})`,
      max: (e) => `subgroupMax(${e})`
    };
  }
  const bfOps = (op, fnName) => {
    const step = (m) => op === "+" ? `  x = x + subgroupShuffleXor(x, ${m}u);` : `  x = ${op}(x, subgroupShuffleXor(x, ${m}u));`;
    if (subgroupMode === "sg64") {
      return `fn ${fnName}(v : f32) -> f32 {
  var x = v;
${step(16)}
${step(8)}
${step(4)}
${step(2)}
${step(1)}
  return x;
}
`;
    }
    const direct = op === "+" ? "subgroupAdd" : op === "min" ? "subgroupMin" : "subgroupMax";
    return `fn ${fnName}(v : f32, sg_size : u32) -> f32 {
  if (sg_size == 32u) { return ${direct}(v); }
  var x = v;
${step(16)}
${step(8)}
${step(4)}
${step(2)}
${step(1)}
  return x;
}
`;
  };
  const decls = (norm === "none" ? "" : bfOps("+", "sg32_add")) + bfOps("min", "sg32_min") + bfOps("max", "sg32_max");
  if (subgroupMode === "sg64") {
    return {
      decls,
      entryArgs: "",
      add: (e) => `sg32_add(${e})`,
      min: (e) => `sg32_min(${e})`,
      max: (e) => `sg32_max(${e})`
    };
  }
  return {
    decls,
    entryArgs: ",\n             @builtin(subgroup_size) sg_size : u32",
    add: (e) => `sg32_add(${e}, sg_size)`,
    min: (e) => `sg32_min(${e}, sg_size)`,
    max: (e) => `sg32_max(${e}, sg_size)`
  };
}
function buildSgSmallDecls({ V4, sw, norm, writeMomFn, momParams, momArgs }) {
  const isNone = norm === "none";
  const shType = isNone ? "vec2<f32>" : "vec4<f32>";
  const sgPack1Fn = isNone ? `fn sg32_pack1(a : ${V4}, slane : u32, c_out : u32, ${momParams}) -> u32 {
  let f = vec4<f32>(a${sw});
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  let sp = mx - mn;
  if (slane == 0u) {
    write_mom(c_out, vec4<f32>(0.0, 0.0, mn, sp), ${momArgs});
  }
  return pack4x8unorm((f - vec4<f32>(mn)) * select(0.0, 1.0 / sp, sp > 1e-7));
}
` : `fn sg32_pack1(a : ${V4}, slane : u32, c_out : u32, ${momParams}) -> u32 {
  let f = vec4<f32>(a${sw});
  let s = subgroupAdd(f.x + f.y + f.z + f.w);
  let q = subgroupAdd(dot(f, f));
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  let sp = mx - mn;
  if (slane == 0u) {
    write_mom(c_out, vec4<f32>(s, q, mn, sp), ${momArgs});
  }
  return pack4x8unorm((f - vec4<f32>(mn)) * select(0.0, 1.0 / sp, sp > 1e-7));
}
`;
  const sgSubStoreFn = isNone ? `fn sg_sub_store(a : ${V4}, slot : u32, sg_id : u32) {
  let f = vec4<f32>(a${sw});
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  if (sg_id == 0u) { sh_sg[slot] = vec2<f32>(mn, mx); }
}
` : `fn sg_sub_store(a : ${V4}, slot : u32, sg_id : u32) {
  let f = vec4<f32>(a${sw});
  let s = subgroupAdd(f.x + f.y + f.z + f.w);
  let q = subgroupAdd(dot(f, f));
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  if (sg_id == 0u) { sh_sg[slot] = vec4<f32>(s, q, mn, mx); }
}
`;
  const combineBody = isNone ? `      let p0 = sh_sg[rb];
      let p1 = sh_sg[rb + 1u];
      var rmn = min(p0.x, p1.x);
      var rmx = max(p0.y, p1.y);
      if (sg_size == 8u) {
        let p2 = sh_sg[rb + 2u];
        let p3 = sh_sg[rb + 3u];
        rmn = min(rmn, min(p2.x, p3.x));
        rmx = max(rmx, max(p2.y, p3.y));
      }
      let sp = rmx - rmn;
      sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
      write_mom(c_base + slane, vec4<f32>(0.0, 0.0, rmn, sp), ${momArgs});` : `      let p0 = sh_sg[rb];
      let p1 = sh_sg[rb + 1u];
      var rs = p0.x + p1.x;
      var rq = p0.y + p1.y;
      var rmn = min(p0.z, p1.z);
      var rmx = max(p0.w, p1.w);
      if (sg_size == 8u) {
        let p2 = sh_sg[rb + 2u];
        let p3 = sh_sg[rb + 3u];
        rs += p2.x + p3.x;
        rq += p2.y + p3.y;
        rmn = min(rmn, min(p2.z, p3.z));
        rmx = max(rmx, max(p2.w, p3.w));
      }
      let sp = rmx - rmn;
      sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
      write_mom(c_base + slane, vec4<f32>(rs, rq, rmn, sp), ${momArgs});`;
  return `var<workgroup> sh_sg  : array<${shType}, 128>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
${writeMomFn}${sgPack1Fn}${sgSubStoreFn}fn reduce_pack4_sg(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, sg_size : u32, sg_id : u32,
  c_base : u32, ${momParams}
) -> vec4<u32> {
  var out_q : vec4<u32>;
  if (sg_size == 32u) {
    out_q = vec4<u32>(
      sg32_pack1(a0, slane, c_base + 0u, ${momArgs}),
      sg32_pack1(a1, slane, c_base + 1u, ${momArgs}),
      sg32_pack1(a2, slane, c_base + 2u, ${momArgs}),
      sg32_pack1(a3, slane, c_base + 3u, ${momArgs})
    );
  } else {
    let b0 = (h * 4u) * 4u + (slane / sg_size);
    sg_sub_store(a0, b0 + 0u, sg_id);
    sg_sub_store(a1, b0 + 4u, sg_id);
    sg_sub_store(a2, b0 + 8u, sg_id);
    sg_sub_store(a3, b0 + 12u, sg_id);
    workgroupBarrier();
    if (slane < 4u) {
      let rb = (h * 4u + slane) * 4u;
${combineBody}
    }
    workgroupBarrier();
    let r0 = sh_res[h * 4u + 0u];
    let r1 = sh_res[h * 4u + 1u];
    let r2 = sh_res[h * 4u + 2u];
    let r3 = sh_res[h * 4u + 3u];
    out_q = vec4<u32>(
      pack4x8unorm((vec4<f32>(a0${sw}) - vec4<f32>(r0.x)) * r0.y),
      pack4x8unorm((vec4<f32>(a1${sw}) - vec4<f32>(r1.x)) * r1.y),
      pack4x8unorm((vec4<f32>(a2${sw}) - vec4<f32>(r2.x)) * r2.y),
      pack4x8unorm((vec4<f32>(a3${sw}) - vec4<f32>(r3.x)) * r3.y)
    );
  }
  return out_q;
}
`;
}
function buildShaders(cfg) {
  const {
    cs,
    chan,
    nclass,
    clsK4,
    dilations,
    activation,
    norm,
    hasF16,
    subgroupMode = "none",
    splitHalves,
    probCfg,
    chunkableStd = false
  } = cfg;
  const oc4 = cs / 4;
  const csHalf = splitHalves ? cs / 2 : cs;
  const rowStrideAct = csHalf * X4_PAD2;
  const rowStrideY = csHalf * X4_VALID2;
  const wEffVec4Total = 9 * cs * 3 * oc4;
  const biasEffVec4Off = wEffVec4Total;
  const totalWEffVec4s = wEffVec4Total + oc4;
  const useUniformWeff = hasF16 && oc4 % 2 === 0 && totalWEffVec4s * 8 <= 65536;
  const qConst = getQuantConstants(activation);
  const f16Enable = hasF16 ? "enable f16;\n" : "";
  const useSg = hasF16 && subgroupMode !== "none";
  const sgEnable = useSg ? "enable subgroups;\n" : "";
  const T = hasF16 ? "f16" : "f32";
  const suf = hasF16 ? "h" : "f";
  const V4 = `vec4<${T}>`;
  const byteScale = hasF16 ? 256 : 255;
  const buildStdEpilogue = (isPermuted) => {
    const sw = isPermuted ? ".xzyw" : "";
    const storeY = (yRowExpr, c, wordExpr) => splitHalves && c >= csHalf ? `y8_1[${yRowExpr} + ${(c - csHalf) * X4_VALID2}u] = ${wordExpr};` : `y8_0[${yRowExpr} + ${c * X4_VALID2}u] = ${wordExpr};`;
    if (useSg && (subgroupMode === "sg32" || subgroupMode === "sg64" || subgroupMode === "sg32_64")) {
      const sgOps = buildSubgroupOps(subgroupMode, norm);
      return {
        decls: sgOps.decls,
        entryArgs: sgOps.entryArgs,
        localHeader: "",
        emit: ({ accVar, cStart, cEnd, hrExpr, yRowExpr, momMode, writeY8Expr = "true" }) => rep(cEnd - cStart, (idx) => {
          const c = cStart + idx;
          const momWrite = momMode === "ext_and_main" ? `mom_ext[(${hrExpr}) * ${cs}u + ${c}u] = mv;
      mom_main[(row_idx * 2u + sg) * ${cs}u + ${c}u] = mv;` : momMode === "ext_only" ? `mom_ext[(${hrExpr}) * ${cs}u + ${c}u] = mv;` : `mom_main[(${hrExpr}) * ${cs}u + ${c}u] = mv;`;
          if (norm === "none") {
            return `  {
    let f = vec4<f32>(${accVar}.v_${idx}${sw});
    let lmn = ${sgOps.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${sgOps.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(0.0, 0.0, lmn, sp);
      ${momWrite}
    }
  }
`;
          }
          return `  {
    let f = vec4<f32>(${accVar}.v_${idx}${sw});
    let ls = ${sgOps.add("f.x + f.y + f.z + f.w")};
    let lq = ${sgOps.add("dot(f, f)")};
    let lmn = ${sgOps.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${sgOps.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(ls, lq, lmn, sp);
      ${momWrite}
    }
  }
`;
        })
      };
    }
    if (useSg && subgroupMode === "sg_small") {
      const writeMomFn = `fn write_mom(c_out : u32, mv : vec4<f32>, ext_off : u32, main_off : u32, mom_mode : u32) {
  if (mom_mode == 0u) {
    mom_main[main_off + c_out] = mv;
  } else if (mom_mode == 1u) {
    mom_ext[ext_off + c_out] = mv;
    mom_main[main_off + c_out] = mv;
  } else {
    mom_ext[ext_off + c_out] = mv;
  }
}
`;
      const decls2 = buildSgSmallDecls({
        V4,
        sw,
        norm,
        writeMomFn,
        momParams: "ext_off : u32, main_off : u32, mom_mode : u32",
        momArgs: "ext_off, main_off, mom_mode"
      });
      return {
        decls: decls2,
        entryArgs: ",\n             @builtin(subgroup_size) sg_size : u32,\n             @builtin(subgroup_invocation_id) sg_id : u32",
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, yRowExpr, momMode, writeY8Expr = "true" }) => {
          const modeCode = momMode === "ext_and_main" ? "1u" : momMode === "ext_only" ? "2u" : "0u";
          const extOff = momMode === "main" ? "0u" : `(${hrExpr}) * ${cs}u`;
          const mainOff = momMode === "ext_only" ? "0u" : `(row_idx * 2u + sg) * ${cs}u`;
          let out = `  let ep_ext_off = ${extOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4_sg(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, sg_size, sg_id, ${c}u, ep_ext_off, ep_main_off, ${modeCode});
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "qw.x")}
      ${storeY(yRowExpr, c + 1, "qw.y")}
      ${storeY(yRowExpr, c + 2, "qw.z")}
      ${storeY(yRowExpr, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    const momSwitchStmt = `    let c_out = c_base + slane;
    if (mom_mode == 0u) {
      mom_main[main_off + c_out] = mv;
    } else if (mom_mode == 1u) {
      mom_ext[ext_off + c_out] = mv;
      mom_main[main_off + c_out] = mv;
    } else {
      mom_ext[ext_off + c_out] = mv;
    }`;
    if (norm === "none" && hasF16) {
      const unroll31 = rep(31, (i) => {
        const k = i + 1;
        return `    {
      let m = sh_mm[rb + ${k}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`;
      });
      const decls2 = `var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec4<u32> {
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let m0 = sh_mm[rb];
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${unroll31}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, fmn, sp);
${momSwitchStmt}
  }
  workgroupBarrier();
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let f2 = vec4<f32>(a2${sw});
  let f3 = vec4<f32>(a3${sw});
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`;
      return {
        decls: decls2,
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, yRowExpr, momMode, writeY8Expr = "true" }) => {
          const modeCode = momMode === "ext_and_main" ? "1u" : momMode === "ext_only" ? "2u" : "0u";
          const extOff = momMode === "main" ? "0u" : `(${hrExpr}) * ${cs}u`;
          const mainOff = momMode === "ext_only" ? "0u" : `(row_idx * 2u + sg) * ${cs}u`;
          let out = `  let ep_ext_off = ${extOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, ${c}u, ep_ext_off, ep_main_off, ${modeCode});
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "qw.x")}
      ${storeY(yRowExpr, c + 1, "qw.y")}
      ${storeY(yRowExpr, c + 2, "qw.z")}
      ${storeY(yRowExpr, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    if (norm === "none") {
      const unroll322 = rep(32, (k) => `    {
      let m = sh_mm[rb + ${k}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);
      const decls2 = `var<workgroup> sh_mm  : array<vec2<f32>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack4(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let f2 = vec4<f32>(a2${sw});
  let f3 = vec4<f32>(a3${sw});
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  sh_mm[b0 + 64u] = vec_mm(f2);
  sh_mm[b0 + 96u] = vec_mm(f3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${unroll322}    let sp = rmx - rmn;
    sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, rmn, sp);
${momSwitchStmt}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`;
      return {
        decls: decls2,
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, yRowExpr, momMode, writeY8Expr = "true" }) => {
          const modeCode = momMode === "ext_and_main" ? "1u" : momMode === "ext_only" ? "2u" : "0u";
          const extOff = momMode === "main" ? "0u" : `(${hrExpr}) * ${cs}u`;
          const mainOff = momMode === "ext_only" ? "0u" : `(row_idx * 2u + sg) * ${cs}u`;
          let out = `  let ep_ext_off = ${extOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, ${c}u, ep_ext_off, ep_main_off, ${modeCode});
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "qw.x")}
      ${storeY(yRowExpr, c + 1, "qw.y")}
      ${storeY(yRowExpr, c + 2, "qw.z")}
      ${storeY(yRowExpr, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    if (hasF16) {
      const unroll31 = rep(31, (i) => {
        const k = i + 1;
        return `    {
      let s = sh_sq[rb + ${k}u];
      let m = sh_mm[rb + ${k}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`;
      });
      const decls2 = `var<workgroup> sh_sq  : array<vec2<f32>, 1024>;
var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let f2 = vec4<f32>(a2${sw});
  let f3 = vec4<f32>(a3${sw});
  let b0 = (h * 4u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_sq[b0 + 64u] = vec2<f32>(f2.x + f2.y + f2.z + f2.w, dot(f2, f2));
  sh_sq[b0 + 96u] = vec2<f32>(f3.x + f3.y + f3.z + f3.w, dot(f3, f3));
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let s0 = sh_sq[rb];
    let m0 = sh_mm[rb];
    var rs : f32 = s0.x;
    var rq : f32 = s0.y;
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${unroll31}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, fmn, sp);
${momSwitchStmt}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`;
      return {
        decls: decls2,
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, yRowExpr, momMode, writeY8Expr = "true" }) => {
          const modeCode = momMode === "ext_and_main" ? "1u" : momMode === "ext_only" ? "2u" : "0u";
          const extOff = momMode === "main" ? "0u" : `(${hrExpr}) * ${cs}u`;
          const mainOff = momMode === "ext_only" ? "0u" : `(row_idx * 2u + sg) * ${cs}u`;
          let out = `  let ep_ext_off = ${extOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, ${c}u, ep_ext_off, ep_main_off, ${modeCode});
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "qw.x")}
      ${storeY(yRowExpr, c + 1, "qw.y")}
      ${storeY(yRowExpr, c + 2, "qw.z")}
      ${storeY(yRowExpr, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    const unroll32 = rep(32, (k) => `    {
      let s = sh_sq[rb + ${k}u];
      let m = sh_mm[rb + ${k}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);
    const decls = `var<workgroup> sh_sq  : array<vec2<f32>, 512>;
var<workgroup> sh_mm  : array<vec2<f32>, 512>;
var<workgroup> sh_res : array<vec2<f32>, 16>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack2(
  a0 : ${V4}, a1 : ${V4},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec2<u32> {
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let b0 = (h * 2u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  workgroupBarrier();
  if (slane < 2u) {
    let rb = (h * 2u + slane) * 32u;
    var rs : f32 = 0.0;
    var rq : f32 = 0.0;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${unroll32}    let sp = rmx - rmn;
    sh_res[h * 2u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, rmn, sp);
${momSwitchStmt}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 2u + 0u];
  let r1 = sh_res[h * 2u + 1u];
  return vec2<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y)
  );
}
`;
    return {
      decls,
      localHeader: "  let h = lid.y * 2u + sg;\n",
      emit: ({ accVar, cStart, cEnd, hrExpr, yRowExpr, momMode, writeY8Expr = "true" }) => {
        const modeCode = momMode === "ext_and_main" ? "1u" : momMode === "ext_only" ? "2u" : "0u";
        const extOff = momMode === "main" ? "0u" : `(${hrExpr}) * ${cs}u`;
        const mainOff = momMode === "ext_only" ? "0u" : `(row_idx * 2u + sg) * ${cs}u`;
        let out = `  let ep_ext_off = ${extOff};
  let ep_main_off = ${mainOff};
`;
        for (let idx = 0; idx < cEnd - cStart; idx += 2) {
          const c = cStart + idx;
          out += `  {
    let qw = reduce_pack2(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, h, slane, ${c}u, ep_ext_off, ep_main_off, ${modeCode});
    if (${writeY8Expr}) {
      ${storeY(yRowExpr, c, "qw.x")}
      ${storeY(yRowExpr, c + 1, "qw.y")}
    }
  }
`;
        }
        return out;
      }
    };
  };
  const initActWgsl = () => `
@group(0) @binding(0) var<storage, read_write> act0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act1 : array<u32>;
@compute @workgroup_size(${X4_PAD2}, 1, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let row_base = (wid.z * 256u + wid.y) * ${rowStrideAct}u + lid.x;
  let val = ${qConst.uZeroWord}u;
  for (var c : u32 = 0u; c < ${csHalf}u; c = c + 1u) {
    let idx = row_base + c * ${X4_PAD2}u;
    act0[idx] = val;
    ${splitHalves ? "act1[idx] = val;" : ""}
  }
}`;
  const d0 = dilations[0];
  const conv0Wgsl = () => {
    const halfPass0 = !hasF16 && splitHalves;
    const ep0 = buildStdEpilogue(false);
    const fmaRange = (cStart, cEnd) => {
      const gStart = cStart / 4;
      const gEnd = cEnd / 4;
      return rep(gEnd - gStart, (gi) => {
        const g = gStart + gi;
        const o = g * 4;
        return `          {
            let w0 = w16_4[wb + ${g}u];
            let w1 = w16_4[wb + ${oc4 + g}u];
            let w2 = w16_4[wb + ${2 * oc4 + g}u];
            a_${o}     = fma(vn, ${V4}(w0.x), fma(vc, ${V4}(w1.x), fma(vp, ${V4}(w2.x), a_${o})));
            a_${o + 1} = fma(vn, ${V4}(w0.y), fma(vc, ${V4}(w1.y), fma(vp, ${V4}(w2.y), a_${o + 1})));
            a_${o + 2} = fma(vn, ${V4}(w0.z), fma(vc, ${V4}(w1.z), fma(vp, ${V4}(w2.z), a_${o + 2})));
            a_${o + 3} = fma(vn, ${V4}(w0.w), fma(vc, ${V4}(w1.w), fma(vp, ${V4}(w2.w), a_${o + 3})));
          }
`;
      });
    };
    const q0 = Math.floor(d0 / 4);
    const r0 = d0 % 4;
    let loadInp0 = "";
    if (r0 === 0) {
      loadInp0 = `
        let vn = inp_4[base - ${q0}u];
        let vc = inp_4[base];
        let vp = inp_4[base + ${q0}u];`;
    } else if (q0 === 0 && r0 === 1) {
      loadInp0 = `
        let vL = inp_4[base - 1u];
        let vc = inp_4[base];
        let vR = inp_4[base + 1u];
        let vn = ${V4}(vL.w, vc.xyz);
        let vp = ${V4}(vc.yzw, vR.x);`;
    } else if (r0 === 1) {
      loadInp0 = `
        let vL = inp_4[base - ${q0 + 1}u];
        let vN = inp_4[base - ${q0}u];
        let vc = inp_4[base];
        let vP = inp_4[base + ${q0}u];
        let vR = inp_4[base + ${q0 + 1}u];
        let vn = ${V4}(vL.w, vN.xyz);
        let vp = ${V4}(vP.yzw, vR.x);`;
    } else if (r0 === 2) {
      loadInp0 = `
        let vL = inp_4[base - ${q0 + 1}u];
        let vN = ${q0 === 0 ? "inp_4[base]" : `inp_4[base - ${q0}u]`};
        let vc = ${q0 === 0 ? "vN" : "inp_4[base]"};
        let vP = ${q0 === 0 ? "vN" : `inp_4[base + ${q0}u]`};
        let vR = inp_4[base + ${q0 + 1}u];
        let vn = ${V4}(vL.zw, vN.xy);
        let vp = ${V4}(vP.zw, vR.xy);`;
    } else {
      loadInp0 = `
        let vL = inp_4[base - ${q0 + 1}u];
        let vN = ${q0 === 0 ? "inp_4[base]" : `inp_4[base - ${q0}u]`};
        let vc = ${q0 === 0 ? "vN" : "inp_4[base]"};
        let vP = ${q0 === 0 ? "vN" : `inp_4[base + ${q0}u]`};
        let vR = inp_4[base + ${q0 + 1}u];
        let vn = ${V4}(vL.yzw, vN.x);
        let vp = ${V4}(vP.w, vR.xyz);`;
    }
    const emitConv0Compute = (fnName, structName, cStart, cEnd) => {
      const nCh = cEnd - cStart;
      const fields = rep(nCh, (i) => `  v_${i} : ${V4},
`);
      const accInit = rep(nCh, (i) => {
        const c = cStart + i;
        return norm === "none" ? `  var a_${c} = ${V4}(${T}(qmeta[${3 * cs + c}u]));
` : `  var a_${c} = ${V4}(0.0${suf});
`;
      });
      const retArgs = Array.from({ length: nCh }, (_, i) => `a_${cStart + i}`).join(", ");
      return `struct ${structName} {
${fields}};
fn ${fnName}(y : i32, z : i32, x_pad : u32) -> ${structName} {
${accInit}  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * ${d0};
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * ${d0};
      if ((u32(sz) | u32(sy)) < 256u) {
        let base = (u32(sz) * 256u + u32(sy)) * ${X4_PAD2}u + x_pad;
${loadInp0}
        let wb = tap_yz * ${3 * oc4}u;
${fmaRange(cStart, cEnd)}
      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${structName}(${retArgs});
}
`;
    };
    const emitConv0Entry = (fnName, computeFn, cStart, cEnd, isBgEntry) => {
      const coords = isBgEntry ? "  let y = i32(p0.bg_y0 + lid.y);\n  let z = i32(p0.bg_z0);" : `  var y : i32;
  var z : i32;
  if (p0.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(wid.z);
  } else {
    let pk = strips0[wid.z];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`;
      const hrExpr = isBgEntry ? "lid.y * 2u + sg" : "row_idx * 2u + sg";
      return `
@compute @workgroup_size(64, 4, 1)
fn ${fnName}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${ep0.entryArgs || ""}) {
  let sg = lid.x >> 5u;
  let slane = lid.x & 31u;
${ep0.localHeader}  let x_pad = lid.x + ${X4_HALO2}u;
${coords}
  let acc = ${computeFn}(y, z, x_pad);
  let row_idx = u32(z) * 256u + u32(y);
  let y_row_base = row_idx * ${rowStrideY}u + lid.x;
${ep0.emit({
        accVar: "acc",
        cStart,
        cEnd,
        hrExpr,
        yRowExpr: "y_row_base",
        momMode: isBgEntry ? "ext_only" : "main"
      })}}`;
    };
    const helpersAndEntries = halfPass0 ? emitConv0Compute("run_conv0_lo", "Conv0AccLo", 0, csHalf) + emitConv0Compute("run_conv0_hi", "Conv0AccHi", csHalf, cs) + emitConv0Entry("main_lo", "run_conv0_lo", 0, csHalf, false) + emitConv0Entry("main_hi", "run_conv0_hi", csHalf, cs, false) + emitConv0Entry("main_bg_lo", "run_conv0_lo", 0, csHalf, true) + emitConv0Entry("main_bg_hi", "run_conv0_hi", csHalf, cs, true) : emitConv0Compute("run_conv0", "Conv0Acc", 0, cs) + emitConv0Entry("main", "run_conv0", 0, cs, false) + emitConv0Entry("main_bg", "run_conv0", 0, cs, true);
    return `${f16Enable}${sgEnable}
struct Params0 {
  is_full : u32,
  bg_y0 : u32,
  bg_z0 : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> inp_4 : array<${V4}>;
@group(0) @binding(1) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(3) var<storage, read> w16_4 : array<${V4}>;
@group(0) @binding(4) var<storage, read> qmeta : array<f32>;
@group(0) @binding(5) var<storage, read_write> mom_main : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read_write> mom_ext : array<vec4<f32>>;
@group(0) @binding(7) var<storage, read> strips0 : array<u32>;
@group(0) @binding(8) var<uniform> p0 : Params0;
${ep0.decls}${helpersAndEntries}`;
  };
  const prepWgsl = () => `${f16Enable}
${getActivationWgsl(activation)}
struct PrepParams {
  meta_off : u32,
  next_w_vec4_off : u32,
  next_meta_off : u32,
  has_next : u32,
  is_first : u32,
  is_full : u32,
  n_main_strips : u32,
  n_ext_hr : u32,
  ext_weight : f32,
  pad0 : u32,
  pad1 : u32,
  pad2 : u32,
};
@group(0) @binding(0) var<storage, read> w16_4 : array<${V4}>;
@group(0) @binding(1) var<storage, read> qmeta : array<f32>;
@group(0) @binding(2) var<storage, read_write> mom_main : array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> mom_ext : array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> mom_stats : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read_write> w_eff : array<${V4}>;
@group(0) @binding(6) var<storage, read> main_strips : array<u32>;
@group(0) @binding(7) var<uniform> pp : PrepParams;

${norm === "gn" ? `var<workgroup> fin_s  : array<f32, 256>;
var<workgroup> fin_q  : array<f32, 256>;
var<workgroup> fin_es : array<f32, 256>;
var<workgroup> fin_eq : array<f32, 256>;
` : ""}var<workgroup> fin_mn : array<f32, 256>;
var<workgroup> fin_mx : array<f32, 256>;

@compute @workgroup_size(256, 1, 1)
fn moments_finish(@builtin(local_invocation_index) lid : u32,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let c = wid.x;
${norm === "gn" ? `  var s : f32 = 0.0;
  var q : f32 = 0.0;
  var es : f32 = 0.0;
  var eq : f32 = 0.0;
` : ""}  var mn : f32 = 3.0e38;
  var mx : f32 = -3.0e38;
  if (pp.is_full != 0u) {
    for (var hr : u32 = lid; hr < ${TOTAL_HALF_ROWS}u; hr = hr + 256u) {
      let v = mom_main[hr * ${cs}u + c];
${norm === "gn" ? "      s  += v.x;\n      q  += v.y;\n" : ""}      mn  = min(mn, v.z);
      mx  = max(mx, v.z + v.w);
    }
  } else {
    for (var si : u32 = lid; si < pp.n_main_strips; si = si + 256u) {
      let pk = main_strips[si];
      let base_hr = ((pk >> 8u) * 256u + (pk & 255u) * 4u) * 2u;
      for (var h : u32 = 0u; h < 8u; h = h + 1u) {
        let v = mom_main[(base_hr + h) * ${cs}u + c];
${norm === "gn" ? "        s  += v.x;\n        q  += v.y;\n" : ""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
    if (pp.is_first != 0u) {
      mn = min(mn, 0.0);
      mx = max(mx, 0.0);
    } else if (pp.n_ext_hr > 0u) {
      for (var e : u32 = lid; e < pp.n_ext_hr; e = e + 256u) {
        let v = mom_ext[e * ${cs}u + c];
${norm === "gn" ? "        es += v.x;\n        eq += v.y;\n" : ""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
  }
${norm === "gn" ? `  fin_s[lid]  = s;
  fin_q[lid]  = q;
  fin_es[lid] = es;
  fin_eq[lid] = eq;
` : ""}  fin_mn[lid] = mn;
  fin_mx[lid] = mx;
  workgroupBarrier();
  for (var stride : u32 = 128u; stride > 0u; stride = stride >> 1u) {
    if (lid < stride) {
${norm === "gn" ? `      fin_s[lid]  += fin_s[lid + stride];
      fin_q[lid]  += fin_q[lid + stride];
      fin_es[lid] += fin_es[lid + stride];
      fin_eq[lid] += fin_eq[lid + stride];
` : ""}      fin_mn[lid]  = min(fin_mn[lid], fin_mn[lid + stride]);
      fin_mx[lid]  = max(fin_mx[lid], fin_mx[lid + stride]);
    }
    workgroupBarrier();
  }
  if (lid == 0u) {
    let mbase = pp.meta_off;
    let gamma = qmeta[mbase + c];
    let beta  = qmeta[mbase + ${cs}u + c];
    let eps_base = qmeta[mbase + ${2 * cs}u + c];
    let q_prev = select(mom_stats[${cs * 2}u].x, 1.0, pp.is_first != 0u);
    let eff_eps = eps_base / (q_prev * q_prev);
${norm === "gn" ? `    let total_s = fin_s[0] + pp.ext_weight * fin_es[0];
    let total_q = fin_q[0] + pp.ext_weight * fin_eq[0];
    let mean = total_s / 16777216.0;
    let varr = max(total_q / 16777216.0 - mean * mean, 0.0);
    let inv_std = inverseSqrt(varr + eff_eps);
` : `    let mean : f32 = 0.0;
    let inv_std : f32 = 1.0;
`}    let scale = inv_std * gamma;
    let shift = beta - mean * scale;
    let u_lo = fin_mn[0] * scale + shift;
    let u_hi = fin_mx[0] * scale + shift;
    let vmax = max(0.25, max(act(u_lo), act(u_hi)));
    ${activation === "gelu_tanh" ? `
    let qs = select(max(vmax / 248.0, 0.1705 / 7.0), 1.0, c >= ${chan}u);
    ` : activation === "relu" ? `
    let qs = select(max(vmax / 255.0, 1e-6), 1.0, c >= ${chan}u);
    ` : `
    let qs = select(max(vmax / 223.0, 1.0 / 32.0), 1.0, c >= ${chan}u);
    `}
    let sb = c * 2u;
    mom_stats[sb]      = vec4<f32>(mean, inv_std, qs, 1.0 / qs);
    mom_stats[sb + 1u] = vec4<f32>(scale, shift, 0.0, 0.0);
  }
}

@compute @workgroup_size(256, 1, 1)
fn prep_weff(@builtin(local_invocation_index) lid : u32) {
  if (pp.has_next == 0u) { return; }
  var q_ref : f32 = 1e-6;
  for (var ic : u32 = 0u; ic < ${chan}u; ic = ic + 1u) {
    let qs = mom_stats[ic * 2u].z;
    q_ref = max(q_ref, ${byteScale.toFixed(1)} * qs);
  }
  ${norm === "none" ? "q_ref = 1.0;" : ""}
  if (lid == 0u) {
    mom_stats[${cs * 2}u] = vec4<f32>(q_ref, 0.0, 0.0, 0.0);
  }
  let scale_num = ${byteScale.toFixed(1)} / q_ref;
  for (var idx : u32 = lid; idx < ${wEffVec4Total}u; idx = idx + 256u) {
    let ic = (idx / ${3 * oc4}u) % ${cs}u;
    let qs = mom_stats[ic * 2u].z;
    w_eff[idx] = w16_4[pp.next_w_vec4_off + idx] * ${T}(qs * scale_num);
  }
  if (lid < ${oc4}u) {
    ${norm === "none" ? `
    let mb = pp.next_meta_off + ${3 * cs}u + lid * 4u;
    w_eff[${biasEffVec4Off}u + lid] = ${V4}(${T}(qmeta[mb]), ${T}(qmeta[mb + 1u]), ${T}(qmeta[mb + 2u]), ${T}(qmeta[mb + 3u]));
    ` : `
    w_eff[${biasEffVec4Off}u + lid] = ${V4}(0.0${suf});
    `}
  }
}`;
  const normWgsl = () => `${getActivationWgsl(activation)}
struct NormParams {
  is_full : u32,
  bg_row : u32,
  halo_off : u32,
  n_halo : u32,
};
@group(0) @binding(0) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read> y8_1 : array<u32>;
@group(0) @binding(4) var<storage, read> mom_main : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> mom_ext : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read> mom_stats : array<vec4<f32>>;
@group(0) @binding(7) var<storage, read> norm_aux : array<u32>;
@group(0) @binding(8) var<uniform> np : NormParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${X4_HALO2}u;
  var y : u32;
  var z : u32;
  if (np.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = norm_aux[wid.z];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let hr = row_idx * 2u + sg;
  let y_base = row_idx * ${rowStrideY}u + x4;
  let a_base = row_idx * ${rowStrideAct}u + x_pad;
  let mom_base = hr * ${cs}u;

  for (var c : u32 = 0u; c < ${csHalf}u; c = c + 1u) {
    let inv_qs = mom_stats[c * 2u].w;
    let st = mom_stats[c * 2u + 1u];
    let rm = mom_main[mom_base + c];
    let yv = unpack4x8unorm(y8_0[y_base + c * ${X4_VALID2}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_0[a_base + c * ${X4_PAD2}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${qConst.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }
  ${splitHalves ? `
  for (var c : u32 = 0u; c < ${csHalf}u; c = c + 1u) {
    let cg = ${csHalf}u + c;
    let inv_qs = mom_stats[cg * 2u].w;
    let st = mom_stats[cg * 2u + 1u];
    let rm = mom_main[mom_base + cg];
    let yv = unpack4x8unorm(y8_1[y_base + c * ${X4_VALID2}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_1[a_base + c * ${X4_PAD2}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${qConst.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }` : ""}
}

@compute @workgroup_size(64, 4, 1)
fn norm_halo_fill(@builtin(local_invocation_id) lid : vec3<u32>,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let idx = wid.y * 4u + lid.y;
  if (idx >= np.n_halo) { return; }
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${X4_HALO2}u;
  let y_base = np.bg_row * ${rowStrideY}u + x4;
  let mom_base = sg * ${cs}u;
  let dst_row = norm_aux[np.halo_off + idx];
  let a_base = dst_row * ${rowStrideAct}u + x_pad;

  for (var c : u32 = 0u; c < ${csHalf}u; c = c + 1u) {
    let inv_qs = mom_stats[c * 2u].w;
    let st = mom_stats[c * 2u + 1u];
    let rm = mom_ext[mom_base + c];
    let yv = unpack4x8unorm(y8_0[y_base + c * ${X4_VALID2}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_0[a_base + c * ${X4_PAD2}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${qConst.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }
  ${splitHalves ? `
  for (var c : u32 = 0u; c < ${csHalf}u; c = c + 1u) {
    let cg = ${csHalf}u + c;
    let inv_qs = mom_stats[cg * 2u].w;
    let st = mom_stats[cg * 2u + 1u];
    let rm = mom_ext[mom_base + cg];
    let yv = unpack4x8unorm(y8_1[y_base + c * ${X4_VALID2}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_1[a_base + c * ${X4_PAD2}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${qConst.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }` : ""}
}`;
  const convWgsl = () => {
    const halfPass = !hasF16 && splitHalves;
    const epC = buildStdEpilogue(hasF16);
    const emitUnpack = (vName, uExpr) => {
      if (hasF16) {
        return `
          let ${vName} = vec4<f16>(vec2<f16>(unpack2x16float(((${uExpr} & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((${uExpr} >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(${qConst.sterbenzSub});`;
      }
      return `
          let ${vName} = unpack4x8unorm(${uExpr}) - vec4<f32>(${qConst.uZeroFloat});`;
    };
    const emitLoads = (arrName) => `
          let uL = ${arrName}[base - off0];
          let uN = ${arrName}[base - off1];
          let uC = ${arrName}[base];
          let uP = ${arrName}[base + off1];
          let uR = ${arrName}[base + off0];
          let u_neg = (uL >> sh_l) | (uN << sh_r);
          let u_pos = (uP >> sh_r) | (uR << sh_l);` + emitUnpack("vn", "u_neg") + emitUnpack("vc", "uC") + emitUnpack("vp", "u_pos");
    const emitFmas = (cStart, cEnd) => {
      const gStart = cStart / 4;
      const gEnd = cEnd / 4;
      if (useUniformWeff) {
        const hp1 = oc4 / 2;
        const hp2 = oc4;
        let s = "";
        for (let g = gStart; g < gEnd; g += 2) {
          const o = g * 4;
          const hp = g / 2;
          s += `          {
            let wp0 = w_eff_u[wbu + ${hp}u];
            let wp1 = w_eff_u[wbu + ${hp1 + hp}u];
            let wp2 = w_eff_u[wbu + ${hp2 + hp}u];
            let w0a = u4_lo(wp0);
            let w0b = u4_hi(wp0);
            let w1a = u4_lo(wp1);
            let w1b = u4_hi(wp1);
            let w2a = u4_lo(wp2);
            let w2b = u4_hi(wp2);
            a_${o}     = fma(vn, vec4<f16>(w0a.x), fma(vc, vec4<f16>(w1a.x), fma(vp, vec4<f16>(w2a.x), a_${o})));
            a_${o + 1} = fma(vn, vec4<f16>(w0a.y), fma(vc, vec4<f16>(w1a.y), fma(vp, vec4<f16>(w2a.y), a_${o + 1})));
            a_${o + 2} = fma(vn, vec4<f16>(w0a.z), fma(vc, vec4<f16>(w1a.z), fma(vp, vec4<f16>(w2a.z), a_${o + 2})));
            a_${o + 3} = fma(vn, vec4<f16>(w0a.w), fma(vc, vec4<f16>(w1a.w), fma(vp, vec4<f16>(w2a.w), a_${o + 3})));
            a_${o + 4} = fma(vn, vec4<f16>(w0b.x), fma(vc, vec4<f16>(w1b.x), fma(vp, vec4<f16>(w2b.x), a_${o + 4})));
            a_${o + 5} = fma(vn, vec4<f16>(w0b.y), fma(vc, vec4<f16>(w1b.y), fma(vp, vec4<f16>(w2b.y), a_${o + 5})));
            a_${o + 6} = fma(vn, vec4<f16>(w0b.z), fma(vc, vec4<f16>(w1b.z), fma(vp, vec4<f16>(w2b.z), a_${o + 6})));
            a_${o + 7} = fma(vn, vec4<f16>(w0b.w), fma(vc, vec4<f16>(w1b.w), fma(vp, vec4<f16>(w2b.w), a_${o + 7})));
          }
`;
        }
        return s;
      }
      return rep(gEnd - gStart, (gi) => {
        const g = gStart + gi;
        const o = g * 4;
        return `          {
            let w0 = w_eff[wb + ${g}u];
            let w1 = w_eff[wb + ${oc4 + g}u];
            let w2 = w_eff[wb + ${2 * oc4 + g}u];
            a_${o}     = fma(vn, ${V4}(w0.x), fma(vc, ${V4}(w1.x), fma(vp, ${V4}(w2.x), a_${o})));
            a_${o + 1} = fma(vn, ${V4}(w0.y), fma(vc, ${V4}(w1.y), fma(vp, ${V4}(w2.y), a_${o + 1})));
            a_${o + 2} = fma(vn, ${V4}(w0.z), fma(vc, ${V4}(w1.z), fma(vp, ${V4}(w2.z), a_${o + 2})));
            a_${o + 3} = fma(vn, ${V4}(w0.w), fma(vc, ${V4}(w1.w), fma(vp, ${V4}(w2.w), a_${o + 3})));
          }
`;
      });
    };
    const emitConvCompute = (fnName, structName, cStart, cEnd) => {
      const nCh = cEnd - cStart;
      const fields = rep(nCh, (i) => `  v_${i} : ${V4},
`);
      const accInit = rep(nCh, (i) => {
        const c = cStart + i;
        if (norm === "none") {
          const g = c >>> 2;
          const sw = ["x", "y", "z", "w"][c & 3];
          if (useUniformWeff) {
            const uVecIdx = biasEffVec4Off + g >>> 1;
            const ufn = biasEffVec4Off + g & 1 ? "u4_hi" : "u4_lo";
            return `  var a_${c} = ${V4}(${ufn}(w_eff_u[${uVecIdx}u]).${sw});
`;
          }
          return `  var a_${c} = ${V4}(w_eff[${biasEffVec4Off + g}u].${sw});
`;
        }
        return `  var a_${c} = ${V4}(0.0${suf});
`;
      });
      const icLim = csHalf <= 8 ? `(${csHalf}u + cp.pad0)` : `${csHalf}u`;
      const wLoopLo = useUniformWeff ? `        let wbu_tap = tap_yz * ${cs * 3 * oc4 / 2}u;
        for (var ic : u32 = 0u; ic < ${icLim}; ic = ic + 1u) {
          let base = row_off + ic * ${X4_PAD2}u;
${emitLoads("act8_0")}
          let wbu = wbu_tap + ic * ${3 * oc4 / 2}u;
${emitFmas(cStart, cEnd)}
        }` : `        let wb_tap = tap_yz * ${cs * 3 * oc4}u;
        for (var ic : u32 = 0u; ic < ${icLim}; ic = ic + 1u) {
          let base = row_off + ic * ${X4_PAD2}u;
${emitLoads("act8_0")}
          let wb = wb_tap + ic * ${3 * oc4}u;
${emitFmas(cStart, cEnd)}
        }`;
      const wLoopHi = useUniformWeff ? `        for (var ic : u32 = 0u; ic < ${icLim}; ic = ic + 1u) {
          let base = row_off + ic * ${X4_PAD2}u;
${emitLoads("act8_1")}
          let wbu = wbu_tap + (${csHalf}u + ic) * ${3 * oc4 / 2}u;
${emitFmas(cStart, cEnd)}
        }` : `        for (var ic : u32 = 0u; ic < ${icLim}; ic = ic + 1u) {
          let base = row_off + ic * ${X4_PAD2}u;
${emitLoads("act8_1")}
          let wb = wb_tap + (${csHalf}u + ic) * ${3 * oc4}u;
${emitFmas(cStart, cEnd)}
        }`;
      const retArgs = Array.from({ length: nCh }, (_, i) => `a_${cStart + i}`).join(", ");
      return `struct ${structName} {
${fields}};
fn ${fnName}(y : i32, z : i32, x_pad : u32, dp : u32) -> ${structName} {
${accInit}  let d_step = i32(dp & 63u);
  let off0 = (dp >> 6u) & 15u;
  let off1 = (dp >> 10u) & 15u;
  let sh_r = (dp >> 14u) & 31u;
  let sh_l = (dp >> 19u) & 31u;
  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * d_step;
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * d_step;
      if ((u32(sz) | u32(sy)) < 256u) {
        let row_off = (u32(sz) * 256u + u32(sy)) * ${rowStrideAct}u + x_pad;
${wLoopLo}
        ${splitHalves ? wLoopHi : ""}
      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${structName}(${retArgs});
}
`;
    };
    const emitConvEntry = (fnName, computeFn, cStart, cEnd, isExtEntry) => {
      const coords = isExtEntry ? chunkableStd ? `
  let ext_i = cp.ext_base + wid.z;
  let pk = strips[cp.ext_off + ext_i];
  let y = i32((pk & 255u) * 4u + lid.y);
  let z = i32(pk >> 8u);` : `
  let pk = strips[cp.ext_off + wid.z];
  let y = i32((pk & 255u) * 4u + lid.y);
  let z = i32(pk >> 8u);` : chunkableStd ? `
  var y : i32;
  var z : i32;
  if (cp.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(cp.main_off + wid.z);
  } else {
    let pk = strips[cp.main_off + wid.z];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }` : `
  var y : i32;
  var z : i32;
  if (cp.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(wid.z);
  } else {
    let pk = strips[wid.z];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`;
      const hrExpr = isExtEntry ? chunkableStd ? "ext_i * 8u + lid.y * 2u + sg" : "wid.z * 8u + lid.y * 2u + sg" : "row_idx * 2u + sg";
      const writeY8Expr = isExtEntry ? "(((dp >> 24u) & 1u) != 0u)" : "true";
      return `
@compute @workgroup_size(64, 4, 1)
fn ${fnName}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${epC.entryArgs || ""}) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let slane = x4 & 31u;
${epC.localHeader}  let x_pad = x4 + ${X4_HALO2}u;
${coords}
  let dp = cp.d_pack;
  let acc = ${computeFn}(y, z, x_pad, dp);
  let row_idx = u32(z) * 256u + u32(y);
  let y_row_base = row_idx * ${rowStrideY}u + x4;
${epC.emit({
        accVar: "acc",
        cStart,
        cEnd,
        hrExpr,
        yRowExpr: "y_row_base",
        momMode: isExtEntry ? "ext_and_main" : "main",
        writeY8Expr
      })}}`;
    };
    const helpersAndEntries = halfPass ? emitConvCompute("run_conv_lo", "ConvAccLo", 0, csHalf) + emitConvCompute("run_conv_hi", "ConvAccHi", csHalf, cs) + emitConvEntry("main_lo", "run_conv_lo", 0, csHalf, false) + emitConvEntry("main_hi", "run_conv_hi", csHalf, cs, false) + emitConvEntry("main_ext_lo", "run_conv_lo", 0, csHalf, true) + emitConvEntry("main_ext_hi", "run_conv_hi", csHalf, cs, true) : emitConvCompute("run_conv", "ConvAcc", 0, cs) + emitConvEntry("main", "run_conv", 0, cs, false) + emitConvEntry("main_ext", "run_conv", 0, cs, true);
    const wEffDecl = useUniformWeff ? `fn u4_lo(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.x)), vec2<f16>(unpack2x16float(u.y)));
}
fn u4_hi(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.z)), vec2<f16>(unpack2x16float(u.w)));
}
@group(0) @binding(6) var<uniform> w_eff_u : array<vec4<u32>, ${Math.ceil(totalWEffVec4s / 2)}>;` : `@group(0) @binding(6) var<storage, read> w_eff : array<${V4}>;`;
    const convParamsDecl = chunkableStd ? `struct ConvParams {
  is_full : u32,
  ext_off : u32,
  d_pack : u32,
  pad0 : u32,
  main_off : u32,
  ext_base : u32,
  pad1 : u32,
  pad2 : u32,
};` : `struct ConvParams {
  is_full : u32,
  ext_off : u32,
  d_pack : u32,
  pad0 : u32,
};`;
    return `${f16Enable}${sgEnable}
${convParamsDecl}
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(4) var<storage, read_write> mom_main : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read_write> mom_ext : array<vec4<f32>>;
${wEffDecl}
@group(0) @binding(7) var<storage, read> strips : array<u32>;
@group(0) @binding(8) var<uniform> cp : ConvParams;
${epC.decls}${helpersAndEntries}`;
  };
  const clsWgsl = () => `${f16Enable}
${getActivationWgsl(activation)}
struct ClsParams {
  w_vec4_off : u32,
  bias_off : u32,
  is_full : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> y8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> y8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> w16_4 : array<${V4}>;
@group(0) @binding(3) var<storage, read> qmeta : array<f32>;
@group(0) @binding(4) var<storage, read> mom_main : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> mom_stats : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read_write> labels8 : array<u32>;
@group(0) @binding(7) var<storage, read> cls_strips : array<u32>;
@group(0) @binding(8) var<uniform> cp : ClsParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  var y : u32;
  var z : u32;
  if (cp.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = cls_strips[wid.z];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let hr = row_idx * 2u + sg;
  let y_base = row_idx * ${rowStrideY}u + x4;
  let mom_base = hr * ${cs}u;

  var feat : array<${V4}, ${chan}>;
  for (var c : u32 = 0u; c < ${chan}u; c = c + 1u) {
    let st = mom_stats[c * 2u + 1u];
    let rm = mom_main[mom_base + c];
    ${splitHalves ? `
    let in_hi = c >= ${csHalf}u;
    let c_loc = select(c, c - ${csHalf}u, in_hi);
    let idx4 = y_base + c_loc * ${X4_VALID2}u;
    let q_word = select(y8_0[idx4], y8_1[idx4], in_hi);
    ` : `
    let q_word = y8_0[y_base + c * ${X4_VALID2}u];
    `}
    let yv = unpack4x8unorm(q_word) * rm.w + vec4<f32>(rm.z);
    let fv = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    feat[c] = ${V4}(fv);
  }

  let w_cls = cp.w_vec4_off;
  let m_cls = cp.bias_off;
${buildClassifierLoopsWgsl({
    chan,
    clsK4,
    nclass,
    V4,
    suf,
    readBiasStmt: "",
    biasExpr: (j) => `qmeta[m_cls + k_base + ${j}u]`,
    probCfg
  })}
}`;
  return {
    initActWgsl,
    conv0Wgsl,
    prepWgsl,
    normWgsl,
    convWgsl,
    clsWgsl,
    totalWEffVec4s,
    useUniformWeff,
    csHalf,
    chunkableStd,
    halfPass0: !hasF16 && splitHalves,
    halfPassConv: !hasF16 && splitHalves
  };
}
function buildShadersLowMem128(cfg) {
  const {
    cs,
    chan,
    nclass,
    clsK4,
    dilations,
    activation,
    norm,
    hasF16,
    subgroupMode = "none",
    numConvs,
    probCfg
  } = cfg;
  const csQ = cs / 4;
  const csHalf = cs / 2;
  const oc4 = cs / 4;
  const rowStrideAct = csQ * X4_PAD2;
  const STAGE_BG_ROW = 16384;
  const rowStrideStage = cs * X4_VALID2;
  const MOM_STATS_VEC4 = cs * 2 + 4;
  const MOM_MAIN_OFF = MOM_STATS_VEC4;
  const MOM_EXT_OFF = MOM_MAIN_OFF + TOTAL_HALF_ROWS * cs;
  const metaStride = 4 * cs;
  const qmetaVec4Len = (numConvs * metaStride + clsK4 * 4) / 4;
  const wEffVec4Total = 9 * cs * 3 * oc4;
  const biasEffVec4Off = wEffVec4Total;
  const totalWEffVec4s = wEffVec4Total + oc4;
  const useUniformWeff = hasF16 && oc4 % 2 === 0 && totalWEffVec4s * 8 <= 65536;
  const qConst = getQuantConstants(activation);
  const f16Enable = hasF16 ? "enable f16;\n" : "";
  const useSg = hasF16 && subgroupMode !== "none";
  const sgEnable = useSg ? "enable subgroups;\n" : "";
  const T = hasF16 ? "f16" : "f32";
  const suf = hasF16 ? "h" : "f";
  const V4 = `vec4<${T}>`;
  const byteScale = hasF16 ? 256 : 255;
  const build128Epilogue = (isPermuted) => {
    const sw = isPermuted ? ".xzyw" : "";
    const storeY = (storeMode, c, wordExpr) => {
      if (storeMode === "stage_bg") {
        return `stage[s_bg_base + ${c * X4_VALID2}u] = ${wordExpr};`;
      }
      if (storeMode === "stage") {
        return `stage[s_row_base + ${c * X4_VALID2}u] = ${wordExpr};`;
      }
      const q = Math.floor(c / csQ);
      const cl = c % csQ;
      return `if (use_act) { act8_${q}[a_row_base + ${cl * X4_PAD2}u] = ${wordExpr}; } else { stage[s_row_base + ${c * X4_VALID2}u] = ${wordExpr}; }`;
    };
    if (useSg && (subgroupMode === "sg32" || subgroupMode === "sg64" || subgroupMode === "sg32_64")) {
      const sgOps = buildSubgroupOps(subgroupMode, norm);
      return {
        decls: sgOps.decls,
        entryArgs: sgOps.entryArgs,
        localHeader: "",
        emit: ({ accVar, cStart, cEnd, hrExpr, storeMode, momOffExpr, alsoWriteMomMain = false, writeY8Expr = "true" }) => rep(cEnd - cStart, (idx) => {
          const c = cStart + idx;
          if (norm === "none") {
            return `  {
    let f = vec4<f32>(${accVar}.v_${idx}${sw});
    let lmn = ${sgOps.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${sgOps.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(0.0, 0.0, lmn, sp);
      mom[${momOffExpr} + (${hrExpr}) * ${cs}u + ${c}u] = mv;
      ${alsoWriteMomMain ? `mom[${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u + ${c}u] = mv;` : ""}
    }
  }
`;
          }
          return `  {
    let f = vec4<f32>(${accVar}.v_${idx}${sw});
    let ls = ${sgOps.add("f.x + f.y + f.z + f.w")};
    let lq = ${sgOps.add("dot(f, f)")};
    let lmn = ${sgOps.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${sgOps.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(ls, lq, lmn, sp);
      mom[${momOffExpr} + (${hrExpr}) * ${cs}u + ${c}u] = mv;
      ${alsoWriteMomMain ? `mom[${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u + ${c}u] = mv;` : ""}
    }
  }
`;
        })
      };
    }
    if (useSg && subgroupMode === "sg_small") {
      const writeMomFn = `fn write_mom(c_out : u32, mv : vec4<f32>, mom_off : u32, main_off : u32, also_main : bool) {
  mom[mom_off + c_out] = mv;
  if (also_main) {
    mom[main_off + c_out] = mv;
  }
}
`;
      const decls2 = buildSgSmallDecls({
        V4,
        sw,
        norm,
        writeMomFn,
        momParams: "mom_off : u32, main_off : u32, also_main : bool",
        momArgs: "mom_off, main_off, also_main"
      });
      return {
        decls: decls2,
        entryArgs: ",\n             @builtin(subgroup_size) sg_size : u32,\n             @builtin(subgroup_invocation_id) sg_id : u32",
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, storeMode, momOffExpr, alsoWriteMomMain = false, writeY8Expr = "true" }) => {
          const momOff = `${momOffExpr} + (${hrExpr}) * ${cs}u`;
          const mainOff = alsoWriteMomMain ? `${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u` : "0u";
          let out = `  let ep_mom_off = ${momOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4_sg(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, sg_size, sg_id, ${c}u, ep_mom_off, ep_main_off, ${alsoWriteMomMain});
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "qw.x")}
      ${storeY(storeMode, c + 1, "qw.y")}
      ${storeY(storeMode, c + 2, "qw.z")}
      ${storeY(storeMode, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    const momWriteStmt = `    let c_out = c_base + slane;
    mom[mom_off + c_out] = mv;
    if (also_main) {
      mom[main_off + c_out] = mv;
    }`;
    if (norm === "none" && hasF16) {
      const unroll31 = rep(31, (i) => {
        const k = i + 1;
        return `    {
      let m = sh_mm[rb + ${k}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`;
      });
      const decls2 = `var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec4<u32> {
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let m0 = sh_mm[rb];
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${unroll31}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, fmn, sp);
${momWriteStmt}
  }
  workgroupBarrier();
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let f2 = vec4<f32>(a2${sw});
  let f3 = vec4<f32>(a3${sw});
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`;
      return {
        decls: decls2,
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, storeMode, momOffExpr, alsoWriteMomMain = false, writeY8Expr = "true" }) => {
          const momOff = `${momOffExpr} + (${hrExpr}) * ${cs}u`;
          const mainOff = alsoWriteMomMain ? `${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u` : "0u";
          let out = `  let ep_mom_off = ${momOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, ${c}u, ep_mom_off, ep_main_off, ${alsoWriteMomMain});
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "qw.x")}
      ${storeY(storeMode, c + 1, "qw.y")}
      ${storeY(storeMode, c + 2, "qw.z")}
      ${storeY(storeMode, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    if (norm === "none") {
      const unroll322 = rep(32, (k) => `    {
      let m = sh_mm[rb + ${k}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);
      const decls2 = `var<workgroup> sh_mm  : array<vec2<f32>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack4(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let f2 = vec4<f32>(a2${sw});
  let f3 = vec4<f32>(a3${sw});
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  sh_mm[b0 + 64u] = vec_mm(f2);
  sh_mm[b0 + 96u] = vec_mm(f3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${unroll322}    let sp = rmx - rmn;
    sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, rmn, sp);
${momWriteStmt}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`;
      return {
        decls: decls2,
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, storeMode, momOffExpr, alsoWriteMomMain = false, writeY8Expr = "true" }) => {
          const momOff = `${momOffExpr} + (${hrExpr}) * ${cs}u`;
          const mainOff = alsoWriteMomMain ? `${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u` : "0u";
          let out = `  let ep_mom_off = ${momOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, ${c}u, ep_mom_off, ep_main_off, ${alsoWriteMomMain});
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "qw.x")}
      ${storeY(storeMode, c + 1, "qw.y")}
      ${storeY(storeMode, c + 2, "qw.z")}
      ${storeY(storeMode, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    if (hasF16) {
      const unroll31 = rep(31, (i) => {
        const k = i + 1;
        return `    {
      let s = sh_sq[rb + ${k}u];
      let m = sh_mm[rb + ${k}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`;
      });
      const decls2 = `var<workgroup> sh_sq  : array<vec2<f32>, 1024>;
var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${V4}, a1 : ${V4}, a2 : ${V4}, a3 : ${V4},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let f2 = vec4<f32>(a2${sw});
  let f3 = vec4<f32>(a3${sw});
  let b0 = (h * 4u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_sq[b0 + 64u] = vec2<f32>(f2.x + f2.y + f2.z + f2.w, dot(f2, f2));
  sh_sq[b0 + 96u] = vec2<f32>(f3.x + f3.y + f3.z + f3.w, dot(f3, f3));
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let s0 = sh_sq[rb];
    let m0 = sh_mm[rb];
    var rs : f32 = s0.x;
    var rq : f32 = s0.y;
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${unroll31}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, fmn, sp);
${momWriteStmt}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`;
      return {
        decls: decls2,
        localHeader: "  let h = lid.y * 2u + sg;\n",
        emit: ({ accVar, cStart, cEnd, hrExpr, storeMode, momOffExpr, alsoWriteMomMain = false, writeY8Expr = "true" }) => {
          const momOff = `${momOffExpr} + (${hrExpr}) * ${cs}u`;
          const mainOff = alsoWriteMomMain ? `${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u` : "0u";
          let out = `  let ep_mom_off = ${momOff};
  let ep_main_off = ${mainOff};
`;
          for (let idx = 0; idx < cEnd - cStart; idx += 4) {
            const c = cStart + idx;
            out += `  {
    let qw = reduce_pack4(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, ${accVar}.v_${idx + 2}, ${accVar}.v_${idx + 3}, h, slane, ${c}u, ep_mom_off, ep_main_off, ${alsoWriteMomMain});
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "qw.x")}
      ${storeY(storeMode, c + 1, "qw.y")}
      ${storeY(storeMode, c + 2, "qw.z")}
      ${storeY(storeMode, c + 3, "qw.w")}
    }
  }
`;
          }
          return out;
        }
      };
    }
    const unroll32 = rep(32, (k) => `    {
      let s = sh_sq[rb + ${k}u];
      let m = sh_mm[rb + ${k}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);
    const decls = `var<workgroup> sh_sq  : array<vec2<f32>, 512>;
var<workgroup> sh_mm  : array<vec2<f32>, 512>;
var<workgroup> sh_res : array<vec2<f32>, 16>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack2(
  a0 : ${V4}, a1 : ${V4},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec2<u32> {
  let f0 = vec4<f32>(a0${sw});
  let f1 = vec4<f32>(a1${sw});
  let b0 = (h * 2u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  workgroupBarrier();
  if (slane < 2u) {
    let rb = (h * 2u + slane) * 32u;
    var rs : f32 = 0.0;
    var rq : f32 = 0.0;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${unroll32}    let sp = rmx - rmn;
    sh_res[h * 2u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, rmn, sp);
${momWriteStmt}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 2u + 0u];
  let r1 = sh_res[h * 2u + 1u];
  return vec2<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y)
  );
}
`;
    return {
      decls,
      localHeader: "  let h = lid.y * 2u + sg;\n",
      emit: ({ accVar, cStart, cEnd, hrExpr, storeMode, momOffExpr, alsoWriteMomMain = false, writeY8Expr = "true" }) => {
        const momOff = `${momOffExpr} + (${hrExpr}) * ${cs}u`;
        const mainOff = alsoWriteMomMain ? `${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u` : "0u";
        let out = `  let ep_mom_off = ${momOff};
  let ep_main_off = ${mainOff};
`;
        for (let idx = 0; idx < cEnd - cStart; idx += 2) {
          const c = cStart + idx;
          out += `  {
    let qw = reduce_pack2(${accVar}.v_${idx}, ${accVar}.v_${idx + 1}, h, slane, ${c}u, ep_mom_off, ep_main_off, ${alsoWriteMomMain});
    if (${writeY8Expr}) {
      ${storeY(storeMode, c, "qw.x")}
      ${storeY(storeMode, c + 1, "qw.y")}
    }
  }
`;
        }
        return out;
      }
    };
  };
  const initActWgsl = () => `
@group(0) @binding(0) var<storage, read_write> act0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act2 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act3 : array<u32>;
@compute @workgroup_size(${X4_PAD2}, 1, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let row_base = (wid.z * 256u + wid.y) * ${rowStrideAct}u + lid.x;
  let val = ${qConst.uZeroWord}u;
  for (var c : u32 = 0u; c < ${csQ}u; c = c + 1u) {
    let idx = row_base + c * ${X4_PAD2}u;
    act0[idx] = val;
    act1[idx] = val;
    act2[idx] = val;
    act3[idx] = val;
  }
}`;
  const d0 = dilations[0];
  const halfPass0 = !hasF16 && cs >= 16;
  const conv0Wgsl = () => {
    const ep0 = build128Epilogue(false);
    const fmaRange = (cStart, cEnd) => {
      const gStart = cStart / 4;
      const gEnd = cEnd / 4;
      return rep(gEnd - gStart, (gi) => {
        const g = gStart + gi;
        const o = g * 4;
        return `          {
            let w0 = w16_4[wb + ${g}u];
            let w1 = w16_4[wb + ${oc4 + g}u];
            let w2 = w16_4[wb + ${2 * oc4 + g}u];
            a_${o}     = fma(vn, ${V4}(w0.x), fma(vc, ${V4}(w1.x), fma(vp, ${V4}(w2.x), a_${o})));
            a_${o + 1} = fma(vn, ${V4}(w0.y), fma(vc, ${V4}(w1.y), fma(vp, ${V4}(w2.y), a_${o + 1})));
            a_${o + 2} = fma(vn, ${V4}(w0.z), fma(vc, ${V4}(w1.z), fma(vp, ${V4}(w2.z), a_${o + 2})));
            a_${o + 3} = fma(vn, ${V4}(w0.w), fma(vc, ${V4}(w1.w), fma(vp, ${V4}(w2.w), a_${o + 3})));
          }
`;
      });
    };
    const q0 = Math.floor(d0 / 4);
    const r0 = d0 % 4;
    let loadInp0 = "";
    if (r0 === 0) {
      loadInp0 = `
        let vn = inp_4[base - ${q0}u];
        let vc = inp_4[base];
        let vp = inp_4[base + ${q0}u];`;
    } else if (q0 === 0 && r0 === 1) {
      loadInp0 = `
        let vL = inp_4[base - 1u];
        let vc = inp_4[base];
        let vR = inp_4[base + 1u];
        let vn = ${V4}(vL.w, vc.xyz);
        let vp = ${V4}(vc.yzw, vR.x);`;
    } else if (r0 === 1) {
      loadInp0 = `
        let vL = inp_4[base - ${q0 + 1}u];
        let vN = inp_4[base - ${q0}u];
        let vc = inp_4[base];
        let vP = inp_4[base + ${q0}u];
        let vR = inp_4[base + ${q0 + 1}u];
        let vn = ${V4}(vL.w, vN.xyz);
        let vp = ${V4}(vP.yzw, vR.x);`;
    } else if (r0 === 2) {
      loadInp0 = `
        let vL = inp_4[base - ${q0 + 1}u];
        let vN = ${q0 === 0 ? "inp_4[base]" : `inp_4[base - ${q0}u]`};
        let vc = ${q0 === 0 ? "vN" : "inp_4[base]"};
        let vP = ${q0 === 0 ? "vN" : `inp_4[base + ${q0}u]`};
        let vR = inp_4[base + ${q0 + 1}u];
        let vn = ${V4}(vL.zw, vN.xy);
        let vp = ${V4}(vP.zw, vR.xy);`;
    } else {
      loadInp0 = `
        let vL = inp_4[base - ${q0 + 1}u];
        let vN = ${q0 === 0 ? "inp_4[base]" : `inp_4[base - ${q0}u]`};
        let vc = ${q0 === 0 ? "vN" : "inp_4[base]"};
        let vP = ${q0 === 0 ? "vN" : `inp_4[base + ${q0}u]`};
        let vR = inp_4[base + ${q0 + 1}u];
        let vn = ${V4}(vL.yzw, vN.x);
        let vp = ${V4}(vP.w, vR.xyz);`;
    }
    const emitConv0Compute = (fnName, structName, cStart, cEnd) => {
      const nCh = cEnd - cStart;
      const fields = rep(nCh, (i) => `  v_${i} : ${V4},
`);
      const accInit = rep(nCh, (i) => {
        const c = cStart + i;
        if (norm === "none") {
          const qi = 3 * cs + c;
          return `  var a_${c} = ${V4}(${T}(qmeta_u[${qi >>> 2}u][${qi & 3}u]));
`;
        }
        return `  var a_${c} = ${V4}(0.0${suf});
`;
      });
      const retArgs = Array.from({ length: nCh }, (_, i) => `a_${cStart + i}`).join(", ");
      return `struct ${structName} {
${fields}};
fn ${fnName}(y : i32, z : i32, x_pad : u32) -> ${structName} {
${accInit}  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * ${d0};
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * ${d0};
      if ((u32(sz) | u32(sy)) < 256u) {
        let base = (u32(sz) * 256u + u32(sy)) * ${X4_PAD2}u + x_pad;
${loadInp0}
        let wb = tap_yz * ${3 * oc4}u;
${fmaRange(cStart, cEnd)}
      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${structName}(${retArgs});
}
`;
    };
    const emitConv0Entry = (fnName, computeFn, cStart, cEnd, isBgEntry) => {
      const coords = isBgEntry ? "  let y = i32(p0.bg_y0 + lid.y);\n  let z = i32(p0.bg_z0);" : `  var y : i32;
  var z : i32;
  if (p0.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(wid.z);
  } else {
    let pk = strips0_u[wid.z >> 2u][wid.z & 3u];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`;
      const hrExpr = isBgEntry ? "lid.y * 2u + sg" : "row_idx * 2u + sg";
      const momOffExpr = isBgEntry ? `${MOM_EXT_OFF}u` : `${MOM_MAIN_OFF}u`;
      const rowLocals = isBgEntry ? `  let s_bg_base = (${STAGE_BG_ROW}u + lid.y) * ${rowStrideStage}u + lid.x;` : `  let row_idx = u32(z) * 256u + u32(y);
  let use_act = u32(z) < 192u;
  let a_row_base = row_idx * ${rowStrideAct}u + x_pad;
  let s_row_base = ((u32(z) & 63u) * 256u + u32(y)) * ${rowStrideStage}u + lid.x;`;
      return `
@compute @workgroup_size(64, 4, 1)
fn ${fnName}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${ep0.entryArgs || ""}) {
  let sg = lid.x >> 5u;
  let slane = lid.x & 31u;
${ep0.localHeader}  let x_pad = lid.x + ${X4_HALO2}u;
${coords}
  let acc = ${computeFn}(y, z, x_pad);
${rowLocals}
${ep0.emit({
        accVar: "acc",
        cStart,
        cEnd,
        hrExpr,
        storeMode: isBgEntry ? "stage_bg" : "conv0_split",
        momOffExpr
      })}}`;
    };
    const helpersAndEntries = halfPass0 ? emitConv0Compute("run_conv0_lo", "Conv0AccLo", 0, csHalf) + emitConv0Compute("run_conv0_hi", "Conv0AccHi", csHalf, cs) + emitConv0Entry("main_lo", "run_conv0_lo", 0, csHalf, false) + emitConv0Entry("main_hi", "run_conv0_hi", csHalf, cs, false) + emitConv0Entry("main_bg_lo", "run_conv0_lo", 0, csHalf, true) + emitConv0Entry("main_bg_hi", "run_conv0_hi", csHalf, cs, true) : emitConv0Compute("run_conv0", "Conv0Acc", 0, cs) + emitConv0Entry("main", "run_conv0", 0, cs, false) + emitConv0Entry("main_bg", "run_conv0", 0, cs, true);
    return `${f16Enable}${sgEnable}
struct Params0 {
  is_full : u32,
  bg_y0 : u32,
  bg_z0 : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> inp_4 : array<${V4}>;
@group(0) @binding(1) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act8_2 : array<u32>;
@group(0) @binding(4) var<storage, read_write> act8_3 : array<u32>;
@group(0) @binding(5) var<storage, read_write> stage : array<u32>;
@group(0) @binding(6) var<storage, read> w16_4 : array<${V4}>;
@group(0) @binding(7) var<storage, read_write> mom : array<vec4<f32>>;
@group(0) @binding(8) var<uniform> qmeta_u : array<vec4<f32>, ${cs}>;
@group(0) @binding(9) var<uniform> strips0_u : array<vec4<u32>, 4096>;
@group(0) @binding(10) var<uniform> p0 : Params0;
${ep0.decls}${helpersAndEntries}`;
  };
  const prepWgsl = () => `${f16Enable}
${getActivationWgsl(activation)}
struct PrepParams {
  meta_off : u32,
  next_w_vec4_off : u32,
  next_meta_off : u32,
  has_next : u32,
  is_first : u32,
  is_full : u32,
  n_main_strips : u32,
  n_ext_hr : u32,
  ext_weight : f32,
  pad0 : u32,
  pad1 : u32,
  pad2 : u32,
};
@group(0) @binding(0) var<storage, read> w16_4 : array<${V4}>;
@group(0) @binding(1) var<storage, read> qmeta : array<f32>;
@group(0) @binding(2) var<storage, read_write> mom : array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> w_eff : array<${V4}>;
@group(0) @binding(4) var<storage, read> main_strips : array<u32>;
@group(0) @binding(5) var<uniform> pp : PrepParams;

${norm === "gn" ? `var<workgroup> fin_s  : array<f32, 256>;
var<workgroup> fin_q  : array<f32, 256>;
var<workgroup> fin_es : array<f32, 256>;
var<workgroup> fin_eq : array<f32, 256>;
` : ""}var<workgroup> fin_mn : array<f32, 256>;
var<workgroup> fin_mx : array<f32, 256>;

@compute @workgroup_size(256, 1, 1)
fn moments_finish(@builtin(local_invocation_index) lid : u32,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let c = wid.x;
${norm === "gn" ? `  var s : f32 = 0.0;
  var q : f32 = 0.0;
  var es : f32 = 0.0;
  var eq : f32 = 0.0;
` : ""}  var mn : f32 = 3.0e38;
  var mx : f32 = -3.0e38;
  if (pp.is_full != 0u) {
    for (var hr : u32 = lid; hr < ${TOTAL_HALF_ROWS}u; hr = hr + 256u) {
      let v = mom[${MOM_MAIN_OFF}u + hr * ${cs}u + c];
${norm === "gn" ? "      s  += v.x;\n      q  += v.y;\n" : ""}      mn  = min(mn, v.z);
      mx  = max(mx, v.z + v.w);
    }
  } else {
    for (var si : u32 = lid; si < pp.n_main_strips; si = si + 256u) {
      let pk = main_strips[si];
      let base_hr = ((pk >> 8u) * 256u + (pk & 255u) * 4u) * 2u;
      for (var h : u32 = 0u; h < 8u; h = h + 1u) {
        let v = mom[${MOM_MAIN_OFF}u + (base_hr + h) * ${cs}u + c];
${norm === "gn" ? "        s  += v.x;\n        q  += v.y;\n" : ""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
    if (pp.is_first != 0u) {
      mn = min(mn, 0.0);
      mx = max(mx, 0.0);
    } else if (pp.n_ext_hr > 0u) {
      for (var e : u32 = lid; e < pp.n_ext_hr; e = e + 256u) {
        let v = mom[${MOM_EXT_OFF}u + e * ${cs}u + c];
${norm === "gn" ? "        es += v.x;\n        eq += v.y;\n" : ""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
  }
${norm === "gn" ? `  fin_s[lid]  = s;
  fin_q[lid]  = q;
  fin_es[lid] = es;
  fin_eq[lid] = eq;
` : ""}  fin_mn[lid] = mn;
  fin_mx[lid] = mx;
  workgroupBarrier();
  for (var stride : u32 = 128u; stride > 0u; stride = stride >> 1u) {
    if (lid < stride) {
${norm === "gn" ? `      fin_s[lid]  += fin_s[lid + stride];
      fin_q[lid]  += fin_q[lid + stride];
      fin_es[lid] += fin_es[lid + stride];
      fin_eq[lid] += fin_eq[lid + stride];
` : ""}      fin_mn[lid]  = min(fin_mn[lid], fin_mn[lid + stride]);
      fin_mx[lid]  = max(fin_mx[lid], fin_mx[lid + stride]);
    }
    workgroupBarrier();
  }
  if (lid == 0u) {
    let mbase = pp.meta_off;
    let gamma = qmeta[mbase + c];
    let beta  = qmeta[mbase + ${cs}u + c];
    let eps_base = qmeta[mbase + ${2 * cs}u + c];
    let q_prev = select(mom[${cs * 2}u].x, 1.0, pp.is_first != 0u);
    let eff_eps = eps_base / (q_prev * q_prev);
${norm === "gn" ? `    let total_s = fin_s[0] + pp.ext_weight * fin_es[0];
    let total_q = fin_q[0] + pp.ext_weight * fin_eq[0];
    let mean = total_s / 16777216.0;
    let varr = max(total_q / 16777216.0 - mean * mean, 0.0);
    let inv_std = inverseSqrt(varr + eff_eps);
` : `    let mean : f32 = 0.0;
    let inv_std : f32 = 1.0;
`}    let scale = inv_std * gamma;
    let shift = beta - mean * scale;
    let u_lo = fin_mn[0] * scale + shift;
    let u_hi = fin_mx[0] * scale + shift;
    let vmax = max(0.25, max(act(u_lo), act(u_hi)));
    ${activation === "gelu_tanh" ? `
    let qs = select(max(vmax / 248.0, 0.1705 / 7.0), 1.0, c >= ${chan}u);
    ` : activation === "relu" ? `
    let qs = select(max(vmax / 255.0, 1e-6), 1.0, c >= ${chan}u);
    ` : `
    let qs = select(max(vmax / 223.0, 1.0 / 32.0), 1.0, c >= ${chan}u);
    `}
    let sb = c * 2u;
    mom[sb]      = vec4<f32>(mean, inv_std, qs, 1.0 / qs);
    mom[sb + 1u] = vec4<f32>(scale, shift, 0.0, 0.0);
  }
}

@compute @workgroup_size(256, 1, 1)
fn prep_weff(@builtin(local_invocation_index) lid : u32) {
  if (pp.has_next == 0u) { return; }
  var q_ref : f32 = 1e-6;
  for (var ic : u32 = 0u; ic < ${chan}u; ic = ic + 1u) {
    let qs = mom[ic * 2u].z;
    q_ref = max(q_ref, ${byteScale.toFixed(1)} * qs);
  }
  ${norm === "none" ? "q_ref = 1.0;" : ""}
  if (lid == 0u) {
    mom[${cs * 2}u] = vec4<f32>(q_ref, 0.0, 0.0, 0.0);
  }
  let scale_num = ${byteScale.toFixed(1)} / q_ref;
  for (var idx : u32 = lid; idx < ${wEffVec4Total}u; idx = idx + 256u) {
    let ic = (idx / ${3 * oc4}u) % ${cs}u;
    let qs = mom[ic * 2u].z;
    w_eff[idx] = w16_4[pp.next_w_vec4_off + idx] * ${T}(qs * scale_num);
  }
  if (lid < ${oc4}u) {
    ${norm === "none" ? `
    let mb = pp.next_meta_off + ${3 * cs}u + lid * 4u;
    w_eff[${biasEffVec4Off}u + lid] = ${V4}(${T}(qmeta[mb]), ${T}(qmeta[mb + 1u]), ${T}(qmeta[mb + 2u]), ${T}(qmeta[mb + 3u]));
    ` : `
    w_eff[${biasEffVec4Off}u + lid] = ${V4}(0.0${suf});
    `}
  }
}`;
  const flushWgsl = () => `
struct BandFlushParams {
  is_full : u32,
  z_start : u32,
  strip_off : u32,
  pad0 : u32,
  pad1 : u32,
  pad2 : u32,
  pad3 : u32,
  pad4 : u32,
};
@group(0) @binding(0) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read> stage : array<u32>;
@group(0) @binding(5) var<storage, read> strips : array<u32>;
@group(0) @binding(6) var<uniform> fp : BandFlushParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let x_pad = x4 + ${X4_HALO2}u;
  var y : u32;
  var z : u32;
  if (fp.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = fp.z_start + wid.z;
  } else {
    let pk = strips[fp.strip_off + wid.z] & 0xFFFFu;
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let a_base = (z * 256u + y) * ${rowStrideAct}u + x_pad;
  let s_base = ((z & 63u) * 256u + y) * ${rowStrideStage}u + x4;
  for (var c : u32 = 0u; c < ${csQ}u; c = c + 1u) {
    let a_off = a_base + c * ${X4_PAD2}u;
    act8_0[a_off] = stage[s_base + c * ${X4_VALID2}u];
    act8_1[a_off] = stage[s_base + (${csQ}u + c) * ${X4_VALID2}u];
    act8_2[a_off] = stage[s_base + (${2 * csQ}u + c) * ${X4_VALID2}u];
    act8_3[a_off] = stage[s_base + (${3 * csQ}u + c) * ${X4_VALID2}u];
  }
}`;
  const emitNormQuarter = (q, isHalo) => {
    const cgBase = q * csQ;
    return `
  for (var cl : u32 = 0u; cl < ${csQ}u; cl = cl + 1u) {
    let c = ${cgBase}u + cl;
    let inv_qs = mom[c * 2u].w;
    let st = mom[c * 2u + 1u];
    let rm = mom[mom_base + c];
    let q_word = ${isHalo ? `stage[s_bg_base + c * ${X4_VALID2}u]` : `select(stage[s_base + c * ${X4_VALID2}u], act8_${q}[a_base + cl * ${X4_PAD2}u], use_act)`};
    let yv = unpack4x8unorm(q_word) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_${q}[a_base + cl * ${X4_PAD2}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${qConst.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }`;
  };
  const normWgsl = () => `${getActivationWgsl(activation)}
struct NormParams {
  is_full : u32,
  bg_row : u32,
  halo_off : u32,
  n_halo : u32,
};
@group(0) @binding(0) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read> stage : array<u32>;
@group(0) @binding(5) var<storage, read> mom : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read> norm_aux : array<u32>;
@group(0) @binding(7) var<uniform> np : NormParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${X4_HALO2}u;
  var y : u32;
  var z : u32;
  if (np.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = norm_aux[wid.z];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let use_act = z < 192u;
  let a_base = row_idx * ${rowStrideAct}u + x_pad;
  let s_base = ((z & 63u) * 256u + y) * ${rowStrideStage}u + x4;
  let mom_base = ${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u;
${rep(4, (q) => emitNormQuarter(q, false))}
}

@compute @workgroup_size(64, 4, 1)
fn norm_halo_fill(@builtin(local_invocation_id) lid : vec3<u32>,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let idx = wid.y * 4u + lid.y;
  if (idx >= np.n_halo) { return; }
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${X4_HALO2}u;
  let s_bg_base = ${STAGE_BG_ROW}u * ${rowStrideStage}u + x4;
  let mom_base = ${MOM_EXT_OFF}u + sg * ${cs}u;
  let dst_row = norm_aux[np.halo_off + idx];
  let a_base = dst_row * ${rowStrideAct}u + x_pad;
${rep(4, (q) => emitNormQuarter(q, true))}
}`;
  const convWgsl = () => {
    const halfPass = !hasF16 && cs >= 16;
    const epC = build128Epilogue(hasF16);
    const emitUnpack = (vName, uExpr) => {
      if (hasF16) {
        return `
          let ${vName} = vec4<f16>(vec2<f16>(unpack2x16float(((${uExpr} & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((${uExpr} >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(${qConst.sterbenzSub});`;
      }
      return `
          let ${vName} = unpack4x8unorm(${uExpr}) - vec4<f32>(${qConst.uZeroFloat});`;
    };
    const emitLoads = (arrName) => `
          let uL = ${arrName}[base - off0];
          let uN = ${arrName}[base - off1];
          let uC = ${arrName}[base];
          let uP = ${arrName}[base + off1];
          let uR = ${arrName}[base + off0];
          let u_neg = (uL >> sh_l) | (uN << sh_r);
          let u_pos = (uP >> sh_r) | (uR << sh_l);` + emitUnpack("vn", "u_neg") + emitUnpack("vc", "uC") + emitUnpack("vp", "u_pos");
    const emitFmas = (cStart, cEnd) => {
      const gStart = cStart / 4;
      const gEnd = cEnd / 4;
      if (useUniformWeff) {
        const hp1 = oc4 / 2;
        const hp2 = oc4;
        let s = "";
        for (let g = gStart; g < gEnd; g += 2) {
          const o = g * 4;
          const hp = g / 2;
          s += `          {
            let wp0 = w_eff_u[wbu + ${hp}u];
            let wp1 = w_eff_u[wbu + ${hp1 + hp}u];
            let wp2 = w_eff_u[wbu + ${hp2 + hp}u];
            let w0a = u4_lo(wp0);
            let w0b = u4_hi(wp0);
            let w1a = u4_lo(wp1);
            let w1b = u4_hi(wp1);
            let w2a = u4_lo(wp2);
            let w2b = u4_hi(wp2);
            a_${o}     = fma(vn, vec4<f16>(w0a.x), fma(vc, vec4<f16>(w1a.x), fma(vp, vec4<f16>(w2a.x), a_${o})));
            a_${o + 1} = fma(vn, vec4<f16>(w0a.y), fma(vc, vec4<f16>(w1a.y), fma(vp, vec4<f16>(w2a.y), a_${o + 1})));
            a_${o + 2} = fma(vn, vec4<f16>(w0a.z), fma(vc, vec4<f16>(w1a.z), fma(vp, vec4<f16>(w2a.z), a_${o + 2})));
            a_${o + 3} = fma(vn, vec4<f16>(w0a.w), fma(vc, vec4<f16>(w1a.w), fma(vp, vec4<f16>(w2a.w), a_${o + 3})));
            a_${o + 4} = fma(vn, vec4<f16>(w0b.x), fma(vc, vec4<f16>(w1b.x), fma(vp, vec4<f16>(w2b.x), a_${o + 4})));
            a_${o + 5} = fma(vn, vec4<f16>(w0b.y), fma(vc, vec4<f16>(w1b.y), fma(vp, vec4<f16>(w2b.y), a_${o + 5})));
            a_${o + 6} = fma(vn, vec4<f16>(w0b.z), fma(vc, vec4<f16>(w1b.z), fma(vp, vec4<f16>(w2b.z), a_${o + 6})));
            a_${o + 7} = fma(vn, vec4<f16>(w0b.w), fma(vc, vec4<f16>(w1b.w), fma(vp, vec4<f16>(w2b.w), a_${o + 7})));
          }
`;
        }
        return s;
      }
      return rep(gEnd - gStart, (gi) => {
        const g = gStart + gi;
        const o = g * 4;
        return `          {
            let w0 = w_eff[wb + ${g}u];
            let w1 = w_eff[wb + ${oc4 + g}u];
            let w2 = w_eff[wb + ${2 * oc4 + g}u];
            a_${o}     = fma(vn, ${V4}(w0.x), fma(vc, ${V4}(w1.x), fma(vp, ${V4}(w2.x), a_${o})));
            a_${o + 1} = fma(vn, ${V4}(w0.y), fma(vc, ${V4}(w1.y), fma(vp, ${V4}(w2.y), a_${o + 1})));
            a_${o + 2} = fma(vn, ${V4}(w0.z), fma(vc, ${V4}(w1.z), fma(vp, ${V4}(w2.z), a_${o + 2})));
            a_${o + 3} = fma(vn, ${V4}(w0.w), fma(vc, ${V4}(w1.w), fma(vp, ${V4}(w2.w), a_${o + 3})));
          }
`;
      });
    };
    const emitQuarterLoop = (q, cStart, cEnd) => {
      const cOff = q * csQ;
      const icLim = `(${csQ}u + cp.pad0)`;
      if (useUniformWeff) {
        return `        for (var ic : u32 = 0u; ic < ${icLim}; ic = ic + 1u) {
          let base = row_off + ic * ${X4_PAD2}u;
${emitLoads(`act8_${q}`)}
          let wbu = wbu_tap + ${cOff ? `(${cOff}u + ic)` : "ic"} * ${3 * oc4 / 2}u;
${emitFmas(cStart, cEnd)}
        }
`;
      }
      return `        for (var ic : u32 = 0u; ic < ${icLim}; ic = ic + 1u) {
          let base = row_off + ic * ${X4_PAD2}u;
${emitLoads(`act8_${q}`)}
          let wb = wb_tap + ${cOff ? `(${cOff}u + ic)` : "ic"} * ${3 * oc4}u;
${emitFmas(cStart, cEnd)}
        }
`;
    };
    const emitConvCompute = (fnName, structName, cStart, cEnd) => {
      const nCh = cEnd - cStart;
      const fields = rep(nCh, (i) => `  v_${i} : ${V4},
`);
      const accInit = rep(nCh, (i) => {
        const c = cStart + i;
        if (norm === "none") {
          const g = c >>> 2;
          const sw = ["x", "y", "z", "w"][c & 3];
          if (useUniformWeff) {
            const uVecIdx = biasEffVec4Off + g >>> 1;
            const ufn = biasEffVec4Off + g & 1 ? "u4_hi" : "u4_lo";
            return `  var a_${c} = ${V4}(${ufn}(w_eff_u[${uVecIdx}u]).${sw});
`;
          }
          return `  var a_${c} = ${V4}(w_eff[${biasEffVec4Off + g}u].${sw});
`;
        }
        return `  var a_${c} = ${V4}(0.0${suf});
`;
      });
      const tapHeader = useUniformWeff ? `        let wbu_tap = tap_yz * ${cs * 3 * oc4 / 2}u;
` : `        let wb_tap = tap_yz * ${cs * 3 * oc4}u;
`;
      const retArgs = Array.from({ length: nCh }, (_, i) => `a_${cStart + i}`).join(", ");
      return `struct ${structName} {
${fields}};
fn ${fnName}(y : i32, z : i32, x_pad : u32, dp : u32) -> ${structName} {
${accInit}  let d_step = i32(dp & 63u);
  let off0 = (dp >> 6u) & 15u;
  let off1 = (dp >> 10u) & 15u;
  let sh_r = (dp >> 14u) & 31u;
  let sh_l = (dp >> 19u) & 31u;
  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * d_step;
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * d_step;
      if ((u32(sz) | u32(sy)) < 256u) {
        let row_off = (u32(sz) * 256u + u32(sy)) * ${rowStrideAct}u + x_pad;
${tapHeader}${rep(4, (q) => emitQuarterLoop(q, cStart, cEnd))}      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${structName}(${retArgs});
}
`;
    };
    const emitConvEntry = (fnName, computeFn, cStart, cEnd, entryKind) => {
      let coords = "";
      if (entryKind === "bg") {
        coords = `
  let y = i32(cp.bg_y0 + lid.y);
  let z = i32(cp.bg_z0);`;
      } else if (entryKind === "ext") {
        coords = `
  let pk_full = strips[cp.ext_off + wid.z];
  let ext_orig = pk_full >> 16u;
  let pk = pk_full & 0xFFFFu;
  let y = i32((pk & 255u) * 4u + lid.y);
  let z = i32(pk >> 8u);`;
      } else {
        coords = `
  var y : i32;
  var z : i32;
  if (cp.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(cp.z_start + wid.z);
  } else {
    let pk = strips[cp.strip_off + wid.z] & 0xFFFFu;
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`;
      }
      const hrExpr = entryKind === "bg" ? "lid.y * 2u + sg" : entryKind === "ext" ? "ext_orig * 8u + lid.y * 2u + sg" : "row_idx * 2u + sg";
      const momOffExpr = entryKind === "main" ? `${MOM_MAIN_OFF}u` : `${MOM_EXT_OFF}u`;
      const storeMode = entryKind === "bg" ? "stage_bg" : "stage";
      const writeY8Expr = entryKind === "main" ? "true" : "(((dp >> 24u) & 1u) != 0u)";
      const rowLocals = entryKind === "bg" ? `  let row_idx = u32(z) * 256u + u32(y);
  let s_bg_base = (${STAGE_BG_ROW}u + lid.y) * ${rowStrideStage}u + x4;` : `  let row_idx = u32(z) * 256u + u32(y);
  let s_row_base = ((u32(z) & 63u) * 256u + u32(y)) * ${rowStrideStage}u + x4;`;
      return `
@compute @workgroup_size(64, 4, 1)
fn ${fnName}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${epC.entryArgs || ""}) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let slane = x4 & 31u;
${epC.localHeader}  let x_pad = x4 + ${X4_HALO2}u;
${coords}
  let dp = cp.d_pack;
  let acc = ${computeFn}(y, z, x_pad, dp);
${rowLocals}
${epC.emit({
        accVar: "acc",
        cStart,
        cEnd,
        hrExpr,
        storeMode,
        momOffExpr,
        alsoWriteMomMain: entryKind !== "main",
        writeY8Expr
      })}}`;
    };
    const helpersAndEntries = halfPass ? emitConvCompute("run_conv_lo", "ConvAccLo", 0, csHalf) + emitConvCompute("run_conv_hi", "ConvAccHi", csHalf, cs) + emitConvEntry("main_lo", "run_conv_lo", 0, csHalf, "main") + emitConvEntry("main_hi", "run_conv_hi", csHalf, cs, "main") + emitConvEntry("main_ext_lo", "run_conv_lo", 0, csHalf, "ext") + emitConvEntry("main_ext_hi", "run_conv_hi", csHalf, cs, "ext") + emitConvEntry("main_bg_lo", "run_conv_lo", 0, csHalf, "bg") + emitConvEntry("main_bg_hi", "run_conv_hi", csHalf, cs, "bg") : emitConvCompute("run_conv", "ConvAcc", 0, cs) + emitConvEntry("main", "run_conv", 0, cs, "main") + emitConvEntry("main_ext", "run_conv", 0, cs, "ext") + emitConvEntry("main_bg", "run_conv", 0, cs, "bg");
    const wEffDecl = useUniformWeff ? `fn u4_lo(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.x)), vec2<f16>(unpack2x16float(u.y)));
}
fn u4_hi(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.z)), vec2<f16>(unpack2x16float(u.w)));
}
@group(0) @binding(6) var<uniform> w_eff_u : array<vec4<u32>, ${Math.ceil(totalWEffVec4s / 2)}>;` : `@group(0) @binding(6) var<storage, read> w_eff : array<${V4}>;`;
    return `${f16Enable}${sgEnable}
struct BandConvParams {
  is_full : u32,
  z_start : u32,
  strip_off : u32,
  ext_off : u32,
  d_pack : u32,
  bg_y0 : u32,
  bg_z0 : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read_write> stage : array<u32>;
@group(0) @binding(5) var<storage, read_write> mom : array<vec4<f32>>;
${wEffDecl}
@group(0) @binding(7) var<storage, read> strips : array<u32>;
@group(0) @binding(8) var<uniform> cp : BandConvParams;
${epC.decls}${helpersAndEntries}`;
  };
  const emitClsQuarter = (q) => {
    const cgBase = q * csQ;
    return `
  for (var cl : u32 = 0u; cl < ${csQ}u; cl = cl + 1u) {
    let c = ${cgBase}u + cl;
    if (c < ${chan}u) {
      let st = mom[c * 2u + 1u];
      let rm = mom[mom_base + c];
      let q_word = select(stage[s_base + c * ${X4_VALID2}u], act8_${q}[a_base + cl * ${X4_PAD2}u], use_act);
      let yv = unpack4x8unorm(q_word) * rm.w + vec4<f32>(rm.z);
      let fv = vec4<f32>(
        act(yv.x * st.x + st.y),
        act(yv.y * st.x + st.y),
        act(yv.z * st.x + st.y),
        act(yv.w * st.x + st.y)
      );
      feat[c] = ${V4}(fv);
    }
  }`;
  };
  const clsWgsl = () => `${f16Enable}
${getActivationWgsl(activation)}
struct ClsParams {
  w_vec4_off : u32,
  bias_off : u32,
  is_full : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read> stage : array<u32>;
@group(0) @binding(5) var<storage, read> w16_4 : array<${V4}>;
@group(0) @binding(6) var<storage, read> mom : array<vec4<f32>>;
@group(0) @binding(7) var<storage, read_write> labels8 : array<u32>;
@group(0) @binding(8) var<uniform> qmeta_u : array<vec4<f32>, ${qmetaVec4Len}>;
@group(0) @binding(9) var<uniform> cls_strips_u : array<vec4<u32>, 4096>;
@group(0) @binding(10) var<uniform> cp : ClsParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  var y : u32;
  var z : u32;
  if (cp.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = cls_strips_u[wid.z >> 2u][wid.z & 3u];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let use_act = z < 192u;
  let a_base = row_idx * ${rowStrideAct}u + x4 + ${X4_HALO2}u;
  let s_base = ((z & 63u) * 256u + y) * ${rowStrideStage}u + x4;
  let mom_base = ${MOM_MAIN_OFF}u + (row_idx * 2u + sg) * ${cs}u;

  var feat : array<${V4}, ${chan}>;
${rep(4, (q) => emitClsQuarter(q))}

  let w_cls = cp.w_vec4_off;
  let b_vec4 = cp.bias_off >> 2u;
${buildClassifierLoopsWgsl({
    chan,
    clsK4,
    nclass,
    V4,
    suf,
    readBiasStmt: "    let bv = qmeta_u[b_vec4 + k4];",
    biasExpr: (j) => `bv.${["x", "y", "z", "w"][j]}`,
    probCfg
  })}
}`;
  return {
    initActWgsl,
    conv0Wgsl,
    prepWgsl,
    flushWgsl,
    normWgsl,
    convWgsl,
    clsWgsl,
    qmetaVec4Len,
    numConvs,
    totalWEffVec4s,
    useUniformWeff,
    csQ,
    halfPass0,
    halfPassConv: !hasF16 && cs >= 16
  };
}
async function setupNetLowMem128(device, d, packed, hasF16, subgroupMode, modelEntry, probCfg, plan) {
  const nvox = DIM2 * DIM2 * DIM2;
  const outBufBytes = probCfg ? nvox * 4 : nvox;
  const numConvs = d.dilations.length;
  const csQ = d.cs / 4;
  const actQBytes = DIM2 * DIM2 * csQ * X4_PAD2 * 4;
  const stageRows = 64 * DIM2 + 4;
  const stageBytes = stageRows * d.cs * X4_VALID2 * 4;
  const momVec4Count = d.cs * 2 + 4 + (TOTAL_HALF_ROWS + MAX_EXT_HALF_ROWS) * d.cs;
  const momBytes = momVec4Count * 16;
  const lim = device.limits || {};
  const maxAllowed = Math.min(lim.maxStorageBufferBindingSize ?? Infinity, lim.maxBufferSize ?? Infinity);
  if (actQBytes > maxAllowed || stageBytes > maxAllowed || momBytes > maxAllowed || outBufBytes > maxAllowed) {
    const needMiB = Math.ceil(Math.max(actQBytes, stageBytes, momBytes, outBufBytes) / 1048576);
    throw new Error(`meshnet_fast_v4: LowMem128 max buffer (${needMiB} MiB) exceeds device limit (${maxAllowed >>> 20} MiB)`);
  }
  const shaders = buildShadersLowMem128({
    cs: d.cs,
    chan: d.chan,
    nclass: d.nclass,
    clsK4: packed.clsK4,
    dilations: d.dilations,
    activation: d.activation,
    norm: d.norm,
    hasF16,
    subgroupMode,
    numConvs,
    probCfg
  });
  console.log(
    `[WebGPU-V4-128M] ${d.chan}ch(cs=${d.cs})/${d.nclass}cls (${numConvs} convs, ${d.activation}, norm=${d.norm}${probCfg ? ", prob=3" : ""}) | ${hasF16 ? "f16+sterbenz" : "f32"} | ${subgroupModeLabel(subgroupMode)} | ZYCX-4Q+64slice | maxBuf=${(Math.max(actQBytes, stageBytes, momBytes, outBufBytes) / 1048576).toFixed(1)} MiB`
  );
  const S = GPUBufferUsage.STORAGE;
  const U = GPUBufferUsage.UNIFORM;
  const CD = GPUBufferUsage.COPY_DST;
  const CS = GPUBufferUsage.COPY_SRC;
  const paddedVox = DIM2 * DIM2 * ROW_SCALARS_PAD;
  const inpBytes = paddedVox * (hasF16 ? 2 : 4);
  const wEffBytes = hasF16 ? Math.ceil(shaders.totalWEffVec4s / 2) * 16 : shaders.totalWEffVec4s * 16;
  const canGpuProb = Boolean(probCfg && actQBytes >= outBufBytes);
  const wsKey = `128|${d.cs}|${hasF16 ? 1 : 0}|${outBufBytes}|${canGpuProb ? 1 : 0}`;
  const ws = acquireV4Workspace(device, wsKey, () => {
    const buffers = [];
    const wsAlloc = createBufAllocator(device, buffers);
    const mkWs = wsAlloc.alloc;
    const named = {
      inpBuf: mkWs(inpBytes, S | CD | CS),
      act8_0: mkWs(actQBytes, S | CD | CS),
      act8_1: mkWs(actQBytes, S | CD | CS),
      act8_2: mkWs(actQBytes, S | CD | CS),
      act8_3: mkWs(actQBytes, S | CD | CS),
      stageBuf: mkWs(stageBytes, S),
      momBuf: mkWs(momBytes, S),
      labels8Buf: mkWs(outBufBytes, S | CD | CS),
      readbackBuf: mkWs(outBufBytes, GPUBufferUsage.MAP_READ | CD),
      probPackTmpBuf: canGpuProb ? mkWs(outBufBytes, S | CD | CS) : null
    };
    return { buffers, named, bytes: wsAlloc.getBytes() };
  });
  const {
    inpBuf,
    act8_0,
    act8_1,
    act8_2,
    act8_3,
    stageBuf,
    momBuf,
    labels8Buf,
    readbackBuf,
    probPackTmpBuf
  } = ws.named;
  const ownedBuffers = [];
  const ownedAlloc = createBufAllocator(device, ownedBuffers);
  const mkBuf = ownedAlloc.alloc;
  const wRawBuf = mkBuf(hasF16 ? packed.wF16.byteLength : packed.wF32.byteLength, S | CD);
  const qmetaBuf = mkBuf(packed.qmetaF32.byteLength, S | U | CD);
  const wEffBuf = mkBuf(wEffBytes, shaders.useUniformWeff ? S | U : S);
  const canCone = d.norm === "gn" && !modelEntry?.disableConeSkip;
  const strips0Ubo = mkBuf(TOTAL_STRIPS * 4, U | CD);
  const clsStripsUbo = mkBuf(TOTAL_STRIPS * 4, U | CD);
  const stripsBufs = Array.from({ length: numConvs }, () => mkBuf(canCone ? TOTAL_STRIPS * 4 : 16, S | CD));
  const normAuxBufs = Array.from({ length: numConvs - 1 }, () => mkBuf(canCone ? (TOTAL_STRIPS + DIM2 * DIM2) * 4 : 16, S | CD));
  const conv0Ubo = mkBuf(16, U | CD);
  const clsUbo = mkBuf(16, U | CD);
  const prepUbos = Array.from({ length: numConvs }, () => mkBuf(48, U | CD));
  const normUbos = Array.from({ length: numConvs - 1 }, () => mkBuf(16, U | CD));
  const uboAlign = Math.max(256, lim.minUniformBufferOffsetAlignment || 256);
  const uboAlignU32 = uboAlign >>> 2;
  const SLOTS_PER_LAYER = 20;
  const totalBandSlots = Math.max(1, (numConvs - 1) * SLOTS_PER_LAYER);
  const bandUboBuf = mkBuf(totalBandSlots * uboAlign, U | CD);
  const bandUboHost = new Uint32Array(totalBandSlots * uboAlignU32);
  device.queue.writeBuffer(wRawBuf, 0, hasF16 ? packed.wF16 : packed.wF32);
  device.queue.writeBuffer(qmetaBuf, 0, packed.qmetaF32);
  let pipes;
  try {
    pipes = await getNetPipes128(
      device,
      d,
      packed,
      hasF16,
      subgroupMode,
      probCfg,
      shaders
    );
  } catch (err) {
    for (const b of ownedBuffers) b.destroy();
    ownedBuffers.length = 0;
    if (!ws.pooled) {
      for (const b of ws.buffers) b.destroy();
      ws.buffers.length = 0;
    } else if (v4WorkspacePool.get(device) === ws) {
      releaseV4Workspace(device);
    }
    throw err;
  }
  const { pInit, pMomFin, pPrepW, pFlush, pNorm, pNormHalo, pCls, pConv0, pConv } = pipes;
  const mkBg = (bgl, resources) => device.createBindGroup({
    layout: bgl,
    entries: resources.map((res, binding) => ({
      binding,
      resource: res && res.buffer ? res : { buffer: res }
    }))
  });
  const bgInit = mkBg(pInit.bgl, [act8_0, act8_1, act8_2, act8_3]);
  {
    const enc = device.createCommandEncoder();
    const pass = enc.beginComputePass();
    pass.setPipeline(pInit.pipe);
    pass.setBindGroup(0, bgInit);
    pass.dispatchWorkgroups(1, DIM2, DIM2);
    pass.end();
    device.queue.submit([enc.finish()]);
  }
  const p0Bgl = (shaders.halfPass0 ? pConv0.lo : pConv0.main).bgl;
  const bgConv0 = mkBg(p0Bgl, [
    inpBuf,
    act8_0,
    act8_1,
    act8_2,
    act8_3,
    stageBuf,
    wRawBuf,
    momBuf,
    { buffer: qmetaBuf, offset: 0, size: d.cs * 16 },
    strips0Ubo,
    conv0Ubo
  ]);
  const bgCls = mkBg(pCls.bgl, [act8_0, act8_1, act8_2, act8_3, stageBuf, wRawBuf, momBuf, labels8Buf, qmetaBuf, clsStripsUbo, clsUbo]);
  const clsUbo1 = canGpuProb ? mkBuf(16, U | CD) : null;
  const bgCls1 = canGpuProb ? mkBg(pCls.bgl, [act8_0, act8_1, act8_2, act8_3, stageBuf, wRawBuf, momBuf, labels8Buf, qmetaBuf, clsStripsUbo, clsUbo1]) : null;
  const ioCtl = createGpuIoController({
    device,
    hasF16,
    nvox,
    outBufBytes,
    inpBuf,
    act8_0,
    labels8Buf,
    readbackBuf,
    pInit,
    bgInit,
    pCls,
    bgCls,
    clsUbo,
    packed,
    modelEntry,
    probCfg,
    canGpuProb,
    probSlots: canGpuProb ? {
      clsUbo1,
      bgCls1,
      pass0HoldBuf: probPackTmpBuf,
      y0: act8_0,
      y1: act8_1,
      b: act8_2,
      sup: act8_3
    } : null,
    ownedBuffers,
    mkBuf
  });
  const prepBgs = prepUbos.map(
    (ubo, li) => mkBg(pMomFin.bgl, [wRawBuf, qmetaBuf, momBuf, wEffBuf, stripsBufs[li], ubo])
  );
  const normBgs = normUbos.map(
    (ubo, li) => mkBg(pNorm.bgl, [act8_0, act8_1, act8_2, act8_3, stageBuf, momBuf, normAuxBufs[li], ubo])
  );
  const bandDynRes = { buffer: bandUboBuf, offset: 0, size: 32 };
  const flushBgs = Array.from(
    { length: numConvs },
    (_, li) => li === 0 ? null : mkBg(pFlush.bgl, [act8_0, act8_1, act8_2, act8_3, stageBuf, stripsBufs[li], bandDynRes])
  );
  const convP0 = shaders.halfPassConv ? pConv.lo : pConv.main;
  const convBgs = Array.from(
    { length: numConvs },
    (_, li) => li === 0 ? null : mkBg(convP0.bgl, [act8_0, act8_1, act8_2, act8_3, stageBuf, momBuf, wEffBuf, stripsBufs[li], bandDynRes])
  );
  const padInputHost = hasF16 ? new Uint16Array(paddedVox) : new Float32Array(paddedVox);
  const headRowHost = new Uint8Array(DIM2 * DIM2);
  const stripsHost = new Uint32Array(TOTAL_STRIPS);
  const normAuxHost = new Uint32Array(TOTAL_STRIPS + DIM2 * DIM2);
  const prepTmpU32 = new Uint32Array(12);
  const prepTmpF32 = new Float32Array(prepTmpU32.buffer);
  const u4Tmp = new Uint32Array(4);
  const setBandSlot = (slotIdx, isFull, zStart, stripOff, extOff, dPack, bgY0, bgZ0) => {
    const o = slotIdx * uboAlignU32;
    bandUboHost[o] = isFull ? 1 : 0;
    bandUboHost[o + 1] = zStart;
    bandUboHost[o + 2] = stripOff;
    bandUboHost[o + 3] = extOff;
    bandUboHost[o + 4] = dPack;
    bandUboHost[o + 5] = bgY0;
    bandUboHost[o + 6] = bgZ0;
    bandUboHost[o + 7] = 0;
  };
  async function execute(volume, ioOpts) {
    if (volume.length !== nvox) {
      throw new Error(`meshnet_fast_v4 expected ${nvox} voxels, got ${volume.length}`);
    }
    const useCone = d.norm === "gn" && !modelEntry?.disableConeSkip;
    const prepRes = await ioCtl.prepareInput({
      volume,
      ioOpts,
      useCone,
      padInputHost,
      headRowHost,
      hasF16Flag: hasF16
    });
    const info = prepRes.info;
    const schedule = computeConeSchedule(headRowHost, info, d.dilations, useCone);
    const bandPlans = new Array(numConvs);
    for (let li = 0; li < numConvs; li++) {
      const L = schedule.layers[li];
      const nMain = L.isFull ? TOTAL_STRIPS : L.mainStrips.length;
      const nExt = L.isFull || !L.extStrips ? 0 : L.extStrips.length;
      const nHalo = L.haloRows ? L.haloRows.length : 0;
      if (li === 0) {
        if (!L.isFull && nMain > 0) {
          stripsHost.set(L.mainStrips, 0);
          device.queue.writeBuffer(strips0Ubo, 0, stripsHost.subarray(0, nMain));
          device.queue.writeBuffer(stripsBufs[0], 0, stripsHost.subarray(0, nMain));
        }
        bandPlans[0] = { L, nMain, nExt, nHalo };
        continue;
      }
      const mainStart = new Uint32Array(8);
      const mainCount = new Uint32Array(8);
      const extStart = new Uint32Array(8);
      const extCount = new Uint32Array(8);
      if (!L.isFull) {
        if (nMain > 0) {
          stripsHost.set(L.mainStrips, 0);
          for (let i = 0; i < nMain; i++) {
            mainCount[L.mainStrips[i] >>> 13]++;
          }
          let cur = 0;
          for (let b = 0; b < 8; b++) {
            mainStart[b] = cur;
            cur += mainCount[b];
          }
        }
        if (L.mode === "bwd" && nExt > 0) {
          const buckets = Array.from({ length: 8 }, () => []);
          for (let j = 0; j < nExt; j++) {
            const pk = L.extStrips[j];
            buckets[pk >>> 13].push((j & 65535) << 16 | pk);
          }
          let cur = nMain;
          for (let b = 0; b < 8; b++) {
            extStart[b] = cur;
            const bArr = buckets[b];
            extCount[b] = bArr.length;
            for (let k = 0; k < bArr.length; k++) stripsHost[cur++] = bArr[k];
          }
          device.queue.writeBuffer(stripsBufs[li], 0, stripsHost.subarray(0, nMain + nExt));
        } else if (nMain > 0) {
          device.queue.writeBuffer(stripsBufs[li], 0, stripsHost.subarray(0, nMain));
        }
      }
      const writeExtY8 = L.mode === "rpure" && nHalo > 0 || L.mode === "bwd" && li + 1 < numConvs;
      const dPack = packConvDilFlags(d.dilations[li], writeExtY8);
      const layerBaseSlot = (li - 1) * SLOTS_PER_LAYER;
      const bgY0 = L.bgStrip ? L.bgStrip.yWg * 4 : 0;
      const bgZ0 = L.bgStrip ? L.bgStrip.z : 0;
      for (let b = 0; b < 8; b++) {
        setBandSlot(layerBaseSlot + b, L.isFull, b * 32, mainStart[b], extStart[b], dPack, bgY0, bgZ0);
      }
      for (let fb = 0; fb < 6; fb++) {
        setBandSlot(layerBaseSlot + 8 + fb, L.isFull, fb * 32, mainStart[fb], 0, 0, 0, 0);
        setBandSlot(layerBaseSlot + 14 + fb, false, fb * 32, extStart[fb], 0, 0, 0, 0);
      }
      bandPlans[li] = { L, nMain, nExt, nHalo, mainCount, extCount, layerBaseSlot };
    }
    if (numConvs > 1) {
      device.queue.writeBuffer(bandUboBuf, 0, bandUboHost);
    }
    let execMode = plan.execMode === "calibrate" && device.__v4WinCalibrated ? device.__v4WinFast ? "pipelined" : "paced" : plan.execMode;
    const passCategories = [];
    if (execMode === "single") {
      const enc2 = device.createCommandEncoder();
      prepRes.runPrePasses(enc2, passCategories);
      if (schedule.clsSkipped) {
        enc2.clearBuffer(labels8Buf, 0, outBufBytes);
        if (schedule.clsStrips.length > 0) {
          device.queue.writeBuffer(clsStripsUbo, 0, schedule.clsStrips);
        }
      }
      for (let li = 0; li < numConvs; li++) {
        const bp = bandPlans[li];
        const { L, nMain, nHalo } = bp;
        const nMomExt = L.nMomExt || 0;
        const nNorm = L.isFull ? TOTAL_STRIPS : L.normStrips ? L.normStrips.length : 0;
        if (li === 0) {
          const mainY = L.isFull ? 64 : 1;
          const mainZ = L.isFull ? DIM2 : nMain;
          const runBg = !!(L.bgStrip && nHalo > 0);
          u4Tmp[0] = L.isFull ? 1 : 0;
          u4Tmp[1] = L.bgStrip ? L.bgStrip.yWg * 4 : 0;
          u4Tmp[2] = L.bgStrip ? L.bgStrip.z : 0;
          u4Tmp[3] = 0;
          device.queue.writeBuffer(conv0Ubo, 0, u4Tmp);
          if (shaders.halfPass0) {
            for (const [pM, pB] of [[pConv0.lo, pConv0.bgLo], [pConv0.hi, pConv0.bgHi]]) {
              const pass = enc2.beginComputePass();
              pass.setBindGroup(0, bgConv0);
              if (mainZ > 0) {
                pass.setPipeline(pM.pipe);
                pass.dispatchWorkgroups(1, mainY, mainZ);
              }
              if (runBg) {
                pass.setPipeline(pB.pipe);
                pass.dispatchWorkgroups(1, 1, 1);
              }
              pass.end();
              passCategories.push("conv0");
            }
          } else {
            const pass = enc2.beginComputePass();
            pass.setBindGroup(0, bgConv0);
            if (mainZ > 0) {
              pass.setPipeline(pConv0.main.pipe);
              pass.dispatchWorkgroups(1, mainY, mainZ);
            }
            if (runBg) {
              pass.setPipeline(pConv0.bg.pipe);
              pass.dispatchWorkgroups(1, 1, 1);
            }
            pass.end();
            passCategories.push("conv0");
          }
        } else {
          const pipes2 = pConv;
          const bgC = convBgs[li];
          const bgF = flushBgs[li];
          const { mainCount, extCount, layerBaseSlot } = bp;
          const runBg = L.mode === "rpure" && !!L.bgStrip;
          for (let b = 0; b < 8; b++) {
            if (b >= 2) {
              const fb = b - 2;
              const doFlushMain = L.isFull || mainCount[fb] > 0;
              const doFlushExt = !L.isFull && L.mode === "bwd" && extCount[fb] > 0;
              if (doFlushMain || doFlushExt) {
                const fPass = enc2.beginComputePass();
                fPass.setPipeline(pFlush.pipe);
                if (doFlushMain) {
                  fPass.setBindGroup(0, bgF, [(layerBaseSlot + 8 + fb) * uboAlign]);
                  fPass.dispatchWorkgroups(1, L.isFull ? 64 : 1, L.isFull ? 32 : mainCount[fb]);
                }
                if (doFlushExt) {
                  fPass.setBindGroup(0, bgF, [(layerBaseSlot + 14 + fb) * uboAlign]);
                  fPass.dispatchWorkgroups(1, 1, extCount[fb]);
                }
                fPass.end();
                passCategories.push("flushStage");
              }
            }
            const doMain = L.isFull || mainCount[b] > 0;
            const doExt = !L.isFull && L.mode === "bwd" && extCount[b] > 0;
            const doBg = b === 0 && runBg;
            if (!doMain && !doExt && !doBg) continue;
            const cDyn = [(layerBaseSlot + b) * uboAlign];
            const mainY = L.isFull ? 64 : 1;
            const mainZ = L.isFull ? 32 : mainCount[b];
            if (shaders.halfPassConv) {
              for (const [pM, pE, pB] of [[pipes2.lo, pipes2.extLo, pipes2.bgLo], [pipes2.hi, pipes2.extHi, pipes2.bgHi]]) {
                const pass = enc2.beginComputePass();
                pass.setBindGroup(0, bgC, cDyn);
                if (doMain) {
                  pass.setPipeline(pM.pipe);
                  pass.dispatchWorkgroups(1, mainY, mainZ);
                }
                if (doExt) {
                  pass.setPipeline(pE.pipe);
                  pass.dispatchWorkgroups(1, 1, extCount[b]);
                }
                if (doBg) {
                  pass.setPipeline(pB.pipe);
                  pass.dispatchWorkgroups(1, 1, 1);
                }
                pass.end();
                passCategories.push("convHidden");
              }
            } else {
              const pass = enc2.beginComputePass();
              pass.setBindGroup(0, bgC, cDyn);
              if (doMain) {
                pass.setPipeline(pipes2.main.pipe);
                pass.dispatchWorkgroups(1, mainY, mainZ);
              }
              if (doExt) {
                pass.setPipeline(pipes2.ext.pipe);
                pass.dispatchWorkgroups(1, 1, extCount[b]);
              }
              if (doBg) {
                pass.setPipeline(pipes2.bg.pipe);
                pass.dispatchWorkgroups(1, 1, 1);
              }
              pass.end();
              passCategories.push("convHidden");
            }
          }
        }
        const nextWOff = li + 1 < numConvs ? packed.w0Vec4s + li * packed.hiddenVec4PerLayer : 0;
        prepTmpU32[0] = li * packed.metaStride;
        prepTmpU32[1] = nextWOff;
        prepTmpU32[2] = (li + 1) * packed.metaStride;
        prepTmpU32[3] = li + 1 < numConvs ? 1 : 0;
        prepTmpU32[4] = li === 0 ? 1 : 0;
        prepTmpU32[5] = L.isFull ? 1 : 0;
        prepTmpU32[6] = nMain;
        prepTmpU32[7] = nMomExt * 8;
        prepTmpF32[8] = L.extWeight || 0;
        prepTmpU32[9] = 0;
        prepTmpU32[10] = 0;
        prepTmpU32[11] = 0;
        device.queue.writeBuffer(prepUbos[li], 0, prepTmpU32);
        {
          const pass = enc2.beginComputePass();
          pass.setBindGroup(0, prepBgs[li]);
          pass.setPipeline(pMomFin.pipe);
          pass.dispatchWorkgroups(d.cs, 1, 1);
          pass.end();
          passCategories.push("momentsPrep");
        }
        if (li + 1 < numConvs) {
          {
            const pass = enc2.beginComputePass();
            pass.setBindGroup(0, prepBgs[li]);
            pass.setPipeline(pPrepW.pipe);
            pass.dispatchWorkgroups(1, 1, 1);
            pass.end();
            passCategories.push("momentsPrep");
          }
          const uploadNorm = !L.isFull ? nNorm : 0;
          if (uploadNorm > 0 || nHalo > 0) {
            if (uploadNorm > 0) normAuxHost.set(L.normStrips, 0);
            if (nHalo > 0) normAuxHost.set(L.haloRows, uploadNorm);
            device.queue.writeBuffer(normAuxBufs[li], 0, normAuxHost.subarray(0, uploadNorm + nHalo));
          }
          u4Tmp[0] = L.isFull ? 1 : 0;
          u4Tmp[1] = L.bgStrip ? L.bgStrip.z * DIM2 + L.bgStrip.yWg * 4 : 0;
          u4Tmp[2] = uploadNorm;
          u4Tmp[3] = nHalo;
          device.queue.writeBuffer(normUbos[li], 0, u4Tmp);
          if (L.isFull || nNorm > 0 || nHalo > 0) {
            const pass = enc2.beginComputePass();
            pass.setBindGroup(0, normBgs[li]);
            if (L.isFull || nNorm > 0) {
              pass.setPipeline(pNorm.pipe);
              pass.dispatchWorkgroups(1, L.isFull ? 64 : 1, L.isFull ? DIM2 : nNorm);
            }
            if (nHalo > 0) {
              pass.setPipeline(pNormHalo.pipe);
              pass.dispatchWorkgroups(1, Math.ceil(nHalo / 4), 1);
            }
            pass.end();
            passCategories.push("normHalo");
          }
        }
      }
      execute.__passCategories = passCategories;
      return ioCtl.finishAndReadback({ enc: enc2, schedule, passCategories, u4Tmp, ioOpts });
    }
    const plat = detectV4Platform(device);
    const onProgress = typeof ioOpts?.onProgress === "function" ? ioOpts.onProgress : null;
    const totalWork = estimateScheduleTotalWork(schedule, numConvs);
    let doneWork = 0;
    let lastLayerReported = -1;
    const emitProgress = (li) => {
      if (!onProgress) return;
      const frac = Math.min(0.99, doneWork / totalWork);
      let msg = "";
      if (li >= 0 && li !== lastLayerReported) {
        lastLayerReported = li;
        msg = `Layer ${li + 1}/${numConvs}`;
      }
      onProgress(frac, msg);
    };
    const pacer = createPacedQueueController(device, plan.msPerStrip || device.__v4MsPerStrip || 0.12, emitProgress);
    let enc = device.createCommandEncoder();
    prepRes.runPrePasses(enc, passCategories);
    if (schedule.clsSkipped) {
      enc.clearBuffer(labels8Buf, 0, outBufBytes);
      if (schedule.clsStrips.length > 0) {
        device.queue.writeBuffer(clsStripsUbo, 0, schedule.clsStrips);
      }
    }
    for (let li = 0; li < numConvs; li++) {
      const bp = bandPlans[li];
      const { L, nMain, nHalo } = bp;
      const nMomExt = L.nMomExt || 0;
      const nNorm = L.isFull ? TOTAL_STRIPS : L.normStrips ? L.normStrips.length : 0;
      const lw = estimateScheduleLayerWork(L, li, numConvs);
      if (li === 0) {
        const mainY = L.isFull ? 64 : 1;
        const mainZ = L.isFull ? DIM2 : nMain;
        const runBg = !!(L.bgStrip && nHalo > 0);
        u4Tmp[0] = L.isFull ? 1 : 0;
        u4Tmp[1] = L.bgStrip ? L.bgStrip.yWg * 4 : 0;
        u4Tmp[2] = L.bgStrip ? L.bgStrip.z : 0;
        u4Tmp[3] = 0;
        device.queue.writeBuffer(conv0Ubo, 0, u4Tmp);
        if (shaders.halfPass0) {
          for (const [pM, pB] of [[pConv0.lo, pConv0.bgLo], [pConv0.hi, pConv0.bgHi]]) {
            const pass = enc.beginComputePass();
            pass.setBindGroup(0, bgConv0);
            if (mainZ > 0) {
              pass.setPipeline(pM.pipe);
              pass.dispatchWorkgroups(1, mainY, mainZ);
            }
            if (runBg) {
              pass.setPipeline(pB.pipe);
              pass.dispatchWorkgroups(1, 1, 1);
            }
            pass.end();
            passCategories.push("conv0");
          }
        } else {
          const pass = enc.beginComputePass();
          pass.setBindGroup(0, bgConv0);
          if (mainZ > 0) {
            pass.setPipeline(pConv0.main.pipe);
            pass.dispatchWorkgroups(1, mainY, mainZ);
          }
          if (runBg) {
            pass.setPipeline(pConv0.bg.pipe);
            pass.dispatchWorkgroups(1, 1, 1);
          }
          pass.end();
          passCategories.push("conv0");
        }
        if (execMode === "calibrate") {
          device.queue.submit([enc.finish()]);
          enc = device.createCommandEncoder();
        } else if (execMode === "paced") {
          doneWork += lw.convWork;
          enc = await pacer.submitChunk(enc, lw.convWork, 0, { forceUiYield: true });
        }
      } else {
        const pipes2 = pConv;
        const bgC = convBgs[li];
        const bgF = flushBgs[li];
        const { mainCount, extCount, layerBaseSlot } = bp;
        const runBg = L.mode === "rpure" && !!L.bgStrip;
        let pendingStrips = 0;
        for (let b = 0; b < 8; b++) {
          if (b >= 2) {
            const fb = b - 2;
            const doFlushMain = L.isFull || mainCount[fb] > 0;
            const doFlushExt = !L.isFull && L.mode === "bwd" && extCount[fb] > 0;
            if (doFlushMain || doFlushExt) {
              const fPass = enc.beginComputePass();
              fPass.setPipeline(pFlush.pipe);
              if (doFlushMain) {
                fPass.setBindGroup(0, bgF, [(layerBaseSlot + 8 + fb) * uboAlign]);
                fPass.dispatchWorkgroups(1, L.isFull ? 64 : 1, L.isFull ? 32 : mainCount[fb]);
              }
              if (doFlushExt) {
                fPass.setBindGroup(0, bgF, [(layerBaseSlot + 14 + fb) * uboAlign]);
                fPass.dispatchWorkgroups(1, 1, extCount[fb]);
              }
              fPass.end();
              passCategories.push("flushStage");
            }
          }
          const doMain = L.isFull || mainCount[b] > 0;
          const doExt = !L.isFull && L.mode === "bwd" && extCount[b] > 0;
          const doBg = b === 0 && runBg;
          if (doMain || doExt || doBg) {
            const cDyn = [(layerBaseSlot + b) * uboAlign];
            const mainY = L.isFull ? 64 : 1;
            const mainZ = L.isFull ? 32 : mainCount[b];
            if (shaders.halfPassConv) {
              for (const [pM, pE, pB] of [[pipes2.lo, pipes2.extLo, pipes2.bgLo], [pipes2.hi, pipes2.extHi, pipes2.bgHi]]) {
                const pass = enc.beginComputePass();
                pass.setBindGroup(0, bgC, cDyn);
                if (doMain) {
                  pass.setPipeline(pM.pipe);
                  pass.dispatchWorkgroups(1, mainY, mainZ);
                }
                if (doExt) {
                  pass.setPipeline(pE.pipe);
                  pass.dispatchWorkgroups(1, 1, extCount[b]);
                }
                if (doBg) {
                  pass.setPipeline(pB.pipe);
                  pass.dispatchWorkgroups(1, 1, 1);
                }
                pass.end();
                passCategories.push("convHidden");
              }
            } else {
              const pass = enc.beginComputePass();
              pass.setBindGroup(0, bgC, cDyn);
              if (doMain) {
                pass.setPipeline(pipes2.main.pipe);
                pass.dispatchWorkgroups(1, mainY, mainZ);
              }
              if (doExt) {
                pass.setPipeline(pipes2.ext.pipe);
                pass.dispatchWorkgroups(1, 1, extCount[b]);
              }
              if (doBg) {
                pass.setPipeline(pipes2.bg.pipe);
                pass.dispatchWorkgroups(1, 1, 1);
              }
              pass.end();
              passCategories.push("convHidden");
            }
            pendingStrips += (doMain ? L.isFull ? 2048 : mainCount[b] : 0) + (doExt ? extCount[b] : 0);
          }
          if (execMode === "calibrate" && (pendingStrips >= 512 || b === 7 && pendingStrips > 0)) {
            const tSub = performance.now();
            device.queue.submit([enc.finish()]);
            await device.queue.onSubmittedWorkDone();
            const dt = performance.now() - tSub;
            enc = device.createCommandEncoder();
            doneWork += pendingStrips;
            if (pendingStrips >= 512) {
              const msPerStrip = dt / pendingStrips;
              const estFullLayerMs = msPerStrip * TOTAL_STRIPS;
              device.__v4WinCalibrated = true;
              pacer.setMsPerStrip(msPerStrip);
              if (!plat.isWindowsSharedIgpu && estFullLayerMs < WINDOWS_FAST_LAYER_MAX_MS) {
                device.__v4WinFast = true;
                execMode = "pipelined";
                console.log(`[WebGPU-V4-128M] Windows GPU calibration: estFullLayer=${estFullLayerMs.toFixed(1)}ms -> unthrottled pipelined mode`);
              } else {
                device.__v4WinFast = false;
                execMode = "paced";
                console.log(`[WebGPU-V4-128M] Windows GPU calibration: estFullLayer=${estFullLayerMs.toFixed(1)}ms -> TDR-safe 2-in-flight paced mode`);
                emitProgress(li);
              }
            }
            pendingStrips = 0;
          } else if (execMode === "paced" && pendingStrips > 0 && (pendingStrips * pacer.getMsPerStrip() >= PACED_TARGET_CHUNK_MS * 0.75 || b === 7)) {
            doneWork += pendingStrips;
            enc = await pacer.submitChunk(enc, pendingStrips, li);
            pendingStrips = 0;
          }
        }
      }
      const nextWOff = li + 1 < numConvs ? packed.w0Vec4s + li * packed.hiddenVec4PerLayer : 0;
      prepTmpU32[0] = li * packed.metaStride;
      prepTmpU32[1] = nextWOff;
      prepTmpU32[2] = (li + 1) * packed.metaStride;
      prepTmpU32[3] = li + 1 < numConvs ? 1 : 0;
      prepTmpU32[4] = li === 0 ? 1 : 0;
      prepTmpU32[5] = L.isFull ? 1 : 0;
      prepTmpU32[6] = nMain;
      prepTmpU32[7] = nMomExt * 8;
      prepTmpF32[8] = L.extWeight || 0;
      prepTmpU32[9] = 0;
      prepTmpU32[10] = 0;
      prepTmpU32[11] = 0;
      device.queue.writeBuffer(prepUbos[li], 0, prepTmpU32);
      {
        const pass = enc.beginComputePass();
        pass.setBindGroup(0, prepBgs[li]);
        pass.setPipeline(pMomFin.pipe);
        pass.dispatchWorkgroups(d.cs, 1, 1);
        pass.end();
        passCategories.push("momentsPrep");
      }
      if (li + 1 < numConvs) {
        {
          const pass = enc.beginComputePass();
          pass.setBindGroup(0, prepBgs[li]);
          pass.setPipeline(pPrepW.pipe);
          pass.dispatchWorkgroups(1, 1, 1);
          pass.end();
          passCategories.push("momentsPrep");
        }
        const uploadNorm = !L.isFull ? nNorm : 0;
        if (uploadNorm > 0 || nHalo > 0) {
          if (uploadNorm > 0) normAuxHost.set(L.normStrips, 0);
          if (nHalo > 0) normAuxHost.set(L.haloRows, uploadNorm);
          device.queue.writeBuffer(normAuxBufs[li], 0, normAuxHost.subarray(0, uploadNorm + nHalo));
        }
        u4Tmp[0] = L.isFull ? 1 : 0;
        u4Tmp[1] = L.bgStrip ? L.bgStrip.z * DIM2 + L.bgStrip.yWg * 4 : 0;
        u4Tmp[2] = uploadNorm;
        u4Tmp[3] = nHalo;
        device.queue.writeBuffer(normUbos[li], 0, u4Tmp);
        if (L.isFull || nNorm > 0 || nHalo > 0) {
          const pass = enc.beginComputePass();
          pass.setBindGroup(0, normBgs[li]);
          if (L.isFull || nNorm > 0) {
            pass.setPipeline(pNorm.pipe);
            pass.dispatchWorkgroups(1, L.isFull ? 64 : 1, L.isFull ? DIM2 : nNorm);
          }
          if (nHalo > 0) {
            pass.setPipeline(pNormHalo.pipe);
            pass.dispatchWorkgroups(1, Math.ceil(nHalo / 4), 1);
          }
          pass.end();
          passCategories.push("normHalo");
        }
      }
      if (execMode === "pipelined") {
        device.queue.submit([enc.finish()]);
        enc = device.createCommandEncoder();
      } else if (execMode === "calibrate") {
        device.queue.submit([enc.finish()]);
        await device.queue.onSubmittedWorkDone();
        enc = device.createCommandEncoder();
        doneWork += (li === 0 ? lw.convWork : 0) + lw.normWork;
        if (li === numConvs - 1 && !device.__v4WinCalibrated) {
          device.__v4WinCalibrated = true;
          device.__v4WinFast = !plat.isWindowsSharedIgpu;
        }
      } else {
        doneWork += lw.normWork;
        enc = await pacer.submitChunk(enc, lw.normWork, li);
      }
    }
    if (execMode === "paced") {
      await pacer.waitBeforeFinalSubmit();
    }
    execute.__passCategories = passCategories;
    return ioCtl.finishAndReadback({
      enc,
      schedule,
      passCategories,
      u4Tmp,
      ioOpts,
      paced: execMode === "paced",
      onProgress
    });
  }
  ioCtl.warmupIoPipelines();
  execute.dispose = ({ keepSharedWorkspace = false } = {}) => {
    ioCtl.dispose();
    for (const b of ownedBuffers) b.destroy();
    ownedBuffers.length = 0;
    ownedAlloc.resetBytes();
    if (!ws.pooled) {
      for (const b of ws.buffers) b.destroy();
      ws.buffers.length = 0;
    } else if (keepSharedWorkspace) {
      ws.inUse = false;
    } else if (v4WorkspacePool.get(device) === ws) {
      releaseV4Workspace(device);
    }
  };
  execute.gpuBytes = () => ws.bytes + ownedAlloc.getBytes();
  execute.__passCategories = [];
  execute.__coneInfo = () => ({ paddedVox, actMiB: actQBytes / 1048576, mode: "LowMem128" });
  execute.__v4Plan = () => plan;
  execute.kernels = "v4-int8";
  return execute;
}
async function setupNet(device, safetensorBytes, callbackUI, modelEntry = {}) {
  activeUserSetups++;
  try {
    return await setupNetInner(device, safetensorBytes, callbackUI, modelEntry);
  } finally {
    activeUserSetups--;
  }
}
async function setupNetInner(device, safetensorBytes, callbackUI, modelEntry = {}) {
  const bytes = safetensorBytes instanceof Uint8Array ? safetensorBytes : new Uint8Array(safetensorBytes);
  const parsed = modelEntry?.modelBinModel ? parseModelBin(bytes, modelEntry.modelBinModel) : parseSafetensors(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const desc = describeSafetensors(parsed);
  if (modelEntry?.classifierBias && desc.classifier) {
    desc.classifier.bias = Float32Array.from(modelEntry.classifierBias);
  }
  const modelDesc = descriptorFor(modelEntry);
  const dilations = modelEntry?.dilations || modelDesc?.dilations || (desc.convs.length === 25 ? [16, 8, 4, 2, 1, 16, 8, 4, 2, 1, 16, 8, 4, 2, 1, 16, 8, 4, 2, 1, 16, 8, 4, 2, 1] : desc.convs.length === 9 ? [1, 2, 4, 8, 16, 8, 4, 2, 1] : DEEP132);
  const activation = modelEntry?.activation || modelDesc?.activation || (desc.affines.length || desc.convs.length >= 13 ? "gelu_tanh" : "relu");
  const rawChan = desc.convs[0].outC;
  const cs = rawChan > 8 ? Math.ceil(rawChan / 8) * 8 : Math.ceil(rawChan / 4) * 4;
  const d = deriveDescriptor(desc, { nx: DIM2, ny: DIM2, nz: DIM2, cs, activation, dilations });
  const packed = getPackedWeightsCached(bytes, desc, d, modelEntry);
  const probCfg = modelEntry?.outputType === "probability" ? tissueProbabilityConfig(modelEntry, d.nclass) : null;
  const hasF16 = !!device.features?.has?.("shader-f16") && !modelEntry?.disableF16;
  const subgroupMode = resolveSubgroupMode(device, modelEntry);
  const nvox = DIM2 * DIM2 * DIM2;
  const outBufBytes = probCfg ? nvox * 4 : nvox;
  const splitHalves = d.cs >= 16;
  const csHalf = splitHalves ? d.cs / 2 : d.cs;
  const actBytes = DIM2 * DIM2 * csHalf * X4_PAD2 * 4;
  const y8Bytes = DIM2 * DIM2 * csHalf * X4_VALID2 * 4;
  const lim = device.limits || {};
  const maxAllowed = Math.min(lim.maxStorageBufferBindingSize ?? Infinity, lim.maxBufferSize ?? Infinity);
  const plan = await resolveV4ExecutionPlan(device, d, modelEntry, {
    actBytes,
    outBufBytes,
    hasF16,
    env: modelEntry?.__v4Env || null
  });
  device.__v4LastPlan = plan;
  console.info(formatV4PlanDiagnostic(plan, d));
  if (plan.layout === "LowMem128" && d.cs >= 8 && d.cs % 4 === 0) {
    return setupNetLowMem128(device, d, packed, hasF16, subgroupMode, modelEntry, probCfg, plan);
  }
  if (actBytes > maxAllowed || outBufBytes > maxAllowed) {
    const needMiB = Math.max(actBytes, outBufBytes) >>> 20;
    throw new Error(`meshnet_fast_v4: buffer (${needMiB} MiB) exceeds device limit (${maxAllowed >>> 20} MiB)`);
  }
  const chunkableStd = plan.chunkableStd;
  const shaders = buildShaders({
    cs: d.cs,
    chan: d.chan,
    nclass: d.nclass,
    clsK4: packed.clsK4,
    dilations: d.dilations,
    activation: d.activation,
    norm: d.norm,
    hasF16,
    subgroupMode,
    splitHalves,
    probCfg,
    chunkableStd
  });
  console.log(
    `[WebGPU-V4] ${d.chan}ch(cs=${d.cs})/${d.nclass}cls (${d.dilations.length} convs, ${d.activation}, norm=${d.norm}${probCfg ? ", prob=3" : ""}) | ${hasF16 ? "f16+sterbenz" : "f32"} | ${subgroupModeLabel(subgroupMode)} | ZYCX-pad80 | maxBuf=${(Math.max(actBytes, outBufBytes) / 1048576).toFixed(1)} MiB`
  );
  const S = GPUBufferUsage.STORAGE;
  const CD = GPUBufferUsage.COPY_DST;
  const CS = GPUBufferUsage.COPY_SRC;
  const paddedVox = DIM2 * DIM2 * ROW_SCALARS_PAD;
  const inpBytes = paddedVox * (hasF16 ? 2 : 4);
  const momMainBytes = TOTAL_HALF_ROWS * d.cs * 16;
  const momExtBytes = MAX_EXT_HALF_ROWS * d.cs * 16;
  const momStatsBytes = (d.cs * 2 + 4) * 16;
  const wEffBytes = hasF16 ? Math.ceil(shaders.totalWEffVec4s / 2) * 16 : shaders.totalWEffVec4s * 16;
  const wsKey = `std|${d.cs}|${splitHalves ? 1 : 0}|${hasF16 ? 1 : 0}|${outBufBytes}`;
  const ws = acquireV4Workspace(device, wsKey, () => {
    const buffers = [];
    const wsAlloc = createBufAllocator(device, buffers);
    const mkWs = wsAlloc.alloc;
    const named = {
      inpBuf: mkWs(inpBytes, S | CD | CS),
      act8_0: mkWs(actBytes, S | CD | CS),
      act8_1: mkWs(splitHalves ? actBytes : 16, S | CD | CS),
      y8_0: mkWs(y8Bytes, S | CD | CS),
      y8_1: mkWs(splitHalves ? y8Bytes : 16, S | CD | CS),
      momMainBuf: mkWs(momMainBytes, S),
      momExtBuf: mkWs(momExtBytes, S),
      momStatsBuf: mkWs(momStatsBytes, S),
      labels8Buf: mkWs(outBufBytes, S | CD | CS),
      readbackBuf: mkWs(outBufBytes, GPUBufferUsage.MAP_READ | CD)
    };
    return { buffers, named, bytes: wsAlloc.getBytes() };
  });
  const {
    inpBuf,
    act8_0,
    act8_1,
    y8_0,
    y8_1,
    momMainBuf,
    momExtBuf,
    momStatsBuf,
    labels8Buf,
    readbackBuf
  } = ws.named;
  const ownedBuffers = [];
  const ownedAlloc = createBufAllocator(device, ownedBuffers);
  const mkBuf = ownedAlloc.alloc;
  const wRawBuf = mkBuf(hasF16 ? packed.wF16.byteLength : packed.wF32.byteLength, S | CD);
  const qmetaBuf = mkBuf(packed.qmetaF32.byteLength, S | CD);
  const wEffBuf = mkBuf(wEffBytes, shaders.useUniformWeff ? S | GPUBufferUsage.UNIFORM : S);
  const numConvs = d.dilations.length;
  const canCone = d.norm === "gn" && !modelEntry?.disableConeSkip;
  const stripsBufs = Array.from({ length: numConvs }, () => mkBuf(canCone ? TOTAL_STRIPS * 4 : 16, S | CD));
  const normAuxBufs = Array.from({ length: numConvs - 1 }, () => mkBuf(canCone ? (TOTAL_STRIPS + DIM2 * DIM2) * 4 : 16, S | CD));
  const clsStripsBuf = mkBuf(canCone ? TOTAL_STRIPS * 4 : 16, S | CD);
  const conv0Ubo = mkBuf(16, GPUBufferUsage.UNIFORM | CD);
  const clsUbo = mkBuf(16, GPUBufferUsage.UNIFORM | CD);
  const prepUbos = Array.from({ length: numConvs }, () => mkBuf(48, GPUBufferUsage.UNIFORM | CD));
  const normUbos = Array.from({ length: numConvs - 1 }, () => mkBuf(16, GPUBufferUsage.UNIFORM | CD));
  const uboAlign = Math.max(256, lim.minUniformBufferOffsetAlignment || 256);
  const uboAlignU32 = uboAlign >>> 2;
  const totalStdSlots = shaders.chunkableStd ? Math.max(1, (numConvs - 1) * STD_SLOTS_PER_LAYER) : 0;
  const stdChunkUboBuf = shaders.chunkableStd ? mkBuf(totalStdSlots * uboAlign, GPUBufferUsage.UNIFORM | CD) : null;
  const stdChunkUboHost = shaders.chunkableStd ? new Uint32Array(totalStdSlots * uboAlignU32) : null;
  const convUbos = shaders.chunkableStd ? null : Array.from({ length: numConvs }, () => mkBuf(16, GPUBufferUsage.UNIFORM | CD));
  device.queue.writeBuffer(wRawBuf, 0, hasF16 ? packed.wF16 : packed.wF32);
  device.queue.writeBuffer(qmetaBuf, 0, packed.qmetaF32);
  let pipes;
  try {
    pipes = await getNetPipesStd(
      device,
      d,
      packed,
      hasF16,
      subgroupMode,
      splitHalves,
      probCfg,
      shaders
    );
  } catch (err) {
    for (const b of ownedBuffers) b.destroy();
    ownedBuffers.length = 0;
    if (!ws.pooled) {
      for (const b of ws.buffers) b.destroy();
      ws.buffers.length = 0;
    } else if (v4WorkspacePool.get(device) === ws) {
      releaseV4Workspace(device);
    }
    throw err;
  }
  const { pInit, pMomFin, pPrepW, pNorm, pNormHalo, pCls, pConv0, pConv } = pipes;
  const mkBg = (bgl, bufs) => device.createBindGroup({
    layout: bgl,
    entries: bufs.map((res, binding) => ({
      binding,
      resource: res && res.buffer ? res : { buffer: res }
    }))
  });
  const bgInit = mkBg(pInit.bgl, [act8_0, act8_1]);
  {
    const enc = device.createCommandEncoder();
    const pass = enc.beginComputePass();
    pass.setPipeline(pInit.pipe);
    pass.setBindGroup(0, bgInit);
    pass.dispatchWorkgroups(1, DIM2, DIM2);
    pass.end();
    device.queue.submit([enc.finish()]);
  }
  const p0Bgl = (shaders.halfPass0 ? pConv0.lo : pConv0.main).bgl;
  const bgConv0 = mkBg(p0Bgl, [inpBuf, y8_0, y8_1, wRawBuf, qmetaBuf, momMainBuf, momExtBuf, stripsBufs[0], conv0Ubo]);
  const bgCls = mkBg(pCls.bgl, [y8_0, y8_1, wRawBuf, qmetaBuf, momMainBuf, momStatsBuf, labels8Buf, clsStripsBuf, clsUbo]);
  const canGpuProb = !!(probCfg && splitHalves && actBytes >= outBufBytes && y8Bytes >= outBufBytes);
  const clsUbo1 = canGpuProb ? mkBuf(16, GPUBufferUsage.UNIFORM | CD) : null;
  const bgCls1 = canGpuProb ? mkBg(pCls.bgl, [y8_0, y8_1, wRawBuf, qmetaBuf, momMainBuf, momStatsBuf, labels8Buf, clsStripsBuf, clsUbo1]) : null;
  const ioCtl = createGpuIoController({
    device,
    hasF16,
    nvox,
    outBufBytes,
    inpBuf,
    act8_0,
    labels8Buf,
    readbackBuf,
    pInit,
    bgInit,
    pCls,
    bgCls,
    clsUbo,
    packed,
    modelEntry,
    probCfg,
    canGpuProb,
    probSlots: canGpuProb ? {
      clsUbo1,
      bgCls1,
      pass0HoldBuf: act8_0,
      y0: y8_0,
      y1: y8_1,
      b: act8_1,
      sup: act8_0
    } : null,
    ownedBuffers,
    mkBuf
  });
  const prepBgs = prepUbos.map(
    (ubo, li) => mkBg(pMomFin.bgl, [wRawBuf, qmetaBuf, momMainBuf, momExtBuf, momStatsBuf, wEffBuf, stripsBufs[li], ubo])
  );
  const normBgs = normUbos.map(
    (ubo, li) => mkBg(pNorm.bgl, [act8_0, act8_1, y8_0, y8_1, momMainBuf, momExtBuf, momStatsBuf, normAuxBufs[li], ubo])
  );
  const stdDynRes = shaders.chunkableStd ? { buffer: stdChunkUboBuf, offset: 0, size: 32 } : null;
  const convP0 = shaders.halfPassConv ? pConv.lo : pConv.main;
  const convBgs = Array.from(
    { length: numConvs },
    (_, li) => li === 0 ? null : mkBg(convP0.bgl, [
      act8_0,
      act8_1,
      y8_0,
      y8_1,
      momMainBuf,
      momExtBuf,
      wEffBuf,
      stripsBufs[li],
      shaders.chunkableStd ? stdDynRes : convUbos[li]
    ])
  );
  const setStdSlot = (slotIdx, isFull, nMain, dPack, mainOff, extBase) => {
    const o = slotIdx * uboAlignU32;
    stdChunkUboHost[o] = isFull ? 1 : 0;
    stdChunkUboHost[o + 1] = nMain;
    stdChunkUboHost[o + 2] = dPack;
    stdChunkUboHost[o + 3] = 0;
    stdChunkUboHost[o + 4] = mainOff;
    stdChunkUboHost[o + 5] = extBase;
    stdChunkUboHost[o + 6] = 0;
    stdChunkUboHost[o + 7] = 0;
  };
  const dispatchStdConv = (enc, pipes2, bg, dynOffsets, mainY, mainCountZ, extCountZ, passCategories) => {
    if (mainCountZ <= 0 && extCountZ <= 0) return;
    if (shaders.halfPassConv) {
      {
        const pass = enc.beginComputePass();
        if (dynOffsets) pass.setBindGroup(0, bg, dynOffsets);
        else pass.setBindGroup(0, bg);
        if (mainCountZ > 0) {
          pass.setPipeline(pipes2.lo.pipe);
          pass.dispatchWorkgroups(1, mainY, mainCountZ);
        }
        if (extCountZ > 0) {
          pass.setPipeline(pipes2.extLo.pipe);
          pass.dispatchWorkgroups(1, 1, extCountZ);
        }
        pass.end();
        passCategories.push("convHidden");
      }
      {
        const pass = enc.beginComputePass();
        if (dynOffsets) pass.setBindGroup(0, bg, dynOffsets);
        else pass.setBindGroup(0, bg);
        if (mainCountZ > 0) {
          pass.setPipeline(pipes2.hi.pipe);
          pass.dispatchWorkgroups(1, mainY, mainCountZ);
        }
        if (extCountZ > 0) {
          pass.setPipeline(pipes2.extHi.pipe);
          pass.dispatchWorkgroups(1, 1, extCountZ);
        }
        pass.end();
        passCategories.push("convHidden");
      }
    } else {
      const pass = enc.beginComputePass();
      if (dynOffsets) pass.setBindGroup(0, bg, dynOffsets);
      else pass.setBindGroup(0, bg);
      if (mainCountZ > 0) {
        pass.setPipeline(pipes2.main.pipe);
        pass.dispatchWorkgroups(1, mainY, mainCountZ);
      }
      if (extCountZ > 0) {
        pass.setPipeline(pipes2.ext.pipe);
        pass.dispatchWorkgroups(1, 1, extCountZ);
      }
      pass.end();
      passCategories.push("convHidden");
    }
  };
  const padInputHost = hasF16 ? new Uint16Array(paddedVox) : new Float32Array(paddedVox);
  const headRowHost = new Uint8Array(DIM2 * DIM2);
  const stripsHost = new Uint32Array(TOTAL_STRIPS);
  const normAuxHost = new Uint32Array(TOTAL_STRIPS + DIM2 * DIM2);
  const prepTmpU32 = new Uint32Array(12);
  const prepTmpF32 = new Float32Array(prepTmpU32.buffer);
  const u4Tmp = new Uint32Array(4);
  async function execute(volume, ioOpts) {
    if (volume.length !== nvox) {
      throw new Error(`meshnet_fast_v4 expected ${nvox} voxels, got ${volume.length}`);
    }
    const useCone = d.norm === "gn" && !modelEntry?.disableConeSkip;
    const prepRes = await ioCtl.prepareInput({
      volume,
      ioOpts,
      useCone,
      padInputHost,
      headRowHost,
      hasF16Flag: hasF16
    });
    const info = prepRes.info;
    const schedule = computeConeSchedule(headRowHost, info, d.dilations, useCone);
    let execMode = plan.execMode === "calibrate" && device.__v4WinCalibrated ? device.__v4WinFast ? "pipelined" : "paced" : plan.execMode;
    const passCategories = [];
    if (execMode === "single" && !shaders.chunkableStd) {
      const enc2 = device.createCommandEncoder();
      prepRes.runPrePasses(enc2, passCategories);
      if (schedule.clsSkipped) {
        enc2.clearBuffer(labels8Buf, 0, outBufBytes);
        if (schedule.clsStrips.length > 0) {
          device.queue.writeBuffer(clsStripsBuf, 0, schedule.clsStrips);
        }
      }
      for (let li = 0; li < numConvs; li++) {
        const L = schedule.layers[li];
        const nMain = L.isFull ? TOTAL_STRIPS : L.mainStrips.length;
        const nExt = L.isFull || !L.extStrips ? 0 : L.extStrips.length;
        const nMomExt = L.nMomExt || 0;
        const nHalo = L.haloRows ? L.haloRows.length : 0;
        const nNorm = L.isFull ? TOTAL_STRIPS : L.normStrips ? L.normStrips.length : 0;
        if (!L.isFull && (nMain > 0 || nExt > 0)) {
          if (nMain > 0) stripsHost.set(L.mainStrips, 0);
          if (nExt > 0) stripsHost.set(L.extStrips, nMain);
          device.queue.writeBuffer(stripsBufs[li], 0, stripsHost.subarray(0, nMain + nExt));
        }
        if (li === 0) {
          const mainY = L.isFull ? 64 : 1;
          const mainZ = L.isFull ? DIM2 : nMain;
          const runBg = !!(L.bgStrip && nHalo > 0);
          u4Tmp[0] = L.isFull ? 1 : 0;
          u4Tmp[1] = L.bgStrip ? L.bgStrip.yWg * 4 : 0;
          u4Tmp[2] = L.bgStrip ? L.bgStrip.z : 0;
          u4Tmp[3] = 0;
          device.queue.writeBuffer(conv0Ubo, 0, u4Tmp);
          if (shaders.halfPass0) {
            {
              const pass = enc2.beginComputePass();
              pass.setBindGroup(0, bgConv0);
              if (mainZ > 0) {
                pass.setPipeline(pConv0.lo.pipe);
                pass.dispatchWorkgroups(1, mainY, mainZ);
              }
              if (runBg) {
                pass.setPipeline(pConv0.bgLo.pipe);
                pass.dispatchWorkgroups(1, 1, 1);
              }
              pass.end();
              passCategories.push("conv0");
            }
            {
              const pass = enc2.beginComputePass();
              pass.setBindGroup(0, bgConv0);
              if (mainZ > 0) {
                pass.setPipeline(pConv0.hi.pipe);
                pass.dispatchWorkgroups(1, mainY, mainZ);
              }
              if (runBg) {
                pass.setPipeline(pConv0.bgHi.pipe);
                pass.dispatchWorkgroups(1, 1, 1);
              }
              pass.end();
              passCategories.push("conv0");
            }
          } else {
            const pass = enc2.beginComputePass();
            pass.setBindGroup(0, bgConv0);
            if (mainZ > 0) {
              pass.setPipeline(pConv0.main.pipe);
              pass.dispatchWorkgroups(1, mainY, mainZ);
            }
            if (runBg) {
              pass.setPipeline(pConv0.bg.pipe);
              pass.dispatchWorkgroups(1, 1, 1);
            }
            pass.end();
            passCategories.push("conv0");
          }
        } else {
          const dil = d.dilations[li];
          const bg = convBgs[li];
          const mainY = L.isFull ? 64 : 1;
          const mainZ = L.isFull ? DIM2 : nMain;
          const writeExtY8 = L.mode === "rpure" && nHalo > 0 || L.mode === "bwd" && li + 1 < numConvs;
          u4Tmp[0] = L.isFull ? 1 : 0;
          u4Tmp[1] = nMain;
          u4Tmp[2] = packConvDilFlags(dil, writeExtY8);
          u4Tmp[3] = 0;
          device.queue.writeBuffer(convUbos[li], 0, u4Tmp);
          dispatchStdConv(enc2, pConv, bg, null, mainY, mainZ, nExt, passCategories);
        }
        const nextWOff = li + 1 < numConvs ? packed.w0Vec4s + li * packed.hiddenVec4PerLayer : 0;
        prepTmpU32[0] = li * packed.metaStride;
        prepTmpU32[1] = nextWOff;
        prepTmpU32[2] = (li + 1) * packed.metaStride;
        prepTmpU32[3] = li + 1 < numConvs ? 1 : 0;
        prepTmpU32[4] = li === 0 ? 1 : 0;
        prepTmpU32[5] = L.isFull ? 1 : 0;
        prepTmpU32[6] = nMain;
        prepTmpU32[7] = nMomExt * 8;
        prepTmpF32[8] = L.extWeight || 0;
        prepTmpU32[9] = 0;
        prepTmpU32[10] = 0;
        prepTmpU32[11] = 0;
        device.queue.writeBuffer(prepUbos[li], 0, prepTmpU32);
        {
          const pass = enc2.beginComputePass();
          pass.setBindGroup(0, prepBgs[li]);
          pass.setPipeline(pMomFin.pipe);
          pass.dispatchWorkgroups(d.cs, 1, 1);
          pass.end();
          passCategories.push("momentsPrep");
        }
        if (li + 1 < numConvs) {
          {
            const pass = enc2.beginComputePass();
            pass.setBindGroup(0, prepBgs[li]);
            pass.setPipeline(pPrepW.pipe);
            pass.dispatchWorkgroups(1, 1, 1);
            pass.end();
            passCategories.push("momentsPrep");
          }
          const uploadNorm = !L.isFull ? nNorm : 0;
          if (uploadNorm > 0 || nHalo > 0) {
            if (uploadNorm > 0) normAuxHost.set(L.normStrips, 0);
            if (nHalo > 0) normAuxHost.set(L.haloRows, uploadNorm);
            device.queue.writeBuffer(normAuxBufs[li], 0, normAuxHost.subarray(0, uploadNorm + nHalo));
          }
          u4Tmp[0] = L.isFull ? 1 : 0;
          u4Tmp[1] = L.bgStrip ? L.bgStrip.z * DIM2 + L.bgStrip.yWg * 4 : 0;
          u4Tmp[2] = uploadNorm;
          u4Tmp[3] = nHalo;
          device.queue.writeBuffer(normUbos[li], 0, u4Tmp);
          if (L.isFull || nNorm > 0 || nHalo > 0) {
            const pass = enc2.beginComputePass();
            pass.setBindGroup(0, normBgs[li]);
            if (L.isFull || nNorm > 0) {
              pass.setPipeline(pNorm.pipe);
              pass.dispatchWorkgroups(1, L.isFull ? 64 : 1, L.isFull ? DIM2 : nNorm);
            }
            if (nHalo > 0) {
              pass.setPipeline(pNormHalo.pipe);
              pass.dispatchWorkgroups(1, Math.ceil(nHalo / 4), 1);
            }
            pass.end();
            passCategories.push("normHalo");
          }
        }
      }
      execute.__passCategories = passCategories;
      return ioCtl.finishAndReadback({ enc: enc2, schedule, passCategories, u4Tmp, ioOpts });
    }
    const plat = detectV4Platform(device);
    const onProgress = typeof ioOpts?.onProgress === "function" ? ioOpts.onProgress : null;
    const totalWork = estimateScheduleTotalWork(schedule, numConvs);
    let doneWork = 0;
    let lastLayerReported = -1;
    const emitProgress = (li) => {
      if (!onProgress) return;
      const frac = Math.min(0.99, doneWork / totalWork);
      let msg = "";
      if (li >= 0 && li !== lastLayerReported) {
        lastLayerReported = li;
        msg = `Layer ${li + 1}/${numConvs}`;
      }
      onProgress(frac, msg);
    };
    const pacer = createPacedQueueController(device, plan.msPerStrip || device.__v4MsPerStrip || 0.12, emitProgress);
    let enc = device.createCommandEncoder();
    prepRes.runPrePasses(enc, passCategories);
    if (schedule.clsSkipped) {
      enc.clearBuffer(labels8Buf, 0, outBufBytes);
      if (schedule.clsStrips.length > 0) {
        device.queue.writeBuffer(clsStripsBuf, 0, schedule.clsStrips);
      }
    }
    for (let li = 0; li < numConvs; li++) {
      const L = schedule.layers[li];
      const nMain = L.isFull ? TOTAL_STRIPS : L.mainStrips.length;
      const nExt = L.isFull || !L.extStrips ? 0 : L.extStrips.length;
      const nMomExt = L.nMomExt || 0;
      const nHalo = L.haloRows ? L.haloRows.length : 0;
      const nNorm = L.isFull ? TOTAL_STRIPS : L.normStrips ? L.normStrips.length : 0;
      const lw = estimateScheduleLayerWork(L, li, numConvs);
      if (!L.isFull && (nMain > 0 || nExt > 0)) {
        if (nMain > 0) stripsHost.set(L.mainStrips, 0);
        if (nExt > 0) stripsHost.set(L.extStrips, nMain);
        device.queue.writeBuffer(stripsBufs[li], 0, stripsHost.subarray(0, nMain + nExt));
      }
      if (li === 0) {
        const mainY = L.isFull ? 64 : 1;
        const mainZ = L.isFull ? DIM2 : nMain;
        const runBg = !!(L.bgStrip && nHalo > 0);
        u4Tmp[0] = L.isFull ? 1 : 0;
        u4Tmp[1] = L.bgStrip ? L.bgStrip.yWg * 4 : 0;
        u4Tmp[2] = L.bgStrip ? L.bgStrip.z : 0;
        u4Tmp[3] = 0;
        device.queue.writeBuffer(conv0Ubo, 0, u4Tmp);
        if (shaders.halfPass0) {
          {
            const pass = enc.beginComputePass();
            pass.setBindGroup(0, bgConv0);
            if (mainZ > 0) {
              pass.setPipeline(pConv0.lo.pipe);
              pass.dispatchWorkgroups(1, mainY, mainZ);
            }
            if (runBg) {
              pass.setPipeline(pConv0.bgLo.pipe);
              pass.dispatchWorkgroups(1, 1, 1);
            }
            pass.end();
            passCategories.push("conv0");
          }
          {
            const pass = enc.beginComputePass();
            pass.setBindGroup(0, bgConv0);
            if (mainZ > 0) {
              pass.setPipeline(pConv0.hi.pipe);
              pass.dispatchWorkgroups(1, mainY, mainZ);
            }
            if (runBg) {
              pass.setPipeline(pConv0.bgHi.pipe);
              pass.dispatchWorkgroups(1, 1, 1);
            }
            pass.end();
            passCategories.push("conv0");
          }
        } else {
          const pass = enc.beginComputePass();
          pass.setBindGroup(0, bgConv0);
          if (mainZ > 0) {
            pass.setPipeline(pConv0.main.pipe);
            pass.dispatchWorkgroups(1, mainY, mainZ);
          }
          if (runBg) {
            pass.setPipeline(pConv0.bg.pipe);
            pass.dispatchWorkgroups(1, 1, 1);
          }
          pass.end();
          passCategories.push("conv0");
        }
        if (execMode === "calibrate") {
          device.queue.submit([enc.finish()]);
          enc = device.createCommandEncoder();
        } else if (execMode === "paced") {
          doneWork += lw.convWork;
          enc = await pacer.submitChunk(enc, lw.convWork, 0, { forceUiYield: true });
        }
      } else {
        const dil = d.dilations[li];
        const bg = convBgs[li];
        const mainY = L.isFull ? 64 : 1;
        const mainZ = L.isFull ? DIM2 : nMain;
        const writeExtY8 = L.mode === "rpure" && nHalo > 0 || L.mode === "bwd" && li + 1 < numConvs;
        const dPack = packConvDilFlags(dil, writeExtY8);
        if (!shaders.chunkableStd) {
          u4Tmp[0] = L.isFull ? 1 : 0;
          u4Tmp[1] = nMain;
          u4Tmp[2] = dPack;
          u4Tmp[3] = 0;
          device.queue.writeBuffer(convUbos[li], 0, u4Tmp);
          dispatchStdConv(enc, pConv, bg, null, mainY, mainZ, nExt, passCategories);
        } else if (execMode === "pipelined" || execMode === "single") {
          const slot = (li - 1) * STD_SLOTS_PER_LAYER;
          setStdSlot(slot, L.isFull, nMain, dPack, 0, 0);
          device.queue.writeBuffer(
            stdChunkUboBuf,
            slot * uboAlign,
            stdChunkUboHost.subarray(slot * uboAlignU32, (slot + 1) * uboAlignU32)
          );
          dispatchStdConv(enc, pConv, bg, [slot * uboAlign], mainY, mainZ, nExt, passCategories);
        } else {
          const layerSlotBase = (li - 1) * STD_SLOTS_PER_LAYER;
          const maxStrips = execMode === "calibrate" ? 1024 : Math.max(256, Math.min(4096, Math.round(PACED_TARGET_CHUNK_MS / Math.max(5e-3, pacer.getMsPerStrip()))));
          const chunks = [];
          let slotCursor = 0;
          if (L.isFull) {
            const zStep = Math.max(4, Math.min(64, Math.round(maxStrips / 64)));
            for (let z0 = 0; z0 < DIM2; z0 += zStep) {
              const zCnt = Math.min(zStep, DIM2 - z0);
              const sIdx = layerSlotBase + slotCursor++;
              setStdSlot(sIdx, true, nMain, dPack, z0, 0);
              chunks.push({ slotIdx: sIdx, mainY: 64, mainCountZ: zCnt, extCountZ: 0, strips: zCnt * 64 });
            }
          } else {
            const mainStep = Math.max(256, maxStrips);
            for (let m0 = 0; m0 < nMain; m0 += mainStep) {
              const mCnt = Math.min(mainStep, nMain - m0);
              const sIdx = layerSlotBase + slotCursor++;
              setStdSlot(sIdx, false, nMain, dPack, m0, 0);
              chunks.push({ slotIdx: sIdx, mainY: 1, mainCountZ: mCnt, extCountZ: 0, strips: mCnt });
            }
            const extStep = Math.max(256, maxStrips);
            for (let e0 = 0; e0 < nExt; e0 += extStep) {
              const eCnt = Math.min(extStep, nExt - e0);
              const sIdx = layerSlotBase + slotCursor++;
              setStdSlot(sIdx, false, nMain, dPack, 0, e0);
              chunks.push({ slotIdx: sIdx, mainY: 1, mainCountZ: 0, extCountZ: eCnt, strips: eCnt });
            }
          }
          if (slotCursor > 0) {
            device.queue.writeBuffer(
              stdChunkUboBuf,
              layerSlotBase * uboAlign,
              stdChunkUboHost.subarray(layerSlotBase * uboAlignU32, (layerSlotBase + slotCursor) * uboAlignU32)
            );
          }
          let pendingStrips = 0;
          for (let ci = 0; ci < chunks.length; ci++) {
            const ch = chunks[ci];
            dispatchStdConv(enc, pConv, bg, [ch.slotIdx * uboAlign], ch.mainY, ch.mainCountZ, ch.extCountZ, passCategories);
            if (execMode === "pipelined") continue;
            pendingStrips += ch.strips;
            const isLast = ci === chunks.length - 1;
            if (execMode === "calibrate" && (pendingStrips >= 512 || isLast && pendingStrips > 0)) {
              const tSub = performance.now();
              device.queue.submit([enc.finish()]);
              await device.queue.onSubmittedWorkDone();
              const dt = performance.now() - tSub;
              enc = device.createCommandEncoder();
              doneWork += pendingStrips;
              if (pendingStrips >= 512) {
                const msPerStrip = dt / pendingStrips;
                const estFullLayerMs = msPerStrip * TOTAL_STRIPS;
                device.__v4WinCalibrated = true;
                pacer.setMsPerStrip(msPerStrip);
                if (!plat.isWindowsSharedIgpu && estFullLayerMs < WINDOWS_FAST_LAYER_MAX_MS) {
                  device.__v4WinFast = true;
                  execMode = "pipelined";
                  console.log(`[WebGPU-V4] Windows GPU calibration: estFullLayer=${estFullLayerMs.toFixed(1)}ms -> unthrottled pipelined mode`);
                } else {
                  device.__v4WinFast = false;
                  execMode = "paced";
                  console.log(`[WebGPU-V4] Windows GPU calibration: estFullLayer=${estFullLayerMs.toFixed(1)}ms -> TDR-safe 2-in-flight paced mode`);
                  emitProgress(li);
                }
              }
              pendingStrips = 0;
            } else if (execMode === "paced") {
              doneWork += pendingStrips;
              enc = await pacer.submitChunk(enc, pendingStrips, li);
              pendingStrips = 0;
            }
          }
        }
      }
      const nextWOff = li + 1 < numConvs ? packed.w0Vec4s + li * packed.hiddenVec4PerLayer : 0;
      prepTmpU32[0] = li * packed.metaStride;
      prepTmpU32[1] = nextWOff;
      prepTmpU32[2] = (li + 1) * packed.metaStride;
      prepTmpU32[3] = li + 1 < numConvs ? 1 : 0;
      prepTmpU32[4] = li === 0 ? 1 : 0;
      prepTmpU32[5] = L.isFull ? 1 : 0;
      prepTmpU32[6] = nMain;
      prepTmpU32[7] = nMomExt * 8;
      prepTmpF32[8] = L.extWeight || 0;
      prepTmpU32[9] = 0;
      prepTmpU32[10] = 0;
      prepTmpU32[11] = 0;
      device.queue.writeBuffer(prepUbos[li], 0, prepTmpU32);
      {
        const pass = enc.beginComputePass();
        pass.setBindGroup(0, prepBgs[li]);
        pass.setPipeline(pMomFin.pipe);
        pass.dispatchWorkgroups(d.cs, 1, 1);
        pass.end();
        passCategories.push("momentsPrep");
      }
      if (li + 1 < numConvs) {
        {
          const pass = enc.beginComputePass();
          pass.setBindGroup(0, prepBgs[li]);
          pass.setPipeline(pPrepW.pipe);
          pass.dispatchWorkgroups(1, 1, 1);
          pass.end();
          passCategories.push("momentsPrep");
        }
        const uploadNorm = !L.isFull ? nNorm : 0;
        if (uploadNorm > 0 || nHalo > 0) {
          if (uploadNorm > 0) normAuxHost.set(L.normStrips, 0);
          if (nHalo > 0) normAuxHost.set(L.haloRows, uploadNorm);
          device.queue.writeBuffer(normAuxBufs[li], 0, normAuxHost.subarray(0, uploadNorm + nHalo));
        }
        u4Tmp[0] = L.isFull ? 1 : 0;
        u4Tmp[1] = L.bgStrip ? L.bgStrip.z * DIM2 + L.bgStrip.yWg * 4 : 0;
        u4Tmp[2] = uploadNorm;
        u4Tmp[3] = nHalo;
        device.queue.writeBuffer(normUbos[li], 0, u4Tmp);
        if (L.isFull || nNorm > 0 || nHalo > 0) {
          const pass = enc.beginComputePass();
          pass.setBindGroup(0, normBgs[li]);
          if (L.isFull || nNorm > 0) {
            pass.setPipeline(pNorm.pipe);
            pass.dispatchWorkgroups(1, L.isFull ? 64 : 1, L.isFull ? DIM2 : nNorm);
          }
          if (nHalo > 0) {
            pass.setPipeline(pNormHalo.pipe);
            pass.dispatchWorkgroups(1, Math.ceil(nHalo / 4), 1);
          }
          pass.end();
          passCategories.push("normHalo");
        }
      }
      if (execMode === "pipelined") {
        device.queue.submit([enc.finish()]);
        enc = device.createCommandEncoder();
      } else if (execMode === "calibrate") {
        device.queue.submit([enc.finish()]);
        await device.queue.onSubmittedWorkDone();
        enc = device.createCommandEncoder();
        doneWork += (li === 0 || !shaders.chunkableStd ? lw.convWork : 0) + lw.normWork;
        if (li === numConvs - 1 && !device.__v4WinCalibrated) {
          device.__v4WinCalibrated = true;
          device.__v4WinFast = !plat.isWindowsSharedIgpu;
        }
      } else if (execMode !== "single") {
        const tailWork = (!shaders.chunkableStd && li > 0 ? lw.convWork : 0) + lw.normWork;
        doneWork += tailWork;
        enc = await pacer.submitChunk(enc, tailWork, li);
      }
    }
    if (execMode === "paced") {
      await pacer.waitBeforeFinalSubmit();
    }
    execute.__passCategories = passCategories;
    return ioCtl.finishAndReadback({
      enc,
      schedule,
      passCategories,
      u4Tmp,
      ioOpts,
      paced: execMode === "paced",
      onProgress
    });
  }
  ioCtl.warmupIoPipelines();
  execute.dispose = ({ keepSharedWorkspace = false } = {}) => {
    ioCtl.dispose();
    for (const b of ownedBuffers) b.destroy();
    ownedBuffers.length = 0;
    ownedAlloc.resetBytes();
    if (!ws.pooled) {
      for (const b of ws.buffers) b.destroy();
      ws.buffers.length = 0;
    } else if (keepSharedWorkspace) {
      ws.inUse = false;
    } else if (v4WorkspacePool.get(device) === ws) {
      releaseV4Workspace(device);
    }
  };
  execute.gpuBytes = () => ws.bytes + ownedAlloc.getBytes();
  execute.__passCategories = [];
  execute.__coneInfo = () => ({ paddedVox, actMiB: actBytes / 1048576 });
  execute.__v4Plan = () => plan;
  execute.kernels = "v4-int8";
  return execute;
}

// src/webgpu/rodent-conform.ts
var RODENT_GRID_DIM = 256;
var RODENT_GRID_MM = 0.1;
var RODENT_GRID_NVOX = RODENT_GRID_DIM * RODENT_GRID_DIM * RODENT_GRID_DIM;
function mulMat44(a, b) {
  const c = new Array(16);
  for (let r = 0; r < 4; r++) {
    const r4 = r * 4;
    for (let col = 0; col < 4; col++) {
      c[r4 + col] = a[r4 + 0] * b[0 + col] + a[r4 + 1] * b[4 + col] + a[r4 + 2] * b[8 + col] + a[r4 + 3] * b[12 + col];
    }
  }
  return c;
}
function invMat44(m) {
  const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
  const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
  const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
  const c00 = a11 * a22 - a12 * a21;
  const c01 = -(a10 * a22 - a12 * a20);
  const c02 = a10 * a21 - a11 * a20;
  const det = a00 * c00 + a01 * c01 + a02 * c02;
  if (!Number.isFinite(det) || det === 0) return null;
  const inv = 1 / det;
  const r00 = c00 * inv;
  const r01 = -(a01 * a22 - a02 * a21) * inv;
  const r02 = (a01 * a12 - a02 * a11) * inv;
  const r10 = c01 * inv;
  const r11 = (a00 * a22 - a02 * a20) * inv;
  const r12 = -(a00 * a12 - a02 * a10) * inv;
  const r20 = c02 * inv;
  const r21 = -(a00 * a21 - a01 * a20) * inv;
  const r22 = (a00 * a11 - a01 * a10) * inv;
  return [
    r00,
    r01,
    r02,
    -(r00 * a03 + r01 * a13 + r02 * a23),
    r10,
    r11,
    r12,
    -(r10 * a03 + r11 * a13 + r12 * a23),
    r20,
    r21,
    r22,
    -(r20 * a03 + r21 * a13 + r22 * a23),
    0,
    0,
    0,
    1
  ];
}
function rodentAffine(header) {
  const affine = header.sformCode > 0 ? header.stoXyz : header.qtoXyz;
  if (!isValidAffine4x4(affine)) {
    throw new Error("brainchomp: the input has no usable spatial transform");
  }
  return affine;
}
function isOnRodentGrid(header) {
  const nx = header.dims[1];
  const ny = header.dims[2];
  const nz = header.dims[3];
  if (nx !== RODENT_GRID_DIM || ny !== RODENT_GRID_DIM || nz !== RODENT_GRID_DIM) {
    return false;
  }
  const dx = Math.abs(header.pixDims[1]);
  const dy = Math.abs(header.pixDims[2]);
  const dz = Math.abs(header.pixDims[3]);
  if (Math.abs(dx - RODENT_GRID_MM) >= 1e-4 || Math.abs(dy - RODENT_GRID_MM) >= 1e-4 || Math.abs(dz - RODENT_GRID_MM) >= 1e-4) {
    return false;
  }
  let a;
  try {
    a = rodentAffine(header);
  } catch {
    return false;
  }
  const sign = [-1, -1, 1];
  for (let c = 0; c < 3; c++) {
    let row = 0;
    for (let r = 1; r < 3; r++) {
      if (Math.abs(a[r * 4 + c]) > Math.abs(a[row * 4 + c])) row = r;
    }
    if (row !== c || (a[row * 4 + c] > 0 ? 1 : -1) !== sign[c]) return false;
  }
  return true;
}
function computeRodentRobustRange(img, sourceIsUint8) {
  const n = img.length;
  let lo = img[0];
  let hi = img[0];
  let nonzero = 0;
  for (let i = 0; i < n; i++) {
    const v = img[i];
    if (v < lo) lo = v;
    if (v > hi) hi = v;
    if (Math.abs(v) >= 1e-15) nonzero++;
  }
  if (sourceIsUint8) return { srcMin: lo, scale: 1 };
  const binSize = (hi - lo) / 1e3;
  if (!(binSize > 0)) return { srcMin: lo, scale: 1 };
  const cumulative = new Float64Array(1e3);
  for (let i = 0; i < n; i++) {
    let bin = Math.floor((img[i] - lo) / binSize);
    if (bin > 999) bin = 999;
    else if (bin < 0) bin = 0;
    cumulative[bin]++;
  }
  for (let b = 1; b < 1e3; b++) cumulative[b] += cumulative[b - 1];
  const nth = n - Math.floor((1 - 0.999) * nonzero);
  let idx = 0;
  while (idx < 999 && cumulative[idx + 1] < nth) idx++;
  const top = idx * binSize + lo;
  const scale = top !== lo ? 255 / (top - lo) : 1;
  return { srcMin: lo, scale };
}
function scalecropFloatToUint8(img, srcMin, scale) {
  const n = img.length;
  const out = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    let v = scale * (img[i] - srcMin);
    if (!(v > 0)) v = 0;
    else if (v > 255) v = 255;
    out[i] = Math.floor(v);
  }
  return out;
}
function clampRoundFloatToUint8(img) {
  const n = img.length;
  const out = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const v = img[i];
    if (!(v > 0)) out[i] = 0;
    else if (v >= 255) out[i] = 255;
    else out[i] = Math.round(v);
  }
  return out;
}
function buildRodentGridAffine(nx, ny, nz, inputAffine) {
  const ci = (nx - 1) / 2;
  const cj = (ny - 1) / 2;
  const ck = (nz - 1) / 2;
  const cx = inputAffine[0] * ci + inputAffine[1] * cj + inputAffine[2] * ck + inputAffine[3];
  const cy = inputAffine[4] * ci + inputAffine[5] * cj + inputAffine[6] * ck + inputAffine[7];
  const cz = inputAffine[8] * ci + inputAffine[9] * cj + inputAffine[10] * ck + inputAffine[11];
  const s = RODENT_GRID_MM;
  const c = (RODENT_GRID_DIM - 1) / 2;
  return [
    -s,
    0,
    0,
    cx + s * c,
    0,
    -s,
    0,
    cy + s * c,
    0,
    0,
    s,
    cz - s * c,
    0,
    0,
    0,
    1
  ];
}
function conformRodentVolume(orig) {
  const { header, data } = orig;
  const nx = header.dims[1];
  const ny = header.dims[2];
  const nz = header.dims[3];
  const sourceIsUint8 = header.datatypeCode === NIFTI_DT.UINT8;
  const inputAffine = rodentAffine(header);
  const onGrid = isOnRodentGrid(header);
  const trivialScale = (!Number.isFinite(header.sclSlope) || header.sclSlope === 0 || header.sclSlope === 1) && (!Number.isFinite(header.sclInter) || header.sclInter === 0);
  if (onGrid && sourceIsUint8 && trivialScale && data instanceof Uint8Array) {
    let minVal = 255;
    for (let i = 0; i < data.length; i++) {
      if (data[i] < minVal) {
        minVal = data[i];
        if (minVal === 0) break;
      }
    }
    if (minVal === 0) {
      return { img: data, affine: inputAffine.slice(), onGrid: true };
    }
  }
  const floatData = decodeNiftiVoxelsToFloat32(data, header.sclSlope, header.sclInter);
  const { srcMin, scale } = computeRodentRobustRange(floatData, sourceIsUint8);
  if (onGrid) {
    const img = sourceIsUint8 && srcMin === 0 ? clampRoundFloatToUint8(floatData) : scalecropFloatToUint8(floatData, srcMin, scale);
    return { img, affine: inputAffine.slice(), onGrid: true };
  }
  const gridAffine = buildRodentGridAffine(nx, ny, nz, inputAffine);
  const toInput = invMat44(inputAffine);
  if (!toInput) {
    throw new Error("brainchomp: the input has a singular spatial transform");
  }
  const m = mulMat44(toInput, gridAffine);
  const m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
  const m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
  const m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
  const nxy = nx * ny;
  const maxX = nx - 0.5;
  const maxY = ny - 0.5;
  const maxZ = nz - 0.5;
  const lastX = nx - 1;
  const lastY = ny - 1;
  const lastZ = nz - 1;
  const out = new Uint8Array(RODENT_GRID_NVOX);
  let o = 0;
  for (let k = 0; k < RODENT_GRID_DIM; k++) {
    const kz0 = m02 * k + m03;
    const kz1 = m12 * k + m13;
    const kz2 = m22 * k + m23;
    for (let j = 0; j < RODENT_GRID_DIM; j++) {
      const jz0 = m01 * j + kz0;
      const jz1 = m11 * j + kz1;
      const jz2 = m21 * j + kz2;
      for (let i = 0; i < RODENT_GRID_DIM; i++, o++) {
        const px = m00 * i + jz0;
        const py = m10 * i + jz1;
        const pz = m20 * i + jz2;
        let val = 0;
        if (px >= -0.5 && px <= maxX && py >= -0.5 && py <= maxY && pz >= -0.5 && pz <= maxZ) {
          const qx = px < 0 ? 0 : px > lastX ? lastX : px;
          const qy = py < 0 ? 0 : py > lastY ? lastY : py;
          const qz = pz < 0 ? 0 : pz > lastZ ? lastZ : pz;
          const x0 = Math.floor(qx);
          const y0 = Math.floor(qy);
          const z0 = Math.floor(qz);
          const x1 = x0 + 1 < nx ? x0 + 1 : lastX;
          const y1 = y0 + 1 < ny ? y0 + 1 : lastY;
          const z1 = z0 + 1 < nz ? z0 + 1 : lastZ;
          const wx = qx - x0;
          const wy = qy - y0;
          const wz = qz - z0;
          const omx = 1 - wx;
          const omy = 1 - wy;
          const z0o = z0 * nxy;
          const z1o = z1 * nxy;
          const y0o = y0 * nx;
          const y1o = y1 * nx;
          const c00 = floatData[x0 + y0o + z0o] * omx + floatData[x1 + y0o + z0o] * wx;
          const c10 = floatData[x0 + y1o + z0o] * omx + floatData[x1 + y1o + z0o] * wx;
          const c01 = floatData[x0 + y0o + z1o] * omx + floatData[x1 + y0o + z1o] * wx;
          const c11 = floatData[x0 + y1o + z1o] * omx + floatData[x1 + y1o + z1o] * wx;
          val = Math.fround(
            (c00 * omy + c10 * wy) * (1 - wz) + (c01 * omy + c11 * wy) * wz
          );
        }
        let scaled = scale * (val - srcMin);
        if (!(scaled > 0)) scaled = 0;
        else if (scaled > 255) scaled = 255;
        out[o] = Math.floor(scaled);
      }
    }
  }
  return { img: out, affine: gridAffine, onGrid: false };
}
function maskToNativeRodent(mask256, gridAffine, origHeader) {
  const inputAffine = rodentAffine(origHeader);
  const toGrid = invMat44(gridAffine);
  if (!toGrid) {
    throw new Error("brainchomp: cannot invert conformed grid affine");
  }
  const m = mulMat44(toGrid, inputAffine);
  const m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
  const m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
  const m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
  const d0 = new Float64Array(8);
  const d1 = new Float64Array(8);
  const d2 = new Float64Array(8);
  let d = 0;
  for (let dx = -1; dx <= 1; dx += 2) {
    for (let dy = -1; dy <= 1; dy += 2) {
      for (let dz = -1; dz <= 1; dz += 2, d++) {
        d0[d] = 0.25 * (dx * m00 + dy * m01 + dz * m02) + 0.5;
        d1[d] = 0.25 * (dx * m10 + dy * m11 + dz * m12) + 0.5;
        d2[d] = 0.25 * (dx * m20 + dy * m21 + dz * m22) + 0.5;
      }
    }
  }
  const nx = origHeader.dims[1];
  const ny = origHeader.dims[2];
  const nz = origHeader.dims[3];
  const out = new Uint8Array(nx * ny * nz);
  let idx = 0;
  for (let k = 0; k < nz; k++) {
    const kz0 = m02 * k + m03;
    const kz1 = m12 * k + m13;
    const kz2 = m22 * k + m23;
    for (let j = 0; j < ny; j++) {
      const jz0 = m01 * j + kz0;
      const jz1 = m11 * j + kz1;
      const jz2 = m21 * j + kz2;
      for (let i = 0; i < nx; i++, idx++) {
        const p0 = m00 * i + jz0;
        const p1 = m10 * i + jz1;
        const p2 = m20 * i + jz2;
        let votes = 0;
        for (let s = 0; s < 8; s++) {
          const x = Math.floor(p0 + d0[s]);
          const y = Math.floor(p1 + d1[s]);
          const z = Math.floor(p2 + d2[s]);
          if (x >= 0 && x < RODENT_GRID_DIM && y >= 0 && y < RODENT_GRID_DIM && z >= 0 && z < RODENT_GRID_DIM) {
            if (mask256[x + (y + (z << 8) << 8)] > 0) votes++;
          }
        }
        out[idx] = votes >= 4 ? 1 : 0;
      }
    }
  }
  return out;
}

// src/webgpu/rodent-mask-cleanup.ts
function keepLargestComponent6(mask, dim) {
  const n = dim[0] * dim[1] * dim[2];
  const bw = new BWLabeler();
  const [compCount, labels] = bw.bwlabel(mask, dim, 6, true, false);
  if (compCount === 0) {
    mask.fill(0);
    return 0;
  }
  const counts = new Uint32Array(compCount + 1);
  for (let i = 0; i < n; i++) {
    const c = labels[i];
    if (c > 0) counts[c]++;
  }
  let bestComp = 1;
  let bestSize = 0;
  for (let c = 1; c <= compCount; c++) {
    if (counts[c] > bestSize) {
      bestSize = counts[c];
      bestComp = c;
    }
  }
  for (let i = 0; i < n; i++) {
    mask[i] = labels[i] === bestComp ? 1 : 0;
  }
  return compCount;
}
function erodeAxis(src, dst, dim, axis, r, edgeInside, lane) {
  const n = dim[axis];
  const inner = axis === 0 ? 1 : axis === 1 ? dim[0] : dim[0] * dim[1];
  const total = dim[0] * dim[1] * dim[2];
  const outer = total / (n * inner);
  const cap = r + 1;
  const edge = edgeInside ? cap : 0;
  for (let t = 0; t < outer; t++) {
    const base = t * n * inner;
    for (let p = 0; p < n; p++) {
      const row = base + p * inner;
      const prevRow = row - inner;
      for (let q = 0; q < inner; q++) {
        if (src[row + q]) {
          const prev = p > 0 ? dst[prevRow + q] : edge;
          dst[row + q] = prev + 1 < cap ? prev + 1 : cap;
        } else {
          dst[row + q] = 0;
        }
      }
    }
    lane.fill(edge, 0, inner);
    for (let p = n - 1; p >= 0; p--) {
      const row = base + p * inner;
      for (let q = 0; q < inner; q++) {
        let c = 0;
        if (src[row + q]) {
          const next = lane[q] + 1;
          c = next < cap ? next : cap;
        }
        lane[q] = c;
        dst[row + q] = dst[row + q] === cap && c === cap ? 1 : 0;
      }
    }
  }
}
function erodeCube(mask, scratch, dim, r, edgeInside, lane) {
  erodeAxis(mask, scratch, dim, 0, r, edgeInside, lane);
  erodeAxis(scratch, mask, dim, 1, r, edgeInside, lane);
  erodeAxis(mask, scratch, dim, 2, r, edgeInside, lane);
  mask.set(scratch);
}
function openBrainMask(mask, dim, radius) {
  if (radius <= 0) return;
  if (radius > 253) {
    throw new Error(`brainchomp: mask opening radius ${radius} is too large`);
  }
  const n = dim[0] * dim[1] * dim[2];
  const work = new Uint8Array(n);
  const scratch = new Uint8Array(n);
  const lane = new Uint8Array(dim[0] * dim[1]);
  for (let i = 0; i < n; i++) work[i] = mask[i] > 0 ? 1 : 0;
  erodeCube(work, scratch, dim, radius, false, lane);
  const compCount = keepLargestComponent6(work, dim);
  if (compCount > 0) {
    for (let i = 0; i < n; i++) work[i] = work[i] > 0 ? 0 : 1;
    erodeCube(work, scratch, dim, radius, true, lane);
    for (let i = 0; i < n; i++) {
      if (work[i]) mask[i] = 0;
    }
  }
}
function fillMaskHoles(mask, dim) {
  const nx = dim[0];
  const ny = dim[1];
  const nz = dim[2];
  const nxy = nx * ny;
  let lo0 = nx, lo1 = ny, lo2 = nz;
  let hi0 = -1, hi1 = -1, hi2 = -1;
  let idx = 0;
  for (let z = 0; z < nz; z++) {
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++, idx++) {
        if (mask[idx] === 0) continue;
        if (x < lo0) lo0 = x;
        if (x > hi0) hi0 = x;
        if (y < lo1) lo1 = y;
        if (y > hi1) hi1 = y;
        if (z < lo2) lo2 = z;
        if (z > hi2) hi2 = z;
      }
    }
  }
  if (lo0 > hi0) return 0;
  if (lo0 > 0) lo0--;
  if (lo1 > 0) lo1--;
  if (lo2 > 0) lo2--;
  if (hi0 + 1 < nx) hi0++;
  if (hi1 + 1 < ny) hi1++;
  if (hi2 + 1 < nz) hi2++;
  const b0 = hi0 - lo0 + 1;
  const b1 = hi1 - lo1 + 1;
  const b2 = hi2 - lo2 + 1;
  const bxy = b0 * b1;
  const bn = bxy * b2;
  const outside = new Uint8Array(bn);
  const queue = new Int32Array(bn);
  let tail = 0;
  for (let z = 0; z < b2; z++) {
    const vzBase = (lo2 + z) * nxy;
    const zFace = z === 0 || z === b2 - 1;
    for (let y = 0; y < b1; y++) {
      const row = z * bxy + y * b0;
      const vRow = vzBase + (lo1 + y) * nx + lo0;
      const face = zFace || y === 0 || y === b1 - 1;
      const step = face ? 1 : b0 - 1;
      for (let x = 0; x < b0; x += x + 1 === b0 ? 1 : step) {
        const j = row + x;
        if (!outside[j] && mask[vRow + x] === 0) {
          outside[j] = 1;
          queue[tail++] = j;
        }
        if (!face && b0 === 1) break;
      }
    }
  }
  for (let head = 0; head < tail; head++) {
    const j = queue[head];
    const z = Math.floor(j / bxy);
    const rem = j - z * bxy;
    const y = Math.floor(rem / b0);
    const x = rem - y * b0;
    const vIdx = (lo2 + z) * nxy + (lo1 + y) * nx + (lo0 + x);
    if (x > 0) {
      const nj = j - 1;
      if (!outside[nj] && mask[vIdx - 1] === 0) {
        outside[nj] = 1;
        queue[tail++] = nj;
      }
    }
    if (x + 1 < b0) {
      const nj = j + 1;
      if (!outside[nj] && mask[vIdx + 1] === 0) {
        outside[nj] = 1;
        queue[tail++] = nj;
      }
    }
    if (y > 0) {
      const nj = j - b0;
      if (!outside[nj] && mask[vIdx - nx] === 0) {
        outside[nj] = 1;
        queue[tail++] = nj;
      }
    }
    if (y + 1 < b1) {
      const nj = j + b0;
      if (!outside[nj] && mask[vIdx + nx] === 0) {
        outside[nj] = 1;
        queue[tail++] = nj;
      }
    }
    if (z > 0) {
      const nj = j - bxy;
      if (!outside[nj] && mask[vIdx - nxy] === 0) {
        outside[nj] = 1;
        queue[tail++] = nj;
      }
    }
    if (z + 1 < b2) {
      const nj = j + bxy;
      if (!outside[nj] && mask[vIdx + nxy] === 0) {
        outside[nj] = 1;
        queue[tail++] = nj;
      }
    }
  }
  let filled = 0;
  for (let z = 0; z < b2; z++) {
    const vzBase = (lo2 + z) * nxy;
    const bzBase = z * bxy;
    for (let y = 0; y < b1; y++) {
      const vRow = vzBase + (lo1 + y) * nx + lo0;
      const bRow = bzBase + y * b0;
      for (let x = 0; x < b0; x++) {
        if (!outside[bRow + x] && mask[vRow + x] === 0) {
          mask[vRow + x] = 1;
          filled++;
        }
      }
    }
  }
  return filled;
}

// src/webgpu/pipeline.ts
var CONFORM_SHAPE = [RODENT_GRID_DIM, RODENT_GRID_DIM, RODENT_GRID_DIM];
var TOTAL_LAYERS = 13;
var DEFAULT_WEBGPU_TIMEOUT_MS = 12e4;
var INITIALIZATION_TIMEOUT_MS2 = 12e4;
var NOISE_CAP = Math.max(1e5, Math.floor(RODENT_GRID_NVOX / 100));
var weightCache = /* @__PURE__ */ new Map();
var inflightWeights = /* @__PURE__ */ new Map();
var sharedOwnedDevice = null;
async function getOwnedDevice() {
  if (sharedOwnedDevice && !sharedOwnedDevice.__isLost) {
    return sharedOwnedDevice;
  }
  sharedOwnedDevice = null;
  const dev = await acquireDevice();
  sharedOwnedDevice = dev;
  return dev;
}
function resetOwnedDevice(failedDevice) {
  if (failedDevice) {
    try {
      releaseV4Workspace(failedDevice);
    } catch {
    }
    if (!failedDevice.__isLost) {
      try {
        failedDevice.destroy();
      } catch {
      }
    }
    if (sharedOwnedDevice === failedDevice) sharedOwnedDevice = null;
  }
}
async function fetchRodentWeights(assetPath, timeoutMs, log) {
  const url = assetUrl("./rodent.bin", assetPath);
  const cached = weightCache.get(url);
  if (cached) return cached;
  let pending = inflightWeights.get(url);
  if (!pending) {
    pending = (async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      weightCache.set(url, bytes);
      return bytes;
    })().finally(() => {
      inflightWeights.delete(url);
    });
    inflightWeights.set(url, pending);
  }
  let timer;
  try {
    return await Promise.race([
      pending,
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new BrainchompError(
              "initialization-failed",
              `fetching rodent weights (${url}) timed out after ${timeoutMs} ms`,
              log
            )
          );
        }, timeoutMs);
      })
    ]);
  } catch (err) {
    if (err instanceof BrainchompError) throw err;
    throw new BrainchompError(
      "initialization-failed",
      `failed to load rodent weights from ${url}: ${err instanceof Error ? err.message : String(err)}`,
      log
    );
  } finally {
    clearTimeout(timer);
  }
}
function createProgressReporter(onProgress) {
  let lastProgress = 0;
  return (stage, rawProgress, extra) => {
    if (!onProgress) return;
    const clamped = Math.max(0, Math.min(1, Number.isFinite(rawProgress) ? rawProgress : 0));
    const progress = Math.max(lastProgress, clamped);
    lastProgress = progress;
    const ev = { stage, progress };
    if (extra?.layer !== void 0) ev.layer = extra.layer;
    if (extra?.totalLayers !== void 0) ev.totalLayers = extra.totalLayers;
    if (extra?.message !== void 0) ev.message = extra.message;
    onProgress(ev);
  };
}
function buildV4RodentModelEntry(webgpuMode, webgpuExec, v4Env) {
  const entry = {
    model: "rodent",
    modelBinModel: "rodent",
    quantize8Bit: true,
    enableTranspose: true,
    ...v4Env ? { __v4Env: v4Env } : {}
  };
  const execNorm = normalizeV4ExecMode(webgpuExec);
  if (webgpuMode === "low-memory") {
    entry.forceLowMem128 = true;
    entry.webgpuExecMode = execNorm || "paced";
    entry.__v4PlanReasonOverride = "override";
  } else if (webgpuMode === "standard") {
    entry.forceLowMem128 = false;
    if (execNorm) entry.webgpuExecMode = execNorm;
    entry.__v4PlanReasonOverride = "override";
  } else if (webgpuMode === "recalibrate") {
    entry.recalibrate = true;
    if (execNorm) entry.webgpuExecMode = execNorm;
  } else if (webgpuMode === "probe") {
    entry.recalibrate = true;
    entry.forceProbe = true;
    if (execNorm) entry.webgpuExecMode = execNorm;
  } else if (execNorm) {
    entry.webgpuExecMode = execNorm;
    entry.__v4PlanReasonOverride = "override";
  }
  return entry;
}
function applyMaskToTypedArray(data, datatypeCode, mask) {
  const bpp = bytesPerVoxelForDatatype(datatypeCode);
  const srcBytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  const outBytes = new Uint8Array(srcBytes.byteLength);
  const n = mask.length;
  if (bpp === 1) {
    for (let i = 0; i < n; i++) {
      if (mask[i]) outBytes[i] = srcBytes[i];
    }
  } else if (bpp === 2 && (srcBytes.byteOffset & 1) === 0) {
    const src16 = new Uint16Array(srcBytes.buffer, srcBytes.byteOffset, n);
    const dst16 = new Uint16Array(outBytes.buffer, 0, n);
    for (let i = 0; i < n; i++) {
      if (mask[i]) dst16[i] = src16[i];
    }
  } else if (bpp === 4 && (srcBytes.byteOffset & 3) === 0) {
    const src32 = new Uint32Array(srcBytes.buffer, srcBytes.byteOffset, n);
    const dst32 = new Uint32Array(outBytes.buffer, 0, n);
    for (let i = 0; i < n; i++) {
      if (mask[i]) dst32[i] = src32[i];
    }
  } else {
    for (let i = 0; i < n; i++) {
      if (!mask[i]) continue;
      const off = i * bpp;
      for (let b = 0; b < bpp; b++) outBytes[off + b] = srcBytes[off + b];
    }
  }
  return outBytes;
}
async function runV4RodentInference(params) {
  const {
    weightBytes,
    conformedImg,
    normOffset,
    normRange,
    normClamp,
    device: callerDevice,
    webgpuMode,
    webgpuExec,
    v4Env,
    timeoutMs,
    log,
    record,
    reportProgress
  } = params;
  const ownsDevice = !callerDevice;
  const initialDevice = callerDevice ?? await getOwnedDevice();
  const modelEntry = buildV4RodentModelEntry(webgpuMode, webgpuExec, v4Env);
  const runAttempt = async (dev, entry) => {
    const hasScopes = typeof dev.pushErrorScope === "function" && typeof dev.popErrorScope === "function";
    let oomScopeOpen = false;
    let execute = null;
    let timer;
    if (hasScopes) {
      dev.pushErrorScope("out-of-memory");
      oomScopeOpen = true;
    }
    try {
      const work = (async () => {
        reportProgress("load", 0.12, { message: "Setting up WebGPU V4" });
        execute = await setupNet(dev, weightBytes, void 0, entry);
        const plan = typeof execute.__v4Plan === "function" ? execute.__v4Plan() : null;
        if (plan) record(formatV4PlanDiagnostic(plan));
        reportProgress("inference", 0.28, {
          layer: 0,
          totalLayers: TOTAL_LAYERS,
          message: "Running Skull-strip (WebGPU V4)"
        });
        const outputs2 = await execute(conformedImg, {
          gpuNativeInput: true,
          gpuNativeOutput: true,
          normOffset,
          normRange,
          normClamp,
          onProgress: (frac, stage) => {
            const clamped = Math.max(0, Math.min(1, Number(frac) || 0));
            const m = typeof stage === "string" ? /^Layer (\d+)\/(\d+)$/.exec(stage) : null;
            reportProgress("inference", 0.28 + 0.57 * clamped, {
              layer: m ? Number(m[1]) : void 0,
              totalLayers: m ? Number(m[2]) : TOTAL_LAYERS,
              message: stage || void 0
            });
          }
        });
        reportProgress("inference", 0.85, {
          layer: TOTAL_LAYERS,
          totalLayers: TOTAL_LAYERS,
          message: "Inference complete"
        });
        return outputs2;
      })();
      const outputs = await Promise.race([
        work,
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            reject(
              new BrainchompError(
                "inference-failed",
                `WebGPU inference did not finish within ${timeoutMs} ms; the GPU device may have been lost`,
                log
              )
            );
          }, timeoutMs);
        })
      ]);
      if (oomScopeOpen) {
        oomScopeOpen = false;
        const oomError = await dev.popErrorScope();
        if (oomError) {
          const err = new Error(
            `WebGPU out of memory (${oomError.message || "allocation failed"})`
          );
          err.oomError = oomError;
          throw err;
        }
      }
      return outputs;
    } catch (error) {
      if (oomScopeOpen) {
        oomScopeOpen = false;
        try {
          const scopedOom = await dev.popErrorScope();
          if (scopedOom && error && typeof error === "object" && !("oomError" in error)) {
            ;
            error.oomError = scopedOom;
          }
        } catch {
        }
      }
      throw error;
    } finally {
      clearTimeout(timer);
      const exec = execute;
      if (exec) {
        try {
          exec.dispose({ keepSharedWorkspace: false });
        } catch {
        }
      }
      try {
        releaseV4Workspace(dev);
      } catch {
      }
    }
  };
  try {
    return await executeWithWebGpuSafeModeRetry({
      device: initialDevice,
      modelEntry,
      runAttempt: (dev, entry) => runAttempt(dev, entry),
      requestFreshDevice: ownsDevice ? async ({ failedDevice }) => {
        resetOwnedDevice(failedDevice);
        try {
          return await getOwnedDevice();
        } catch {
          return null;
        }
      } : null,
      onRetry: ({ failureKind, error }) => {
        const msg = `[WebGPU-V4] ${failureKind} during inference (${error instanceof Error ? error.message : String(error)}); retrying once in LowMem128 + paced`;
        record(msg);
        reportProgress("load", 0.14, { message: "Retrying in low-memory WebGPU mode" });
      },
      env: v4Env || null
    });
  } catch (err) {
    if (err instanceof BrainchompError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    record(`brainchomp: webgpu inference error: ${msg}`);
    throw new BrainchompError("inference-failed", msg, log);
  }
}
async function runWebGpuRodentSegment(request) {
  const started = performance.now();
  const log = [];
  const record = (line) => {
    log.push(line);
    request.onLog?.(line);
  };
  const reportProgress = createProgressReporter(request.onProgress);
  const limit = request.timeoutMs ?? DEFAULT_WEBGPU_TIMEOUT_MS;
  const initLimit = Math.min(limit, INITIALIZATION_TIMEOUT_MS2);
  const openingRadius = request.opening ?? 4;
  const fillHoles = request.fillHoles !== false;
  reportProgress("load", 0, { message: "Loading rodent weights" });
  const weightsPromise = fetchRodentWeights(request.assetPath, initLimit, log);
  let orig;
  try {
    orig = readNifti1(request.input);
  } catch (err) {
    await weightsPromise.catch(() => {
    });
    throw new BrainchompError(
      "bad-input",
      err instanceof Error ? err.message : String(err),
      log
    );
  }
  reportProgress("conform", 0.08, { message: "Conforming volume to 256\xB3" });
  let conformed;
  try {
    conformed = conformRodentVolume(orig);
    if (!conformed.onGrid) {
      record(
        `brainchomp: conforming ${orig.header.dims[1]}x${orig.header.dims[2]}x${orig.header.dims[3]} input to ${RODENT_GRID_DIM}^3 at ${RODENT_GRID_MM} mm`
      );
    }
  } catch (err) {
    await weightsPromise.catch(() => {
    });
    throw new BrainchompError(
      "bad-input",
      err instanceof Error ? err.message : String(err),
      log
    );
  }
  reportProgress("conform", 0.18);
  reportProgress("preprocess", 0.2, { message: "Computing intensity quantiles" });
  const { qmin, qmax } = computeLinearQuantiles(conformed.img, 0.02, 0.98);
  const normOffset = qmin;
  const denom = qmax - qmin + 1e-3;
  const normRange = denom > 0 ? denom : 1;
  const normClamp = true;
  reportProgress("preprocess", 0.24);
  const weightBytes = await weightsPromise;
  const outputs = await runV4RodentInference({
    weightBytes,
    conformedImg: conformed.img,
    normOffset,
    normRange,
    normClamp,
    device: request.device,
    webgpuMode: request.webgpuMode,
    webgpuExec: request.webgpuExec,
    v4Env: request.v4Env,
    timeoutMs: limit,
    log,
    record,
    reportProgress
  });
  const rawOut = outputs[0];
  if (!rawOut || rawOut.length !== RODENT_GRID_NVOX) {
    const msg = `brainchomp: unexpected WebGPU output length (${rawOut?.length ?? 0})`;
    record(msg);
    throw new BrainchompError("inference-failed", msg, log);
  }
  const mask256 = rawOut instanceof Uint8Array ? rawOut : new Uint8Array(rawOut);
  for (let i = 0; i < RODENT_GRID_NVOX; i++) {
    mask256[i] = mask256[i] > 0 ? 1 : 0;
  }
  reportProgress("postprocess", 0.86, { message: "Cleaning brain mask" });
  const components = keepLargestComponent6(mask256, CONFORM_SHAPE);
  if (components > NOISE_CAP) {
    const msg = `brainchomp: the webgpu backend produced noise (${components} disconnected regions); the network output is unusable`;
    record(msg);
    throw new BrainchompError("inference-failed", msg, log);
  }
  if (openingRadius > 0) {
    openBrainMask(mask256, CONFORM_SHAPE, openingRadius);
  }
  if (fillHoles) {
    fillMaskHoles(mask256, CONFORM_SHAPE);
  }
  let foreground = 0;
  for (let i = 0; i < RODENT_GRID_NVOX; i++) foreground += mask256[i];
  if (foreground === 0) {
    record(
      "brainchomp: WARNING - the network found no brain; the output will be blank. Check the input's voxel size and contrast."
    );
  }
  reportProgress("reslice", 0.93, { message: "Reslicing mask to native space" });
  let brainBytes;
  let maskBytes;
  if (conformed.onGrid || request.saveConform) {
    if (conformed.onGrid) {
      const maskedRaw = applyMaskToTypedArray(orig.data, orig.header.datatypeCode, mask256);
      brainBytes = writeNifti1(orig.header, maskedRaw, {
        datatypeCode: orig.header.datatypeCode,
        descrip: "brainchomp"
      });
      maskBytes = writeNifti1(orig.header, mask256, {
        datatypeCode: NIFTI_DT.UINT8,
        sclSlope: 1,
        sclInter: 0,
        calMin: 0,
        calMax: 1,
        intentCode: NIFTI_INTENT_LABEL,
        descrip: "brainchomp"
      });
    } else {
      const maskedConformed = new Uint8Array(RODENT_GRID_NVOX);
      for (let i = 0; i < RODENT_GRID_NVOX; i++) {
        maskedConformed[i] = mask256[i] ? conformed.img[i] : 0;
      }
      const gridPatch = {
        dims: CONFORM_SHAPE,
        pixDims: [RODENT_GRID_MM, RODENT_GRID_MM, RODENT_GRID_MM],
        affine: conformed.affine,
        datatypeCode: NIFTI_DT.UINT8,
        sclSlope: 1,
        sclInter: 0,
        descrip: "brainchomp"
      };
      brainBytes = writeNifti1(orig.header, maskedConformed, {
        ...gridPatch,
        calMin: 0,
        calMax: 0,
        intentCode: NIFTI_INTENT_NONE
      });
      maskBytes = writeNifti1(orig.header, mask256, {
        ...gridPatch,
        calMin: 0,
        calMax: 1,
        intentCode: NIFTI_INTENT_LABEL
      });
    }
  } else {
    const nativeMask = maskToNativeRodent(mask256, conformed.affine, orig.header);
    const maskedRaw = applyMaskToTypedArray(orig.data, orig.header.datatypeCode, nativeMask);
    brainBytes = writeNifti1(orig.header, maskedRaw, {
      datatypeCode: orig.header.datatypeCode,
      descrip: "brainchomp"
    });
    maskBytes = writeNifti1(orig.header, nativeMask, {
      datatypeCode: NIFTI_DT.UINT8,
      sclSlope: 1,
      sclInter: 0,
      calMin: 0,
      calMax: 1,
      intentCode: NIFTI_INTENT_LABEL,
      descrip: "brainchomp"
    });
  }
  const elapsedMs = performance.now() - started;
  reportProgress("complete", 1, { message: "Done" });
  return { brain: brainBytes, mask: maskBytes, elapsedMs, log };
}

// src/webgpu/worker-env.ts
var activeV4Env;
function getActiveV4Env() {
  return activeV4Env;
}

// src/index.ts
var MASK_PATH = "/mask.nii";
function buildArgs(options) {
  const args = ["--mask", MASK_PATH];
  if (options.opening !== void 0) {
    if (!Number.isInteger(options.opening) || options.opening < 0 || options.opening > 64)
      throw new BrainchompError(
        "unsupported-option",
        `opening must be an integer radius from 0 to 64, got ${options.opening}`
      );
    args.push("--opening", String(options.opening));
  }
  if (options.fillHoles !== void 0 && typeof options.fillHoles !== "boolean")
    throw new BrainchompError(
      "unsupported-option",
      `fillHoles must be true or false, got ${String(options.fillHoles)}`
    );
  if (options.fillHoles === false) args.push("--no-fill-holes");
  if (options.saveConform) args.push("--save-conform");
  return args;
}
function snapshotV4ProfileCache() {
  const snapshot = {};
  try {
    const storage = globalThis.localStorage;
    if (!storage) return snapshot;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith(V4_CALIB_STORAGE_PREFIX)) {
        const val = storage.getItem(key);
        if (val !== null) snapshot[key] = val;
      }
    }
  } catch {
  }
  return snapshot;
}
function applyStorageSync(message) {
  if (!message?.key || !String(message.key).startsWith(V4_CALIB_STORAGE_PREFIX)) return;
  try {
    const storage = globalThis.localStorage;
    if (!storage) return;
    if (message.op === "set") {
      storage.setItem(message.key, String(message.value ?? ""));
    } else if (message.op === "remove") {
      storage.removeItem(message.key);
    }
  } catch {
  }
}
async function runInWorker(input, options) {
  if (typeof Worker === "undefined")
    throw new BrainchompError(
      "unsupported-option",
      "this environment has no Worker; run with worker: false"
    );
  const url = assetUrl("worker.js", options.assetPath);
  const worker = new Worker(url, { type: "module" });
  const { device, glContext, onLog, onProgress, worker: _w, ...rest } = options;
  if (rest.assetPath !== void 0) rest.assetPath = new URL("./", url).href;
  let pageSearch = "";
  try {
    pageSearch = typeof location !== "undefined" ? location.search || "" : "";
  } catch {
  }
  const profileCache = snapshotV4ProfileCache();
  let timer;
  try {
    return await new Promise((resolve, reject) => {
      worker.onmessage = (event) => {
        const message = event.data;
        if (message.type === "log") {
          onLog?.(message.line);
          return;
        }
        if (message.type === "progress") {
          onProgress?.(message.event);
          return;
        }
        if (message.type === "storage") {
          applyStorageSync(message);
          return;
        }
        if (message.type === "done") {
          resolve({
            brain: message.brain,
            mask: message.mask,
            elapsedMs: message.elapsedMs,
            backend: message.backend
          });
          return;
        }
        reject(new BrainchompError(message.code, message.message, message.log));
      };
      worker.onerror = (event) => reject(new BrainchompError(
        "inference-failed",
        `the segmentation worker failed to start or threw: ${event.message ?? "unknown"}`
      ));
      worker.onmessageerror = () => reject(new BrainchompError(
        "inference-failed",
        "the segmentation worker sent a message that could not be deserialized"
      ));
      const named = options.backend && options.backend !== "auto" ? options.backend : null;
      const limit = options.timeoutMs ?? (named && named !== "cpu" ? 12e4 : CPU_TIMEOUT_MS);
      timer = setTimeout(() => reject(new BrainchompError(
        "inference-failed",
        `the segmentation did not finish within ${limit} ms`
      )), limit);
      worker.postMessage({ input, options: rest, pageSearch, profileCache });
    });
  } finally {
    clearTimeout(timer);
    worker.terminate();
  }
}
function acquireFallback(gpuReason) {
  const gl = checkWebgl2Support();
  if (gl.supported && gl.software === false) {
    return { backend: "webgl2", glContext: acquireGlContext(), ownsContext: true };
  }
  const cpu = checkCpuSupport();
  if (cpu.supported) {
    return { backend: "cpu", ownsContext: false };
  }
  if (gl.supported && !gl.software) {
    return { backend: "webgl2", glContext: acquireGlContext(), ownsContext: true };
  }
  const soft = "a software rasteriser, too slow and unreliable to run; make the page cross-origin isolated so the cpu backend can";
  throw new BrainchompError(
    "no-webgpu",
    `no backend can run here.
  WebGPU: ${gpuReason}
  WebGL2: ${gl.supported ? soft : gl.reasons.join("; ")}
  CPU:    ${cpu.reasons.join("; ")}`
  );
}
async function acquire(options) {
  const named = options.backend && options.backend !== "auto" ? options.backend : null;
  if (options.device && named && named !== "webgpu")
    throw new BrainchompError(
      "unsupported-option",
      `backend: '${named}' was requested but a GPUDevice was supplied; a device selects the webgpu backend. Drop the device, or drop the backend.`
    );
  if (options.glContext && named && named !== "webgl2")
    throw new BrainchompError(
      "unsupported-option",
      `backend: '${named}' was requested but a WebGL2RenderingContext was supplied; a context selects the webgl2 backend. Drop the glContext, or drop the backend.`
    );
  if (options.device) {
    checkDevice(options.device);
    return { backend: "webgpu", device: options.device, ownsContext: false };
  }
  if (options.glContext)
    return { backend: "webgl2", glContext: options.glContext, ownsContext: false };
  const want = options.backend ?? "auto";
  if (want === "webgpu") {
    const probe = await checkSupport();
    if (!probe.supported) {
      await acquireDevice();
    }
    return { backend: "webgpu", ownsContext: false };
  }
  if (want === "webgl2")
    return { backend: "webgl2", glContext: acquireGlContext(), ownsContext: true };
  if (want === "cpu") {
    const cpu = checkCpuSupport();
    if (!cpu.supported)
      throw new BrainchompError(
        "no-webgpu",
        `the cpu backend cannot run here: ${cpu.reasons.join("; ")}`
      );
    return { backend: "cpu", ownsContext: false };
  }
  const gpu = await checkSupport();
  if (gpu.supported && !gpu.software)
    return { backend: "webgpu", ownsContext: false };
  const soft = "a software rasteriser, too slow and unreliable to run; make the page cross-origin isolated so the cpu backend can";
  const gpuReason = gpu.supported ? soft : gpu.reasons.join("; ");
  return acquireFallback(gpuReason);
}
function checkCpuSupport() {
  const reasons = [];
  if (typeof SharedArrayBuffer === "undefined")
    reasons.push("this environment has no SharedArrayBuffer");
  else if (globalThis.crossOriginIsolated !== true)
    reasons.push("this page is not cross-origin isolated; serve it with Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp");
  return { supported: reasons.length === 0, reasons };
}
async function runWasmFallback(params) {
  const { bytes, args, backend, glContext, ownsContext, options, pack } = params;
  options.onProgress?.({ stage: "load", progress: 0, message: `Loading ${backend} module` });
  let reportedInference = false;
  let result;
  try {
    result = await run({
      backend,
      glContext,
      input: bytes,
      args,
      extraOutputs: [MASK_PATH],
      assetPath: options.assetPath,
      timeoutMs: options.timeoutMs,
      onLog: (line) => {
        options.onLog?.(line);
        if (!reportedInference && /using\s+(cpu|webgl2)\s+backend/i.test(line)) {
          reportedInference = true;
          options.onProgress?.({
            stage: "inference",
            progress: 0.15,
            message: `Running Skull-strip (${backend})`
          });
        }
      }
    });
  } finally {
    if (ownsContext && glContext) releaseGlContext(glContext);
  }
  const mask = result.extras.get(MASK_PATH);
  if (!mask)
    throw new BrainchompError("inference-failed", "the module wrote no brain mask", result.log);
  options.onProgress?.({ stage: "complete", progress: 1, message: "Done" });
  return {
    brain: await pack(result.image),
    mask: await pack(mask),
    elapsedMs: result.elapsedMs,
    backend,
    ranInWorker: false
  };
}
async function segment(input, options = {}) {
  const raw = input instanceof ArrayBuffer ? new Uint8Array(input) : new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  if (raw.byteLength === 0)
    throw new BrainchompError("bad-input", "the input is empty");
  const args = buildArgs(options);
  if (options.worker && (options.device || options.glContext))
    throw new BrainchompError(
      "unsupported-option",
      "worker cannot be combined with device or glContext: a GPUDevice and a WebGL2RenderingContext belong to the thread that created them and cannot cross into a worker"
    );
  if (options.worker) {
    const out = await runInWorker(raw, options);
    return { ...out, ranInWorker: true };
  }
  const compressed = isGzip(raw);
  const bytes = compressed ? await gunzip(raw) : raw;
  const wantGzip = options.gzipOutput ?? compressed;
  const pack = async (data) => {
    const out = wantGzip ? await gzip(data) : data;
    return out.slice().buffer;
  };
  const want = options.backend ?? "auto";
  const acquired = await acquire(options);
  if (acquired.backend === "webgpu") {
    try {
      const env = getActiveV4Env();
      const res = await runWebGpuRodentSegment({
        input: bytes,
        device: acquired.device,
        opening: options.opening,
        fillHoles: options.fillHoles,
        saveConform: options.saveConform,
        assetPath: options.assetPath,
        timeoutMs: options.timeoutMs,
        webgpuMode: options.webgpuMode,
        webgpuExec: options.webgpuExec,
        v4Env: env,
        onLog: options.onLog,
        onProgress: options.onProgress
      });
      return {
        brain: await pack(res.brain),
        mask: await pack(res.mask),
        elapsedMs: res.elapsedMs,
        backend: "webgpu",
        ranInWorker: false
      };
    } catch (webgpuErr) {
      const code = webgpuErr?.code;
      if (want !== "auto" || options.device || code === "bad-input") {
        throw webgpuErr;
      }
      const errMsg = webgpuErr instanceof Error ? webgpuErr.message : String(webgpuErr);
      options.onLog?.(
        `[WebGPU-V4] WebGPU failed after safe-mode retry (${errMsg}); attempting WebGL2/CPU fallback`
      );
      let fallback;
      try {
        fallback = acquireFallback(errMsg);
      } catch {
        throw webgpuErr;
      }
      return runWasmFallback({
        bytes,
        args,
        backend: fallback.backend,
        glContext: fallback.glContext,
        ownsContext: fallback.ownsContext,
        options,
        pack
      });
    }
  }
  return runWasmFallback({
    bytes,
    args,
    backend: acquired.backend,
    glContext: acquired.glContext,
    ownsContext: acquired.ownsContext,
    options,
    pack
  });
}
export {
  ACTIVATION_BYTES,
  BrainchompError,
  GL_ACTIVATION_BYTES,
  SOFTWARE_RENDERER,
  V4_STD_BUFFER_BYTES,
  WEBGPU_MIN_BUFFER_BYTES,
  acquireDevice,
  acquireGlContext,
  checkCpuSupport,
  checkSupport,
  checkWebgl2Support,
  releaseGlContext,
  segment
};
//# sourceMappingURL=index.js.map
