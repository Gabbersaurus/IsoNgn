export default class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get zero() {
        return new Vector3(0, 0, 0);
    }
}