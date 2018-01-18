import ConfigManager from 'ConfigManager';
import settings from 'settings.json';
import ImageLoader from 'graphics/api/ImageLoader';
import Input from 'input/Input';

class SceneManager {
    initialise() {
        this.currentGameBehaviours = [];
        this.currentSpriteRenderers = [];
        this.currentIndexedSpriteRenderers = {};
        this.currentScene = null;
        this.gameLoop = null;
        this.active = false;

        this.loadScene(ConfigManager.main.defaultScene);
    }

    loadScene(sceneName) {
        this.active = false;
        this.currentGameBehaviours = [];
        this.currentSpriteRenderers = [];
        this.currentIndexedSpriteRenderers = {};
        this.currentScene = null;

        if (this.gameLoop !== null) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        let scene = require('games/' + settings.game + '/scenes/' + sceneName + '.js');

        if (!scene) {
            console.log('scene not found');
            return;
        }

        this.currentScene = scene;

        this.getSpriteRenderers();

        //Wait for image assets to load and then activate all the gameobject behaviours.
        ImageLoader.loadImages(scene.tileSet.getAllImagePaths()).then(() => {
            console.log('Loaded all tile images, starting sprite loading.');
            ImageLoader.loadImages(this.getAllSpriteImagePaths()).then(() => {
                console.log('Loaded all sprite images, starting scene.');
                this.startGameObjects()
            });
        });
    }

    executeUpdate() {
        Input.updatePressedKeys();
        this.indexAndTickSpriteRenderers();

        //Rewrite once I think of a better solution.
        let currentGameBehavioursLength = this.currentGameBehaviours.length;

        for (let i = 0; i < currentGameBehavioursLength; i++) {
            let gameBehaviour = this.currentGameBehaviours[i];

            if (gameBehaviour.update) {
                gameBehaviour.update();
            }
        }
    }

    indexAndTickSpriteRenderers() {
        this.currentIndexedSpriteRenderers = {};
        let currentSpriteRenderersLength = this.currentSpriteRenderers.length;

        for (let i = 0; i < currentSpriteRenderersLength; i++) {
            let spriteRenderer = this.currentSpriteRenderers[i];
            let position = spriteRenderer.gameObject.transform.position.toString();

            if (!(position in this.currentIndexedSpriteRenderers)) {
                this.currentIndexedSpriteRenderers[position] = [];
            }

            this.currentIndexedSpriteRenderers[position].push(spriteRenderer);
        }
    }

    getAllSpriteImagePaths() {
        let imagePaths = [];
        let currentSpriteRenderersLength = this.currentSpriteRenderers.length;

        for (let i = 0; i < currentSpriteRenderersLength; i++) {
            imagePaths = imagePaths.concat(this.currentSpriteRenderers[i].spriteSet.getImagePaths());
        }

        return imagePaths;
    }

    //Todo: looping all gameObjects twice. needs a better way.
    getSpriteRenderers() {
        let gameObjectKeys = Object.keys(this.currentScene.gameObjects);
        let gameObjectsKeysLength = gameObjectKeys.length;

        for (let i = 0; i < gameObjectsKeysLength; i++) {
            let gameObject = this.currentScene.gameObjects[gameObjectKeys[i]];
            let gameObjectComponentsLength = gameObject.components.length;

            for (let i = 0; i < gameObjectComponentsLength; i++) {
                let component = gameObject.components[i];

                if (component.constructor.name === 'SpriteRenderer') {
                    this.currentSpriteRenderers.push(component);
                }
            }
        }
    }

    startGameObjects() {
        let gameObjectKeys = Object.keys(this.currentScene.gameObjects);
        let gameObjectsKeysLength = gameObjectKeys.length;

        for (let i = 0; i < gameObjectsKeysLength; i++) {
            let gameObject = this.currentScene.gameObjects[gameObjectKeys[i]];
            let gameObjectBehavioursLength = gameObject.behaviours.length;

            for (let i = 0; i < gameObjectBehavioursLength; i++) {
                let gameBehaviour = gameObject.behaviours[i];
                gameBehaviour.gameObject = gameObject;
                this.currentGameBehaviours.push(gameBehaviour);
                gameBehaviour.start();
            }
        }

        this.gameLoop = setInterval(() => this.executeUpdate(), 1000 / 30);
        this.active = true;
    }
}

export default new SceneManager();