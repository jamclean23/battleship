// Functions for creation and management of player objects

function createPlayer (type = player) {

    if (!(type === 'ai')) type = 'player';

    return {
        isTurn: false,
        type,
    }
}

export {
    createPlayer
}