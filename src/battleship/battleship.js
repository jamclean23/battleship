// Entry Point

import css from './styles.css';
import * as Game from './game.js';
import * as Dom from './dom-manipulation.js'



// Landing Screen

// Choose players

// Initialize Game 
let newGame = Game.initialize('player', 'ai');
Dom.initialize();

// Loop
newGame.mainLoop();


export {
}