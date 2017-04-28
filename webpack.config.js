const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'bundle.css',
  disable: false,
  allChunks: true
})

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ExtractTextPluginConfig.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, ExtractTextPluginConfig]
}
