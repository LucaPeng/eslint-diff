## eslint-diff

提供基于 git diff 进行`行粒度`的 eslint 检查，仅对修改部分进行检查。

## 安装 & 使用

安装
``` 
  yarn add eslint-diff
  // npm install eslint-diff
```

使用
```
  const eslintDiff = require('eslint-diff');
  // result 格式和 eslint.CLIEngine.lintReport 一致
  const result = eslintDiff.check({
    path: process.cwd(),
    level: eslintInit.CheckLevel.ERROR,
  });
  // 格式化结果
  console.log(eslintDiff.format(result));
```

### 命令行工具

提供简单的命令行工具。

### 全局使用

安装,
```
  npm install eslint-diff -g
```

使用:
```
  eslint-diff --warning --path src/lib
```

## 结合 npm package.json 使用

安装,
```
  npm install eslint-diff -save-dev
```

配置 package.json:
```
  scripts: {
    "eslint": "eslint-diff --error"
  }
```

然后在 Teminal 下执行 `npm run eslint` 。