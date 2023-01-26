// Test file to see if jest is working
import { printSomething } from "../battleship/test-link.js";

test('Jest is linked to the test file', () => {
    expect(printSomething()).toBe('something');
});