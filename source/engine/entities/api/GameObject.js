import Transform from 'entities/Transform';

export default class GameObject {
    constructor (name, position, components, behaviours) {
        this.name = name;
        this.transform = new Transform(position.x, position.y, position.z, this);
        this.components = components;
        this.behaviours = behaviours;

        this.injectGameObjectInComponents();
    }

    injectGameObjectInComponents() {
        var componentsLength = this.components.length;

        for (var i = 0; i < componentsLength; i++) {
            let component = this.components[i];
            component.initialise(this);
        }
    }
}