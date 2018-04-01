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

  if (!pkg.module) {
    throw new Error(`property 'module' not defined in package.json`);
    }

  let srcModulePath = pkg.module.replace(/\.js$/, '.ts');
  if (srcModulePath === pkg.module) {
    throw new Error(`property 'module' in package.json does not have a '.js' extension`);
    }

  var tsLintTask = target === 'production' ? 'ts:lint:all' : 'ts:lint';

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
            name: 'ts:lint:full',
            operation: {
              type: 'tslint',
              src: './src/**/*.ts',
              tsLintFile: 'tslint.full.json',
              typeChecking: true,
            }
          },
          {name: 'ts:lint:ng', operation: {type: 'tslint', src: './src/**/*.ts', tsLintFile: 'tslint.ng.json'}}, {
            name: 'ts:lint:all',
            operation: {
              type: 'sequence',
              sequence: ['ts:lint:full', 'ts:lint:ng'],
            }
          },
          {
            // dist/esm2015: AOT to ESM2015
            name: 'ts:ngc:esm2015',
            operation: {
              type: 'execute',
              bin: 'node',
              args: ['node_modules/@angular/compiler-cli/src/main.js', '-p', 'src/tsconfig.lib.esm2015.json'],
            }
          },
          {
            // dist/fesm2015: ESM2015 to FESM2015
            name: 'rollup:fesm2015',
            deps: ['ts:ngc:esm2015'],
            operation: {type: 'rollup', rollupConfigFile: './rollup.config.lib.esm2015.js', addMinified: false}
          },
          {
            // dist/esm5: AOT to ESM5
            name: 'ts:ngc:esm5',
            operation: {
              type: 'execute',
              bin: 'node',
              args: ['node_modules/@angular/compiler-cli/src/main.js', '-p', 'src/tsconfig.lib.esm5.json'],
            }
          },
          {
            // dist/fesm5: ESM5 to FESM5
            name: 'rollup:fesm5',
            deps: ['ts:ngc:esm5'],
            operation: {type: 'rollup', rollupConfigFile: './rollup.config.lib.esm5.js', addMinified: false}
          },

          {
            // main / umd module (ES5)
            name: 'rollup:main',
            // deps: ['ts:ngc:esm5'],
            operation: {type: 'rollup', rollupConfigFile: './rollup.config.lib.umd.js', addMinified: false}
          },
          {
            name: 'rollup:lib',
            deps: [],
            operation: {
              type: 'sequence',
              sequence: ['rollup:fesm2015', 'rollup:fesm5', 'rollup:main'],
            }
          },
          {
            name: 'ts:tsc:spec',
            operation: {
              type: 'typescript',
              tsConfigFile: 'src/tsconfig.spec.json',
            }
          },
          {name: 'build', deps: ['dist:files', tsLintTask, 'rollup:lib']}, {
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
              karmaConfigFile: './karma.conf.headless.js',
            }
          }
        ]
  }
}


// run:
require('./build/gulp/index').run(config, __dirname);
