import typescript from 'rollup-plugin-typescript';
var pkg = require('./package.json');

var banner = `/**
  * ${pkg.name} ${pkg.version}
  * ${pkg.description}
  * ${pkg.homepage}
  
  * Copyright 2016, ${pkg.author.name}
  * Released under the ${pkg.license} license.
  '*/`;

export default {
  entry: 'src/index.ts',
  format: 'amd',
  dest: 'index.js',
	moduleName: pkg.name,
	plugins: [
    typescript()
  ],
	banner:banner
};