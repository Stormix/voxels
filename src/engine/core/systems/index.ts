import Engine from '../../engine';
import { Component } from '../../entities';
import VoxelWorld from '../../world';

export default abstract class System {
  _world: VoxelWorld;
  _components: Component[];

  protected constructor(world: VoxelWorld, components: Component[]) {
    this._world = world;
    this._components = components;
  }

  get entities() {
    return this._world.with(...this._components);
  }

  abstract update(deltaTime: number, engine: Engine): void;
}
