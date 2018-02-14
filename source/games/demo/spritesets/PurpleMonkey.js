import Engine from 'Engine';
import purplegreenmonkey from '../graphics/samples/purplegreenmonkey.png'

export default new Engine.Graphics.SpriteSet({
    default: new Engine.Graphics.Sprite(64, 64, 0, 0, 21, purplegreenmonkey)
}, 1000 / 10);