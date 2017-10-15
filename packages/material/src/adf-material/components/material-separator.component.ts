// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  NullControlModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-separator-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <span [ngClass]="model.css.control"
        [innerHTML]="model.local.label"
      ></span>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialSeparatorComponent}]
})
export class MaterialSeparatorComponent extends DynamicFormControlComponent<NullControlModel> {
  model: NullControlModel;
  options: ControlBaseOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
