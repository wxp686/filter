var path = require('path')
var webpack = require('webpack')
const Jarvis = require("webpack-jarvis");
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: [/\.js$/],
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
}
module.exports.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new Jarvis({
    port: 1337
  })
]