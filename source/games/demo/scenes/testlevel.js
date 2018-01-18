import DemoTileSet from '../tilesets/DemoTileSet';
import PlayerController from '../scripts/player/PlayerController';
import CameraController from '../scripts/player/CameraController';
import Yellowblob from '../spritesets/Yellowblob';
import Pinkmonkey from '../spritesets/Pinkmonkey';
import Engine from 'Engine';

export default new Engine.Scenes.GameScene(
    DemoTileSet,
    Engine.Scenes.WorldGenerator.createBasicWorld(50, 50, 3, true),
    [
        new Engine.Entities.GameObject({
            name: 'Player',
            position: new Engine.Entities.Vector3(0, 0, 2),
            components: [
                new Engine.Components.SpriteRenderer(Yellowblob)
            ],
            behaviours: [
                new PlayerController()
            ]
        }),
        new Engine.Entities.GameObject({
            name: 'Monkey',
            position: new Engine.Entities.Vector3(3, 3, 2),
            components: [
                new Engine.Components.SpriteRenderer(Pinkmonkey)
            ]
        }),
        new Engine.Entities.GameObject({
            name: 'camera',
            position: new Engine.Entities.Vector3(0, 5, 0),
            components: [
                new Engine.Components.Camera(true)
            ],
            behaviours: [
                new CameraController()
            ]
        })
    ]
);