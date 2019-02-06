"use strict";

var chalk = require('chalk');

var request = require('request-promise-native');

var ora = require('ora');

var spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow'
});

module.exports = function () {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var url = "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=".concat(currency, "&amount=").concat(amount);
  spinner.start();
  return request(url).then(function (body) {
    spinner.stop();
    return body;
  }).then(function (body) {
    var apiResponse = JSON.parse(body);
    console.info("".concat(chalk.red(amount), " BTC to ").concat(chalk.cyan(currency), " = ").concat(chalk.yellow(apiResponse.price)));
  }).catch(function (err) {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    return err;
  });
};