// tslint:disable-next-line no-import-side-effect
import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule} from '@angular/material';

import {DynamicFormModule} from '@angular-dynaform/core';
import {DynamicMaterialFormModule} from '@angular-dynaform/material';
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {TabGroupExampleComponent} from './tabgroup-example.component';
import {StepperExampleComponent} from './stepper-example.component';

export const DEMO_ROUTES: Routes = [
  {path: '', component: HomeComponent}, {path: 'tabgroup', component: TabGroupExampleComponent},
  {path: 'stepper', component: StepperExampleComponent}
];

export const APP_ROUTES: Routes = DEMO_ROUTES;


@NgModule({
  declarations: [AppComponent, HomeComponent, TabGroupExampleComponent, StepperExampleComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, DynamicFormModule.forRoot(), DynamicMaterialFormModule,
    RouterModule.forRoot(APP_ROUTES), MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {
}
