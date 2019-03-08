// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlInputOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '../../public_api';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-test-input-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <input
        [formControlName]="model.key"
        [id]="model.id"
        [type]="options.inputType || 'text'"
        [readonly]="options.readOnly"
        [maxlength]="options.maxLength"
        [attr.autocomplete]="model.autoComplete"
        [attr.placeholder]="model.local.placeholder"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      />
      <adf-error-container [model]="model"></adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: TestInputComponent }],
})
export class TestInputComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlInputOptions;
}
