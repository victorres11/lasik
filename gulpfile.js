// requirements

var gulp = require('gulp'),
    gulpBrowser = require("gulp-browser"),
    reactify = require('reactify'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    size = require('gulp-size');

// tasks
gulp.task('transform', function () {
  var stream = gulp.src('./client/static/scripts/jsx/*.jsx')
	.pipe(gulpBrowser.browserify({transform: ['reactify']}))
	.pipe(gulp.dest('./client/static/scripts/js/'))
	.pipe(size());
    return stream;
});

gulp.task('del', function () {
  return del(['./client/static/scripts/js']);
});

//gulp.task('less', function() {
//  gulp.src('less/*.less')
//    .pipe(less())
//    .pipe(gulp.dest('css'))
//    .pipe(livereload());
//});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('default', ['del'], function() {
  gulp.start('transform');
  console.log("complete!");
});

gulp.task('watch', ['del'], function() {
  //gulp.start('transform');
  livereload.listen();
  gulp.watch('./client/static/scripts/jsx/*.jsx', ['transform']);
  console.log("complete!");
});
