// tslint:disable use-input-property-decorator use-output-property-decorator use-life-cycle-interface
// tslint:disable use-host-property-decorator
import {ControlModel, ControlOptions, DynamicFormErrorComponent, DynamicValidationError} from '@angular-dynaform/core';

import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-error-component',
  template: `
    <mat-error [ngClass]="model.css.error" [innerHTML]="error.message"></mat-error>
  `,
  inputs: ['model', 'error'],
  host: {class: 'mat-input-error'},
  providers: [{provide: DynamicFormErrorComponent, useExisting: MaterialErrorComponent}]
})
export class MaterialErrorComponent extends DynamicFormErrorComponent {
  model!: ControlModel;
  options!: ControlOptions;
  error!: DynamicValidationError;
}
