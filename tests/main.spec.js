/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { exec } = require('child_process');
const pkg = require('../package.json');

const btcConverter = './src/main.js';

describe('Main CLI', () => {
  it('Should return version of bitcoin-converter', (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.eql(pkg.version);
      done();
    });
  });

  it('Should return the description when bitcoin-converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('Convert Bitcoin to any currency defined')).to.be.true;
      done();
    });
  });

  it('Should return the currency options when bitcoin-converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--currency')).to.be.true;
      done();
    });
  });

  it('Should return the amount options when bitcoin-converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--amount')).to.be.true;
      done();
    });
  });
});
