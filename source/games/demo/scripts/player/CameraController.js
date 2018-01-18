import Engine from 'Engine';

export default class CameraController extends Engine.Entities.GameBehaviour {
    start() {
        this.count = 0;
    }

    update() {
        this.count++;

        if (this.count >= 10) {
            this.count = 0;
            this.gameObject.transform.position.x++;
        }
    }
}