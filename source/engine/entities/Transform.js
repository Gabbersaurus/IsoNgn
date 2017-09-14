import Vector3 from 'entities/Api/Vector3';

export default class Transform {
    constructor(x, y, z, gameObject) {
        this.gameObject = gameObject;
        this.position = new Vector3(x, y, z);
    }
}