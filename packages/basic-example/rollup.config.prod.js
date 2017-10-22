const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve-angular');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

const pkg = require('./package.json');
const externalGlobals = require('./rollup-external-globals.json');

module.exports = {
  input: 'tmp/aot/src/main.aot.js',
  output: {
    file: `dist/${pkg.main}`,
    format: 'iife',
    globals: externalGlobals,
    sourcemap: true,
  },
  plugins: [
    nodeResolve({es2015: true, jsnext: true, module: true, main: true}),
    commonjs({include: 'node_modules/**'}),
  ],
  treeshake: true,

  onwarn: function(warning) {
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  }
}
