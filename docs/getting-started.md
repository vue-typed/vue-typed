# Getting Started

## Module Loaders

Since we're dealing with the [decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md) 
then we need to [desugar/transform](https://github.com/wycats/javascript-decorators/blob/master/README.md#desugaring)
our code that browsers can read it.


## Javascript ES6

You will need babel with preset `es2015` and `transform-decorators-legacy` plugin.
Here's the loader configuration if you go with `webpack`:

```javascript
...
module: {
	loaders: [
		{ 
			test: /\.js$/, 
			loader: 'babel', 
			query: { 
				presets: ['es2015'], 
				plugins: ['transform-decorators-legacy']} 
		},
		...
```

> Clone full example code [here](https://github.com/vue-typed/vue-typed-examples/tree/master/vue-typed-es6-webpack-example).

## Typescript

Only required single module loader to work with `Typescript 2.0`. It's a [ts-loader](https://github.com/TypeStrong/ts-loader).

```javascript
...
	loaders: [
		{ test: /\.ts(x?)$/, loader: 'ts' },
		...
```

> Clone full example [here](https://github.com/vue-typed/vue-typed-examples/tree/master/vue-typed-ts-webpack-example).

Unless you want to support minification in your code that using [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin),
then you'll need `babel` loader with preset `es2015`. 

To learn more detail about this you can start creating application using [vue-typed-boilerplate](https://github.com/vue-typed/vue-typed-boilerplate) and see the generated `webpack.config.js` file.