module.exports = {
  
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts', 
        
        // resolve: https://github.com/chaijs/chai/issues/384
        exclude: /node_modules/
        
      },
      {
        test: /\.js$/,
        loader: 'babel?plugins[]=transform-decorators-legacy',
        
        // resolve: https://github.com/chaijs/chai/issues/384
        exclude: /node_modules/
      }
    ]
  },

  babel: {
    presets: ['es2015'],
    
    // fix >100KB issue. see: http://stackoverflow.com/a/29857361/1586914
    compact: false
  }
	
};