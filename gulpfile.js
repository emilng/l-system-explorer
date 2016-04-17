var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

var paths = ['./src/**/*.jsx', './src/**/*.js'];

var getBundleName = function () {
  var name = require('./package.json').name;
  return name + '.' + 'min';
};

gulp.task('js', function() {
  var bundler = browserify({
    entries: ['./src/l-systems.jsx'],
    debug: true
  });

  var bundle = function() {
    bundler.transform(babelify);
    bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };
  return bundle();

});

gulp.task('watch', function() {
  gulp.watch(paths, ['js']);
});

gulp.task('default', ['watch', 'js']);
