module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.dev.js'
      }
    }
  }
}
