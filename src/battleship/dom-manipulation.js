// Dom methods and rendering

function initialize () {
    // Render guides for each board
    const boards = document.querySelectorAll('.board');
    const letters = [
        'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J'
    ];

    boards.forEach((board) => {
        addEmpty(board);
        renderLetters(board);
        renderNumbers(board);
        renderNodeSquares(board);
    });

    function addEmpty (board) {
        // Create empty square and give it a class
        let newDiv = document.createElement('div');
        newDiv.classList.add('empty');
        newDiv.classList.add('gridSquare');
        
        // Placement
        newDiv.style.backgroundColor = 'black';
        newDiv.style.gridArea = '0/0/1/1';
        
        // Add to DOM
        board.appendChild(newDiv);
    }

    function renderLetters (board) {

        // Generate ten divs
        for (let i = 0; i < 10; i++) {
            let newDiv = document.createElement('div');

            // Assign a letter to each of them in order
            newDiv.innerText = letters[i];
            
            // Give them a class
            newDiv.classList.add('letter');
            newDiv.classList.add('gridSquare');


            // Placement
            newDiv.style.gridArea = '0/' + i + '/1/' + (i + 1);

            // Add to DOM
            board.appendChild(newDiv);
        }
    }

    function renderNumbers (board) {
        // Generate ten divs
        for (let i = 0; i < 10; i++) {
            let newDiv = document.createElement('div');

            // Assign a number to each in order
            newDiv.innerText = i + 1;

            // Give them a class
            newDiv.classList.add('number');
            newDiv.classList.add('gridSquare');

            // Placement
            newDiv.style.gridColumn = '0 / 1';
            newDiv.style.gridRow = (i + 2) + '/' + (i + 3);

            // Add to DOM
            board.appendChild(newDiv);
        }
    }

    function renderNodeSquares(board) {
        // create 100 divs, separated by ten to place them in rows
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let newDiv = document.createElement('div');

                // Give it a class
                newDiv.className = 'gridSquare gameSquare';

                // Attach metadata about positoning
                newDiv.meta = {
                    x: j,
                    y: i
                }

                // Placement
                newDiv.style.gridColumn = (newDiv.meta.x + 2) + ' / ' +  (newDiv.meta.x + 3);
                newDiv.style.gridRow = (newDiv.meta.y + 2) + ' / ' +  (newDiv.meta.y + 3);

                board.appendChild(newDiv);
            }
        }
    }
}

