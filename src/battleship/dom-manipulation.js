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

                // Add to DOM
                board.appendChild(newDiv);
            }
        }
    }
}

function updateBoards (boards) {
    // Get player's own boards from the DOM
    const ownRenderedBoards = document.querySelectorAll('.board.own');

    // Iterate through game squares on the boards
    ownRenderedBoards.forEach((renderedBoard, index) => {
        const nodeSquares = renderedBoard.querySelectorAll('.gameSquare');
        nodeSquares.forEach((square) => {
            // Assign node to the square's meta
            square.meta.square = findNode(square.meta.x, square.meta.y, boards[index]);

            // Render meta
            renderMeta(square); 
        });
    });

}

function renderMeta (square) {
    const ship = square.meta.square.ship;

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

export {
    initialize,
    updateBoards
}