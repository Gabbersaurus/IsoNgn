import CameraManager from 'graphics/api/CameraManager';
import Component from 'entities/Component';

export default class Camera extends Component {
    constructor (activeOnStart) {
        super(() => {
            if(this.activeOnStart) {
                this.setActive();
            }
        });

        this.activeOnStart = activeOnStart;  
    }

    setActive() {
        CameraManager.setActiveCamera(this);
    }

    getPosition() {
        return this.gameObject.transform.position;
    }
}