import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DynamicFormModule} from '@angular-dynaform/core';
import {DynamicMaterialFormModule} from '@angular-dynaform/material';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports:
      [BrowserModule, BrowserAnimationsModule, DynamicFormModule.forRoot(), DynamicMaterialFormModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {
}
