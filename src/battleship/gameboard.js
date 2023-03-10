// Function for creation and management of gameboard objects

import * as Ship from './ship.js';

function createBoard () {

    let board = populateBoard();

    let shipsList = [
        {
            name: 'Carrier',
            length: 5
        },
        {
            name: 'Battleship',
            length: 4
        },
        {
            name: 'Destroyer',
            length: 3
        },
        {
            name: 'Submarine',
            length: 3
        },
        {
            name: 'Patrol Boat',
            length: 2
        }
    ];

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
        shipsSunk,
        ships: [],
        shipsList
    };
}

function placeShip (x, y, length, orientation = 'horizontal', name) {
    // Check if the current node is valid
    if (checkIfValid(x, y, this.board)){
        // Check if orientation has been specified
        if (orientation === 'horizontal' || orientation === 'vertical') {
            // Check that there is room for the placement
            if (checkIfRoom(x, y, length, orientation, this.board)) {
                commitPlacement(x, y, length, orientation, this.board, this, name);
                return 'valid';
            }
        } else {
            throw new Error('Orientation not specified');
        }   
    }

    return "invalid"

    function commitPlacement (x, y, length, orientation, board, gameboardObj, name) {

        const newShip = Ship.createShip(length, name);
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

    node.attacked = true;

    if (node.ship){
        node.ship.totalHits++;
        return 'hit';
    } else {
        return 'miss';
    }
}

function shipsSunk () {
    let sunkShipCount = 0;
    let ships = this.ships;
    ships.forEach((ship, index) => {
        if (ship.isSunk()) sunkShipCount++;
    });
    if (ships.length === sunkShipCount && ships.length > 0) return 'ALL';
    return sunkShipCount;

}

function isInBounds (x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    return true;
}

export {
    createBoard
}