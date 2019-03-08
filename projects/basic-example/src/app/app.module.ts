// tslint:disable-next-line no-import-side-effect
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DynamicFormModule } from '@angular-dynaform/core';
import { DynamicBasicFormModule } from '@angular-dynaform/basic';
import { AppComponent } from './app.component';
import { MainExampleComponent } from './main-example.component';

export const DEMO_ROUTES: Routes = [{ path: '', component: MainExampleComponent }];

export const APP_ROUTES: Routes = DEMO_ROUTES;

@NgModule({
  declarations: [AppComponent, MainExampleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DynamicFormModule.forRoot(),
    DynamicBasicFormModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {}
