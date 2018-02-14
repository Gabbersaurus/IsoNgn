import Engine from 'Engine';
import demoTileSetGraphic from '../graphics/tileSets/demo.png';
import ShadowMap from './ShadowMap';

export default new Engine.Graphics.TileSet(
    64,
    64,
    {
        1: new Engine.Graphics.Tile(0, 0, demoTileSetGraphic),
        2: new Engine.Graphics.Tile(1, 0, demoTileSetGraphic),
        3: new Engine.Graphics.Tile(2, 0, demoTileSetGraphic),
        4: new Engine.Graphics.Tile(3, 0, demoTileSetGraphic),
        5: new Engine.Graphics.Tile(4, 0, demoTileSetGraphic)
    },
    ShadowMap
);