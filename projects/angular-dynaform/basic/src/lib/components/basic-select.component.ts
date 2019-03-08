// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-basic-select-component',
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
        [required]="options.required ? '' : null"
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
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: BasicSelectComponent }],
})
export class BasicSelectComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSelectOptions;
}
