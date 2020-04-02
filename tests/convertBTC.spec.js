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
    USD: { high: '5.285', low: '5.223', pctChange: '0.55', bid: '5.2769', ask: '5.2799' },
    BTC: { high: '36500', low: '32300', pctChange: '8.79', bid: '35301', ask: '35400' },
  };

  beforeEach(() => { consoleStub = sinon.stub(console, 'info'); });
  afterEach(() => { consoleStub.restore(); });

  it('Should use currency USD and 1 as amount default', async () => {
    nock('https://economia.awesomeapi.com.br/').get('/json/all').reply(200, responseMock);

    await convertBTC();

    const toCurrency = value => parseFloat(value).toFixed(3);
    const low = toCurrency(responseMock.BTC.low / responseMock.USD.low);
    const high = toCurrency(responseMock.BTC.high / responseMock.USD.high);
    const sale = toCurrency(responseMock.BTC.ask / responseMock.USD.ask);
    const buy = toCurrency(responseMock.BTC.bid / responseMock.USD.bid);


    expect(consoleStub).to.have.been.calledWith(`${
      chalk.hex('#B84BFF').bold('Bitcoin Converter')}${
      chalk.hex('#D697FF')(` | 1 BTC to ${chalk.underline.bold('USD')}:`)}\n\n${
      chalk.cyan.bold('LOW:')} ${chalk.yellow(`${low}`)}\n\n${
      chalk.cyan.bold('HIGH:')} ${chalk.yellow(`${high}`)}\n\n${
      chalk.cyan.bold('VARIANT:')} ${chalk.yellow(`${responseMock.BTC.pctChange}%`)}\n\n${
      chalk.cyan.bold('SALE:')} ${chalk.yellow(`${sale}`)}\n\n${
      chalk.cyan.bold('BUY:')} ${chalk.yellow(`${buy}`)}\n`);
  });

  it('Should use currency USD and 10 as amount', async () => {
    nock('https://economia.awesomeapi.com.br/').get('/json/all').reply(200, responseMock);

    await convertBTC('USD', 10);
    const toCurrency = value => parseFloat(value * 10).toFixed(3);
    const low = toCurrency(responseMock.BTC.low / responseMock.USD.low);
    const high = toCurrency(responseMock.BTC.high / responseMock.USD.high);
    const sale = toCurrency(responseMock.BTC.ask / responseMock.USD.ask);
    const buy = toCurrency(responseMock.BTC.bid / responseMock.USD.bid);

    expect(consoleStub).to.have.been.calledWith(`${
      chalk.hex('#B84BFF').bold('Bitcoin Converter')}${
      chalk.hex('#D697FF')(` | 10 BTC to ${chalk.underline.bold('USD')}:`)}\n\n${
      chalk.cyan.bold('LOW:')} ${chalk.yellow(`${low}`)}\n\n${
      chalk.cyan.bold('HIGH:')} ${chalk.yellow(`${high}`)}\n\n${
      chalk.cyan.bold('VARIANT:')} ${chalk.yellow(`${responseMock.BTC.pctChange}%`)}\n\n${
      chalk.cyan.bold('SALE:')} ${chalk.yellow(`${sale}`)}\n\n${
      chalk.cyan.bold('BUY:')} ${chalk.yellow(`${buy}`)}\n`);
  });

  it('Should use currency BRL and 10 as amount', async () => {
    nock('https://economia.awesomeapi.com.br/').get('/json/all').reply(200, responseMock);

    await convertBTC('BRL', 10);
    const toCurrency = value => parseFloat(value * 10).toFixed(3);
    const low = toCurrency(responseMock.BTC.low);
    const high = toCurrency(responseMock.BTC.high);
    const sale = toCurrency(responseMock.BTC.ask);
    const buy = toCurrency(responseMock.BTC.bid);

    expect(consoleStub).to.have.been.calledWith(`${
      chalk.hex('#B84BFF').bold('Bitcoin Converter')}${
      chalk.hex('#D697FF')(` | 10 BTC to ${chalk.underline.bold('BRL')}:`)}\n\n${
      chalk.cyan.bold('LOW:')} ${chalk.yellow(`${low}`)}\n\n${
      chalk.cyan.bold('HIGH:')} ${chalk.yellow(`${high}`)}\n\n${
      chalk.cyan.bold('VARIANT:')} ${chalk.yellow(`${responseMock.BTC.pctChange}%`)}\n\n${
      chalk.cyan.bold('SALE:')} ${chalk.yellow(`${sale}`)}\n\n${
      chalk.cyan.bold('BUY:')} ${chalk.yellow(`${buy}`)}\n`);
  });

  it('Should use currency BRL and 1 as amount default', async () => {
    nock('https://economia.awesomeapi.com.br/').get('/json/all').reply(200, responseMock);

    await convertBTC('BRL');
    const toCurrency = value => parseFloat(value).toFixed(3);
    const low = toCurrency(responseMock.BTC.low);
    const high = toCurrency(responseMock.BTC.high);
    const sale = toCurrency(responseMock.BTC.ask);
    const buy = toCurrency(responseMock.BTC.bid);

    expect(consoleStub).to.have.been.calledWith(`${
      chalk.hex('#B84BFF').bold('Bitcoin Converter')}${
      chalk.hex('#D697FF')(` | 1 BTC to ${chalk.underline.bold('BRL')}:`)}\n\n${
      chalk.cyan.bold('LOW:')} ${chalk.yellow(`${low}`)}\n\n${
      chalk.cyan.bold('HIGH:')} ${chalk.yellow(`${high}`)}\n\n${
      chalk.cyan.bold('VARIANT:')} ${chalk.yellow(`${responseMock.BTC.pctChange}%`)}\n\n${
      chalk.cyan.bold('SALE:')} ${chalk.yellow(`${sale}`)}\n\n${
      chalk.cyan.bold('BUY:')} ${chalk.yellow(`${buy}`)}\n`);
  });

  it('Should message user when api reply with error', async () => {
    nock('https://economia.awesomeapi.com.br/').get('/json/all').replyWithError('Error');

    await convertBTC();

    expect(consoleStub).to.have.been.calledWith(
      chalk.red('Something went wrong in the API. Try in a few minutes.'),
    );
  });
});
