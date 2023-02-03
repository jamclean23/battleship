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
        // SETUP
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

        // Give player 1 the starting turn
        this.players[0].isTurn = true;

        // LOOP
        playRound(this, 500);

        async function playRound (game, aiTimer) {
            let result = await takeTurns(aiTimer, game);
            console.log(result.winner.name + ' has won in ' + result.turns + ' turns!');
        }

        async function takeTurns (aiTimer = 500, game, winner = false, turns = 0, player = 0) {
            // log progress for testing
            console.log('player turn: ' + (player + 1));

            // Ai players make random attacks on the other player's board
            if (game.players[player].type === 'ai') {
                game.players[player].attackRandom(game.boards[1 - player]);
            // Wait for input if it's a human player
            } else if (game.players[player].type === 'player') {
                let coordinates = false;

                while (!coordinates) {
                    coordinates = await getAttack(game, player);
                    console.log(coordinates);
                }


            }

            // Render boards
            Dom.updateBoards(game.boards);

            // Check for winner and return
            winner = game.testWinner();

            // Toggle player turns
            toggleTurns(game);

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

            function toggleTurns (game) {
                game.players.forEach((player) => {
                    player.isTurn ? player.isTurn = false: player.isTurn = true ;
                });
            }
            function getAttack (game, player) {
                return new Promise((resolve) => {
                    // Set up commit button
                    const commitButton = document.querySelector('#commit');
                    const xInput = document.querySelector('#xInput');
                    const yInput = document.querySelector('#yInput');

                    commitButton.addEventListener('click', handleResolve);

                    function handleResolve () {
                        // Remove event listener to prevent duplicate calls
                        commitButton.removeEventListener('click', handleResolve);

                        // Check if input is valid
                        if (checkValidInput(xInput.value, yInput.value)){

                            // Attempt an attack
                            let attempt = game.boards[1 - player].receiveAttack(xInput.value - 1, yInput.value - 1);
                            
                            // If the attack succeeds, resolve the return value
                            if (attempt) {
                                resolve({ x: xInput.value, y: yInput.value});
                            
                            // If the attack fails, resolve false
                            } else {
                                console.log('Invalid Placement');
                                resolve(false);
                            }
                        } else {
                            resolve(false);
                        }
                


                        function checkValidInput (x, y) {
                            console.log('x ' + x);
                            console.log('y ' + y);
                            if (x > 0 && x < 11 && y > 0 && y < 11) {
                                return true;
                            } else {
                                console.log('out of range');
                                return false;
                            }
                        }
                    }
                });
            }

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