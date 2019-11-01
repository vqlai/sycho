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
    'eol-last': 0,
    'no-trailing-spaces': 0,
    'no-return-await': 0,
    // 'object-curly-spacing': 0,
    'arrow-spacing': 0,
    'space-before-function-paren': 0,
    'standard/object-curly-even-spacing': 0,
    'indent': 0,
    'eqeqeq': 0,
    'keyword-spacing': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
