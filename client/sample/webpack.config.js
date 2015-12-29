module.exports = {
  entry: './assignment-src/random.js',
  output: {
    filename: './assignment-dist/random.js'
  },
  devtool: 'inline-source-map',
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
