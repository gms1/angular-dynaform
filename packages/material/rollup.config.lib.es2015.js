const nodeResolve = require('rollup-plugin-node-resolve-angular');
const commonjs = require('rollup-plugin-commonjs');
const path = require('path');

const pkg = require('./package.json');
const globals = require('./rollup-globals.json');
const externals = require('./rollup-externals.json');

const utc = new Date().toJSON();
const moduleName = 'bgnlr.buildGulpNgLibRollup';

if (!pkg.es2015) {
  throw new Error(`property 'es2015' not defined in package.json`);
}

module.exports = {
  input: 'dist/lib/index.js',
  output: {
    name: moduleName,
    file: `dist/${pkg.es2015}`,
    format: 'es', globals,
    banner: `/*!\n${pkg.name} ${pkg.version} ${utc} \n*/`,
    sourcemap: true,

  },
  external: Object.keys(externals),
  context: 'this',
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
