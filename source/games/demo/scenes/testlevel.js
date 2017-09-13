import GameScene from 'scenes/GameScene';
import GameObject from 'games/GameObject';
import WorldGenerator from 'scenes/WorldGenerator';
import demoTileset from '../tilesets/demoTileset';
import PlayerController from '../scripts/player/PlayerController';

export default new GameScene(
    demoTileset,
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