var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var sass        = require('gulp-sass');

gulp.task('jsx', function () {
    return browserify({entries: ['./app/app.jsx'],
                       extensions: ['.js', '.jsx'],
                       paths: ['./'],
                       debug: true})
        .transform("babelify", { presets: ["es2015", "react"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch:jsx', ['jsx'], function () {
    gulp.watch('./app/**/*.jsx', ['build']);

});

gulp.task('watch:scss', ['styles'], function () {
    gulp.watch('./app/**/*.scss', ['styles']);
});


gulp.task('styles', function(){
  return gulp.src('app/styles/main.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/'))
});

gulp.task('build', ['jsx', 'styles']);

gulp.task('default', ['jsx', 'watch:scss', 'watch:jsx', 'styles']);
