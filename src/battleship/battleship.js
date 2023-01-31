// Entry Point

import css from './styles.css';
import * as Game from './game.js';

// Game loop

// Initialize game objects
let newGame = Game.initialize('ai', 'ai');

// Populate game boards
newGame.boards.forEach((board, index) => {
    newGame.Ai.populate(board);
});

// Name players
newGame.players.forEach((player, index) => {
    player.name = player.name + ' #' + (index + 1);
});

// Take turns attacking until a winner is declared

let turn = 0;
let winner;

while (!winner) {
    newGame.players.forEach((player, index) => {
        player.attackRandom(newGame.boards[1 - index]);
    });

    winner = newGame.testWinner();
}

console.log('Winner: ' + winner.name);

export {
}