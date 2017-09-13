import Map from 'scenes/Map';

export default class WorldGenerator {
    static CreateBasicWorld(width, height, depth, asMap) {
        let actualMap = [
            [
                [1,1,1,1],
                [1,2,2,1],
                [1,2,2,1],
                [1,1,1,1],
            ]
        ];

        if(asMap) {
            return new Map(width, height, depth, actualMap);
        }

        return actualMap;
    }
}