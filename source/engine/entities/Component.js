export default class Component {
    constructor(callback = null) {
        this.callback = callback;
    }

    initialise(gameObject) {
        this.gameObject = gameObject;

        if(this.callback) {
            this.callback();
        }
    }
}