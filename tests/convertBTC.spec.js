const { expect } = require('chai');
const convertBTC = require('../src/convertBTC');

describe('ConvertBTC', () => {
  it('Should return USD as currency and 1 as amount default', () => {
    expect(convertBTC()).to.be.eql('1 BTC to USD = 2000.00');
  });

  it('Should return BRL as currency and 10 as amount when defined', () => {
    expect(convertBTC('BRL', 10)).to.be.eql('10 BTC to BRL = 2000.00');
  });
});
