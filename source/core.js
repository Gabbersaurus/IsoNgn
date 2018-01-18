import 'babel-polyfill';
import Engine from 'engine/Engine';

document.getElementById('title').innerHTML = Engine.ConfigManager.main.title;

Engine.Graphics.RenderManager.initialise(document.getElementById('game'));
Engine.Scenes.SceneManager.initialise();
