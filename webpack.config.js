var path = require('path');

module.exports = {
  cache: true,
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'jsx-loader?harmony'}
    ]
  }
};