#!/usr/bin/env node

var sp = require('shell-promise');
var fs = require('fs');

var commitMsgTempFile = process.argv[process.argv.length - 1];
var commitMsg = fs.readFileSync(commitMsgTempFile, 'utf8');

sp('git rev-parse --abbrev-ref HEAD')
    .then(function (branchName) {
        branchName = branchName.replace(/^\s+/, '')
            .replace(/\s+$/, '');
        fs.writeFileSync(commitMsgTempFile, commitMsg + '\n\nbranch at : #[ ' + branchName + ' ]#');
    });