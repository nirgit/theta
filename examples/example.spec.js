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
    describe('Simple', function() {
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

    describe('Scientific', function() {
        const degToRad = degrees => degrees * Math.PI / 180;
        const epsilon = 0.0001;

        describe('Sin. function', function() {
            it(`should calculate the Sin(30deg) function (to equal 0.5) in an epsilon ${epsilon} env`, function() {
                const degrees = degToRad(30);
                expect(Math.sin(degrees)).to.be.above(0.5 - epsilon);
                expect(Math.sin(degrees)).not.to.be.above(0.5 + epsilon);
            });
        });
    });
});
