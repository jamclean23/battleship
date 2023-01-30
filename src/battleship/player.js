// Functions for creation and management of player objects

function createPlayer (type = player) {

    if (!(type === 'ai')) type = 'player';

    let board;

    return {
        isTurn: false,
        type,
        board
    }
}

export {
    createPlayer
}