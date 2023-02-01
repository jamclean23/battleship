// Entry Point

import css from './styles.css';
import * as Game from './game.js';
import * as Dom from './dom-manipulation.js'

// Initialize
Dom.initialize();


// Game loop
let newGame = Game.initialize('ai', 'ai');
newGame.mainLoop();

export {
}