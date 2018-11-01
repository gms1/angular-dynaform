# publishing

## tasks

### prepare and publish npm packages

* update changelog
* bump the version for all packages and build the release

```shell
angular-dynaform (master)$ ./build/version-bump x.y.z
angular-dynaform (master)$ npm run release:build
```

* review generated bundles using e.g 'source-map-explorer dist/angular-dynaform/core/bundles/angular-dynaform-core.umd.js', which should not show any dependency on packages in 'node_modules'
* test the systemjs examples

```shell
angular-dynaform (master)$ npm run systemjs:basic-example
angular-dynaform (master)$ npm run systemjs:material-example
```

* test the aot examples (TODO: use e2e)

```shell
angular-dynaform (master)$ npm run start:basic-example
angular-dynaform (master)$ npm run start:material-example
```

* git commit and push

```shell
angular-dynaform (master)$ npm run release:publish
```

* update stackblitz example
