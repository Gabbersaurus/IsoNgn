import "babel-polyfill";
import RenderManager from 'graphics/Api/RenderManager';
import SceneManager from 'scenes/Api/SceneManager';
import settings from 'settings.json';

RenderManager.initialise(document.getElementById(settings.canvasId));
SceneManager.initialise();
