// Karma configuration
// Generated on Sat May 28 2016 08:32:52 GMT+0700 (SE Asia Standard Time)
var glob = require("glob");


module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      './specs/**/*.ts',
      './specs/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/**/*.ts': ['webpack'],
      'specs/**/*.js': ['webpack']
    },
    
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    },

    webpack: {
      module: {
        resolve: {
          extensions: [".js", ".ts"]
        },
        loaders: [
          {
            test: /\.ts$/,
            loader: 'babel?presets[]=es2015!ts'
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
    },

    webpackMiddleware: {
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      },
    },


    plugins: [
      'karma-webpack', 
      // 'karma-coverage', 
      'karma-mocha', 
      'karma-phantomjs-launcher', 
      // 'karma-babel-preprocessor',
      'karma-mocha-reporter'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],
    
    // coverageReporter : {
    //   dir : 'coverage/',
    //   reporters : [
    //     {type : 'text-summary'},
    //     {type : 'html'}
    //   ]
    // },
    
    // mochaReporter: {
    //   colors: {
    //     success: 'bgGreen',
    //     info: 'cyan',
    //     warning: 'bgBlue',
    //     error: 'bgRed'
    //   }
    // },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity


  })
}
