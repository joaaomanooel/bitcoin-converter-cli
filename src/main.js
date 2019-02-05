#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const convertBRT = require('./convertBTC');

program
  .version(pkg.version)
  .description('Convert Bitcoin to any currency defined')
  .option('-C, --currency <currency>', 'Curency to be convert. (Default: USD')
  .option('-A, --amount <amount>', 'Value in Bitcoin to be convert. (Default: 1')
  .parse(process.argv);

console.log(convertBRT(program.currency, program.amount));