function updateBoards (game) {

    let boards = game.boards;
    let players = game.players;
    let playerWhoseTurn = game.findWhoseTurn(game);

    // Disable arrows and commit while in fleet view
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach((arrow, index) => {
        if (playerWhoseTurn.show === 'myShips' && game.phase != 'placement') {
            arrow.disabled = true;
        } else {
            arrow.disabled = false;
        }
    });

    // Hide the rotate button after placement phase
    const rotateButton = document.querySelector('#rotate');
    if (game.phase != 'placement') rotateButton.style.display = 'none';

    // Hide the radar button during placement phase
    const targetingButton = document.querySelector('#targeting');
    if (game.phase === 'placement') {
        targetingButton.style.display = 'none';
    } else {
        targetingButton.style.display = 'grid';
    }

    // If it's the ai's turn, do not render
    if (playerWhoseTurn.type === 'ai') return;

    // Get DOM board nameplate
    const boardNameplate = document.querySelector('#boardIdent');
    // Update board nameplate
    if (playerWhoseTurn.show === 'myShips') {
        boardNameplate.innerText = 'My Fleet';
    } else {
        boardNameplate.innerText = 'Radar';
    }
    

    // Get DOM player nameplate
    const playerNameplate = document.querySelector('#playerIdent');
    // Update player nameplate
    playerNameplate.innerText = playerWhoseTurn.name;

    // Get player's own boards from the DOM
    const ownRenderedBoards = document.querySelectorAll('.board.own');

    // Iterate through 'own' boards
    ownRenderedBoards.forEach((renderedBoard, index) => {
        // Assign an owner to each board
        renderedBoard.player = players[index];

        // Hide the board if it's an ai
        if (renderedBoard.player.type === 'ai' && game.players[1 - index].type === 'player') {
            renderedBoard.style.display = 'none';
        }

        // Get nodelist of all squares on the boards
        const nodeSquares = renderedBoard.querySelectorAll('.gameSquare');

        // Iterate though them
        nodeSquares.forEach((square) => {
            // Assign node to the square's meta
            square.meta.square = findNode(square.meta.x, square.meta.y, boards[index]);

            // Render meta
            renderOwnMeta(game, renderedBoard, square);     
        });

        // Decide whether or not to display the board
        showOrHideBoard(renderedBoard);
    });

    // Get players' 'their' boards from the Dom
    const theirRenderedBoards = document.querySelectorAll('.board.theirs');

    // Iterate through boards
    theirRenderedBoards.forEach((renderedBoard, index) => {
        // Assign an owner to each board
        renderedBoard.player = players[index];

        // Hide the board if it's an ai
        if (renderedBoard.player.type === 'ai' && game.players[1 - index].type === 'player') {
            renderedBoard.style.display = 'none';
        }

        // Get a nodelist of all the squares on the board
        const nodeSquares = renderedBoard.querySelectorAll('.gameSquare');

        // Iterate through them
        nodeSquares.forEach((square) => {

            // Assign a node to the square's meta
            square.meta.square = findNode(square.meta.x, square.meta.y, boards[1 - index]);

            // Render meta
            renderTheirMeta(game, renderedBoard, square);
        });

        // Decide whether or not to display the board
        showOrHideBoard(renderedBoard);
    });

}

function renderTheirMeta (game, renderedBoard, square) {
    const ship = square.meta.square.ship;

    if (ship && square.meta.square.attacked) {
        square.style.backgroundColor = 'red';
        square.innerText = ship.name.slice(0, 1); 
        square.style.color = 'white';
    }

    if (!ship && square.meta.square.attacked) {
        square.style.backgroundColor = 'blue';
    }

    if (renderedBoard.player.isTurn && renderedBoard.player.selected) {
        if (game.phase === 'game' && square.meta.x === renderedBoard.player.selected.x && square.meta.y === renderedBoard.player.selected.y) {
            square.classList.add('selected');
        } else {
            square.classList.remove('selected');
        }
    }
}

function renderOwnMeta (game, renderedBoard, square) {
    const ship = square.meta.square.ship;

    if (square.meta.preview) {
        square.classList.add('preview');
    } else {
        square.classList.remove('preview');
    }
    
    if (ship) {
        square.innerText = ship.name.slice(0, 1); 
        square.style.backgroundColor = 'gray';
        square.style.color = 'white';
    } 

    if (ship && square.meta.square.attacked) {
        square.style.backgroundColor = 'red';
    }

    if (!ship && square.meta.square.attacked) {
        square.style.backgroundColor = 'blue';
    }

    if (renderedBoard.player.isTurn && renderedBoard.player.selected) {
        if (game.phase === 'placement' && square.meta.x === renderedBoard.player.selected.x && square.meta.y === renderedBoard.player.selected.y) {
            square.classList.add('selected');
        } else {
            square.classList.remove('selected');
        }
    } else {
        square.classList.remove('selected');
    }
}

function findNode (x, y, board) {
    // Search for the node
    let found = false;
    board.board.forEach((row, yIndex) => {
        row.forEach((square, xIndex) => {
            if (xIndex === +x && yIndex === +y) found = square;
        });
    });

    // If it's found then return it
    if (found) return found;

    // If it isn't then throw an error
    throw new Error('Node Square mismatch');
    
}

function showOrHideBoard (board) {
    
    showIfTurn(board);
    if (board.player.show === 'myShips') showMyShips(board);
    if (board.player.show === 'targeting') showTargeting(board);

    function showMyShips (board) {
        if (!board.classList.contains('own')) {
            board.style.display = 'none';
        } 
    }
    
    function showTargeting (board) {
        if (!board.classList.contains('theirs')) {
            board.style.display = 'none';
        } 
    }
    
    function showIfTurn (board) {
        if (board.player.isTurn) {
            board.style.display = 'grid';
        } else {
            board.style.display = 'none';
        }
    }
}

