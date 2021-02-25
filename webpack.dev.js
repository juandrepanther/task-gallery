const path = require('path');
const fs = require('fs');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const ROOT = __dirname;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './build',
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(ROOT, 'build'),
  },
});