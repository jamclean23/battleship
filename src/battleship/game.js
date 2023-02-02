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
        playRound(this);

        // test promises
        logThings();



        async function playRound (game) {
            let result = await takeTurns(game);
            console.log(result);
        }

        async function takeTurns (game, winner = false, turns = 0, player = 0) {
            // log progress for testing
            console.log('player: ' + player);
            console.log('turns: ' + turns);
            console.log(winner);

            // Ai players make random attacks on the other player's board
            if (game.players[player].type === 'ai'){
                game.players[player].attackRandom(game.boards[1 - player]);
            }

            // Render boards
            Dom.updateBoards(game.boards);

            // Check for winner and return

            winner = game.testWinner();

            if (winner) return new Promise((resolve) => {
                setTimeout(resolve, 1000, { winner, turns });
            });

            // If there's not a winner, set a timer and then recurse
            return await new Promise((resolve) => {
                setTimeout((resolve) => {
                    takeTurns(game, winner, ++turns, player = 1 - player);
                }, 1000);
            });
        };

        // Take turns attacking until a winner is declared
        // let turns = 0;
        // let winner;

        // let result = await takeTurns(winner, turns, this);
        // winner = result.winner;
        // turns = result.turns;

        // console.log(turns + ' turns');
        // console.log('Winner: ' + winner.name);

        async function logThings () {
            let blah = await sayHowdy();
            sayDo(blah);

            function sayHowdy () {
                console.log('howdy');
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000, 'do!');
                });
            }

            function sayDo (message) {
                console.log(message);
            }
        }
         
        function syncTakeTurns() {
            let turns = 0;
            let winner;

            while (!winner) {
                this.players.forEach((player, index) => {
                    if (player.type === 'ai'){
                        player.attackRandom(this.boards[1 - index]);
                    }
                    Dom.updateBoards(this.boards);
                });
        

                winner = this.testWinner();
                turns++;
            }
        }
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