import * as Battleship from '../battleship/battleship.js';

test('Jest is linked to battleship.js', () => {
    expect(Battleship.printSomething()).toBe('something');
});