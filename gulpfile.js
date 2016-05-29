
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsconfig = require('./tsconfig.json');
var rimraf = require('rimraf');

var tsProject = ts.createProject('./tsconfig.json', { typescript: require('typescript') });

gulp.task('clean', function (cb) {
	console.log('-------------- clean --------------');
  rimraf('./decorators', cb);
});

gulp.task('build', ['clean'], function () {

	console.log('-------------- tsc --------------');

	tsProject.src()
		.pipe(ts(tsProject))
		.pipe(gulp.dest('./'));

});