## eslint-diff

Provide eslint check based on line-level git diff. It's better to work with husky or precommit-eslint.

[chinese_version](./README_ZH.md)

## Installation & Usage

install
``` 
  yarn add eslint-diff
  // npm install eslint-diff
```

use
```
  const eslintDiff = require('eslint-diff');
  // result is instanceof eslint.CLIEngine.lintReport
  const result = eslintDiff.check({
    path: process.cwd(),
    level: eslintDiff.CheckLevel.ERROR,
  });
  // format
  console.log(eslintDiff.format(result));
```

### CLI

we provide simple cli tool for u. 

### use globally,

install,
```
  npm install eslint-diff -g
```

use:
```
  eslint-diff --warning --path src/lib
```

## work with npm package.json

install,
```
  npm install eslint-diff -save-dev
```

config package.json:
```
  scripts: {
    "eslint": "eslint-diff --error"
  }
```

then, run `npm run eslint` in terminal.

use husky or precommit-eslint is better.