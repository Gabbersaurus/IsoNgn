import DemoTileSet from '../tilesets/DemoTileset';
import PlayerController from '../scripts/player/PlayerController';
import CameraController from '../scripts/player/CameraController';
import Knuckles from '../spritesets/Knuckles';
import Pinkmonkey from '../spritesets/Pinkmonkey';
import PurpleMonkey from '../spritesets/PurpleMonkey';
import Engine from 'Engine';

export default new Engine.Scenes.GameScene(
    DemoTileSet,
    Engine.Scenes.WorldGenerator.createBasicWorld(15, 15, 3, true),
    [
        new Engine.Entities.GameObject({
            name: 'Player',
            position: new Engine.Entities.Vector3(0, 0, 2),
            components: [
                new Engine.Components.SpriteRenderer(Knuckles)
            ],
            behaviours: [
                new PlayerController()
            ]
        }),
        new Engine.Entities.GameObject({
            name: 'Monkey',
            position: new Engine.Entities.Vector3(0, 1, 2),
            components: [
                new Engine.Components.SpriteRenderer(Pinkmonkey)
            ]
        }),
        new Engine.Entities.GameObject({
            name: 'Monkey2',
            position: new Engine.Entities.Vector3(0, 2, 2),
            components: [
                new Engine.Components.SpriteRenderer(PurpleMonkey)
            ]
        }),
        new Engine.Entities.GameObject({
            name: 'camera',
            position: new Engine.Entities.Vector3(0, 0, 2),
            components: [
                new Engine.Components.Camera(true)
            ],
            behaviours: [
                new CameraController()
            ]
        })
    ]
);