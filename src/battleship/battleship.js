// Entry Point

import css from './styles.css';
import * as Game from './game.js';
import * as Dom from './dom-manipulation.js'



playGame();

async function playGame () {

    // Landing Screen
    await Dom.landingScreen();
    // Choose players

    // Initialize Game 
    let newGame = Game.initialize('player', 'player');
    Dom.initialize();

    // Loop
    newGame.mainLoop();

}

export {
}