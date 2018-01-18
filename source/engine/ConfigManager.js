import settings from 'settings.json';

class ConfigManager {
    constructor() {
        let mainSettings = require('../games/' + settings.game + '/configs/main.json');
        let controls = require('../games/' + settings.game + '/configs/controls.json');

        if (!mainSettings || !controls) {
            //todo: exceptions
            alert('One or more configs are missing');
        }

        this.mainSettings = mainSettings;
        this.controls = controls;
    }
}

export default new ConfigManager();