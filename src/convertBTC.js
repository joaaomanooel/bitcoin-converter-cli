const chalk = require('chalk');
const request = require('request-promise-native');
const ora = require('ora');

const spinner = ora({ text: 'Retrieving Bitcoin data...', color: 'yellow' });

const PRICE_TYPES = { low: 'low', high: 'high', sale: 'ask', buy: 'bid' };

module.exports = (c = 'USD', amount = 1) => {
  const baseUrl = 'https://economia.awesomeapi.com.br/json/all';
  const currency = c.toUpperCase();
  spinner.start();

  const handleSuccess = (body) => {
    const coins = JSON.parse(body);
    const currentCoin = coins[currency];
    const toCurrency = value => parseFloat(value).toFixed(3);

    const getPrice = (type = PRICE_TYPES.high) => (currency === 'BRL'
      ? `${toCurrency(coins.BTC[type] * amount)}`
      : `${toCurrency((coins.BTC[type] / currentCoin[type]) * amount)}`);

    console.info(`${
      chalk.hex('#B84BFF').bold('Bitcoin Converter')}${
      chalk.hex('#D697FF')(` | ${amount} BTC to ${chalk.underline.bold(currency)}:`)}\n\n${
      chalk.cyan.bold('LOW:')} ${chalk.yellow(`${getPrice(PRICE_TYPES.low)}`)}\n\n${
      chalk.cyan.bold('HIGH:')} ${chalk.yellow(`${getPrice()}`)}\n\n${
      chalk.cyan.bold('VARIANT:')} ${chalk.yellow(`${coins.BTC.pctChange}%`)}\n\n${
      chalk.cyan.bold('SALE:')} ${chalk.yellow(`${getPrice(PRICE_TYPES.sale)}`)}\n\n${
      chalk.cyan.bold('BUY:')} ${chalk.yellow(`${getPrice(PRICE_TYPES.buy)}`)}\n`);
  };

  const handleError = (err) => {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    return err;
  };

  return request(baseUrl)
    .then(body => spinner.stop() && body)
    .then(handleSuccess)
    .catch(handleError);
};
