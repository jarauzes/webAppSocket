const {isRealString} = require('./../utils/validation');
var expect = require('expect');

describe('isRealString Mocha Testing', () => {
    it('Should reject the nonstring value', () => {
        var entry = isRealString(1111);
        expect(entry).toBe(false);
    });
    it('Should reject string with only spaces', () => {
        var entry = isRealString('  ');
        expect(entry).toBe(false);
    });
    it('Should allow numerics and symbols', () => {
        var entry = isRealString('#development75');
        expect(entry).toBe(true);
    });
});