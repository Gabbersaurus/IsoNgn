import settings from '../settings.json';

class ConfigManager {
    constructor() {
        this.mainSettings = require('../games/' + settings.game + '/configs/main.json');
    }
}

export default new ConfigManager();