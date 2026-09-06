// Browser fixture uses the real NiiVue adapter, WebGL2 renderer and worker.
import { Niivue, NVImage } from "@niivue/niivue";
import { installSculptEditor } from "../sculpt/editor.js";
const dims = [64, 64, 64],
  mask = new Uint8Array(64 ** 3),
  img = new Uint8Array(mask.length),
  brain = new Uint8Array(mask.length);
for (let z = 0; z < 64; z++)
  for (let y = 0; y < 64; y++)
    for (let x = 0; x < 64; x++) {
      const i = x + 64 * (y + 64 * z);
      mask[i] = Number(
        ((x - 32) / 22) ** 2 + ((y - 32) / 18) ** 2 + ((z - 32) / 25) ** 2 < 1,
      );
      img[i] = 40 + ((x * 3 + y * 2 + z) % 140);
      brain[i] = img[i] * mask[i];
    }
const affine = new URLSearchParams(location.search).has("reflected")
  ? [
      [0, -0.15, 0, 4],
      [0.12, 0.01, 0, -4],
      [0, 0, -0.11, 3],
      [0, 0, 0, 1],
    ]
  : [
      [0.12, 0.01, 0, -4],
      [0, 0.15, 0, -5],
      [0, 0, 0.11, -3],
      [0, 0, 0, 1],
    ];

const nv = new Niivue({
  backColor: [0, 0, 0, 1],
  multiplanarForceRender: true,
});
await nv.attachTo("gl1");
const array = await nv.createNiftiArray(
  dims,
  [0.12, 0.15, 0.11],
  affine.flat(),
  2,
  img,
);
const volume = await NVImage.loadFromUrl({
  url: URL.createObjectURL(new Blob([array])),
  name: "synthetic.nii",
});
await nv.addVolume(volume);
const overlay = await volume.clone();
overlay.img = mask;
overlay.hdr.datatypeCode = 2;
overlay.hdr.intent_code = 1002;
overlay.setColormapLabel({
  R: [0, 217],
  G: [0, 119],
  B: [0, 33],
  labels: ["Background", "Brain"],
});
overlay.opacity = 0.45;
await nv.addVolume(overlay);
nv.setSliceType(nv.sliceTypeMultiplanar);
window.fixture = {
  nv,
  mask,
  brain,
  img,
  original: mask.slice(),
  patches: 0,
  errors: [],
};
window.fixture.editor = installSculptEditor({
  nv,
  getState: () => ({ mask, dims, affine }),
  prepare: async () => {},
  onPatch: ({ rect: [x0, y0, x1, y1] }) => {
    for (let z = 0; z < 64; z++)
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          const i = x + 64 * (y + 64 * z);
          brain[i] = img[i] * mask[i];
        }
    window.fixture.patches++;
  },
  onError: (e) => window.fixture.errors.push(e.message),
});
window.fixture.ready = true;
