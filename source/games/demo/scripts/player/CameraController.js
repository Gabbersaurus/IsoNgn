import Engine from 'Engine';

export default class CameraController extends Engine.Entities.GameBehaviour {
    start() {
    }

    update() {
        Engine.Input.getKeyDown('right', () => {
            this.gameObject.transform.position.x++;
            this.gameObject.transform.position.y++;
        });

        Engine.Input.getKeyDown('left', () => {
            this.gameObject.transform.position.x--;
            this.gameObject.transform.position.y--;
        });

        Engine.Input.getKeyDown('up', () => {
            this.gameObject.transform.position.x += 2;
            this.gameObject.transform.position.y -= 2;
        });

        Engine.Input.getKeyDown('down', () => {
            this.gameObject.transform.position.x -= 2;
            this.gameObject.transform.position.y += 2;
        });

        Engine.Input.getKeyUp('jump', () => {
            alert('pressed a key up');
        });

        Engine.Input.getKey('jump', () => {
            console.log('blaaaa'); //every tick
        });
    }
}