function getPreview (game) {
    // Calculate which squares should be used for the preview

    // Player whose turn it is
    let player = game.findWhoseTurn(game);

    // Get own rendered board for the player
    const ownRenderedBoards = document.querySelectorAll('.board.own');

    let ownRenderedBoard;
    ownRenderedBoards.forEach((renderedBoard) => {
        if (renderedBoard.player === player) {
            ownRenderedBoard = renderedBoard;
        }
    });

    // Get preview squares and assign
    for (let i = 1; i < player.placing.ship.length; i++) {
        if (player.placing.orientation === 'horizontal') {
            let square = findRenderedSquare(player.selected.x + i, player.selected.y, ownRenderedBoard);
            if (square) square.classList.add('preview');
            
        } else if (player.placing.orientation === 'vertical') {
            let square = findRenderedSquare(player.selected.x, player.selected.y + i, ownRenderedBoard);
            if (square) square.classList.add('preview');
        }
    }

    function findRenderedSquare (x, y, renderedBoard) {
        const squares = renderedBoard.querySelectorAll('.gameSquare');
        let result;
        squares.forEach((square) => {
            if (square.meta.x === x && square.meta.y === y) {
                result = square;
            }
        });
        if (result) return result;
        return false;
    }
}

async function landingScreen () {
    return new Promise((resolve) => {
        // Add landing screen to the DOM
        addLandingModal();
        // Wait for three seconds and then clear
        setTimeout(() => {
            resolve(clearModal());
        }, 4000);
    });

    function addLandingModal (message = 'BATTLEBOATS') {
        // Create new modal
        let newModal = document.createElement('div');
        // Give it the modal class
        newModal.classList.add('modal');
        // Add content
        let newP = document.createElement('p');
        newP.innerText = message;
        newP.style.color = 'white';
        newP.style.fontSize = '12vw';
        newModal.appendChild(newP);
        // Add to the DOM
        const body = document.querySelector('body');
        body.appendChild(newModal);
    }
}

