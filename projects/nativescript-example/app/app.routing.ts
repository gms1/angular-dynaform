import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';

import {FormTestSwitchComponent} from './forms/form-test-switch.component';
import {FormTestSliderComponent} from './forms/form-test-slider.component';

const routes: Routes = [
  {path: '', redirectTo: '/testSlider', pathMatch: 'full'}, {path: 'testSwitch', component: FormTestSwitchComponent},
  {path: 'testSlider', component: FormTestSliderComponent}
];

@NgModule({imports: [NativeScriptRouterModule.forRoot(routes)], exports: [NativeScriptRouterModule]})
export class AppRoutingModule {
}
