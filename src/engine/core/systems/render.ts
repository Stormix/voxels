import * as THREE from 'three';
import System from '.';
import Engine from '../../engine';
import { Component } from '../../entities';
import VoxelWorld from '../../world';

export default class RenderSystem extends System {
  mesh: THREE.Mesh | null = null;

  constructor(world: VoxelWorld) {
    super(world, [Component.Renderable]);
  }

  update(_: number, engine: Engine) {
    const { positions, indices, normals } = this._world.getGeometry();
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
    geometry.setIndex(indices);

    if (!this.mesh) {
      this.mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ wireframe: engine.debug.wireframe }));
      engine.renderer.scene.add(this.mesh);
      return;
    }

    this.mesh.geometry.dispose();
    this.mesh.geometry = geometry;
  }
}
