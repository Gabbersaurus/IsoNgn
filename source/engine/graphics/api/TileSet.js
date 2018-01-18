export default class TileSet {
    constructor(width, height, tiles) {
        this.tileWidth = width;
        this.tileHeight = height;
        tiles[0] = null; //This way the array won't have an empty slot.
        this.tiles = tiles;
        
        this.setCorrectStartPositions();
    }

    setCorrectStartPositions() {
        let tilesKeys = Object.keys(this.tiles);
        let tilesKeysLength = tilesKeys.length;
        
        for (let i = 0; i < tilesKeysLength; i++) {
            let tile = this.tiles[tilesKeys[i]];
            
            if(tile) {
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
            
            if(tile && paths.indexOf(tile.image) == -1) {
                paths.push(tile.image);
            }
        }

        return paths;
    }
}