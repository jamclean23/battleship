import * as Battleship from '../battleship/battleship.js';
import * as Ship from '../battleship/ship.js';
import * as GameBoard from '../battleship/gameboard.js';
import * as Player from '../battleship/player.js';


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

    let board1 = GameBoard.createBoard();
    beforeEach(() => {
        board1 = GameBoard.createBoard();
    });

    test('Board dimensions are correct', () => {
        expect(board1.board.length).toBe(10);
        expect(board1.board[0].length).toBe(10);
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

        test('Attacking a node with a ship adds a hit', () => {
            board1.placeShip(2, 2, 3, 'horizontal');
            expect(typeof board1.board[2][2].ship).toBe('object');
            board1.receiveAttack(2, 2);
            expect(board1.ships[0].totalHits).toBe(1);
        });

        test('Attacking a node that has already been attacked returns false', () => {
            board1.receiveAttack(2, 2);
            expect(board1.receiveAttack(2, 2)).toBe(false);
        });

        test('Attacking an off grid node returns false', () => {
            expect(board1.receiveAttack(-3, 3)).toBe(false);
        })
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

        test('Prevent overlapping ships', () => {
            let x = 3;
            let y = 4;
            board1.placeShip(x, y, 3, 'horizontal');
            board1.placeShip(x, y, 3, 'vertical');
            expect(typeof board1.board[y][x].ship).toBe('object');
            expect(board1.board[y + 1][x].ship).toBe(false);
        });

        test('Prevent horizontal ship placement at edges when there is no room', () => {
            let x = 7;
            let y = 0;
            let length = 3;
            // Control
            board1.placeShip(x, y, length, 'horizontal');
            expect(typeof board1.board[y][x].ship).toBe('object');
            // Test
            board1.placeShip(x + 1, y + 1, length, 'horizontal');
            expect(board1.board[y + 1][x + 1].ship).toBe(false);
        });

        test('Prevent vertical ship placement at edges when there is no room', () => {
            let x = 0;
            let y = 7;
            let length = 3;
            // Control
            board1.placeShip(x, y, length, 'vertical');
            expect(typeof board1.board[y][x].ship).toBe('object');
            // Test
            board1.placeShip(x + 1, y + 1, length, 'vertical');
            expect(board1.board[y + 1][x + 1].ship).toBe(false);
        });

        test('Prevent horizontal placement off the grid', () => {
            let x = -1;
            let y = 4;
            let length = 3;
            board1.placeShip(x, y, length, 'horizontal');
            expect(board1.board[y][0].ship).toBe(false);
        });

        test('Prevent vertical placement off the grid', () => {
            let x = 0;
            let y = -2;
            let length = 4;
            board1.placeShip(x, y, length, 'vertical');
            expect(board1.board[0][x].ship).toBe(false);
        });

        test('Gameboard.ships is an array', () => {
            board1.placeShip(2, 2, 3, 'horizontal');
            expect(Array.isArray(board1.ships)).toBe(true);
        });

        test('Ships are added to the ships array attached to Gameboard object', () => {
            board1.placeShip(2, 2, 3, 'horizontal');
            expect(board1.ships.length).toBe(1);
            expect(typeof board1.ships[0]).toBe('object');
        });
    });
    describe('shipsSunk()', () => {
        test('Returns 0 when no ships are sunk', () => {
            expect(board1.shipsSunk()).toBe(0);
        });

        test('Returns count of ships sunk', () => {
            board1.placeShip(2, 2, 2, 'horizontal');
            board1.placeShip(2, 3, 2, 'horizontal');

            board1.receiveAttack(2, 2);
            board1.receiveAttack(3, 2);

            expect(board1.shipsSunk()).toBe(1);

            board1.receiveAttack(2, 3);
            board1.receiveAttack(3, 3);

            expect(board1.shipsSunk()).toBe('ALL');
        })
    });
});

describe('Player object:', () => {
    test('Player object created correctly', () => {
        const player1 = Player.createPlayer('player');
        expect(player1).toStrictEqual({
            isTurn: false,
            type: 'player'
        });
        const player2 = Player.createPlayer('ai');
        expect(player2).toStrictEqual({
            isTurn: false,
            type: 'ai'
        });
    });
});