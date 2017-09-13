import GameBehaviour from 'games/GameBehaviour';

export default class PlayerController extends GameBehaviour {
    start() {
        console.log('The player controller has just started');
    }

    update() {
        console.log('Update is being called on a behaviour on gameobject ' + this.gameObject.name);
    }
}