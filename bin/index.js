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
  .description('Launch an API Server to serve a JSON, JS file or faker data with HTTPS support.')
  .option('-c, --cert <certFile>', 'HTTPS cert file', collect, '')
  .option('-k, --key <keyFile>', 'HTTPS key file', collect, '')
  .option('-p, --port <port>', 'Use custom port', collect, '')
  .option('-v, --version', 'Show version', ver, '')
  .option('-w, --watch', 'Watch for changes and reload (.json)', false)
  .action((file, options) => {
    if (!options) {
      if (process.argv.length === 2) {
        // user ran $ api-now without options or file => serve default dataset:
        require('../lib/server')({
          port: DEFAULT_PORT,
          file: ''
        });
        // program.help();
        return;
      }
    }
    let cmdOptions = options;
    if (file && typeof file.key === 'string') {
      // if user didn't provide [file] => "file" argument became "options" here:
      cmdOptions = file;
    }
    const opt = {
      port: parseInt(cmdOptions.port, 10) || DEFAULT_PORT,
      key: cmdOptions.key,
      cert: cmdOptions.cert,
      watch: cmdOptions.watch,
      file: typeof file === 'string' ? file : ''
    };
    require('../lib/server')(opt);
  })
  .parse(process.argv);
