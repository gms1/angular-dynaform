import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormModule} from '@angular-dynaform/core';

import {BrowserModule} from '@angular/platform-browser';
import {DynamicBasicFormModule} from '@angular-dynaform/basic';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, ReactiveFormsModule, DynamicFormModule.forRoot(), DynamicBasicFormModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {
}


platformBrowserDynamic().bootstrapModule(AppModule);
