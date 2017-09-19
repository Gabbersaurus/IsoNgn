import Vector3 from 'entities/api/Vector3';

export default class Transform {
    constructor(vector3, gameObject) {
        this.gameObject = gameObject;
        this.position = vector3 ? vector3 : Vector3.zero;
    }
}