import settings from '../../settings.json';
import SceneManager from 'scenes/SceneManager';
import ImageLoader from 'graphics/ImageLoader';

class RenderManager {
    initialise(canvas) {
        if(!canvas) {
            console.log("No canvas with id '" + settings.canvasId + "' found.");
            return;
        }

        let context = canvas.getContext("2d");

        if(!context) {
            console.log("Could not get canvas context.");
            return;
        }

        this.context = context;
        this.canvas = canvas;

        //Set listener for resize
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        //Set initial resolution and canvas size
        this.resizeCanvas();

        this.render();
    }

    render() {
        requestAnimationFrame( () => { this.render() } );
        this.renderWholeMap();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    renderWholeMap() {
        if(SceneManager.active) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            let width = SceneManager.currentScene.map.width - 1;
            let height = SceneManager.currentScene.map.height - 1;
            let depth = SceneManager.currentScene.map.depth - 1;
            
            for (let y = 0; y <= height; y++) {
                for (let x = width; x >= 0; x--) {
                    for (let z = 0; z <= depth; z++) {
                        let tile = SceneManager.currentScene.map.actualMap[z][y][x];
                        if(tile !== 0) {
                            let tileset = SceneManager.currentScene.tileset;
                            let tileObject = SceneManager.currentScene.tileset.tiles[tile];
                            let image = ImageLoader.getImage(tileObject.spriteSheet);
                            let addedWidthForY = y * tileset.tileWidth / 2;
                            let substractedHeightForX = (x * tileset.tileHeight / 4);
                            let sunstractedHeightForZ = (z * tileset.tileHeight / 2);

                            this.context.drawImage(
                                image,
                                tileObject.startPositionX,
                                tileObject.startPositionY,
                                tileset.tileWidth,
                                tileset.tileHeight,
                                100 + x * tileset.tileWidth / 2 + addedWidthForY,
                                300 + y * tileset.tileHeight / 4 - substractedHeightForX - sunstractedHeightForZ,
                                tileset.tileWidth,
                                tileset.tileHeight,
                            );
                        }
                    }
                }
            }
            
        }
    }
}

export default new RenderManager();