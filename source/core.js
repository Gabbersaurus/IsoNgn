import "babel-polyfill";
import RenderManager from 'graphics/RenderManager';
import SceneManager from 'scenes/SceneManager';
import settings from './settings.json';

RenderManager.initialise(document.getElementById(settings.canvasId));
SceneManager.initialise();
