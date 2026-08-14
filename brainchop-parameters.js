export { inferenceModelsList, brainChopOpts }

const brainChopOpts = {
  batchSize: 1,
  numOfChan: 1,
  isColorEnable: true,
  isAutoColors: true,
  bgLabelValue: 0,
  drawBoundingVolume: false,
  isGPU: true,
  isBrainCropMaskBased: true,
  showPhase1Output: false,
  isPostProcessEnable: true,
  fillSuppressedWithNeighborLabel: false,
  diagnoseEnclosedComponents: false,
  isContoursViewEnable: false,
  browserArrayBufferMaxZDim: 30,
  telemetryFlag: false,
  chartXaxisStepPercent: 10,
  uiSampleName: 'Brainchomp sample',
  atlasSelectedColorTable: 'Fire'
}

const sharedRodentModel = {
  path: '/models/rodent/model.json',
  webgpu_safetensor: './models/rodent/model.safetensors',
  webgpu_runner: 'rodent',
  forceFP32: false,
  webgpuStorageSize: 536870912,
  numClasses: 2,
  preModelId: null,
  preModelPostProcess: false,
  isBatchOverlapEnable: false,
  numOverlapBatches: 0,
  enableTranspose: true,
  enableCrop: false,
  cropPadding: 0,
  autoThreshold: 0,
  enableQuantileNorm: false,
  filterOutWithPreMask: false,
  enableSeqConv: true,
  textureSize: 0,
  isPostProcessEnable: true,
  inferenceDelay: 100,
  warning: null
}

const inferenceModelsList = [
  {
    ...sharedRodentModel,
    id: 1,
    type: 'Brain_Extraction',
    modelName: 'Skull-strip',
    description:
      'Extract the rodent brain and save the input intensities with non-brain voxels set to zero.'
  },
  {
    ...sharedRodentModel,
    id: 2,
    type: 'Brain_Masking',
    modelName: 'Brainmask',
    description:
      'Extract the rodent brain and save the post-processed binary foreground mask.'
  }
]
