import GameObject from 'entities/api/GameObject';

export default class GameScene {
    constructor(tileSet, map, gameObjects) {   
        this.tileSet = tileSet;
        this.map = map;
        this.gameObjects = this.indexGameObjects(gameObjects);
    }

    indexGameObjects(gameObjects) {
        let gameObjectsObject = {};
        var gameObjectsLength = gameObjects.length;
        
        for (var i = 0; i < gameObjectsLength; i++) {
            let gameObject = gameObjects[i];

            if (!(gameObject instanceof GameObject)) {
                console.log('Rejected a non-GameObject, please check the scene for non-GameObjects in the GameObject array');
                continue;
            }

            if (!gameObject.name) {
                console.log('Rejected a GameObject because name is undefined');
                continue;
            }

            gameObjectsObject[gameObject.name] = gameObject;
        }

        return gameObjectsObject;
    }

    getGameObject(name) {
        if(!this.gameObjects.hasOwnProperty(name)) {
            console.log("GameObject " + name + " was not found in the current scene");
            return null;
        }

        return this.gameObjects[name];
    }
}