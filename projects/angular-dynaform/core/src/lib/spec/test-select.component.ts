// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '../../public_api';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-test-select-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-front-label"
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
        <option *ngFor="let opt of model.local.valueOptions" [value]="opt.value">
          <span [innerHTML]="opt.label"></span>
        </option>
      </select>
      <adf-error-container [model]="model"></adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: TestSelectComponent }],
})
export class TestSelectComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSelectOptions;
}
