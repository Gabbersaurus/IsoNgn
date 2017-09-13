import GameScene from 'scenes/GameScene';
import GameObject from 'games/GameObject';
import FancyWorldGenerator from './FancyWorldGenerator';
import demoTileset from '../tilesets/demoTileset';
import PlayerController from '../scripts/player/PlayerController';

export default new GameScene(
    demoTileset,
    FancyWorldGenerator.CreateBasicWorld(4, 4, 1, true),
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