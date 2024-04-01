export const Voxel = {
  Faces: {
    left: {
      dx: -1,
      dy: 0,
      dz: 0,
      corners: [
        { dx: 0, dy: 1, dz: 0 },
        { dx: 0, dy: 0, dz: 0 },
        { dx: 0, dy: 1, dz: 1 },
        { dx: 0, dy: 0, dz: 1 }
      ]
    },
    right: {
      dx: 1,
      dy: 0,
      dz: 0,
      corners: [
        { dx: 1, dy: 1, dz: 1 },
        { dx: 1, dy: 0, dz: 1 },
        { dx: 1, dy: 1, dz: 0 },
        { dx: 1, dy: 0, dz: 0 }
      ]
    },
    bottom: {
      dx: 0,
      dy: -1,
      dz: 0,
      corners: [
        { dx: 1, dy: 0, dz: 1 },
        { dx: 0, dy: 0, dz: 1 },
        { dx: 1, dy: 0, dz: 0 },
        { dx: 0, dy: 0, dz: 0 }
      ]
    },
    top: {
      dx: 0,
      dy: 1,
      dz: 0,
      corners: [
        { dx: 0, dy: 1, dz: 1 },
        { dx: 1, dy: 1, dz: 1 },
        { dx: 0, dy: 1, dz: 0 },
        { dx: 1, dy: 1, dz: 0 }
      ]
    },
    back: {
      dx: 0,
      dy: 0,
      dz: -1,
      corners: [
        { dx: 1, dy: 0, dz: 0 },
        { dx: 0, dy: 0, dz: 0 },
        { dx: 1, dy: 1, dz: 0 },
        { dx: 0, dy: 1, dz: 0 }
      ]
    },
    front: {
      dx: 0,
      dy: 0,
      dz: 1,
      corners: [
        { dx: 0, dy: 0, dz: 1 },
        { dx: 1, dy: 0, dz: 1 },
        { dx: 0, dy: 1, dz: 1 },
        { dx: 1, dy: 1, dz: 1 }
      ]
    }
  }
};
