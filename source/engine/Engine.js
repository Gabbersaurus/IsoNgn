//Entities
import GameBehaviour from './entities/api/GameBehaviour';
import GameObject from './entities/api/GameObject';
import Vector3 from './entities/api/Vector3';
import Component from './entities/Component';
import Transform from './entities/Transform';
const Entities = {
    GameBehaviour,
    GameObject,
    Vector3,
    Component,
    Transform
};

//Entities -> Components
import Camera from './entities/api/components/Camera';
import SpriteRenderer from './entities/api/components/SpriteRenderer';
const Components = {
    Camera,
    SpriteRenderer
};

//Graphics
import CameraManager from './graphics/api/CameraManager';
import ImageLoader from './graphics/api/ImageLoader';
import RenderManager from './graphics/api/RenderManager';
import Sprite from './graphics/api/Sprite';
import SpriteSet from './graphics/api/SpriteSet';
import Tile from './graphics/api/Tile';
import TileSet from './graphics/api/Tileset';
const Graphics = {
    CameraManager,
    ImageLoader,
    RenderManager,
    Sprite,
    SpriteSet,
    Tile,
    TileSet
};

//Scenes
import GameScene from './scenes/api/GameScene';
import Map from './scenes/api/Map';
import SceneManager from './scenes/api/SceneManager';
import WorldGenerator from './scenes/api/WorldGenerator';
const Scenes = {
    GameScene,
    Map,
    SceneManager,
    WorldGenerator,
};

//Misc
import ConfigManager from './ConfigManager';
import Input from './input/Input';

export default {
    Entities,
    Components,
    Graphics,
    Scenes,
    ConfigManager,
    Input
}