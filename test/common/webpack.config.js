var glob = require("glob");
var merge = require('webpack-merge');
var base = require('../webpack.config.js');


module.exports = merge(base, {
  
  entry: glob.sync('./test/common/specs/**/*.*'),
  
  output: {
    path: './test/common',
    filename: 'test.build.js'
  }
  
});