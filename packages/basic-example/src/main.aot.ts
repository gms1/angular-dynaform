// tslint:disable: no-import-side-effect
import './polyfills';
import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';


import {AppModuleNgFactory} from './app/app.module.ngfactory';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
