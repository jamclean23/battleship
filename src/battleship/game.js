import * as Player from './player.js';
import * as Gameboard from './gameboard.js';
import * as Ai from './ai.js';
import * as Dom from './dom-manipulation.js';

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

    // Main game loop
    function mainLoop () {

        // Populate game boards
        this.boards.forEach((board, index) => {
            this.Ai.populate(board);
        });

        // Draw boards
        Dom.updateBoards(this.boards);

        // Name players
        this.players.forEach((player, index) => {
            player.name = player.name + ' #' + (index + 1);
        });

        // Start a round
        playRound(this, 10);

        async function playRound (game, aiTimer) {
            let result = await takeTurns(aiTimer, game);
            console.log(result.winner.name + ' has won in ' + result.turns + ' turns!');
        }

        async function takeTurns (aiTimer = 500, game, winner = false, turns = 0, player = 0) {
            // log progress for testing
            console.log('player turn: ' + (player + 1));

            // Ai players make random attacks on the other player's board
            if (game.players[player].type === 'ai'){
                game.players[player].attackRandom(game.boards[1 - player]);
            }

            // Render boards
            Dom.updateBoards(game.boards);

            // Check for winner and return
            winner = game.testWinner();

            if (winner){
                let result = new Promise((resolve) => {
                    resolve({ winner, turns });
                });

                return result;
            } 

            // If there's not a winner,
            // call recursive function and wait for the result, then return it

            let result = await recurse();
            return result;

            function recurse () {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(takeTurns(aiTimer, game, winner, ++turns, player = 1 - player));
                    }, aiTimer);;
                });
            } 
        };
    }

    return {
        players,
        boards,
        Ai,
        testWinner,
        mainLoop
    };
}

function testWinner () {
    const boards = this.boards;

    let winner = false;
    boards.forEach((board, index) => {
        if (board.shipsSunk() === 'ALL') {
            winner = this.players[1 - index];
        }
    });
    return winner;
}

export {
    initialize,
};