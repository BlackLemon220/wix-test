const path = require('path');

module.exports = {
  entry: [
    './js/main.js',
  ],
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
