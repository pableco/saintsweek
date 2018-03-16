/* eslint-env node, mocha */
/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */


import chai from 'chai';
import Hello from '../src/';

chai.should();

describe('Example test', () => {

    it('example', () => {
        true.should.be.true;
    });

});

describe('Hello', () => {

    it('renders a table', () => {
        const data = { onEvent: () => { } };
        
    });

    it('prints "heders"', () => {
        
    });

});
