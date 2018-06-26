var path = require('path')
var webpack = require('webpack')

var pkg = require('./package.json')
var version = process.env.VERSION || pkg.version

var banner = `${pkg.name} ${version}
${pkg.description}
${pkg.homepage}
  
Copyright 2016-${new Date().getFullYear()}, ${pkg.author.name}
Released under the ${pkg.license} license.`

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: {
    vue: 'vue',
    chai: 'chai'
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.BannerPlugin(banner)
  ],
  target: 'node'
}
