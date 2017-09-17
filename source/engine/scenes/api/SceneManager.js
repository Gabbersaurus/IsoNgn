
import ConfigManager from 'ConfigManager';
import settings from 'settings.json';
import ImageLoader from 'graphics/api/ImageLoader';

class SceneManager {
    initialise() {
        this.currentGameBehaviours = [];
        this.currentScene = null;
        this.gameLoop = null;
        this.active = false;

        this.loadScene(ConfigManager.mainSettings.defaultScene);
    }

    loadScene(sceneName) {
        this.active = false;
        this.currentGameBehaviours = [];
        this.currentScene = null;

        if(this.gameLoop != null) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        var scene = require('games/' + settings.game + '/scenes/' + sceneName + '.js');

        if(!scene) {
            console.log('scene not found');
            return;
        }

        this.currentScene = scene;
        
        //Wait for image assets to load and then activate all the gameobject behaviours.
        ImageLoader.loadImages(scene.tileSet.getAllImagePaths()).then(() => this.loadBehavioursAndInjectGameObject());
    }

    executeUpdateBehaviours() {
        //Rewrite once I think of a better solution.
        let currentGameBehavioursLength = this.currentGameBehaviours.length;
        for (let i = 0; i < currentGameBehavioursLength; i++) {
            let gameBehaviour = this.currentGameBehaviours[i];

            if(gameBehaviour.update) {
                gameBehaviour.update();
            }
        }
    }

    loadBehavioursAndInjectGameObject() {
        let gameObjectsLength = this.currentScene.gameObjects.length;

        for (let i = 0; i < gameObjectsLength; i++) {
            let gameObject = this.currentScene.gameObjects[i];
            let gameObjectBehavioursLength = gameObject.behaviours.length;
            
            for (let i = 0; i < gameObjectsLength; i++) {
                let gameBehaviour = gameObject.behaviours[i];
                gameBehaviour.gameObject = gameObject;
                this.currentGameBehaviours.push(gameBehaviour);
                gameBehaviour.start();
            }
        }

        this.gameLoop = setInterval(() => this.executeUpdateBehaviours(), 1000/1);
        this.active = true;
    }
}

export default new SceneManager();