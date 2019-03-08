// tslint:disable-next-line no-import-side-effect
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
} from '@angular/material';

import { DynamicFormModule } from '@angular-dynaform/core';
import { DynamicMaterialFormModule } from '@angular-dynaform/material';
import { AppComponent } from './app.component';
import { MainExampleComponent } from './main-example.component';
import { TabGroupExampleComponent } from './tabgroup-example.component';
import { StepperExamplesComponent, StepperExampleComponent } from './stepper-example.component';
import {
  BasicFormComponent,
  BasicFormContainerComponent,
} from './codeSamples/basic-form.component';

export const DEMO_ROUTES: Routes = [
  { path: '', component: MainExampleComponent },
  { path: 'tabgroup', component: TabGroupExampleComponent },
  { path: 'stepper', component: StepperExamplesComponent },
];

export const CODE_ROUTES: Routes = [{ path: 'basic', component: BasicFormContainerComponent }];

export const APP_ROUTES: Routes = [...DEMO_ROUTES, ...CODE_ROUTES];

@NgModule({
  declarations: [
    AppComponent,
    MainExampleComponent,
    TabGroupExampleComponent,
    StepperExamplesComponent,
    StepperExampleComponent,
    BasicFormComponent,
    BasicFormContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DynamicFormModule.forRoot(),
    DynamicMaterialFormModule,
    RouterModule.forRoot(APP_ROUTES),
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// tslint:disable-next-line no-unnecessary-class
export class AppModule {}
