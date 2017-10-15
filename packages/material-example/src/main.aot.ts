// tslint:disable: no-import-side-effect
import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';

if (environment.production) {
  enableProdMode();
}

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
