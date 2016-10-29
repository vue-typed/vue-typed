var glob = require('glob')

module.exports = {
  entry: glob.sync('./test/common/specs/**/*.*'),
  output: {
    path: './test/common',
    filename: 'test.build.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    alias: {
      'vue-typed': '../../index.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: 'babel!ts'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-decorators-legacy']
  }
}
