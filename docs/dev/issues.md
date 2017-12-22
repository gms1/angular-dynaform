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

* jit without bundling: using template-drawer-navigation-ng

```shell
System.err: Error: com.tns.NativeScriptException: Failed to find module: "nativescript-angular/platform", relative to: app/tns_modules/
```

same error if using jit without bundling for '@angular-dynaform/nativescript-example'

* aot: runtime exception

```shell
JS: ERROR TypeError: failed to create form control component: Class constructor DynamicFormFormControlComponent cannot be invoked without 'new'
JS: ERROR CONTEXT [object Object]
JS: Angular is running in the development mode. Call enableProdMode() to enable the production mode.
JS: ANGULAR BOOTSTRAP DONE. 1129
12-22 18:13:12.895  3840  3840 E AndroidRuntime:        at com.tns.Runtime.callJSMethodNative(Native Method)
12-22 18:13:12.895  3840  3840 E AndroidRuntime:        at com.tns.Runtime.dispatchCallJSMethodNative(Runtime.java:1021)
12-22 18:13:12.895  3840  3840 E AndroidRuntime:        at com.tns.Runtime.callJSMethodImpl(Runtime.java:903)
12-22 18:13:12.895  3840  3840 E AndroidRuntime:        at com.tns.Runtime.callJSMethod(Runtime.java:890)
12-22 18:13:12.895  3840  3840 E AndroidRuntime:        at com.tns.Runtime.callJSMethod(Runtime.java:874)
12-22 18:13:12.895  3840  3840 E AndroidRuntime:        at com.tns.Runtime.callJSMethod(Runtime.java:866)
System.err: java.lang.RuntimeException: Unable to start activity ComponentInfo{org.nativescript.AngularDynaform/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: 
System.err: Calling js method onStart failed
System.err: 
System.err: Error: Trying to link invalid 'this' to a Java object
System.err: File: "file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js, line: 82933, column: 35
System.err: 
System.err: StackTrace: 
System.err:     Frame: function:'AnimationListnerImpl', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 82933, column: 36
System.err:     Frame: function:'getAnimationListener', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 82964, column: 29
System.err:     Frame: function:'setupExitAndPopEnterAnimation', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 83178, column: 20
System.err:     Frame: function:'setupAllAnimation', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 83193, column: 5
System.err:     Frame: function:'_setAndroidFragmentTransitions', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 82783, column: 9
System.err:     Frame: function:'module.exports.Frame._navigateCore', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 27219, column: 32
System.err:     Frame: function:'module.exports.FrameBase.performNavigation', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 62450, column: 14
System.err:     Frame: function:'module.exports.FrameBase._processNextNavigationEntry', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 62442, column: 22
System.err:     Frame: function:'module.exports.Frame._processNextNavigationEntry', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 27131, column: 58
System.err:     Frame: function:'module.exports.FrameBase.onLoaded', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 62257, column: 14
System.err:     Frame: function:'module.exports.ActivityCallbacksImplementation.onStart', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 27685, column: 22
System.err:     Frame: function:'module.exports.NativeScriptActivity.onStart', file:'file:///data/data/org.nativescript.AngularDynaform/files/app/vendor.js', line: 87628, column: 25
System.err: 
System.err:     at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2817)
System.err:     at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2892)
System.err:     at android.app.ActivityThread.-wrap11(Unknown Source:0)
System.err:     at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1593)
System.err:     at android.os.Handler.dispatchMessage(Handler.java:105)
System.err:     at android.os.Looper.loop(Looper.java:164)
System.err:     at android.app.ActivityThread.main(ActivityThread.java:6541)
System.err:     at java.lang.reflect.Method.invoke(Native Method)
System.err:     at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:240)
System.err:     at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:767)
System.err: Caused by: com.tns.NativeScriptException: 
```

## commonjs

[node modules compatibility](http://guybedford.com/systemjs-alignment#node-modules-compatibility)
