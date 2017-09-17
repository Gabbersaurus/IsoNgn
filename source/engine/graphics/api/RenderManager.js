import settings from 'settings.json';
import SceneManager from 'scenes/api/SceneManager';
import ImageLoader from 'graphics/api/ImageLoader';
import CameraManager from 'graphics/api/CameraManager';

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

            let cameraPosition = CameraManager.getCameraPosition();
            let width = SceneManager.currentScene.map.width - 1;
            let height = SceneManager.currentScene.map.height - 1;
            let depth = SceneManager.currentScene.map.depth - 1;
            
            for (let y = 0; y <= height; y++) {
                for (let x = width; x >= 0; x--) {
                    for (let z = 0; z <= depth; z++) {
                        let tile = SceneManager.currentScene.map.actualMap[z][y][x];
                        if(tile !== 0) {
                            let tileSet = SceneManager.currentScene.tileSet;
                            let tileObject = SceneManager.currentScene.tileSet.tiles[tile];
                            let image = ImageLoader.getImage(tileObject.spriteSheet);
                            let addedWidthForY = y * tileSet.tileWidth / 2;
                            let substractedHeightForX = (x * tileSet.tileHeight / 4);
                            let sunstractedHeightForZ = (z * tileSet.tileHeight / 2);

                            this.context.drawImage(
                                image,
                                tileObject.startPositionX,
                                tileObject.startPositionY,
                                tileSet.tileWidth,
                                tileSet.tileHeight,
                                100 + x * tileSet.tileWidth / 2 + addedWidthForY,
                                300 + y * tileSet.tileHeight / 4 - substractedHeightForX - sunstractedHeightForZ,
                                tileSet.tileWidth,
                                tileSet.tileHeight,
                            );
                        }
                    }
                }
            }
            
        }
    }
}

export default new RenderManager();