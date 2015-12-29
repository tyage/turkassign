module.exports = {
  entry: './assignment-src/random.js',
  output: {
    filename: './assignment-dist/random.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
