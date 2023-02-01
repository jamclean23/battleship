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

export {
    initialize
}