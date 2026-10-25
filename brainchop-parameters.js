export { inferenceModelsList }

const inferenceModelsList = [
  {
    id: 1,
    type: 'Brain_Extraction',
    modelName: 'Skull-strip',
    // Voxels (0.1 mm) of morphological opening on the brain mask, which cuts
    // skull/muscle attached by thin bridges; 0 disables. Run by brainchomp-lib.
    maskOpeningRadius: 4,
    description:
      'Extract the rodent brain and save the input intensities with non-brain voxels set to zero.'
  }
]
