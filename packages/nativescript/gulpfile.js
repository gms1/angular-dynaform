'use strict';

// TODO:
//   assets
//   scss => css
//   inline-templates
//   e2e: protractor

const rootDir = __dirname;
const outDir = './dist';
const pkg = require('./package.json');
const helpers = require('./build/gulp/helpers');
const path = require('path');

function config(target /* 'production' or 'development' */) {
  let tmpDirs = ['./tmp'];

  let cleanGlobs = [];
  tmpDirs.forEach((value) => cleanGlobs.push(`${value}/**/*`));
  cleanGlobs.push(`${outDir}/**/*`);

  if (!pkg.main) {
    throw new Error(`property 'main' not defined in package.json`);
  }

  return {
    rootDir, outDir,

        tasks: [
          {
            name: 'dist:packageJson',
            operation: {
              type: 'jsonTransform',
              src: 'package.json',
              transform: (data, file) => {
                delete data.scripts;
                delete data.devDependencies;
                helpers.moveDependencies(data, 'dependencies', 'peerDependencies');
                helpers.updatePackageVersions(data, pkg.name, pkg.version);
                return data;
              },
              whitespace: 2

            }
          },
          {
            name: 'dist:copyFiles',
            operation: {
              type: 'copyFile',
              src: '{README.md,LICENSE,.npmignore}',
            }
          },
          {
            name: 'dist:files',
            deps: ['dist:packageJson', 'dist:copyFiles'],
          },
          {
            name: 'ts:lint',
            operation: {
              type: 'tslint',
              src: './src/**/*.ts',
              tsLintFile: 'tslint.json',
            }
          },
          {
            // dist/lib: AOT to es2015
            name: 'ts:ngc',
            operation: {
              type: 'execute',
              bin: 'node',
              args: ['node_modules/@angular/compiler-cli/src/main.js', '-p', 'src/tsconfig.lib.json'],
            }
          },
          {
            name: 'ts:tsc:spec',
            operation: {
              type: 'typescript',
              tsConfigFile: 'src/tsconfig.spec.json',
            }
          },
          {name: 'build', deps: ['dist:files', 'ts:lint', 'ts:ngc']}, {
            name: 'watch',
            watch: ['./src/**/*.*'],
          },
          {
            name: 'clean',
            operation: {
              type: 'delete',
              src: cleanGlobs,
            }
          },
          {
            name: 'test',
            deps: [],
            operation: {
              type: 'karma',
              karmaConfigFile: './karma.conf.js',
            }
          }
        ]
  }
}


// run:
require('./build/gulp/index').run(config, __dirname);
