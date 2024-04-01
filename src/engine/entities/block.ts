import * as THREE from 'three';
import { Entity } from '.';

export default class Block implements Entity {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  mesh: THREE.Mesh | null = null;

  constructor(
    position: THREE.Vector3,
    rotation: THREE.Euler = new THREE.Euler(),
    scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
  ) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }
}
