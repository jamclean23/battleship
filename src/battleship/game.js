import * as Player from './player.js';
import * as Gameboard from './gameboard.js';

function initialize (player1 = 'player', player2 = 'player') {

    // Initialize game boards

    const boards = [];

    for (let i = 0; i < 2; i++) {
        boards[i] = Gameboard.createBoard();
    }

    // Initialize players

    const playerTypes = [player1, player2];
    const players = [];

    playerTypes.forEach((player, index) => {
        let newPlayer = Player.createPlayer(player);
        newPlayer.board = boards[index];
        players.push(newPlayer);
    });

    return {
        players,
        boards,
    };
}

export {
    initialize
};