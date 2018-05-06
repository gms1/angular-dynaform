# publishing

## tasks

### prepare and publish npm packages

* update changelog
* bump the version for all packages and build the release

```shell
angular-dynaform (master)$ ./build/version-bump x.y.z
angular-dynaform (master)$ npm run release:build
```

* review generated bundles using 'source-map-explorer dist/path/to/js', which should not show any dependency on packages in 'node_modules'
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

### prepare and publish plunkers

* build plunkers using the newly released npm packages

```shell
angular-dynaform (master)$ npm run plunker:build
```

* test the plunkr examples

```shell
angular-dynaform (master)$ npm run plunker:basic-example
angular-dynaform (master)$ npm run plunker:material-example
```

* publish plunkers

```shell
angular-dynaform (master)$ npm run plunker:publish
```
