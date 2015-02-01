var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = ['./src/*.js', './src/*.jsx'];

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
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
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
