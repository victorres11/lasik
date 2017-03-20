var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var sass        = require('gulp-sass');

gulp.task('build', function () {
    return browserify({entries: ['./app/app.jsx'],
                       extensions: ['.js', '.jsx'],
                       paths: ['./'],
                       debug: true})
        .transform("babelify", { presets: ["es2015", "react"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./app/**/*.jsx', ['build']);
});

gulp.task('default', ['build', 'watch']);
