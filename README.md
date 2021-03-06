# bitcoin-converter-cli  :moneybag:

[![Build Status](https://badgen.net/travis/joaaomanooel/bitcoin-converter-cli?icon=travis)](https://travis-ci.org/joaaomanooel/bitcoin-converter-cli) [![Known Vulnerabilities](https://snyk.io/test/github//joaaomanooel/bitcoin-converter-cli/badge.svg)](https://snyk.io/test/github/joaaomanooel/bitcoin-converter-cli) [![Coverage Status](https://coveralls.io/repos/github/joaaomanooel/bitcoin-converter-cli/badge.svg?branch=master)](https://coveralls.io/github/joaaomanooel/bitcoin-converter-cli?branch=master) [![codecov](https://codecov.io/gh/joaaomanooel/bitcoin-converter-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/joaaomanooel/bitcoin-converter-cli) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/bitcoin-converter-cli)](https://www.npmjs.com/package/bitcoin-converter-cli) [![npm](https://img.shields.io/npm/v/bitcoin-converter-cli)](https://www.npmjs.com/package/bitcoin-converter-cli) [![npm downloads](https://badgen.net/npm/dm/bitcoin-converter-cli?color=blue)](https://www.npmjs.com/package/bitcoin-converter-cli) [![GitHub](https://img.shields.io/github/license/joaaomanooel/bitcoin-converter-cli)](LICENSE.md)

***
> A CLI to convert Bitcoin to any currency provided

### Installing

```sh
npm i -g bitcoin-converter-cli
```

### Use without installing

```sh
npx bitcoin-converter-cli
```

### How to use

```sh
bitcoin-converter-cli --help

  Usage: bitcoin-converter-cli [options]

  Convert Bitcoin to any currency defined

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -C, --currency <currency>  Currency to be converted. (Default: USD)
    -A, --amount <amount>      Value in Bitcoin to convert. (Default: 1)
```

<br />***Example***:

```sh
bitcoin-converter-cli -C USD -A 1

  Bitcoin Converter | 1 BTC to USD:

  LOW: 6507.631

  HIGH: 6879.524

  VARIANT: 3.59%

  SALE: 6733.566

  BUY: 6711.281
```

### Coins Code

- USD (Business Dollar)
- USDT (Tourism Dollar)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)
- EUR (Euro)
- GBP (British Pound)
- BRL (Brazilian Real)
- ARS (Argentine Peso)
- JPY (Japanese Yen)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- YLS (Israeli New Shekel)
- BTC (Bitcoin)
- LTC (Litecoin)
- ETH (Ethereum)
- XRP (Ripple)

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/joaaomanooel/bitcoin-converter-cli/tags).

### Authors

| ![João Manoel Neto](https://avatars2.githubusercontent.com/u/17843076?v=3&s=150)|
|:---------------------:|
|  [João Manoel Neto](https://github.com/joaaomanooel/)   |

See also the list of [contributors](https://github.com/joaaomanooel/bitcoin-converter-cli/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
