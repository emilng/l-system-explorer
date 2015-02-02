var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var es6ify = require('es6ify');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = ['./src/**/*.js', './src/**/*.jsx'];

var getBundleName = function () {
  // var version = require('./package.json').version;
  var name = require('./package.json').name;
  return name + '.' + 'min';
};

gulp.task('js', function() {
  // place code for your default task here
  var bundler = browserify({
    entries: ['./src/l-systems.jsx'],
    debug: true
  });

  var bundle = function() {
    bundler.transform(reactify);
    bundler.transform(es6ify.configure(/.jsx/));
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

gulp.task('default', ['watch','js']);
