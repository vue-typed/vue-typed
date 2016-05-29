
module.exports = {
  entry: ['./test/test.js', './test/test.ts' ],
  output: {
    path: './test',
    filename: 'test.build.js'
  },
  module: {	
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|src)/,
        loader: 'babel',
				query: {
          presets: ['es2015'],
          plugins: ["transform-decorators-legacy"]
        }
      }
    ]
  }
}