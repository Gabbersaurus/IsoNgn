import TileSet from '../../../engine/graphics/api/TileSet';
import Tile from '../../../engine/graphics/api/Tile';
import shadowMap from '../graphics/tilesets/shadow_map.png'

export default new TileSet(
    64,
    32,
    {
        'leftCorner': new Tile(0, 0, shadowMap, false, 0, 32),
        'rightCorner': new Tile(1, 0, shadowMap, false, 0, 32),
        'lowerCorner': new Tile(2, 0, shadowMap, false, 0, 32),
        'upperCorner': new Tile(3, 0, shadowMap, false, 0, 32),
        'upperLeft': new Tile(0, 1, shadowMap, false, 0, 32),
        'upperRight': new Tile(1, 1, shadowMap, false, 0, 32),
        'lowerLeft': new Tile(2, 1, shadowMap, false, 0, 32),
        'lowerRight': new Tile(3, 1, shadowMap, false, 0, 32),
    }
);