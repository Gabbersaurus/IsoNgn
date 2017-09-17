import Vector3 from 'entities/api/Vector3';

class CameraManager {
    constructor() {
        this.currentCamera = null;
    }

    setActiveCamera(camera) {
        this.currentCamera = camera;
    }

    getActiveCamera() {
        return this.currentCamera;
    }

    getCameraPosition() {
        return this.currentCamera ? this.currentCamera.getPosition() : Vector3.zero;
    }
}

export default new CameraManager();