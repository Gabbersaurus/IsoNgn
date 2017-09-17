import GameScene from 'scenes/Api/GameScene';
import GameObject from 'entities/Api/GameObject';
import WorldGenerator from 'scenes/Api/WorldGenerator';
import demoTileSet from '../tilesets/demoTileSet';
import PlayerController from '../scripts/player/PlayerController';

export default new GameScene(
    demoTileSet,
    WorldGenerator.CreateBasicWorld(8, 4, 2, true),
    [
        new GameObject(
            'player',
            {
                x: 0,
                y: 0,
                z: 0,
            },
            [
                new PlayerController()
            ]
        )
    ]
);