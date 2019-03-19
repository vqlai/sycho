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
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
