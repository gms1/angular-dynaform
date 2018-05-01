System.config({
  transpiler: 'typescript',
  typescriptOptions: {emitDecoratorMetadata: true, experimentalDecorators: true, target: 'es5', module: 'system'},
  packages: {'.': {defaultExtension: 'js'}, 'vendor': {defaultExtension: 'js'}},
  paths: {
    // 'npm-ext:': 'https://unpkg.com/',
    'npm-ext:': '/node_modules/',
    'npm-int:': '/dist/'
  }
});


System.config({

  map: {

    '@angular/core': 'npm-ext:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm-ext:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'npm-ext:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'npm-ext:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm-ext:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic':
        'npm-ext:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm-ext:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm-ext:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm-ext:@angular/forms/bundles/forms.umd.js',
    '@angular/animations': 'npm-ext:@angular/animations/bundles/animations.umd.js',
    '@angular/platform-browser/animations':
        'npm-ext:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/animations/browser': 'npm-ext:@angular/animations/bundles/animations-browser.umd.js',

    '@angular/material': 'npm-ext:@angular/material/bundles/material.umd.js',
    '@angular/cdk': 'npm-ext:@angular/cdk/bundles/cdk.umd.js',
    '@angular/cdk/accordion': 'npm-ext:@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/a11y': 'npm-ext:@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/bidi': 'npm-ext:@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'npm-ext:@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/keycodes': 'npm-ext:@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/layout': 'npm-ext:@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/observers': 'npm-ext:@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/platform': 'npm-ext:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': 'npm-ext:@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': 'npm-ext:@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/table': 'npm-ext:@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/testing': 'npm-ext:@angular/cdk/bundles/cdk-testing.umd.js',
    '@angular/cdk/overlay': 'npm-ext:@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/scrolling': 'npm-ext:@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/collections': 'npm-ext:@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/stepper': 'npm-ext:@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/tree': 'npm-ext:@angular/cdk/bundles/cdk-tree.umd.js',
    '@angular/cdk/text-field': 'npm-ext:@angular/cdk/bundles/cdk-text-field.umd.js',


    'tslib': 'npm-ext:tslib/tslib',

    'rxjs': 'npm-ext:rxjs/bundles/rxjs.umd.js',
    'rxjs/operators': 'npm-ext:rxjs/operators/index.js',

    'jsonpointerx': 'npm-ext:jsonpointerx/bundles/jsonpointerx.umd.js',
    'jsep': 'npm-ext:jsep/build/jsep.js',

    '@angular-dynaform/core': 'npm-int:@angular-dynaform/core/bundles/angular-dynaform-core.umd.js',
    '@angular-dynaform/material': 'npm-int:@angular-dynaform/material/bundles/angular-dynaform-material.umd.js',

    'app': './src',
  },
  packages: {
    app: {main: './main.ts', defaultExtension: 'ts'},
  }
});
