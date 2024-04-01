import { World } from 'miniplex';
import * as THREE from 'three';
import { Entity } from './entities';
import { Voxel } from './util';

export default class VoxelWorld {
  _world = new World<Entity>();
  _entities: Entity[];
  _size = 10;

  constructor() {
    this._entities = new Array(this._size * this._size * this._size * 2).fill(null);
  }

  add(position: THREE.Vector3, entity: Entity) {
    this._entities[this.offset(position.x, position.y, position.z)] = entity;
    this._world.add(entity);
  }

  id(entity: Entity) {
    return this._world.id(entity);
  }

  with(...components: Array<keyof Entity>) {
    return this._world.with(...components);
  }

  offset(x: number, y: number, z: number) {
    const offset = z * this._size * this._size + y * this._size + x;
    return offset + this._entities.length / 2;
  }

  get(x: number, y: number, z: number): Entity | null {
    console.log(x, y, z, this.offset(x, y, z));
    return this._entities[this.offset(x, y, z)];
  }

  at(offset: number): Entity | null {
    return this._entities[offset];
  }
  getGeometry() {
    const positions = [];
    const normals = [];
    const indices = [];

    for (let offset = 0; offset < this._entities.length; offset++) {
      const voxel = this.at(offset);
      if (!voxel) continue;
      const { x, y, z } = voxel.position;
      for (const directionCoords of Object.values(Voxel.Faces)) {
        const neighbor = this.get(x + directionCoords.dx, y + directionCoords.dy, z + directionCoords.dz);
        // If Voxel has no neighbor in this direction so we need a face.
        if (!neighbor) {
          // Calculate the index for the next vertex in the positions array
          const nextVertexIndex = positions.length / 3;

          for (const corner of directionCoords.corners) {
            positions.push(x + corner.dx, y + corner.dy, z + corner.dz);
            normals.push(directionCoords.dx, directionCoords.dy, directionCoords.dz);
          }

          // Add the indices for the new vertices to the indices array
          indices.push(
            nextVertexIndex,
            nextVertexIndex + 1,
            nextVertexIndex + 2,
            nextVertexIndex + 2,
            nextVertexIndex + 1,
            nextVertexIndex + 3
          );
        }
      }
    }

    return { positions, normals, indices };
  }
}
