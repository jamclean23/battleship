// Entry Point

import css from './styles.css';
import * as Game from './game.js';
import * as Dom from './dom-manipulation.js'




// Initialize
let newGame = Game.initialize('ai', 'ai');
Dom.initialize();

// Loop
newGame.mainLoop();

export {
}