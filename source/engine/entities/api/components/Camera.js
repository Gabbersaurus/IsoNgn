import CameraManager from 'graphics/api/CameraManager';

export default class Camera {
    constructor (activeOnStart) {
        this.activeOnStart = activeOnStart;  
    }

    initialise(gameObject) {
        this.gameObject = gameObject;

        if(this.activeOnStart) {
            this.setActive();
        }
    }

    setActive() {
        CameraManager.setActiveCamera(this);
    }

    getPosition() {
        return this.gameObject.transform.position;
    }
}