import typescript from 'rollup-plugin-typescript'
var pkg = require('./package.json')

var banner = `/**
  * ${pkg.name} ${pkg.version}
  * ${pkg.description}
  * ${pkg.homepage}
  
  * Copyright 2016, ${pkg.author.name}
  * Released under the ${pkg.license} license.
  '*/`

export default {
  entry: 'src/index.ts',
  format: 'umd',
  dest: 'index.js',
  moduleName: 'VueTyped',
  plugins: [ typescript({
    typescript: require('typescript')
  }) ],
  banner: banner,
  globals: {
    'vue': 'Vue'
  }
}
