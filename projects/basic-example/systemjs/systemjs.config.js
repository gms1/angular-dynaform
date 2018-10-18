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

    'hammerjs': 'npm-ext:hammerjs/hammer.js',

    'tslib': 'npm-ext:tslib/tslib',

    'rxjs': 'npm-ext:rxjs/bundles/rxjs.umd.js',
    'rxjs/operators': 'npm-ext:rxjs/operators/index.js',

    'jsonpointerx': 'npm-ext:jsonpointerx/bundles/jsonpointerx.umd.js',
    'jsep': 'npm-ext:jsep/build/jsep.js',

    '@angular-dynaform/core': 'npm-int:angular-dynaform/core/bundles/angular-dynaform-core.umd.js',
    '@angular-dynaform/basic': 'npm-int:angular-dynaform/basic/bundles/angular-dynaform-basic.umd.js',

    'app': '/src',
  },
  packages: {
    app: {main: './main.ts', defaultExtension: 'ts'},
  }
});
