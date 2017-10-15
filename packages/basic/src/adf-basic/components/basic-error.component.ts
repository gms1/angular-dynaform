// tslint:disable use-life-cycle-interface
import {
  ControlModel,
  ControlOptions,
  DynamicFormErrorComponent,
  DynamicForm,
  ValidationError
} from '@angular-dynaform/core';

// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
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
  model: ControlModel;
  options: ControlOptions;
  error: ValidationError;

  constructor(public form: DynamicForm) { super(form); }
}
