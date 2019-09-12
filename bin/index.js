#!/usr/bin/env node

const path = require('path');
const program = require('commander');

const ver = require('../lib/ver');

const DEFAULT_PORT = 3003;

function collect(value, previous) {
  return previous.concat([value]);
}

program
  .usage('[options] [file]')
  .description('Launch an API Server to serve data from a JSON or JS file.')
  .option('-c, --cert <certFile>', 'HTTPS cert file', collect, '')
  .option('-k, --key <keyFile>', 'HTTPS key file', collect, '')
  .option('-p, --port <port>', 'Use custom port', collect, '')
  .option('-v, --version', 'Show version', ver, '')
  .option('-w, --watch', 'Watch for changes and reload (.json)', false)
  .action((file, options) => {
    if (!options) {
      if (process.argv.length === 2) {
        require('../lib/server')({
          port: DEFAULT_PORT,
          file: ''
        });
      }
      // program.help();
      return;
    }
    const opt = {
      port: options.port || DEFAULT_PORT,
      key: options.key,
      cert: options.cert,
      watch: options.watch,
      file
    };
    require('../lib/server')(opt);
  })
  .parse(process.argv);
