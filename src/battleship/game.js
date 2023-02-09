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
    async function mainLoop () {
        // SETUP
        
        // Give player 1 the starting turn
        this.players[0].isTurn = true;

        // Initialize arrow keys
        setupListeners(this);

        // Name players
        this.players.forEach((player, index) => {
            player.name = player.name + ' #' + (index + 1);
        });
        
        
        // Populate game boards
        console.log('Placement Phase');
        // Determine player type and appropriate placement method
        for (let i = 0; i < this.boards.length; i++) {
            // Draw boards
            Dom.updateBoards(this);

            if (this.players[i].type === 'ai') {
                this.Ai.populate(this.boards[i]);
            } else if (this.players[i].type === 'player') {
                await playerPlaceLoop(this, this.boards[i], i);
                players[i].show = 'myShips';
            }
            toggleTurns(this);
        }
        
        // Draw boards
        Dom.updateBoards(this);
        
        // Game loop
        console.log('Game Phase');
        this.phase = 'game';
        playRound(this, 0);

        async function playerPlaceLoop (game, board, playerIndex) {

            // Iterate through ships list, continuing once placement is valid
            for (let i = 0; i < board.shipsList.length; i++) {
                let player = game.players[playerIndex];
                player.placing.ship = board.shipsList[i];
                player.placing.orientation = 'horizontal';

                // Initialize preview
                Dom.getPreview(game);

                let result = 'invalid';

                while (result != 'valid') {

                    result = await waitForInput(board, i, player.placing.orientation);

                    if (result === 'horizontal' || result === 'vertical') {
                        player.placing.orientation = result;
                    }
                    Dom.updateBoards(game);
                    Dom.getPreview(game);
                }
            }

            // Return after finished
            return new Promise((resolve) => {
                resolve();
            });

            function waitForInput (board, i, orientation) {
                return new Promise((resolve) => {
                    // Setup commit button
                    const commitButton = document.querySelector('#commit');

                    // Wait for user input, check for valid selection, and either resolve or continue loop
                    commitButton.addEventListener('click', handleCommit);

                    // Setup rotate button
                    const rotateButton = document.querySelector('#rotate');
                    
                    // wait for user input, rotate ship and continue loop 
                    rotateButton.addEventListener('click', handleRotate);

                    function handleCommit () {
                        commitButton.removeEventListener('click', handleCommit);
                        commitButton.removeEventListener('click', handleCommit);
                        let result = board.placeShip(game.players[playerIndex].selected.x, game.players[playerIndex].selected.y, board.shipsList[i].length, orientation, board.shipsList[i].name);
                        resolve(result);
                    }

                    function handleRotate () {
                        commitButton.removeEventListener('click', handleCommit);
                        rotateButton.removeEventListener('click', handleRotate);
                        orientation === 'horizontal'? orientation = 'vertical': orientation = 'horizontal';

                        resolve(orientation);
                    }
                });
            }
        }

        function setupListeners (game) {
            // Get a nodelist of display buttons
            const displayButtons = document.querySelectorAll('.displayButton');

            // Iterate through them
            displayButtons.forEach((button) => {
                button.addEventListener('click', handleDisplayClick);
            });

            function handleDisplayClick (event) {

                const key = event.srcElement.id;
                const player = findWhoseTurn(game);

                switch(key) {
                    case 'myShips':
                        player.show = 'myShips';
                        break;
                    case 'targeting':
                        player.show = 'targeting';
                        break;
                }

                Dom.updateBoards(game);
                if (game.phase === 'placement') Dom.getPreview(game);

            }

            // Get a nodelist of the buttons on the arrow pad
            const arrows = document.querySelectorAll('.arrow');
    
            // Iterate through them
            arrows.forEach((button) => {
                button.addEventListener('click', handleArrowClick);
            });

            function handleArrowClick (event) {

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

                Dom.updateBoards(game);
                if (game.phase === 'placement') Dom.getPreview(game);

                
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

        }

        function toggleTurns (game) {
            game.players.forEach((player) => {
                player.isTurn ? player.isTurn = false: player.isTurn = true ;
            });
        }

        async function playRound (game, aiTimer) {
            let result = await takeTurns(aiTimer, game);
            console.log(result.winner.name + ' has won in ' + result.turns + ' turns!');
        }

        async function takeTurns (aiTimer = 0, game, winner = false, turns = 0, player = 0) {
            console.log(aiTimer);
            // Initial render
            Dom.updateBoards(game);

            // Splash Screen
            await Dom.splashscreen(game);

            // log progress for testing
            console.log('player turn: ' + (player + 1));

            // Ai players make random attacks on the other player's board
            if (game.players[player].type === 'ai') {
                game.players[player].attackRandom(game.boards[1 - player]);
            // Wait for input if it's a human player
            } else if (game.players[player].type === 'player') {
                // Show my fleet screen on start of turn
                game.findWhoseTurn(game).show = 'myShips';
                Dom.updateBoards(game);

                // Wait for user input and make attack
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

            function getAttack (game, playerTurn) {
                return new Promise((resolve) => {
                    // Set up commit button
                    const commitButton = document.querySelector('#commit');
                    // Dom.updateInfoBoxes(player.selected.x, player.selected.y);
                    let player = game.players[playerTurn];

                    commitButton.addEventListener('click', handleResolve);

                    function handleResolve () {
                        // Remove event listener to prevent duplicate calls
                        commitButton.removeEventListener('click', handleResolve);

                        // Check if input is valid
                        if (checkValidInput(player.selected.x, player.selected.y)){

                            // Attempt an attack
                            let attempt = game.boards[1 - playerTurn].receiveAttack(player.selected.x, player.selected.y);
                            
                            // If the attack succeeds, resolve the return value
                            if (attempt) {
                                resolve({ x: player.selected.x, y: player.selected.y});
                            
                            // If the attack fails, resolve false
                            } else {
                                console.log('Invalid Placement');
                                resolve(false);
                            }
                        } else {
                            resolve(false);
                        }
                


                        function checkValidInput (x, y) {
                            if (x >= 0 && x < 10 && y >= 0 && y < 10) {
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

    function findWhoseTurn (game) {
        if (!game) game = this;
        let result = false;
        game.players.forEach((player) => {
            if (player.isTurn){
                result = player;
            }
        });
        return result;
    }

    return {
        players,
        boards,
        Ai,
        testWinner,
        mainLoop,
        phase: 'placement',
        findWhoseTurn
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