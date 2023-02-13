// Entry Point

import css from './styles.css';
import * as Game from './game.js';
import * as Dom from './dom-manipulation.js'



playGame();

async function playGame () {

    // Landing Screen
    await Dom.landingScreen();

    // Choose players
    const players = await Dom.playerChoiceScreen();
    console.log(players);

    // Initialize Game 
    players[0].type = 'ai';
    players[1].type = 'ai';
    let newGame = Game.initialize(players[0], players[1]);
    Dom.initialize();

    // Loop
    newGame.mainLoop();

}

export {
}