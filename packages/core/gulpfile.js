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
          {
            name: 'ts:lint:ng',
            operation: {
              type: 'tslint',
              src: './src/**/*.ts',
              tsLintFile: 'tslint.ng.json'
            }
          },
          {
            name: 'ts:lint:all',
            operation: {
              type: 'sequence',
              sequence: ['ts:lint:full', 'ts:lint:ng'],
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
            // dist/${packageJson.es2015} ESM+ES2015 (FESM15)
            name: 'rollup:es2015',
            // deps: ['ts:ngc'],
            operation: {
              type: 'rollup',
              rollupConfigFile: './rollup.config.lib.es2015.js',
              addMinified: false,
            }
          },
          {
            name: 'ts:tsc:esm:input',
            // deps: ['rollup:es2015'],
            operation: {
              type: 'copyFile',
              src: `dist/${pkg.es2015}`,
              base: `dist/${pkg.es2015}`,
              out: `dist/${srcModulePath}`,  // TODO: delete temporary file
            }
          },
          {
            // dist/${packageJson.module} ESM+ES5 (FESM5)
            name: 'ts:tsc:esm',
            // deps: ['ts:tsc:esm:input'],
            operation: {
              type: 'execute',
              bin: 'node',
              silent: true,
              options: {continue: true},
              args: [
                'node_modules/typescript/lib/tsc.js', '--target', 'es5', '--module', 'es2015', '--noLib', '--sourceMap',
                `dist/${srcModulePath}`
              ],
            }
          },
          {
            // main / umd module (ES5)
            name: 'rollup:main',
            // deps: ['ts:tsc:esm'],
            operation: {
              type: 'rollup',
              rollupConfigFile: './rollup.config.lib.umd.js',
              addMinified: false,
            }
          },
          {
            name: 'rollup:lib',
            deps: ['ts:ngc'],
            operation: {
              type: 'sequence',
              sequence: ['rollup:es2015', 'ts:tsc:esm:input', 'ts:tsc:esm', 'rollup:main'],
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
              karmaConfigFile: './karma.conf.js',
            }
          }
        ]
  }
}


// run:
require('./build/gulp/index').run(config, __dirname);
