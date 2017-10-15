import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';

import {DynamicFormModule} from '@angular-dynaform/core';
import {DynamicNativeScriptFormModule} from '@angular-dynaform/nativescript';

import {AppComponent} from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [DynamicFormModule.forRoot(), NativeScriptModule, NativeScriptFormsModule, DynamicNativeScriptFormModule],
  declarations: [
    AppComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
