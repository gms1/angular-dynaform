# issues in third party libs/tools

## rollup

* issue resolving dependencies of symlinked packages:
  [94](https://github.com/rollup/rollup-plugin-node-resolve/issues/94)
  [100](https://github.com/rollup/rollup-plugin-node-resolve/issues/100)

  * workaround: changed 'rollup-plugin-node-resolve' to 'rollup-plugin-node-resolve-angular' but had to disable uglify(), because I got "Unexpected token" error

* turing treeshaking off breaks if you import rxjs:
  [1221](https://github.com/rollup/rollup/issues/1221)

  * workaround: turned treeshaking on even for the library packages

## angular

### JIT is broken

* "TypeError: Cannot convert undefined or null to object" in Function.getPrototypeOf
  [15325](https://github.com/angular/angular/issues/15325) and
  [15127: tracking bug](https://github.com/angular/angular/issues/15127)

* Using Angular 5 (tested with 5.0.0-rc.3) and Typescript > 2.5 (tested with 2.5.3)
  causes: Can't resolve all parameters for DynamicFormService

* building the AOT examples using Angular 5 (tested with 5.0.0-rc.3) I got wrong exports:

  e.g packages/material-example/tmp/aot/node_modules/@angular-dynaform/material/lib/index.ngfactory.js

    export { MaterialControlType as MaterialControlType_1 } from "./models/index";

 appending '/index' to the exports from public_api.ts in the library solved this issue

## nativescript-angular

* FIXED in 4.2: broken 'ngDefaultControl' directive
  [831](https://github.com/NativeScript/nativescript-angular/issues/831)

* aot:  building example using aot (npm run build-android-bundle), I got
      "ERROR in Template parse errors: 'XXX' is not a known element" for components defined in nativescript-core-module.
      Had to add "schemas: [NO_ERRORS_SCHEMA]" to DynamicNativeScriptFormModule

* aot:  building example using aot (npm run build-android-bundle), I got:

```error
      :asbg:generateBindings
      Exception in thread "main" java.io.IOException: File already exists. This may lead to undesired behavior.
      Please change the name of one of the extended classes.
      ...../nativescript-example/platforms/android/src/main/java/com/tns/gen/java/lang
        .../Object_frnal_ts_helpers_l58_c38__TouchListenerImpl.java
              at org.nativescript.staticbindinggenerator.Generator.writeBindings(Generator.java:59)
              at org.nativescript.staticbindinggenerator.Main.main(Main.java:15)
      :asbg:generateBindings FAILED
```

    * workaround: ignore this exception

## karma

I have a similar issue, but this is alread closed:
Karma doesn't exit properly when using public api with the finish callback #1035
[1035](https://github.com/karma-runner/karma/issues/1035)

## commonjs

[node modules compatibility](http://guybedford.com/systemjs-alignment#node-modules-compatibility)
