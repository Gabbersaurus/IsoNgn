import Engine from 'Engine';

export default class PlayerController extends Engine.Entities.GameBehaviour {
    start() {
        console.log('The player controller has just started');
        this.test = true;
    }

    update() {
        Engine.Input.getKeyDown('jump', () => {
            this.test = !this.test;
            this.gameObject.getComponent('SpriteRenderer').setState(this.test ? 'default' : 'flipped');
        });
    }
}