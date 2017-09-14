class ImageLoader {
    constructor() {
        this.images = {};
    }

    loadImage(path) {
        return new Promise(resolve => {
            if(!this.images.hasOwnProperty(path)) {
                let image = new Image();
                image.src = path;
                this.images[path] = image;
                image.onload = () => resolve();
                return;
            }

            resolve();
        });
    }

    loadImages(paths) {
        return new Promise(resolve => {
            let pathsLength = paths.length;
            let promises = [];

            for (let i = 0; i < pathsLength; i++) {
                let path = paths[i];
                promises.push(this.loadImage(path));
            }

            Promise.all(promises).then(() => {
                resolve();
            })
        });
    }

    getImage(path) {
        return this.images[path];
    }
}

export default new ImageLoader();