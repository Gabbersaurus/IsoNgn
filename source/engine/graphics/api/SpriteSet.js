import Engine from 'Engine';

export default class SpriteSet {
    constructor(states, framesPerSecond) {
        this.states = states;
        this.framesPerSecond = framesPerSecond || 1000 / 30; //default to 30fps
        let statesKeys = Object.keys(this.states);
        let statesKeysLength = statesKeys.length;

        for (let i = 0; i < statesKeysLength; i++) {
            let state = this.states[statesKeys[i]];

            if (!(state instanceof Engine.Graphics.Sprite)) {
                console.error('A non-sprite was found in a SpriteSet with state: ' + statesKeys[i]);
                this.states = {};
            }
        }
    }

    getImagePaths() {
        let statesKeys = Object.keys(this.states);
        let statesKeysLength = statesKeys.length;
        let images = [];

        for (let i = 0; i < statesKeysLength; i++) {
            let sprite = this.states[statesKeys[i]];
            images.push(sprite.image);
        }

        return images;
    }
}