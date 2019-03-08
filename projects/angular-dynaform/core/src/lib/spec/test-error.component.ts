// tslint:disable use-life-cycle-interface
import {
  ControlModel,
  ControlOptions,
  DynamicFormErrorComponent,
  DynamicValidationError,
} from '../../public_api';

// tslint:disable use-input-property-decorator use-output-property-decorator
import { Component } from '@angular/core';

@Component({
  selector: 'adf-test-error-component',
  template: `
    <div [ngClass]="model.css.error" [innerHTML]="error.message"></div>
  `,
  inputs: ['model', 'error'],
  providers: [{ provide: DynamicFormErrorComponent, useExisting: TestErrorComponent }],
})
export class TestErrorComponent extends DynamicFormErrorComponent {
  model!: ControlModel;
  options!: ControlOptions;
  error!: DynamicValidationError;
}
