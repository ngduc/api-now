#!/usr/bin/env node

const program = require('commander');
const ver = require('../lib/ver');

program.option('-v, --version', 'show version', ver, '')
program.parse(process.argv);