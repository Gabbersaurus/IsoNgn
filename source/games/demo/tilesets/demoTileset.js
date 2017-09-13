import Tileset from 'graphics/Tileset';
import Tile from 'graphics/Tile';
import demoTilesetGraphic from '../graphics/tilesets/demo.png'

export default new Tileset(
    64,
    64,
    {
        1: new Tile(0, 0, demoTilesetGraphic),
        2: new Tile(1, 0, demoTilesetGraphic),
        3: new Tile(2, 0, demoTilesetGraphic),
        4: new Tile(3, 0, demoTilesetGraphic)
    }
);