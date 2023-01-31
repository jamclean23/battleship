// Functions for creation and management of player objects

function createPlayer (type = player) {

    if (!(type === 'ai')) type = 'player';

    let board;

    function attack (board, x, y) {
        return board.receiveAttack(x, y);
    }

    function attackRandom(board) {
        let keepGoing = true;
        while (keepGoing === true) {
            let grid = randomCoords(board);
            let attack = board.receiveAttack(grid.x, grid.y);
            if (attack != false) {
                keepGoing = false;
                if (attack === 'hit') {
                    console.log('Hit!');
                } else if (attack === 'miss') {
                    console.log('Missed!');
                }
            }
        }
    }

    if (type === 'player') {
        return {
            isTurn: false,
            type,
            board,
            attack
        }  
    } else if (type === 'ai') {
        return {
            isTurn: false,
            type,
            board,  
            attackRandom  
        }
    }
}

function randomOrientation () {
    let integer = Math.floor(Math.random() * 10);
    if (integer > 5) {
        return 'horizontal';
    } else {
        return 'vertical';
    }
}

function randomCoords (board) {
    let length = board.board.length;
    let x = Math.floor(Math.random() * length);
    let y = Math.floor(Math.random() * length);

    return {
        x,
        y
    }
}

export {
    createPlayer
}