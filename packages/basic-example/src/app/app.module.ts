import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DynamicBasicFormModule} from '@angular-dynaform/basic';
import {DynamicFormModule} from '@angular-dynaform/core';

import {AppComponent} from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicFormModule.forRoot(), DynamicBasicFormModule],
  providers: [],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {
}
