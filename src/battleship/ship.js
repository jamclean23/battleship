// Functions for creation and management of ship objects

function createShip (length) {
    let totalHits = 0;

    function hit () {
        this.totalHits++;
    }
    
    function isSunk () {
        if (this.totalHits >= this.length) {
            return true;
        }
        return false;
    }

    return {
        length,
        totalHits,
        hit,
        isSunk,
    }
}

export {
    createShip,
}