import Map from 'scenes/api/Map';

export default class WorldGenerator {
    //Does not generate actual map yet
    static CreateBasicWorld(width, height, depth, asMap) {
        let actualMap = [];

        for (let z = 0; z <= depth; z++) {
            actualMap[z] = [];

            for (let y = 0; y <= height; y++) {
                actualMap[z][y] = [];
    
                for (let x = width; x >= 0; x--) {
                    if(z == 0) {
                        actualMap[z][y][x] = 3;
                        continue;
                    } else if(z == 1) {
                        actualMap[z][y][x] = 1;
                        continue;
                    } else if(z == 2) {
                        let oneToTen = Math.floor((Math.random() * 10) + 1);
                        actualMap[z][y][x] = oneToTen == 1 ? 1 : 0;
                        continue;
                    }

                    actualMap[z][y][x] = 0;
                }
            }
        }

        if(asMap) {
            return new Map(width, height, depth, actualMap);
        }

        return actualMap;
    }
}