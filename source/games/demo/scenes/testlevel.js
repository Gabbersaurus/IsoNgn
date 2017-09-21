import GameScene from 'scenes/api/GameScene';
import GameObject from 'entities/api/GameObject';
import WorldGenerator from 'scenes/api/WorldGenerator';
import demoTileSet from '../tilesets/demoTileSet';
import PlayerController from '../scripts/player/PlayerController';
import Camera from 'entities/api/components/Camera';
import SpriteRenderer from 'entities/api/components/SpriteRenderer';
import Vector3 from 'entities/api/Vector3';

export default new GameScene(
    demoTileSet,
    WorldGenerator.CreateBasicWorld(50, 50, 3, true),
    [
        new GameObject({
            name: 'Player',
            position: new Vector3(0, 0, 0),
            components: [
                new SpriteRenderer()
            ],
            behaviours: [
                new PlayerController()
            ]
        }),
        new GameObject({
            name: 'camera',
            position: new Vector3(25, 25, 1),
            components: [
                new Camera(true)
            ]
        })
    ]
);