const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = __dirname;

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'public/index.html'),
    }),
  ],
  module: {
    rules: [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
     {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: 'file-loader',
      }
    ]
  }, 
};