# issues in third party libs/tools

## mono-repo: building local libs depending on other local libs is broken
currently we have a workaround applied to help ng-packagr finding the generated '@angular-dynaform/core'-dependency
see:
* 'postinstall' in package.json
* build/js/postinstall.js
* dependency section in projects/angular-dynaform/(basic|material|nativescript)/package.json
* docs/publish.md
ng-packagr should use the path-mapping from tsconfig.json




