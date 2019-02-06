const chai = require('chai');
const chalk = require('chalk');
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
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('Should use currency USD and 1 as amount default', async () => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    await convertBTC();

    expect(consoleStub)
      .to
      .have
      .been
      .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(3436.26)}`);
  });

  it('Should use currency USD and 10 as amount', async () => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    await convertBTC('USD', 10);

    expect(consoleStub)
      .to
      .have
      .been
      .calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(3436.26)}`);
  });

  it('Should use currency BRL and 10 as amount', async () => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 10 })
      .reply(200, responseMock);

    await convertBTC('BRL', 10);

    expect(consoleStub)
      .to
      .have
      .been
      .calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(3436.26)}`);
  });

  it('Should use currency BRL and 1 as amount default', async () => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    await convertBTC('BRL');

    expect(consoleStub)
      .to
      .have
      .been
      .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(3436.26)}`);
  });

  it('Should message user when api reply with error', async () => {
    nock('https://apiv2.bitcoinaverage.com/')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 15 })
      .replyWithError('Error');

    await convertBTC();

    expect(consoleStub)
      .to
      .have
      .been
      .calledWith(chalk.red('Something went wrong in the API. Try in a few minutes.'));
  });
});
