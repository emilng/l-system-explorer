L-System Explorer
=========

L-System Explorer is an interactive tool for exploring L-Systems which  consist of an alphabet of symbols and rules for transforming strings of symbols. The resulting symbol string maps to drawing instructions which can be used to generate plant and fractal imagery.

More information on L-Systems: http://en.wikipedia.org/wiki/L-system

### Features
- State stored in URL hash for portability
- Arrow key shortcuts with shift and option/alt modifiers for finer grain control
- Live updating of rendered output and state in URL

### Version
1.0.1

### Encoding Format
Let's take a look at how <a href="http://emilng.github.io/l-system-explorer/index.html#X/X:F-[[X]+X]+F[+FX]-X,F:FF/F,d4;+,a25;-,a-25;[,b0;],b1/6/x135,y638,a-76,i6,z100" target="_blank">a plant</a> gets encoded to get a feel for the encoding format:
```
X/X:F-[[X]+X]+F[+FX]-X,F:FF/F,d4;+,a25;-,a-25;[,b0;],b1/6/x135,y638,a-76,i6,z100
```

Each section is delimited by ```/``` so if we break the encoded plant into sections we get:
1. axiom: ```X```
2. rewrite rules: ```X:F-[[X]+X]+F[+FX]-X,F:FF```
3. drawing instructions: ```F,d4;+,a25;-,a-25;[,b0;],b1/6```
4. max iterations: ```6```
5. starting drawing values ```x135,y638,a-76,i6,z100```

#### 1. axiom
This is the starting symbol that we rewrite using the rewrite rules each iteration.
So we start with ```X``` which is rewritten to ```F-[[X]+X]+F[+FX]-X``` which is then rewritten to ```FF-[[F-[[X]+X]+F[+FX]-X]+F-[[X]+X]+F[+FX]-X]+FF[+FFF-[[X]+X]+F[+FX]-X]-F-[[X]+X]+F[+FX]-X``` and so on...

#### 2. rewrite rules
```X:F-[[X]+X]+F[+FX]-X,F:FF```
Rewrite rules are separated by comma so we can split this section into
1. ```X:F-[[X]+X]+F[+FX]-X```
2. ```F:FF```

The first character is the symbol and the ```:``` can be read as "is rewritten to".
So the above means:
1. ```X``` is rewritten to ```F-[[X]+X]+F[+FX]-X```
2. ```F``` is rewritten to ```FF```

#### 3. drawing instructions
```F,d4;+,a25;-,a-25;[,b0;],b1```
Each symbol can have its own set of drawing instructions.
Each set of drawing instructions is separated by ```;``` so we can split this section into
1. ```F,d4```
2. ```+,a25```
3. ```-,a-25```
4. ```[,b0```
5. ```],b1```

The first character is the symbol followed by a comma separated list of drawing instructions for the symbol.
Each drawing instruction is represented by a character followed by a value.
The possible drawing instructions are:
1. ```d``` draw line - has a value range of -20 to 20
2. ```a``` angle - has a value range of -360 to 360
3. ```b``` branch - the value can be 0 meaning start branch or 1 meaning end branch

#### 4. max iterations
This is the maximum number of times the rewrite rules will be applied. This value exists for performance reasons. This can't be changed from the UI because eventually this setting should be automatically calculated from the growth rate of the symbol string.

#### 5. starting drawing values
```x135,y638,a-76,i6,z100```
Each set of drawing values is separated by comma into
1. ```x135``` - 135 pixels from the left
2. ```y638``` - 638 pixels from the top
3. ```a-76``` - -76 degrees
4. ```i6``` - apply the rewrite rules 6 times
5. ```z100``` - 100 percent zoom

### Tech
- react - view framework
- gulp - streaming build system
- browserify - node style modules in the browser
- reactify - browserify transforms for JSX files used by React
- gulp-sourcemaps - allows for original source to be referenced from minified code
- gulp-uglify - code minifier/compressor

### Development
Install npm packages
```
npm install
```

To build the source files and output them to the dist folder
```
npm run build
```

To serve L-System Explorer so that it's ready to use from http://localhost:4000
```
npm start
```

To run the tests
```
npm test
```

### License
MIT
