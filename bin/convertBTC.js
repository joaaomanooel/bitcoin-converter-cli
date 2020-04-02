"use strict";

var chalk = require('chalk');

var request = require('request-promise-native');

var ora = require('ora');

var spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow'
});
var PRICE_TYPES = {
  low: 'low',
  high: 'high'
};

module.exports = function () {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var baseUrl = 'https://economia.awesomeapi.com.br/json/all';
  var currency = c.toUpperCase();
  spinner.start();

  var handleSuccess = function handleSuccess(body) {
    var coins = JSON.parse(body);

    var getPrice = function getPrice() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PRICE_TYPES.high;
      return currency === 'BRL' ? "".concat(parseFloat(coins.BTC[type] * amount).toFixed(3)) : "".concat(parseFloat(coins.BTC[type] / coins[currency][type] * amount).toFixed(3));
    };

    console.info("\n".concat(chalk.underline.bold('Bitcoin Converter'), "\n  ").concat(chalk("".concat(amount, " BTC to ").concat(currency, ":")), "\n    - ").concat(chalk.hex('#49A695')("HIHG: ".concat(getPrice())), "\n    - ").concat(chalk.hex('#D9725B')("LOW: ".concat(getPrice(PRICE_TYPES.low))), "\n    - ").concat(chalk.hex('#F2CD88')("VARIANT: ".concat(coins.BTC.pctChange, "%")), "\n    - ").concat(chalk.hex('#F2A679')("SALE: ".concat(parseFloat(coins.BTC.ask / coins[currency].ask).toFixed(3))), "\n    - ").concat(chalk.hex('#BF6991')("BUY: ".concat(parseFloat(coins.BTC.bid / coins[currency].bid).toFixed(3))), "\n"));
  };

  var handleError = function handleError(err) {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    return err;
  };

  return request(baseUrl).then(function (body) {
    return spinner.stop() && body;
  }).then(handleSuccess)["catch"](handleError);
};