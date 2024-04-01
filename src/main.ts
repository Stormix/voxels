import Engine from './engine/engine';
import './style.css';

const engine = new Engine(document.querySelector('canvas') as HTMLCanvasElement);

engine.init();
engine.loop(0);
