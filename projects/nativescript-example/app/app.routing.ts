import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';

import {FormTestCheckBoxComponent} from './components/form-test-checkbox.component';
import {FormTestListPickerComponent} from './components/form-test-listpicker.component';
import {FormTestSwitchComponent} from './components/form-test-switch.component';
import {FormTestSliderComponent} from './components/form-test-slider.component';
import {FormTestTextFieldComponent} from './components/form-test-textfield.component';
import {FormTestTextFieldNumberComponent} from './components/form-test-textfield-number.component';
import {FormTestTextFieldSecureComponent} from './components/form-test-textfield-secure.component';
import {FormTestTextViewComponent} from './components/form-test-textview.component';

const routes: Routes = [
  {path: '', redirectTo: '/testCheckBox', pathMatch: 'full'},
  {path: 'testCheckBox', component: FormTestCheckBoxComponent},
  {path: 'testListPicker', component: FormTestListPickerComponent},
  {path: 'testSlider', component: FormTestSliderComponent}, {path: 'testSwitch', component: FormTestSwitchComponent},
  {path: 'testTextField', component: FormTestTextFieldComponent},
  {path: 'testTextFieldNumber', component: FormTestTextFieldNumberComponent},
  {path: 'testTextFieldSecure', component: FormTestTextFieldSecureComponent},
  {path: 'testTextView', component: FormTestTextViewComponent}
];

@NgModule({imports: [NativeScriptRouterModule.forRoot(routes)], exports: [NativeScriptRouterModule]})
export class AppRoutingModule {
}
