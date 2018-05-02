#!/usr/bin/env node --harmony

const params = process.argv.slice(2);
let index = 0;
const eslintDiff = require('../scripts/index');

let checkLevel = eslintDiff.CheckLevel.ALL;
let path;

var checkLevelMap = {
  '--warning': eslintDiff.CheckLevel.WARNING,
  '--error': eslintDiff.CheckLevel.ERROR,
};

for(;index < params.length; index++) {
  var param = params[index];
  if (param === '--path') {
    if (params[index + 1]) {
      path = params[index + 1];
      index++;
    }
  } else if(checkLevelMap[param]) {
    checkLevel = checkLevelMap[param];
  }
}

const report = eslintDiff.check({
  path,
  level: checkLevel,
});
// console.log(report)
console.log(eslintDiff.format(report));