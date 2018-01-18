import Engine from 'Engine';
import pinkmonkey from '../graphics/samples/pinkmonkey.png'

export default new Engine.Graphics.SpriteSet({
    default: new Engine.Graphics.Sprite(64, 64, 0, 0, 10, pinkmonkey)
}, 1000 / 10);