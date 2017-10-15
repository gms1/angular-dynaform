// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-select-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <select
        [formControlName]="model.key"
        [id]="model.id"
        [attr.multiple]="options.multiple"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
        <option value="" disabled selected hidden>{{ model.local.placeholder }}</option>
        <option *ngFor="let opt of model.local.valueOptions" [value]="opt.value"><span [innerHTML]="opt.label"></span></option>
      </select>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicSelectComponent}]
})
export class BasicSelectComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSelectOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
