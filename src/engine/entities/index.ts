import * as THREE from 'three';

export interface Entity {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  mesh: THREE.Mesh | null;
}

export enum Component {
  Renderable = 'mesh',
  Positionable = 'position',
  Rotatable = 'rotation',
  Scalable = 'scale'
}
