// tslint:disable use-life-cycle-interface
import {ControlModel, ControlOptions, DynamicFormErrorComponent, DynamicValidationError} from '@angular-dynaform/core';
// TODO: add class 'mat-input-error'

// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-error-component',
  template: `
    <mat-error [ngClass]="model.css.error" [innerHTML]="error.message"></mat-error>
  `,
  inputs: ['model', 'error'],
  providers: [{provide: DynamicFormErrorComponent, useExisting: MaterialErrorComponent}]
})
export class MaterialErrorComponent extends DynamicFormErrorComponent {
  model: ControlModel;
  options: ControlOptions;
  error: DynamicValidationError;
}
