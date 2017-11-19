# publishing

## tasks

* bump the version for all packages (but not in the dependencies) and build the release

```shell
angular-dynaform (master)$ ./build/version-bump x.y.z
angular-dynaform (master)$ npm run release:build
```

* 'source-map-explorer packages/core/dist/index.js' should not show any dependency on packages in 'node_modules'
* test the systemjs examples (npm run start:systemjs) in the directory of the example packages
* test the bundled aot examples
* update changelog
* git commit and push all changes
* npm publish from dist folder for each package

```shell
angular-dynaform (master)$ ./build/publish
```

* update plunkr
