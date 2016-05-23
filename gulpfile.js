const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babelify = require('babelify');

const paths = ['./src/**/*.jsx', './src/**/*.js'];

const getBundleName = () => {
  const name = require('./package.json').name;
  return name + '.' + 'min';
};

gulp.task('js', () => {
  const bundle = function bundle() {
    browserify({
      entries: ['./src/l-systems.jsx'],
      debug: true,
    })
      .transform(babelify)
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };
  return bundle();
});

gulp.task('watch', () => {
  gulp.watch(paths, ['js']);
});

gulp.task('default', ['watch', 'js']);
