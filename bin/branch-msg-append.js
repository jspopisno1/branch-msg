#!/usr/bin/env node

var sp = require('shell-promise');
var fs = require('fs');

var commitMsgTempFile = process.argv[process.argv.length - 1];
var commitMsg = fs.readFileSync(commitMsgTempFile, 'utf8');

sp('git branch')
    .then(function(result) {
        console.log(result, commitMsg);
    });

console.log('hello append');

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});