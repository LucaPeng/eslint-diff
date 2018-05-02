//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: [
    'eslint-config-mfe/eslintrc.node.js',
    'eslint-config-mfe/eslintrc.typescript-node.js'
  ],
  rules: {
    indent: [2, 2, {SwitchCase: 1}],
    'operator-assignment': 0,
    'no-plusplus': 0
  }
}