async function playerChoiceScreen () {
    return new Promise((resolve) => {

        // Overlay the screen with a modal if there isn't an existing one
        const modal = document.querySelector('.modal');
        if (!modal) addChoiceModal();

        // Add a class
        modal.classList.add('playerChoiceModal');

        // Fill with content for making player choices
        for (let i = 0; i < 4; i++) {
            let newDiv = document.createElement('div');
            switch (i) {
                case 0:
                    newDiv.innerText = 'BATTLEBOATS';
                    newDiv.style.color = 'white';
                    break;
                case 1:
                    createPlayerInputBox(1);
                    break;
                case 2:
                    createPlayerInputBox(2);
                    break;
                case 3:
                    // Create button
                    let button = document.createElement('button');

                    // Class
                    button.classList.add('readyButton');

                    // Content
                    button.innerText = 'Ready';

                    // Add to DOM
                    newDiv.appendChild(button);
            }

            function createPlayerInputBox (playerNumber) {
                // Nameplate
                let playerP = document.createElement('p');
                playerP.innerText = 'Player ' + playerNumber;
                playerP.style.color = 'white';
                newDiv.appendChild(playerP);

                // Div to hold text input and label
                let inputDiv = document.createElement('div');
                // Add class
                inputDiv.classList.add('inputDiv');
                // Add to DOM
                newDiv.appendChild(inputDiv);

                // Text input for naming
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.id = 'player'+ playerNumber + 'Name';
                input.value = 'Player ' + playerNumber;
                inputDiv.appendChild(input);

                // Label for input box
                let label = document.createElement('label');
                label.setAttribute('for', 'player' + playerNumber + 'Name');
                label.style.color = 'white';
                label.innerText = 'Name:';
                inputDiv.insertBefore(label, input);

                // Add option for selecting player type if player 2
                if (playerNumber === 2) {

                    // Create div to hold select and label
                    let selectDiv = document.createElement('div');
                    // Add Class
                    selectDiv.classList.add('selectDiv');
                    // Add to DOM
                    newDiv.appendChild(selectDiv);
                    
                    // Create label
                    let label = document.createElement('label');
                    label.innerText = 'Type:';
                    label.setAttribute('for', 'player2type');
                    selectDiv.appendChild(label);

                    // Create select element
                    let select = document.createElement('select');
                    select.id = 'player2type';
                    // Add to DOM
                    selectDiv.appendChild(select);


                    // Add options
                    for (i = 0; i < 2; i++) {
                        let option = document.createElement('option');
                        switch (i) {
                            case 0:
                                option.setAttribute('value', 'player');
                                option.innerText = 'player';
                                break;
                            case 1:
                                option.setAttribute('value', 'ai');
                                option.innerText = 'ai';
                        }
                        select.appendChild(option);
                    }
                }
            }
            // Add to DOM
            modal.appendChild(newDiv);
            
        }

        // Resolve on button click
        const readyButton = document.querySelector('.readyButton');

        readyButton.addEventListener('click', handleReadyClick);

        function handleReadyClick () {
            readyButton.removeEventListener('click', handleReadyClick);

            resolve([
                {
                    name: document.querySelector('#player1Name').value,
                    type: 'player'
                },
                {
                    name: document.querySelector('#player2Name').value,
                    type: document.querySelector('#player2type').value
                }
            ]);
            clearModal();
            const modal = document.querySelector('.modal');
            modal.classList.remove('playerChoiceModal');
        }
    });

    function addChoiceModal () {
        // Create a new modal
        let newModal = document.createElement('div');
        // Add a class
        newModal.classList.add('modal');
        // Add to the DOM
        const body = document.querySelector('body');
        body.appendChild(newModal);
    }
}

async function splashscreen (game, mode, message = '') {
    
    return new Promise((resolve) => {
        
        // Overlay the screen with a modal if there isn't an existing one
        const modal = document.querySelector('.modal');
        if (!modal) {
            addModal(game, message);
        } else {
            clearModal();
            setupPlayerTransition(modal, game, message);
        }
        // Get the ready button
        const readyButton = document.querySelector('.modal .readyButton');
        // Add eventlistener
        readyButton.addEventListener('click', handleReadyClick);
        
        function handleReadyClick () {
            readyButton.removeEventListener('click', handleReadyClick);
            if (game.findWhoseTurn().type === 'player') {
                removeModal(game);
            }
            resolve();
        }
    });

    function addModal (game, message) {
        // Create new modal
        let newModal = document.createElement('div');

        // Set css styling/class
        newModal.classList.add('modal');

        // Add to the dom
        document.querySelector('body').appendChild(newModal);
        
        // Add content
        setupPlayerTransition(newModal, game, message);
    }
    
    function setupPlayerTransition (modal, game, message) {
        
        // Add info paragraph
        let infoP = document.createElement('p');

        // Add inner text
        infoP.innerText = game.findWhoseTurn().name + ' is next' + '\n' + message;

        // set css styling/class
        infoP.classList.add('modalMessage');
        
        // Add to modal
        modal.appendChild(infoP);


        // make a ready button
        let readyButton = document.createElement('button');
        
        // Add inner text
        readyButton.innerText = 'Ready!';
        
        // Set css styling/class
        readyButton.classList.add('readyButton');
        readyButton.style.cssText = "font-size: 3vh";
        
        // Add to modal
        modal.appendChild(readyButton); 
    }
}

function removeModal () {
    // Get the modal
    const modal = document.querySelector('.modal');
    // Remove it
    modal.remove();
}

function clearModal () {
    const modal = document.querySelector('.modal');
    modal.innerHTML = '';
}

export {
    initialize,
    updateBoards,
    getPreview,
    splashscreen,
    landingScreen,
    playerChoiceScreen
}