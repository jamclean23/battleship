// Dom methods and rendering

function initialize () {
    const boards = document.querySelectorAll('.board');

    addEmpty(boards[0]);
    renderLetters(boards[0]);

    function addEmpty (board) {
        // Create empty square and give it a class
        let newDiv = document.createElement('div');
        newDiv.classList.add('empty');
        newDiv.classList.add('gridSquare');


        // Placement
        newDiv.style.gridColumn = '0 / 1';
        newDiv.style.gridRow = '0 / 1';

        // Add to DOM
        board.appendChild(newDiv);
    }

    function renderLetters (board) {
        const letters = [
            'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J'
        ];

        // Generate ten divs
        for (let i = 0; i < 10; i++) {
            let newDiv = document.createElement('div');

            // Assign a letter to each of them in order
            newDiv.innerText = letters[i];
            
            // Give them a class
            newDiv.classList.add('letter');
            newDiv.classList.add('gridSquare');


            // Placement
            newDiv.style.gridTemplateRows = '0 / 1';

            // Add to DOM
            board.appendChild(newDiv);
        }
    }
}

export {
    initialize
}