## eslint-diff

Provide eslint check based on line-level git diff. It's better to work with husky or precommit-eslint.

## Installation & Usage

install
``` 
  yarn add eslint-diff
  // npm install eslint-diff
```

use
```
  const eslintDiff = require('eslint-diff');
  eslintDiff({
    path: process.cwd(),
    blockLevel: eslintInit.BlockLevel.ERROR,
  }).then(result => {
    // result = {
    //   errorCount: 20,
    //   warningCount: 10,
    //   fomattedInfo: '...'
    // }
  });
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
  eslint-diff --warning
```

## work with npm package.json

install,
```
  npm install eslint-diff -save-dev
```

config package.json:
```
  scripts: {
    "eslint-diff": "eslint-diff error"
  }
```

use husky or precommit-eslint is better.