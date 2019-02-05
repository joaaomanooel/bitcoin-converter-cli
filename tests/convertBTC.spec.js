const chai = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const convertBTC = require('../src/convertBTC');

chai.use(sinonChai);
const { expect } = chai;

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    price: 3436.26,
    success: true,
    time: '2019-02-05 17:30:59',
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('Should use currency USD and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to USD = 3436.26');
      done();
    }, 300);
  });

  it('Should use currency USD and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    convertBTC('USD', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 3436.26');
      done();
    }, 300);
  });

  it('Should use currency BRL and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 10 })
      .reply(200, responseMock);

    convertBTC('BRL', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('10 BTC to BRL = 3436.26');
      done();
    }, 300);
  });

  it('Should use currency BRL and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to BRL = 3436.26');
      done();
    }, 300);
  });

  it('Should message user when api reply with error', (done) => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 15 })
      .replyWithError('Error');

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('Something went wrong in the API. Try in a few minutes.');
      done();
    }, 300);
  });
});
