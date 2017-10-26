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
  selector: 'adf-material-button-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
      [hidden]="model.hidden"
    >
        <button mat-raised-button
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        [type]="buttonType"

        adfHTMLDomElement
        ngDefaultControl
      >
      <span [ngClass]="model.css.control"
        [innerHTML]="model.local.label"
      ></span>
      </button>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialButtonComponent}]
})
export class MaterialButtonComponent extends DynamicFormControlComponent<NullControlModel> {
  model: NullControlModel;
  options: ControlBaseOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
