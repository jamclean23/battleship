// Entry Point

import css from './styles.css';
import * as Game from './game.js';

// // Game loop

let newGame = Game.initialize('ai', 'ai');
newGame.mainLoop();

export {
}