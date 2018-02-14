import Engine from 'Engine';
import knuckles from '../graphics/samples/knuckles.png';

export default new Engine.Graphics.SpriteSet({
    default: new Engine.Graphics.Sprite(64, 64, 0, 0, 0, knuckles),
    move: new Engine.Graphics.Sprite(64, 64, 0, 0, 24, knuckles),
}, 1000 / 10);