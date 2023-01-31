// Entry Point

import css from './styles.css';
import * as Game from './game.js';

// // Game loop

// // Initialize game objects
// let newGame = Game.initialize('ai', 'ai');

// // Populate game boards
// newGame.boards.forEach((board, index) => {
//     newGame.Ai.populate(board);
// });

// // Take turns randomly attacking until all the ships are sunk on a board
// let turns = 0;
// while (newGame.boards[0].shipsSunk() != 'ALL' && newGame.boards[1].shipsSunk() != 'ALL') {
//     newGame.players[1].attackRandom(newGame.boards[0]);
//     console.log('\nPlayer 1\'s Ships Sunk: ' + newGame.boards[0].shipsSunk());

//     newGame.players[0].attackRandom(newGame.boards[1]);
//     console.log('Player 2\'s Ships Sunk: ' + newGame.boards[1].shipsSunk() + '\n');

//     turns++
// }

// console.log('Turns: ' + turns); 

// if (newGame.boards[0].shipsSunk() === 'ALL') {
//     console.log('Player 2 Wins!');
// } else {
//     console.log('Player 1 Wins!');
// }


// Testing
export {
}