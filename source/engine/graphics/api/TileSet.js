import Tile from 'graphics/api/Tile';

export default class TileSet {
    constructor(width, height, tiles, shadowmap) {
        this.tileWidth = width;
        this.tileHeight = height;
        tiles[0] = new Tile(0, 0, null, false, 0, 0); //This way the array won't have an empty slot.
        console.log(tiles);
        this.tiles = tiles;
        this.shadowmap = shadowmap || null;

        this.setCorrectStartPositions();
    }

    setCorrectStartPositions() {
        let tilesKeys = Object.keys(this.tiles);
        let tilesKeysLength = tilesKeys.length;

        for (let i = 0; i < tilesKeysLength; i++) {
            let tile = this.tiles[tilesKeys[i]];

            if (tile) {
                tile.column *= this.tileWidth;
                tile.row *= this.tileHeight;
            }
        }
    }

    getAllImagePaths() {
        let tilesKeys = Object.keys(this.tiles);
        let tilesKeysLength = tilesKeys.length;
        let paths = [];

        for (let i = 0; i < tilesKeysLength; i++) {
            let tile = this.tiles[tilesKeys[i]];

            if (tile && tile.image && paths.indexOf(tile.image) == -1) {
                paths.push(tile.image);
            }
        }

        if (this.shadowmap) {
            paths = paths.concat(this.shadowmap.getAllImagePaths());
        }

        return paths;
    }
}