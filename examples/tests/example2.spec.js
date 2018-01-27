const chai = require('chai');
const expect = chai.expect;

describe('string methods', function() {
    describe('length', function() {
        it('should be 1 for a character', function() {
            expect('a'.length).to.equal(1);
        });
    });
});

