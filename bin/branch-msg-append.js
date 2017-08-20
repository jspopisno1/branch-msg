#!/usr/bin/env node

console.log('hello append');

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});