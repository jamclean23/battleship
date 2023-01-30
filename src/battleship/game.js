import * as Player from './player.js';
import * as Gameboard from './gameboard.js';

function initialize (player1 = 'player', player2 = 'player') {
    let playerTypes = [player1, player2];
    let players = [];
    
    playerTypes.forEach((player, index) => {
        players.push(Player.createPlayer(player));
    });

    return {
        players: players,
    };
}

export {
    initialize
};