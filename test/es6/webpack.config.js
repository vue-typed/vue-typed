var glob = require("glob");

module.exports = {
  entry: glob.sync('./test/es6/specs/**/*.*'),  
  output: {
    path: './test/es6',
    filename: 'test.build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src/,
        loader: 'babel',        
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-decorators-legacy'],
    // fix >100KB issue. see: http://stackoverflow.com/a/29857361/1586914
    compact: false
  }
}