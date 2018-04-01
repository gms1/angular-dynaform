const nodeResolve = require('rollup-plugin-node-resolve-angular');
const commonjs = require('rollup-plugin-commonjs');
const path = require('path');

const pkg = require('./package.json');
const globals = require('./rollup-globals.json');
const externals = require('./rollup-externals.json');
const alias = require('rollup-plugin-alias');
const rxjsPathMapping = require('rxjs/_esm5/path-mapping')();

const utc = new Date().toJSON();
const moduleName = 'adf.core';

if (!pkg.module || !pkg.es2015 || !pkg.main) {
  throw new Error(`property 'module' and/or 'es2015' and/or 'main' not defined in package.json`);
}

module.exports = {
  input: `dist/${pkg.module}`,
  output: {
    name: moduleName,
    file: `dist/${pkg.main}`,
    format: 'umd', globals,
    banner: `/*!\n${pkg.name} ${pkg.version} ${utc} \n*/`,
    sourcemap: true,
    exports: 'named',
  },

  external: Object.keys(externals),
  context: 'this',
  plugins: [
    alias(rxjsPathMapping),
    nodeResolve({es2015: false, jsnext: false, module: true, main: true}),
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
