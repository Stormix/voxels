import Stats from 'stats.js';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Renderer from './core/renderer';
import System from './core/systems';
import RenderSystem from './core/systems/render';
import Block from './entities/block';
import VoxelWorld from './world';

export default class Engine {
  private _canvas: HTMLCanvasElement;
  private _renderer: Renderer | null = null;
  private _stats: Stats | null = null;
  private _gameTime: number = 0;
  private _elapsed: number = 0;
  private _controls: OrbitControls | null = null;
  private _world: VoxelWorld;
  private _systems: System[] = [];

  public debug = {
    wireframe: true,
    axis: true,
    grid: true,
    stats: true
  };

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._stats = new Stats();
    this._world = new VoxelWorld();
    this._systems = [new RenderSystem(this._world)];
  }

  init() {
    this._renderer = Renderer.create(this);
    this._controls = new OrbitControls(this._renderer.camera, this._canvas);

    if (this.debug.stats && this._stats?.dom) document.body.appendChild(this._stats.dom);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const position = new Vector3(x, y, z);
          const block = new Block(position);
          this._world.add(position, block);
        }
      }
    }
  }

  update(deltaTime: number) {
    this._controls?.update();
    this._systems.forEach((system) => system.update(deltaTime, this));
  }

  render() {
    this.renderer.render();
  }

  loop(newTime: number) {
    try {
      // Mesure time
      const lastTime = this._gameTime;
      this._gameTime = newTime;
      const deltaTime = (this._gameTime - lastTime) / 1000;
      this._elapsed += deltaTime;

      // Update and render
      this._stats?.begin();
      this.update(deltaTime);
      this.render();
      this._stats?.end();

      requestAnimationFrame(this.loop.bind(this));
    } catch (e) {
      console.error(e);
    }
  }

  get canvas() {
    return this._canvas;
  }

  get renderer() {
    if (!this._renderer) throw new Error('Renderer is not initialized');
    return this._renderer;
  }
}
