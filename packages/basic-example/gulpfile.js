'use strict';
const pkg = require('./package.json');

// TODO:
//   assets
//   scss => css
//   inline-templates
//   e2e: protractor


function config(target /* 'production' or 'development' */) {
  const outDir = './dist';
  var tmpDirs = ['./tmp', './src/aot'];
  var rollupConfigFile;
  var transpilerName;
  var transpiler;
  var tsConfigFile;

  if (!pkg.main) {
    throw new Error(`property 'main' not defined in package.json`);
  }

  if (target === 'production') {
    rollupConfigFile = 'rollup.config.prod.js';
    transpilerName = 'ngc';
    transpiler = 'node_modules/@angular/compiler-cli/src/main.js';
    tsConfigFile = 'src/tsconfig.app.prod.json';
  } else {
    rollupConfigFile = 'rollup.config.dev.js';
    transpilerName = 'tsc';
    transpiler = 'node_modules/typescript/lib/tsc.js';
    tsConfigFile = 'src/tsconfig.app.dev.json';
  }
  var taskAppTranspile = `ts:${transpilerName}`;

  var cleanGlobs = [];
  tmpDirs.forEach((value) => cleanGlobs.push(`${value}/**/*`));
  cleanGlobs.push(`${outDir}/**/*`);



  return {
    outDir,

        tasks: [
          {
            name: 'dist:index.html',
            operation: {type: 'copyFile', src: 'src/index.html', base: 'src'},
          },
          {
            name: 'dist:styles.css',
            operation: {type: 'copyFile', src: 'src/styles.css', base: 'src'},
          },
          {name: 'dist:files', deps: ['dist:index.html', 'dist:styles.css']},
          {name: taskAppTranspile, operation: {type: 'execute', bin: 'node', args: [transpiler, '-p', tsConfigFile]}}, ,
          {
            name: 'ts:lint',
            operation: {
              type: 'tslint',
              src: './src/**/*.ts',
              tsLintFile: 'tslint.json',
            }
          },
          {
            name: 'rollup:main',
            operation: {
              type: 'rollup',
              rollupConfigFile,
              addMinified: false  // main-bunlde is already uglified
            }
          },
          {
            name: 'rollup:app',
            deps: [taskAppTranspile],
            operation: {
              type: 'sequence',
              sequence: ['rollup:main'],
            }
          },
          {name: 'build', deps: ['dist:files', 'ts:lint', 'rollup:app']}, {
            name: 'watch',
            watch: ['./src/**/*.*'],
          },
          {
            name: 'clean',
            operation: {type: 'delete', src: cleanGlobs},
          }
        ]
  }
}


// run:
require('./build/gulp/index').run(config, __dirname);
