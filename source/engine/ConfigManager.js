import settings from 'settings.json';

class ConfigManager {
    constructor() {
        let main = require('../games/' + settings.game + '/configs/main.json');
        let controls = require('../games/' + settings.game + '/configs/controls.json');

        if (!main || !controls) {
            //todo: exceptions
            alert('One or more configs are missing');
        }

        this.main = main;
        this.controls = controls;
    }
}

export default new ConfigManager();