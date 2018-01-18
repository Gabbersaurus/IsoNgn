import Transform from 'entities/Transform';
import Vector3 from 'entities/api/Vector3';

export default class GameObject {
    //Todo: object ipv alle parameters!
    constructor(parameters) {
        if (!parameters.name) {
            console.log('Making GameObject undefined because of invalid or missing parameters');

            return null;
        }

        this.name = parameters.name;

        this.transform = new Transform(parameters.position ? parameters.position : Vector3.zero, this);
        this.components = parameters.components ? parameters.components : [];
        this.behaviours = parameters.behaviours ? parameters.behaviours : [];

        this.injectGameObjectInComponents();
    }

    injectGameObjectInComponents() {
        let componentsLength = this.components.length;

        for (let i = 0; i < componentsLength; i++) {
            let component = this.components[i];
            component.initialise(this);
        }
    }

    getComponent(componentName) {
        let componentsLength = this.components.length;

        for (let i = 0; i < componentsLength; i++) {
            let component = this.components[i];

            if (component.constructor.name === componentName) {
                return component;
            }
        }

        return undefined;
    }
}