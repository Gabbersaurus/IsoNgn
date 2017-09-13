import GameBehaviour from 'games/GameBehaviour';
import SceneManager from 'scenes/SceneManager';

export default class PlayerController extends GameBehaviour {
    start() {
        console.log('The player controller has just started');
        this.test = true;
    }

    update() {
        console.log('Update is being called on a behaviour on gameobject ' + this.gameObject.name);
        SceneManager.currentScene.map.actualMap[1][0][0] = this.test ? 0 : 1;
        this.test = !this.test;
    }
}