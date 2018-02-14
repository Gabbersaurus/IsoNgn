import settings from 'settings.json';
import SceneManager from 'scenes/api/SceneManager';
import ImageLoader from 'graphics/api/ImageLoader';
import CameraManager from 'graphics/api/CameraManager';

class RenderManager {
    initialise(canvas) {
        if (!canvas) {
            console.log("No canvas with id '" + settings.canvasId + "' found.");
            return;
        }

        let context = canvas.getContext("2d");

        if (!context) {
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
        requestAnimationFrame(() => {
            this.render()
        });
        this.renderWholeMap();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    renderWholeMap() {
        if (SceneManager.active) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            let tileSet = SceneManager.currentScene.tileSet;
            let spriteRenderers = SceneManager.currentIndexedSpriteRenderers;
            let cameraOffset = this.getActualCameraOffset();
            let width = SceneManager.currentScene.map.width - 1;
            let height = SceneManager.currentScene.map.height - 1;
            let depth = SceneManager.currentScene.map.depth - 1;

            for (let y = 0; y <= height; y++) {
                for (let x = width; x >= 0; x--) {
                    for (let z = 0; z <= depth; z++) {
                        this.renderTile(x, y, z, tileSet, cameraOffset);
                        this.renderSprite(x, y, z, spriteRenderers, cameraOffset);
                    }
                }
            }

            //this.drawDebugCrosshair();
        }
    }

    renderSprite(x, y, z, allSpriteRenderers, cameraOffset) {
        let positionString = x + '-' + y + '-' + z;

        if (positionString in allSpriteRenderers) {
            let spriteRenderers = allSpriteRenderers[positionString];
            let spriteRenderersLength = spriteRenderers.length;

            for (let i = 0; i < spriteRenderersLength; i++) {
                let spriteRenderer = spriteRenderers[i];
                let sprite = spriteRenderer.spriteSet.states[spriteRenderer.state];
                let image = ImageLoader.getImage(sprite.image);
                let positionAsSprite = this.getActualPosition(x, y, z);

                this.context.drawImage(
                    image,
                    sprite.column + (sprite.width * spriteRenderer.frame),
                    sprite.row,
                    sprite.width,
                    sprite.height,
                    (positionAsSprite.x + sprite.offsetX ) + cameraOffset.x,
                    (positionAsSprite.y + sprite.offsetY ) + cameraOffset.y,
                    sprite.width,
                    sprite.height
                );
            }
        }
    }

    renderTile(x, y, z, tileSet, cameraOffset) {
        let tile = SceneManager.currentScene.map.actualMap[z][y][x];
        if (tile !== 0) {
            let tileObject = tileSet.tiles[tile];
            let positionAsTile = this.getActualPosition(x, y, z);

            this.renderActualTileImage(tileObject.image, positionAsTile, tileObject, tileSet, cameraOffset);
        }

        if (tileSet.shadowmap) {
            this.renderShadow(x, y, z, tileSet, cameraOffset);
        }
    }

    renderActualTileImage(image, positionAsTile, tileObject, tileSet, cameraOffset) {
        let actualImage = ImageLoader.getImage(image);

        this.context.drawImage(
            actualImage,
            tileObject.column,
            tileObject.row,
            tileSet.tileWidth,
            tileSet.tileHeight,
            positionAsTile.x + cameraOffset.x + tileObject.offsetX,
            positionAsTile.y + cameraOffset.y + tileObject.offsetY,
            tileSet.tileWidth,
            tileSet.tileHeight,
        );
    }

    renderShadow(x, y, z, tileSet, cameraOffset) {
        let shadows = tileSet.shadowmap;
        let map = SceneManager.currentScene.map.actualMap;
        if (z !== 0) {
            if (map[z][y][x] === 0) {
                //lines
                if (map[z][y][x - 1] && tileSet.tiles[map[z][y][x - 1]].castShadow) {
                    let shadow = shadows.tiles['lowerLeft'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }
                if (map[z][y][x + 1] && tileSet.tiles[map[z][y][x + 1]].castShadow) {
                    let shadow = shadows.tiles['upperRight'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }

                if (map[z][y - 1] && tileSet.tiles[map[z][y - 1][x]].castShadow) {
                    let shadow = shadows.tiles['upperLeft'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }
                if (map[z][y + 1] && tileSet.tiles[map[z][y + 1][x]].castShadow) {
                    let shadow = shadows.tiles['lowerRight'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }
                //corners
                if (map[z][y][x + 1] === 0 && (map[z][y + 1] && map[z][y + 1][x + 1]) && tileSet.tiles[map[z][y + 1][x + 1]].castShadow) {
                    let shadow = shadows.tiles['rightCorner'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }
                if (map[z][y][x + 1] === 0 && (map[z][y - 1] && map[z][y - 1][x + 1]) && tileSet.tiles[map[z][y - 1][x + 1]].castShadow) {
                    let shadow = shadows.tiles['upperCorner'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }
                if (map[z][y - 1] && map[z][y - 1][x - 1] && tileSet.tiles[map[z][y - 1][x - 1]].castShadow) {
                    let shadow = shadows.tiles['leftCorner'];
                    let position = this.getActualPosition(x, y, z);
                    this.renderActualTileImage(shadow.image, position, shadow, shadows, cameraOffset);
                }
            }
        }
    }

    getActualCameraOffset() {
        if (SceneManager.active) {
            let tileSet = SceneManager.currentScene.tileSet;
            let cameraPosition = CameraManager.getCameraPosition();
            let positionAsTile = this.getActualPosition(cameraPosition.x, cameraPosition.y, cameraPosition.z);
            let offsetX = (this.canvas.width / 2) - positionAsTile.x - (tileSet.tileWidth / 2);
            let offsetY = (this.canvas.height / 2) - positionAsTile.y - (tileSet.tileHeight / 2);

            return {
                x: offsetX,
                y: offsetY
            }
        }

        return {
            x: 0,
            y: 0,
        }
    }

    getActualPosition(x, y, z) {
        if (SceneManager.active) {
            let tileSet = SceneManager.currentScene.tileSet;

            let actualPositionX = ((x + y) * (tileSet.tileWidth / 2));
            let actualPositionY = (y - x) * (tileSet.tileHeight / 4);
            actualPositionY -= z * tileSet.tileHeight / 2; //height
            actualPositionY -= z; //Correct gap

            return {
                x: actualPositionX,
                y: actualPositionY
            }
        }

        return {
            x: 0,
            y: 0,
        }
    }

    drawDebugCrosshair() {
        this.context.beginPath();
        this.context.moveTo(0, this.canvas.height / 2);
        this.context.lineTo(this.canvas.width, this.canvas.height / 2);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(this.canvas.width / 2, 0);
        this.context.lineTo(this.canvas.width / 2, this.canvas.height);
        this.context.stroke();
    }
}

export default new RenderManager();