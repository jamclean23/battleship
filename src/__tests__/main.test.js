import * as Battleship from '../battleship/battleship.js';
import * as Ship from '../battleship/ship.js';
import * as GameBoard from '../battleship/gameboard.js';

describe('Jest link test:', () => {
    test('printSomething returns "something"', () => {
        expect(Battleship.printSomething()).toBe('something');
    });
});


describe('Ship object:', () => {

    const ship = Ship.createShip(3);

    test('Length property is 3 when given 3', () => {
        expect(ship.length).toBe(3);
    });

    test('totalHits property is 0', () => {
        expect(ship.totalHits).toBe(0);
    })

    test('ship.hits() adds a hit', () => {
        ship.hit();
        expect(ship.totalHits).toBe(1);
    })

    test('isSunk() calculates if the ship is sunk', () => {
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    test('Creating another ship makes a copy', () => {
        const ship2 = Ship.createShip(4);
        expect(ship.length).toBe(3);
        expect(ship2.length).toBe(4);
        expect(ship.isSunk()).toBe(true);
        expect(ship2.isSunk()).toBe(false);
    })
});

describe('Gameboard object:', () => {
    const board1 = GameBoard.createBoard();

    test('Board dimensions are correct', () => {
        expect(board1.board.length).toBe(7);
        expect(board1.board[0].length).toBe(7);
    });

    test('Nodes are created correctly', () => {
        expect(board1.board[0][0].ship).toBe(false);
        expect(board1.board[6][6].attacked).toBe(false);
    })

    describe('receiveAttack()', () => {
        test('Attacking a node marks it as attacked', () => {
            board1.receiveAttack(0, 0);
            expect(board1.board[0][0].attacked).toBe(true);
            board1.board[0][0].attacked = false;
        });
    });


    describe('placeShip()', () => {
        test('Placing a ship horizontally marks the involved nodes as having that ship', () => {
            let x = 2;
            let y = 3;
            board1.placeShip(x, y, 3, 'horizontal');
            expect(typeof board1.board[y][x].ship).toBe('object');
            expect(typeof board1.board[y][x + 1].ship).toBe('object');
            expect(typeof board1.board[y][x + 2].ship).toBe('object');
        });

        test('Can place vertical ships', () => {
            let x = 0;
            let y = 0;
            board1.placeShip(x, y, 3, 'vertical');
            expect(typeof board1.board[y][x].ship).toBe('object');
            expect(typeof board1.board[y + 1][x].ship).toBe('object');
            expect(typeof board1.board[y + 2][x].ship).toBe('object');
        });
    });

});