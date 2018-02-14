export default class Tile {
    constructor(column, row, image, castShadow, offsetX, offsetY) {
        this.column = column;
        this.row = row;
        this.image = image;
        this.castShadow = typeof castShadow !== 'undefined' ? castShadow : true; //todo everywhere
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
    }
}