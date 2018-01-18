import Engine from 'Engine';
import yellowblob from '../graphics/samples/yellowblobspritesheet.png'

export default new Engine.Graphics.SpriteSet({
    default: new Engine.Graphics.Sprite(64, 64, 0, 0, 6, yellowblob)
});