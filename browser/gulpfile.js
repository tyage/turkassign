var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var config = {
  src: 'src',
  dist: 'lib'
};

gulp.task('js', function() {
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .on('error', function(e) {
      gutil.log(gutil.colors.red(e));
      this.emit('end');
    })
    .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
  gulp.watch(config.src + '/js/**', ['js']);
});

gulp.task('default', ['js'], function() {
});
