// Function for creation and management of gameboard objects

import * as Ship from './ship.js';

function createBoard () {

    let board = populateBoard();

    function populateBoard () {
        let board = [];

        for (let i = 0; i < 7; i ++) {
            let row = [];
            for (let h = 0; h < 7; h++) {
                row.push(createNode());
            }
            board.push(row);
        }
        return board;
    }

    function createNode () {
        return {
            ship: false,
            attacked: false

        };
    }

    return {
        board,
        receiveAttack,
        placeShip
    };
}

function placeShip (x, y, length, orientation) {
    // Check if the current node is valid
    if (checkIfValid(x, y, this.board)){
        console.log('Origin coordinates valid');
        // Check if orientation has been specified
        if (orientation === 'horizontal' || orientation === 'vertical') {
            console.log('orientation has been specified: ' + orientation);
            // Check that there is room for the placement
            if (checkIfRoom(x, y, length, orientation, this.board)) {
                console.log('There is enough room');
                commitPlacement(x, y, length, orientation, this.board);
                console.log(this.board);
                return;
            }
        } else {
            throw new Error('Orientation not specified');
        }   
    }

    return "invalid"

    function commitPlacement (x, y, length, orientation, board) {
        console.log('committing placement');

        const newShip = Ship.createShip(length);

        for (let i = 0; i < length; i++) {
            board[y][x].ship = newShip;
            if (orientation === 'horizontal') x++;
            if (orientation === 'vertical') y++;
        }
    }

    function checkIfRoom (x, y, length, orientation, board) {
        console.log('checking for room');
        for (let i = 0; i < length; i ++) {
            if (!(checkIfValid(x, y, board))) {
                console.log('Not enough room');
                return 'invalid';
            };

            if (orientation === 'horizontal') {
                x++;
            } else {
                y++;
            }
        }
        return true;
    }

    function checkIfValid (x, y, board) {
        if (y < 0 || y > 6) return false;
        if (x < 0 || x > 6) return false;
        if (board[y][x].ship || board[y][x].attacked) return false;
        return true;
    }

}

function receiveAttack (x, y) {
    let node = this.board[y][x];
    node.attacked = true;
}

function shipsSunk () {

}

export {
    createBoard
}