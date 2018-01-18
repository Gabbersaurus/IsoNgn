//Entities
import GameBehaviour from './engine/entities/api/GameBehaviour';
import GameObject from './engine/entities/api/GameObject';
import Vector3 from './engine/entities/api/Vector3';
import Component from './engine/entities/Component';
import Transform from './engine/entities/Transform';
const Entities = {
    GameBehaviour,
    GameObject,
    Vector3,
    Component,
    Transform
};

//Entities -> Components
import Camera from './engine/entities/api/components/Camera';
import SpriteRenderer from './engine/entities/api/components/SpriteRenderer';
const Components = {
    Camera,
    SpriteRenderer
};

//Graphics
import CameraManager from './engine/graphics/api/CameraManager';
import ImageLoader from './engine/graphics/api/ImageLoader';
import RenderManager from './engine/graphics/api/RenderManager';
import Sprite from './engine/graphics/api/Sprite';
import SpriteSet from './engine/graphics/api/SpriteSet';
import Tile from './engine/graphics/api/Tile';
import TileSet from './engine/graphics/api/TileSet';
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
import GameScene from './engine/scenes/api/GameScene';
import Map from './engine/scenes/api/Map';
import SceneManager from './engine/scenes/api/SceneManager';
import WorldGenerator from './engine/scenes/api/WorldGenerator';
const Scenes = {
    GameScene,
    Map,
    SceneManager,
    WorldGenerator,
};

//Misc
import ConfigManager from './engine/ConfigManager';

export default {
    Entities,
    Components,
    Graphics,
    Scenes,
    ConfigManager
}