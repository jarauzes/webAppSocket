var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});

    });
});
describe('generateLocationMessage', () => {
    it('Should generate a location object', () => {

        var from = 'Mocha Location';
        var lat = 51;
        var lon = 6;
        var url = `https://www.google.com/maps?q=${lat},${lon}`
        var message = generateLocationMessage(from, lat, lon);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});

    });
});