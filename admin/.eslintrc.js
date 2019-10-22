module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "//": "关闭HTML void元素上自动关闭",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "eol-last": "off",
    "comma-dangle": "off",
    "no-console": 0,
    "//": "关闭函数名与后面括号间必须空格规则",
    "space-before-function-paren": 0,
    "keyword-spacing": 0,
    "space-before-blocks": 0,
    "indent": 0,
    "no-return-await": 0,
    "standard/no-callback-literal": 0,
    'eqeqeq': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
