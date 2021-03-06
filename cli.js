#!/usr/bin/env node

'use strict';

var stdin = require('get-stdin'),
  pkg = require('./package.json'),
  rastreiojs = require('./index');

var argv = require('minimist')(process.argv.slice(2));

var input = argv._;

function help() {
  console.log([
    pkg.description,
    '',
    'Uso:',
    '  $ rastreiojs <arg> <arg> ... [--resultado <resultado>] [--parse <parse>]',
    '',
    'Exemplo:',
    '  $ rastreiojs AA123456789BB --parse xml',
    '  $ rastreiojs AA123456789BB CC123456789DD --parse json',
    '  $ cat rastreios.txt | rastreiojs'
	].join('\n'));
}

function init(objs) {
  rastreiojs(objs, {resultado: argv.resultado, parse: argv.parse})
  .then(function(data){
    console.log(data.toUpperCase());
  }, function(err){
    console.error(err);
  });

}

if (argv.help) {
  help();
  return;
}

if (argv.version) {
  console.log(pkg.version);
  return;
}

if (process.stdin.isTTY) {
  if (input.length === 0) {
    help();
    return;
  }

  init(input);
} else {
  stdin(function (data) {
    init(data.trim().split('\n'));
  });
}
