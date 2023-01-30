// Entry Point

import css from './styles.css';
import * as Game from './game.js';

// Game loop

// Initialize game objects

let newGame = Game.initialize('ai', 'ai');

// Populate game boards

newGame.boards.forEach((board, index) => {
    Game.Ai.populate(board);
});

console.log(newGame);

export {
}