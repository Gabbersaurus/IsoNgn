import Map from 'scenes/Map';

export default class FancyWorldGenerator {
    static CreateBasicWorld(width, height, depth, asMap) {
        let map = new FancyWorldGenerator();
        for (let i = 0; i < 3; i++) {
            map.zoom();
        }
        //for (let i = 0; i < 4; i++) {
        //    map.zoom();
        //    map.smooth();
        //}
		map.smooth();
		console.log(map);
		if (asMap) {
			return new Map(map.sizeX, map.sizeZ, depth, [map.to2d(map.sizeX)]);
		}
		return [map.to2d(map.sizeX)];
    }

    
	constructor() {
		//this.values = new Uint8Array(4 * 4);
		//this.sizeX = 9;
		//this.sizeZ = 9;
		this.reset();
	}
    
    to2d(part) {
        var tmp = [];
        for(var i = 0; i < this.values.length; i += part) {
            tmp.push(this.values.slice(i, i + part));
		}
        return tmp;
    }

	reset() {
		this.sizeZ = 15;
		this.sizeX = 15;
		this.values = new Uint8Array(this.sizeX * this.sizeZ);
		for (let i = 0; i < this.values.length; i++)
		{
			this.values[i] = 2;
		}

		for (let x = 2; x < this.sizeX - 2; x += 3) {
			for (let z = 2; z < this.sizeZ - 2; z += 3) {
				// We don't want islands in every corner.
				if (Math.random() > 0.75)
					continue;
				this.values[x + z * this.sizeZ] = 1;
			}
		}
	}


	chooseRandomNumber() {
		let numArguments = arguments.length;
		return arguments[Math.floor(Math.random() * arguments.length)];
	}


	smooth() {
		let sizeZ = this.sizeZ - 2;
		let sizeX = this.sizeX - 2;
		let cache = new Uint8Array((this.sizeX - 2) * (this.sizeZ - 2));
		for (let z = 0; z < sizeZ; z++)
		{
			for (let x = 0; x < sizeX; x++)
			{
				let val   = this.values[x + 1 + (z + 1) * this.sizeZ];
				let above = this.values[x + 1 + z       * this.sizeZ];
				let below = this.values[x + 1 + (z + 2) * this.sizeZ];
				let left  = this.values[x     + (z + 1) * this.sizeZ];
				let right = this.values[x + 2 + (z + 1) * this.sizeZ];

				if ((left == right) && (above == below))
				{
					if (Math.random() < 0.5)
					{
						val = left;
					}
					else
					{
						val = below;
					}
				}
				else
				{
					if (left == right)
					{
						val = left;
					}
					if (above == below)
					{
						val = above;
					}
				}
				cache[x + z * sizeX] = val;
			}
		}
		this.values = cache;
		this.sizeX -= 2;
		this.sizeZ -= 2;
	}


	zoom() {
		let lowStepX = (this.sizeX - 1) * 2;
		let lowStepZ = (this.sizeZ - 1) * 2;
		let cache = new Uint8Array(lowStepX * lowStepZ);
		for (let z = 0; z < this.sizeZ - 1; z++)
		{
			let idx = (z * 2) * lowStepX;
			let PrevZ0 = this.values[z * this.sizeX];
			let PrevZ1 = this.values[(z + 1) * this.sizeX];

			for (let x = 0; x < this.sizeX - 1; x++)
			{
				let ValX1Z0 = this.values[x + 1 + z * this.sizeX];
				let ValX1Z1 = this.values[x + 1 + (z + 1) * this.sizeX];
				cache[idx] = PrevZ0;
				cache[idx + lowStepX] = this.chooseRandomNumber(PrevZ0, PrevZ1);
				cache[idx + 1] = this.chooseRandomNumber(PrevZ0, ValX1Z0);
				cache[idx + 1 + lowStepX] = this.chooseRandomNumber(PrevZ0, ValX1Z0, PrevZ1, ValX1Z1);
				idx += 2;
				PrevZ0 = ValX1Z0;
				PrevZ1 = ValX1Z1;
			}
		}
		this.values = cache;
		this.sizeX = lowStepX;
		this.sizeZ = lowStepZ;
	}
}