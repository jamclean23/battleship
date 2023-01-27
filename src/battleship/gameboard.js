// Function for creation and management of gameboard objects

import * as Ship from './ship.js';

function createBoard () {

    let board = populateBoard();

    function populateBoard () {
        let board = [];

        for (let i = 0; i < 10; i ++) {
            let row = [];
            for (let h = 0; h < 10; h++) {
                row.push(createNode());
            }
            board.push(row);
        }
        return board;
    }

    function createNode () {
        return {
            ship: false,
            attacked: false,
        };
    }

    return {
        board,
        receiveAttack,
        placeShip,
        ships: [],
    };
}

function placeShip (x, y, length = 'horizontal', orientation) {
    // Check if the current node is valid
    if (checkIfValid(x, y, this.board)){
        // Check if orientation has been specified
        if (orientation === 'horizontal' || orientation === 'vertical') {
            // Check that there is room for the placement
            if (checkIfRoom(x, y, length, orientation, this.board)) {
                commitPlacement(x, y, length, orientation, this.board, this);
                return;
            }
        } else {
            throw new Error('Orientation not specified');
        }   
    }

    return "invalid"

    function commitPlacement (x, y, length, orientation, board, gameboardObj) {

        const newShip = Ship.createShip(length);
        gameboardObj.ships.push(newShip);        

        for (let i = 0; i < length; i++) {
            board[y][x].ship = newShip;
            if (orientation === 'horizontal') x++;
            if (orientation === 'vertical') y++;
        }
    }

    function checkIfRoom (x, y, length, orientation, board) {
        for (let i = 0; i < length; i ++) {
            if (!(checkIfValid(x, y, board))) {
                return false;
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
        if (y < 0 || y > 9) return false;
        if (x < 0 || x > 9 ) return false;
        if (board[y][x].ship || board[y][x].attacked) return false;
        return true;
    }

}

function receiveAttack (x, y) {
    let node = this.board[y][x];

    if (!isInBounds(x, y) || node.attacked) return false;

    if (node.ship) node.ship.totalHits++;
    node.attacked = true;
}

function shipsSunk () {

}

function isInBounds (x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    return true;
}

export {
    createBoard
}