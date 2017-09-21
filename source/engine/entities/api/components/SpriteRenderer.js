import Component from 'entities/Component';

export default class SpriteRenderer extends Component {
    constructor (startState, spriteSet) {
        super();
        this.spriteSet = spriteSet;  
    }
}