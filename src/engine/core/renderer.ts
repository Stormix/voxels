import * as THREE from 'three';
import Engine from '../engine';

export default class Renderer {
  private _canvas: HTMLCanvasElement;
  private _renderer: THREE.WebGLRenderer;
  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;

  private constructor(canvas: HTMLCanvasElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this._canvas = canvas;
    this._scene = scene;
    this._camera = camera;
    this._renderer = new THREE.WebGLRenderer({ canvas: this._canvas });

    this._renderer.setSize(canvas.width, canvas.height);

    this._camera.position.z = 10;
  }

  static create(engine: Engine) {
    const canvas = engine.canvas;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const axesHelper = new THREE.AxesHelper(1.5);
    const gridHelper = new THREE.GridHelper(100, 100);

    const scene = new THREE.Scene();

    if (engine.debug.axis) scene.add(axesHelper);
    if (engine.debug.grid) scene.add(gridHelper);

    return new Renderer(
      canvas,
      scene,
      new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    );
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }

  get camera() {
    return this._camera;
  }

  get scene() {
    return this._scene;
  }
}
