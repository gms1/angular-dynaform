# publishing

## tasks

* update changelog
* bump the version for all packages and build the release

```shell
angular-dynaform (master)$ ./build/version-bump x.y.z
angular-dynaform (master)$ npm run release:build
```

* review generated bundles using 'source-map-explorer dist/path/to/js', which should not show any dependency on packages in 'node_modules'
* test the systemjs examples (npm run systemjs:basic-example; npm run systemjs:material-example)
* git commit and push

```shell
angular-dynaform (master)$ npm run release:publish
```

* build and publish plunkers using the newly released npm packages

```shell
angular-dynaform (master)$ npm run plunker:build
angular-dynaform (master)$ npm run plunker:publish
```
