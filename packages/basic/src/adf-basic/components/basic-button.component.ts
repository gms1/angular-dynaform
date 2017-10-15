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
  selector: 'adf-basic-button-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <button
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        [type]="buttonType"

        adfHTMLDomElement
        ngDefaultControl
      >
      <span [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></span>
      </button>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicButtonComponent}]
})
export class BasicButtonComponent extends DynamicFormControlComponent<NullControlModel> {
  model: NullControlModel;
  options: ControlBaseOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
