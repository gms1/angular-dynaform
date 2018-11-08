// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '../../public_api';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-test-radiogroup-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <fieldset
        [id]="model.id"
        ngDefaultControl
        adfHTMLDomElement
        [ngClass]="model.css.control"
      >
        <legend
          *ngIf="model.local.label"
          [ngClass]="model.css.label"
          [innerHTML]="model.local.label"
        >
        </legend>
        <label *ngFor="let opt of model.local.valueOptions">
          <input
            [formControlName]="model.key"
            type="radio"
            [value]="opt.value"
          />
          <span [innerHTML]="opt.label"></span>
        </label>
      </fieldset>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: TestRadioGroupComponent}]
})
export class TestRadioGroupComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSelectOptions;
}
