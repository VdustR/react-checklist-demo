module.exports = {
  extends: 'standard',
  env: {
    node: 'true',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.dev.js'
      }
    }
  }
}
