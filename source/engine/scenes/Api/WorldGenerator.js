import Map from 'scenes/Api/Map';

export default class WorldGenerator {
    //Does not generate actual map yet
    static CreateBasicWorld(width, height, depth, asMap) {
        let actualMap = [
            [
                [3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3],
                [3,3,3,3,3,3,3,3],
            ],
            [
                [1,1,1,1,1,1,1,1],
                [1,2,2,2,1,1,1,1],
                [1,2,2,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
            ]
        ];

        if(asMap) {
            return new Map(width, height, depth, actualMap);
        }

        return actualMap;
    }
}