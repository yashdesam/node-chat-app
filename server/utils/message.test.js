const expect = require('expect');

var { generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  });
});


describe('generateLocationMessage', () => {
  it('Should generate correct location object', () => {
    var from = 'harry';
    var longitude = 1;
    var latitude = 1;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');s
    
    expect(message).toMatchObject({ from, url})
  });
});
