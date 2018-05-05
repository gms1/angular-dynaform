# issues in third party libs/tools

## mono-repo: building local libs depending on other local libs is broken
 [Scoped library paths cannot be resolved](https://github.com/angular/angular-cli/issues/10620)
 [ng build v6 does not use paths section of root tsconfig.json](https://github.com/angular/angular-cli/issues/10444)
=> added @adf/core path definition to tsconfig.lib for @adf/basic, @adf/material and @adf/nativescript
