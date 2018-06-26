var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var gulp = require('gulp')
var gitbook = require('gitbook')
var path = require('path')
var del = require('del')

// path of your *.md book files
var rootPath = path.join(__dirname, 'docs')

// output path where generated *.html will be stored
var outputPath = path.join(rootPath, '_book')

// gulp.watch instance
var watcher

// rebuild book + start server
gulp.task('default', function(done) {
  rebuildBook(function() {
    browserSync.init({
      server: {
        baseDir: outputPath
      }
    })
    done()
  })
})

// kill watcher + remove/clean output dir + build book
function rebuildBook(done) {
  // pause watcher while building book progress
  if (watcher) {
    watcher.end()
    watcher = undefined
  }

  // ensure output path is not exists otherwise book won't generated
  return del(path.join(outputPath)).then(paths => {
    buildBook().then(function() {
      // start watcher after built
      startWatch()
        .on('ready', function() {
          done()
        })
        .on('error', function(e) {
          console.error('ERROR: watch error... $s', e)
        })
    })
  })
}

// build book
function buildBook() {
  var fs = gitbook.createNodeFS(rootPath)
  var book = gitbook.Book.createForFS(fs)
  var Parse = gitbook.Parse
  var Output = gitbook.Output
  var Generator = Output.getGenerator('website')

  return Parse.parseBook(book).then(function(resultBook) {
    return Output.generate(Generator, resultBook, {
      root: outputPath
    })
  })
}

// start watching md files + when files changed reload browser
function startWatch() {
  var rp = path.join(rootPath, '/**/*.md')
  watcher = gulp.watch([rp, '!' + rp + '/_book/'], function() {
    rebuildBook(reload)
  })
  return watcher
}
