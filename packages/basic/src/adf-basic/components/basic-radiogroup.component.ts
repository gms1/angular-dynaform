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
  selector: 'adf-basic-radiogroup-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <fieldset
        [id]="model.id"
        ngDefaultControl
        adfHTMLDomElement
      >
        <legend
          *ngIf="model.local.label"
          [ngClass]="model.css.label"
          [innerHTML]="model.local.label"
        ></legend>
        <label *ngFor="let opt of model.local.valueOptions">
          <input
            [formControlName]="model.key"
            type="radio"
            [ngClass]="model.css.control"
            [value]="opt.value"
          /><span [innerHTML]="opt.label"></span>
        </label>
      </fieldset>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicRadioGroupComponent}]
})
export class BasicRadioGroupComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSelectOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
