import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { DynamicFormModule } from '@angular-dynaform/core';
import { DynamicNativeScriptFormModule } from '@angular-dynaform/nativescript';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { FormTestCheckBoxComponent } from './components/form-test-checkbox.component';
import { FormTestDatePickerComponent } from './components/form-test-datepicker.component';
import { FormTestListPickerComponent } from './components/form-test-listpicker.component';
import { FormTestRadioGroupComponent } from './components/form-test-radiogroup.component';
import { FormTestSliderComponent } from './components/form-test-slider.component';
import { FormTestSwitchComponent } from './components/form-test-switch.component';
import { FormTestTextFieldComponent } from './components/form-test-textfield.component';
import { FormTestTextFieldNumberComponent } from './components/form-test-textfield-number.component';
import { FormTestTextFieldSecureComponent } from './components/form-test-textfield-secure.component';
import { FormTestTextViewComponent } from './components/form-test-textview.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    DynamicFormModule.forRoot(),
    DynamicNativeScriptFormModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    FormTestCheckBoxComponent,
    FormTestDatePickerComponent,
    FormTestListPickerComponent,
    FormTestRadioGroupComponent,
    FormTestSliderComponent,
    FormTestSwitchComponent,
    FormTestTextFieldComponent,
    FormTestTextFieldNumberComponent,
    FormTestTextFieldSecureComponent,
    FormTestTextViewComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
