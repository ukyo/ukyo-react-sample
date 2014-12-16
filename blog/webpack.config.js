module.exports = {
  cache: true,
  entry: {
    main: './public/src/main.jsx'
  },
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css-loader"},
      {test: /\.jsx?$/, loader: 'jsx-loader?harmony'},
      {test: /\.coffee$/, loader: 'coffee-loader'}
    ]
  }
};