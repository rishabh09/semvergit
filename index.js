#!/usr/bin/env node
const readlineSync = require('readline-sync')
const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

let currentDir = process.cwd()

const packageJsonPath = currentDir + '/package.json'
const packageLockPath = currentDir + '/package-lock.json'

let updateTypes = ['patch', 'minor', 'major']

let index = readlineSync.keyInSelect(updateTypes, 'Choose Update type');
if(index === -1) {
  console.log('no update in package.json')
  process.exit(0);
}

shell.exec('npm version ' + updateTypes[index])
shell.exec('git add '+ packageJsonPath +' ' + packageLockPath)
console.log(updateTypes[index - 1] + ' update')