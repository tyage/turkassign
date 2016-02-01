module.exports = {
  entry: './src/main-global.js',
  output: {
    filename: './lib/main-packed.js'
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
