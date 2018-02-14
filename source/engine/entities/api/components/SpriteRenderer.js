import Component from 'entities/Component';

export default class SpriteRenderer extends Component {
    constructor(spriteSet, state) {
        super();
        this.spriteSet = spriteSet;
        this.interval = null;
        this.frame = 0;

        spriteSet.setCorrectStartPositions();

        this.setState(state || 'default');
    }

    setState(state) {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.state = state;
        this.frame = 0;

        if (this.spriteSet.states[this.state].frames > 0) {
            this.interval = setInterval(() => {
                this.frame++;

                if (this.frame >= this.spriteSet.states[this.state].frames) {
                    this.frame = 0;
                }
            }, this.spriteSet.framesPerSecond);
        }
    }
}