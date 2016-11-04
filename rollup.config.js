import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
var pkg = require('./package.json')
var version = process.env.VERSION || pkg.version

var banner = `/**
  * ${pkg.name} ${version}
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
  plugins: [
    typescript({ typescript: require('typescript') }),
    babel({ 'presets': [['es2015', {'modules': false}]] })
  ],
  banner: banner,
  globals: {
    'vue': 'Vue'
  }
}
