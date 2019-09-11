#!/usr/bin/env node

const program = require('commander');
const ver = require('../lib/ver');

function collect(value, previous) {
  return previous.concat([value]);
}

program
  .usage('[options] <file>')
  .description('Launch an API Server to serve data from a JSON or JS file.')
  .option('-v, --version', 'show version', ver, '')
  .option('-p, --port <port>', 'use custom port', collect, '')
  .option('-k, --key <keyFile>', 'HTTPS key file', collect, '')
  .option('-c, --cert <certFile>', 'HTTPS cert file', collect, '')
  .action((file, options) => {
    if (!options) {
      program.help();
      return;
    }
    const opt = {
      port: options.port || 3003,
      key: options.key,
      cert: options.cert,
      file
    };
    require('../lib/server')(opt);
  })
  .parse(process.argv);
