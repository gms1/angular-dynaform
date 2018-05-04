# publishing

## TODO:
we need a script to fix the generated package.json files:
* remove dependency and script sections
* change the @angular-dynaform/core dependency from file-url to npm version

## tasks

* bump the version for all packages (but not in the dependencies) and build the release

```shell
angular-dynaform (master)$ ./build/version-bump x.y.z
angular-dynaform (master)$ ./build/travis_run
```

* review generated bundles using 'source-map-explorer dist/path/to/js', which should not show any dependency on packages in 'node_modules'
* test the systemjs examples (npm run systemjs:basic-example; npm run systemjs:material-example) 
* update changelog
* git commit and git push

```shell
angular-dynaform (master)$ ./build/publish
```

