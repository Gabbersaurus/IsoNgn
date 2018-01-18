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

            this.drawDebugCrosshair();
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
                    (sprite.width * sprite.column) + (sprite.width * spriteRenderer.frame),
                    sprite.height * sprite.row,
                    sprite.width,
                    sprite.height,
                    positionAsSprite.x + sprite.offsetX + cameraOffset.x,
                    positionAsSprite.y + sprite.offsetY + cameraOffset.y,
                    sprite.width,
                    sprite.height
                );
            }
        }
    }

    renderTile(x, y, z, tileSet, cameraOffset) {
        let tile = SceneManager.currentScene.map.actualMap[z][y][x];
        if (tile !== 0) {
            let tileObject = SceneManager.currentScene.tileSet.tiles[tile];
            let image = ImageLoader.getImage(tileObject.image);
            let positionAsTile = this.getActualPosition(x, y, z);

            this.context.drawImage(
                image,
                tileObject.column,
                tileObject.row,
                tileSet.tileWidth,
                tileSet.tileHeight,
                positionAsTile.x + cameraOffset.x,
                positionAsTile.y + cameraOffset.y,
                tileSet.tileWidth,
                tileSet.tileHeight,
            );
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
            let addedWidthForY = y * tileSet.tileWidth / 2;
            let substractedHeightForX = (x * tileSet.tileHeight / 4);
            let substractedHeightForZ = (z * tileSet.tileHeight / 2);
            let actualPositionX = x * tileSet.tileWidth / 2 + addedWidthForY;
            let actualPositionY = y * tileSet.tileHeight / 4 - substractedHeightForX - substractedHeightForZ;

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