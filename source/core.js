import "babel-polyfill";
import settings from 'settings.json';
import Engine from 'Engine';

Engine.Graphics.RenderManager.initialise(document.getElementById(settings.canvasId));
Engine.Scenes.SceneManager.initialise();
