#!/usr/bin/env node
"use strict";

var program = require('commander');

var pkg = require('../package.json');

var convertBRT = require('./convertBTC');

program.version(pkg.version).description('Convert Bitcoin to any currency defined').option('-C, --currency <currency>', 'Curency to be convert. (Default: USD').option('-A, --amount <amount>', 'Value in Bitcoin to be convert. (Default: 1').parse(process.argv);
convertBRT(program.currency, program.amount);