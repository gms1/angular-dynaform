import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule} from '@angular/material';

import {DynamicFormModule} from '@angular-dynaform/core';
import {DynamicMaterialFormModule} from '@angular-dynaform/material';
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {TabGroupExampleComponent} from './tabgroup-example.component';
import {StepperExamplesComponent, StepperExampleComponent} from './stepper-example.component';

export const DEMO_ROUTES: Routes = [
  {path: '', component: HomeComponent}, {path: 'tabgroup', component: TabGroupExampleComponent},
  {path: 'stepper', component: StepperExamplesComponent}
];


export const APP_ROUTES: Routes = DEMO_ROUTES;


@NgModule({
  declarations:
      [AppComponent, HomeComponent, TabGroupExampleComponent, StepperExamplesComponent, StepperExampleComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, DynamicFormModule.forRoot(), DynamicMaterialFormModule,
    RouterModule.forRoot(APP_ROUTES), MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {
}


platformBrowserDynamic().bootstrapModule(AppModule);
