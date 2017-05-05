const {join} = require('path')
const ExtractText = require('extract-text-webpack-plugin')
const setup = require('./setup')

const dist = join(__dirname, '../dist')
const exclude = /node_modules/

module.exports = env => {
  const isProd = env && env.production

  return {
    entry: {
      app: [
        './src/index.js'
      ],
      vendor: [
        'babel-polyfill',
        'whatwg-fetch',
        './src/dependencies/twttr.js',
        'moment',
        'react',
        'react-dom',
        'react-router',
        'react-chartjs-2'
      ]
    },
    output: {
      path: dist,
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: exclude,
        loader: 'babel-loader'
      }, {
        test: /\.scss$/,
        loader: isProd
          ? ExtractText.extract({
            fallback: 'style-loader',
            loader: 'css-loader!postcss-loader!sass-loader'
          })
          : 'style-loader!css-loader!postcss-loader!sass-loader'
      }]
    },
    plugins: setup(isProd),
    devtool: !isProd && 'eval',
    devServer: {
      contentBase: dist,
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      compress: isProd,
      inline: !isProd,
      hot: !isProd
    }
  }
}
