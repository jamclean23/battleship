// Functions relating to ai and randomization

function populate (board) {
    board.shipsList.forEach((ship, index) => {
        let keepGoing = 'invalid';
        while (keepGoing === 'invalid') {
            let orientation = randomOrientation();
            let grid = randomCoords(board);
            keepGoing = board.placeShip(grid.x, grid.y, ship.length, orientation);
        }
    });

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
    populate,
    attackRandom
}