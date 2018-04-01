// tslint:disable use-input-property-decorator use-output-property-decorator
// tslint:disable use-life-cycle-interface
import {ControlModel, ControlOptions, DynamicFormErrorComponent, DynamicValidationError} from '@angular-dynaform/core';

import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-error-component',
  template: `
  <StackLayout [ngClass]="model.css.error" [innerHTML]="error.message"></StackLayout>
`,
  inputs: ['model', 'error'],
  providers: [{provide: DynamicFormErrorComponent, useExisting: NativeScriptErrorComponent}]
})
export class NativeScriptErrorComponent extends DynamicFormErrorComponent {
  model!: ControlModel;
  options!: ControlOptions;
  error!: DynamicValidationError;
}
