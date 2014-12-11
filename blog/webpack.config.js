module.exports = {
  cache: true,
  entry: {
    main: './public/src/main.js'
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css-loader"},
      {test: /\.jsx?$/, loader: 'jsx-loader?harmony'},
      {test: /\.coffee$/, loader: 'coffee-loader'}
    ]
  }
};