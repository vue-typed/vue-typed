var glob = require("glob");

module.exports = {
  entry: glob.sync('./test/es6/specs/**/*.*'),  
  output: {
    filename: 'test.build.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015'], plugins: ['transform-decorators-legacy'], compact: false } }
    ]
  }
}