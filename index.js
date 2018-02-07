#!/usr/bin/env node

const fs = require('fs')
const semver = require('semver')
const readlineSync = require('readline-sync')


process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  process.exit();
});
    
const packageJsonPath = process.cwd() + '/package.json'
let updateTypes = ['patch', 'minor', 'major']

let index = readlineSync.keyInSelect(updateTypes, 'Choose Update type');
if(index === -1) {
  process.exit(0);
}
let data = fs.readFileSync(packageJsonPath, 'utf8')
let jsonData = JSON.parse(data)
let version = semver.inc(jsonData.version, updateTypes[index])
jsonData.version = version
fs.writeFileSync(packageJsonPath, JSON.stringify(jsonData, null, 2))
console.log(updateTypes[index] + ' update version '+ version)