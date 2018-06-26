var glob = require('glob')
var path = require('path')
var outputPath = path.resolve(__dirname)

module.exports = {
  entry: glob.sync('./test/es6/specs/**/*.*'),
  output: {
    path: __dirname,
    filename: 'test.build.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-decorators-legacy'],
          compact: false
        },
        exclude: /node_modules|vue\/src/
      }
    ]
  }
}
