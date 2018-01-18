export default class Sprite {
    constructor(width, height, column, row, frames, image, offsetX, offsetY,) {
        this.width = width;
        this.height = height;
        this.column = column;
        this.row = row;
        this.frames = frames;
        this.image = image;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || -16;
    }
}