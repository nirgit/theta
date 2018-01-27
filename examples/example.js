const chai = require('chai');
const expect = chai.expect;

it('should calculate the sum of two numbers', function() {
    expect(1 + 2).to.equal(3);
});

it('should calculate the product of two numbers', function() {
    expect(2 * 2).to.equal(3);
});

it('should calculate the division of two numbers', function() {
    expect(2 / 2).to.equal(1);
});

describe('Calculator', function() {
    it('should check the + op', function() {
        expect(8 + 3).to.equal(11);
    });

    describe('division op', function() {
        it('should return 2 when dividing 8 by 4', function() {
            expect(8 / 4).to.equal(2);
        });

        it('integer divided by 0 should equal 0', function() {
            // demonstrating that an error inside a nested describe works
            expect(1 / 0).to.equal(0);
        });
    });
});
