import "babel-polyfill";
import settings from 'settings.json';
import Engine from 'engine/Engine';

Engine.Graphics.RenderManager.initialise(document.getElementById(settings.canvasId));
Engine.Scenes.SceneManager.initialise();
