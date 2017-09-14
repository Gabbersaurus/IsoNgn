import Transform from 'entities/Transform';

export default class GameObject {
    constructor (name, position, behaviours) {
        this.name = name;
        this.transform = new Transform(position.x, position.y, position.z, this);
        this.behaviours = behaviours;
    }
}