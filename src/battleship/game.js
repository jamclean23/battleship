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
        Dom.updateBoards(this);

        // Name players
        this.players.forEach((player, index) => {
            player.name = player.name + ' #' + (index + 1);
        });

        // Give player 1 the starting turn
        this.players[0].isTurn = true;

        setupListeners(this);

        // LOOP
        playRound(this, 500);

        function setupListeners (game) {
            // Get a nodelist of the buttons on the arrow pad
            const arrows = document.querySelectorAll('.arrow');
    
            // Iterate through them
            arrows.forEach((button) => {
                button.addEventListener('click', handleClick);
    
                function handleClick (event) {
                    let key = event.srcElement.id;
                    let player = findWhoseTurn(game);
                    if(player.type === 'ai') return;

                    if (!player) throw new Error('Game not started');
                    switch(key) {
                        case 'up':
                            player.selected = moveSelection(player.selected, 0, -1);
                            break;
                        case 'down':
                            player.selected = moveSelection(player.selected, 0, 1);
                            break;
                        case 'left':
                            player.selected = moveSelection(player.selected, -1, 0);
                            break;
                        case 'right':
                            player.selected = moveSelection(player.selected, 1, 0);
                            break
                        case 'commit':
                            break
                    }
                    console.log('Player selected:');
                    console.log(player.selected);

                    Dom.updateBoards(game);
                    
                    function moveSelection (selected, xChange, yChange) {
                        selected.x = selected.x + xChange;
                        selected.y = selected.y + yChange;

                        if (selected.x > 9) selected.x = 9;
                        if (selected.x < 0) selected.x = 0;

                        if (selected.y > 9) selected.y = 9;
                        if (selected.y < 0) selected.y = 0;

                        return selected;
                    }
                    
                }
            });
    
        }

        function findWhoseTurn (game) {
            let result = false;
            game.players.forEach((player) => {
                if (player.isTurn){
                    result = player;
                }
            });
            return result;

        }

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
                }


            }

            // Render boards
            Dom.updateBoards(game);

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