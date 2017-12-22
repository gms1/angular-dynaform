# issues in third party libs/tools

## rollup

* issue resolving dependencies of symlinked packages:
  [94](https://github.com/rollup/rollup-plugin-node-resolve/issues/94)
  [100](https://github.com/rollup/rollup-plugin-node-resolve/issues/100)

  * workaround: changed 'rollup-plugin-node-resolve' to 'rollup-plugin-node-resolve-angular' but had to disable uglify(), because I got "Unexpected token" error

* turning treeshaking off breaks if you import rxjs:
  [1221](https://github.com/rollup/rollup/issues/1221)

  * workaround: turned treeshaking on even for the library packages

## angular

* Using Angular 5 (tested with 5.0.0-rc.3) and unsupported Typescript version >= 2.5 (tested with 2.5.3)
  causes: Can't resolve all parameters for DynamicFormService

but with Typescript 2.4.2 I am facing this error:

```shell
gms@sirius:~/work/HOT/angular-dynaform/packages/material (master)$ ./node_modules/.bin/tsc -version
Version 2.4.2
gms@sirius:~/work/HOT/angular-dynaform/packages/material (master)$ ./node_modules/.bin/tsc -p src/tsconfig.spec.json | grep unrelated
 src/adf-material/components/material-stepper.component.ts(93,5): error TS2322: Type 'MatStepperWrapper' is not assignable to type 'Stepper | undefined'.
      Type '() => Observable<number>' is not assignable to type '() => Observable<number>'. Two different types with this name exist, but they are unrelated.

gms@sirius:~/work/HOT/angular-dynaform/packages/material (master)$ tsc -version
Version 2.6.2
gms@sirius:~/work/HOT/angular-dynaform/packages/material (master)$ tsc -p src/tsconfig.spec.json
gms@sirius:~/work/HOT/angular-dynaform/packages/material (master)$
```

    * workaround: ignore this error and do not upgrade karma-typescript to >=3.0.9. the later would terminate the tests, because of above errors

## nativescript-angular

* jit: using template-drawer-navigation-ng

```shell
System.err: Error: com.tns.NativeScriptException: Failed to find module: "nativescript-angular/platform", relative to: app/tns_modules/
```

* aot: failed to create component having 'Button' tag

runtime exception: 'window is not defined'

* aot: components not correctly constructed

in 'DynamicFormControlComponentDirective': properties 'form', 'dynamicFormService', 'elementRef' of 'this.componentRef.instance' are undefined after successfully calling 'this.viewContainerRef.createComponent'

* aot: runtime exception

```shell
System.err: java.lang.RuntimeException: Unable to start activity ComponentInfo{org.nativescript.AngularDynaform/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: 
```

## commonjs

[node modules compatibility](http://guybedford.com/systemjs-alignment#node-modules-compatibility)
