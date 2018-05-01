// tslint:disable use-life-cycle-interface
import {ControlModel, ControlOptions, DynamicFormErrorComponent, DynamicValidationError} from '@angular-dynaform/core';

// tslint:disable use-input-property-decorator use-output-property-decorator
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-error-component',
  template: `
    <div [ngClass]="model.css.error" [innerHTML]="error.message"></div>
  `,
  inputs: ['model', 'error'],
  providers: [{provide: DynamicFormErrorComponent, useExisting: BasicErrorComponent}]
})
export class BasicErrorComponent extends DynamicFormErrorComponent {
  model!: ControlModel;
  options!: ControlOptions;
  error!: DynamicValidationError;
}
