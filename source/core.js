import "babel-polyfill";
import RenderManager from 'graphics/api/RenderManager';
import SceneManager from 'scenes/api/SceneManager';
import settings from 'settings.json';

RenderManager.initialise(document.getElementById(settings.canvasId));
SceneManager.initialise();
