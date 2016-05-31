var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json', { typescript: require('typescript') });

gulp.task('build', function () {
	tsProject.src()
		.pipe(ts(tsProject))
		.pipe(gulp.dest('./'));

});