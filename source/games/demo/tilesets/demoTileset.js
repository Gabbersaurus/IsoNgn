import TileSet from 'graphics/api/TileSet';
import Tile from 'graphics/api/Tile';
import demoTileSetGraphic from '../graphics/tileSets/demo.png'

export default new TileSet(
    64,
    64,
    {
        1: new Tile(0, 0, demoTileSetGraphic),
        2: new Tile(1, 0, demoTileSetGraphic),
        3: new Tile(2, 0, demoTileSetGraphic),
        4: new Tile(3, 0, demoTileSetGraphic)
    }
);