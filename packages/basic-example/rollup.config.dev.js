const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve-angular');
const commonjs = require('rollup-plugin-commonjs');

const pkg = require('./package.json');
const globals = require('./rollup-globals.json');

if (!pkg.main) {
  throw new Error(`property 'main' not defined in package.json`);
}


module.exports = {
  input: 'tmp/jit/main.jit.js',
  output: {
    file: `dist/${pkg.main}`,
    format: 'iife', globals,
    sourcemap: true,
  },

  plugins: [
    nodeResolve({es2015: true, module: true, jsnext: true, main: true}),
    commonjs({include: 'node_modules/**'}),
  ],

  onwarn: function(warning) {
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  }
}
