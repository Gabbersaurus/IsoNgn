import Engine from 'Engine';

export default class PlayerController extends Engine.Entities.GameBehaviour {
    start() {
        console.log('The player controller has just started');
        this.test = true;
    }

    update() {
        Engine.Scenes.SceneManager.currentScene.map.actualMap[1][0][0] = this.test ? 0 : 1;
        this.test = !this.test;
    }
}