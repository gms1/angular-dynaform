import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormModule} from '@angular-dynaform/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material';
import {DynamicMaterialFormModule} from '@angular-dynaform/material';

import {AppComponent} from './app.component';


// TODO: importing DynamicMaterialFormModule I got error 'no provider for DynamicFormService'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule, MatCardModule, ReactiveFormsModule, DynamicFormModule.forRoot(), DynamicMaterialFormModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


platformBrowserDynamic().bootstrapModule(AppModule);
