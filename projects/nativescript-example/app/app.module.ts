import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';

import {DynamicFormModule} from '@angular-dynaform/core';
import {DynamicNativeScriptFormModule} from '@angular-dynaform/nativescript';

import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';

import {FormTestSwitchComponent} from './forms/form-test-switch.component';
import {FormTestSliderComponent} from './forms/form-test-slider.component';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule, NativeScriptFormsModule, NativeScriptUISideDrawerModule, DynamicFormModule.forRoot(),
    DynamicNativeScriptFormModule, AppRoutingModule
  ],
  declarations: [AppComponent, FormTestSwitchComponent, FormTestSliderComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
