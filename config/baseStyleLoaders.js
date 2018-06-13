const autoprefixer = require('autoprefixer')

const baseStyleLoaders = [{
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  }
}, {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9' // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009'
      })
    ]
  }
}]

module.exports = baseStyleLoaders
