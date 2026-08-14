// Model-specific metadata that cannot be inferred from safetensors. Everything
// else (channels, class count, GroupNorm layout, and biases) is derived from
// the weights by webgl2_runners/weights.js.

const RODENT25 = [
  16, 8, 4, 2, 1,
  16, 8, 4, 2, 1,
  16, 8, 4, 2, 1,
  16, 8, 4, 2, 1,
  16, 8, 4, 2, 1,
];

export const DESCRIPTORS = {
  rodent: {
    dilations: RODENT25,
    activation: 'gelu_tanh',
    fullVolume: true,
  },
};

export function descriptorNameFor(modelEntry) {
  const match = String(modelEntry.path || '').match(/\/models\/([^/]+)\//);
  return match ? match[1] : null;
}

export function descriptorFor(modelEntry) {
  const name = descriptorNameFor(modelEntry);
  if (!name) return null;
  const descriptor = DESCRIPTORS[name];
  return descriptor ? { name, ...descriptor } : null;
}
