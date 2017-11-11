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
            // AOT to es2015 (ES6)
            name: 'ts:ngc',
            operation: {
              type: 'execute',
              bin: 'node',
              args: ['node_modules/@angular/compiler-cli/src/main.js', '-p', 'src/tsconfig.lib.json'],
            }
          },
          {
            // es2015 module (ES6)
            name: 'rollup:es2015',
            // deps: ['ts:ngc'],
            operation: {
              type: 'rollup',
              rollupConfigFile: './rollup.config.lib.es2015.js',
              addMinified: false,
              sorcery: true,
            }
          },
          {
            name: 'ts:tsc:esm:input',
            // deps: ['rollup:es2015'],
            operation: {
              type: 'copyFile',
              src: `dist/${pkg.es2015}`,
              base: `dist/${pkg.es2015}`,
              out: `dist/${srcModulePath}`,
            }
          },
          {
            name: 'ts:tsc:esm:trans',
            // deps: ['ts:tsc:esm:input'],
            operation: {
              type: 'execute',
              bin: 'node',
              silent: true,
              options: {
                continue: true,
              },
              args: [
                'node_modules/typescript/lib/tsc.js', '--target', 'es5', '--module', 'es2015', '--noLib', '--sourceMap',
                `dist/${srcModulePath}`
              ],
            }
          },
          {
            name: 'ts:tsc:esm:sorcery',
            operation: {
              type: 'sorcery',
              file: `dist/${pkg.module}`,
            }
          },
          {
            name: 'ts:tsc:esm:cleanup',
            // deps: ['ts:tsc:esm:trans'],
            operation: {
              type: 'delete',
              src: `dist/${srcModulePath}`,
            }
          },
          {
            name: 'ts:tsc:esm',
            // deps: ['rollup:es2015'],
            operation: {
              type: 'sequence',
              sequence: ['ts:tsc:esm:input', 'ts:tsc:esm:trans', 'ts:tsc:esm:sorcery', 'ts:tsc:esm:cleanup'],
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
              sorcery: true,
            }
          },
          {
            name: 'rollup:lib',
            deps: ['ts:ngc'],
            operation: {
              type: 'sequence',
              sequence: ['rollup:es2015', 'ts:tsc:esm', 'rollup:main'],
            }
          },
          {
            name: 'ts:tsc:spec',
            operation: {
              type: 'typescript',
              tsConfigFile: 'src/tsconfig.spec.json',
            }
          },
          {name: 'build', deps: ['dist:files', 'ts:lint', 'rollup:lib']}, {
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
