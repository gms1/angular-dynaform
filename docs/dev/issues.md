# issues in third party libs/tools

## rollup

* issue resolving dependencies of symlinked packages:
  [94](https://github.com/rollup/rollup-plugin-node-resolve/issues/94)
  [100](https://github.com/rollup/rollup-plugin-node-resolve/issues/100)

  * workaround: changed 'rollup-plugin-node-resolve' to 'rollup-plugin-node-resolve-angular' but had to disable uglify(), because I got "Unexpected token" error


## angular

* @angular/cli 1.6.4 build failed:

ERROR in chunk main [initial]
[name].[chunkhash:20].bundle.js
Cannot read property 'range' of null
TypeError: Cannot read property 'range' of null
    at enterNode (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:146:15)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:125:24)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:134:24)
    at enterNode (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:149:18)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:138:25)
    at enterNode (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:149:18)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:125:24)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:134:24)
    at enterNode (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:149:18)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:125:24)
    at getPathInAst (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:134:24)
    at info.moduleScope.variables.forEach.variable (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:536:23)
    at Array.forEach (<anonymous>)
    at modulesWithInfo.forEach.info (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:524:34)
    at Array.forEach (<anonymous>)
    at ConcatenatedModule.source (/home/gms/work/HOT/angular-dynaform/packages/basic-example/node_modules/webpack/lib/optimize/ConcatenatedModule.js:516:19)
ERROR: failed to build package 'basic-example'

  * workaround: disabled options: --prod and --build-optimizer

