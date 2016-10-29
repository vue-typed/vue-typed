var glob = require('glob')

module.exports = {
  entry: glob.sync('./test/common/specs/**/*.*'),
  output: {
    path: './test/common',
    filename: 'test.build.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: 'ts'
      }
    ]
  }
}
