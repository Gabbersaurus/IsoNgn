import ConfigManager from '../ConfigManager';

class Input {
    constructor() {
        this.pressedKeys = [];
        this.pressedKeysDown = [];
        this.pressedKeysUp = [];

        this.pressedKeysUpdate = [];
        this.pressedKeysDownUpdate = [];
        this.pressedKeysUpUpdate = [];
        this.pressedKeysOnHold = []; //This will hold the down events so that the key down will only be fired once.

        document.body.addEventListener('keydown', (e) => {
            this.setKeyDown(e.keyCode);
        });

        document.body.addEventListener('keyup', (e) => {
            this.setKeyUp(e.keyCode);
        });
    }

    setKeyUp(keyCode) {
        let holdIndex = this.pressedKeysOnHold.indexOf(keyCode);
        this.pressedKeysOnHold.splice(holdIndex, 1);

        let pressIndex = this.pressedKeysUpdate.indexOf(keyCode);
        this.pressedKeysUpdate.splice(pressIndex, 1);

        this.pressedKeysUpUpdate.push(keyCode);
    }

    setKeyDown(keyCode) {
        if (this.pressedKeysOnHold.indexOf(keyCode) === -1) {
            this.pressedKeysOnHold.push(keyCode);
            this.pressedKeysDownUpdate.push(keyCode);
        }

        if (this.pressedKeysUpdate.indexOf(keyCode) === -1) {
            this.pressedKeysUpdate.push(keyCode);
        }
    }


    updatePressedKeys() {
        this.pressedKeys = this.pressedKeysUpdate;
        this.pressedKeysDown = this.pressedKeysDownUpdate;
        this.pressedKeysUp = this.pressedKeysUpUpdate;

        this.pressedKeysDownUpdate = [];
        this.pressedKeysUpUpdate = [];
    }

    getKeyCode(controlString) {
        let keyCode = ConfigManager.controls[controlString];

        if (!keyCode) {
            console.log('control ' + controlString + ' is not defined in the controls');
            return null;
        }

        return keyCode;
    }

    getKeyPressed(controlString, pressedKeysArray) {
        let keyCode = this.getKeyCode(controlString);

        if (keyCode) {
            return pressedKeysArray.indexOf(keyCode) !== -1;
        }

        return false;
    }

    getKeyPressedEvent(controlString, pressedKeysArray, event) {
        let keyFound = this.getKeyPressed(controlString, pressedKeysArray);

        if (keyFound) {
            event();
        }
    }

    getKeyDown(controlString, event) {
        this.getKeyPressedEvent(controlString, this.pressedKeysDown, event);
    }

    getKeyUp(controlString, event) {
        this.getKeyPressedEvent(controlString, this.pressedKeysUp, event);
    }

    getKey(controlString, event) {
        this.getKeyPressedEvent(controlString, this.pressedKeys, event);
    }
}

export default new Input();