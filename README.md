L-System Explorer
=========

L-System Explorer is an interactive tool for exploring L-Systems which  consist of an alphabet of symbols and rules for transforming strings of symbols. The resulting symbol string maps to drawing instructions which can be used to generate plant and fractal imagery.

More information on L-Systems: http://en.wikipedia.org/wiki/L-system

### Features
- State stored in URL hash for portability
- Arrow key shortcuts with shift and option/alt modifiers for finer grain control
- Live updating of rendered output and state in URL

### Version
1.0.0

### Tech
- react - view framework
- gulp - streaming build system
- browserify - node style modules in the browser
- reactify - browserify transforms for JSX files used by React
- gulp-sourcemaps - allows for original source to be referenced from minified code
- gulp-uglify - code minifier/compressor

### Development
To build the source files and output them to the dist folder
```
npm run build
```

To serve L-System Explorer so that it's ready to use from http://localhost:4000
```
npm run server
```

### Todos
- write tests
- calculate iteration threshold based off of string growth rate

### License
MIT




