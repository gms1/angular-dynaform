// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-basic-textarea-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <textarea
        [formControlName]="model.key"
        [id]="model.id"
        [readonly]="options.readOnly"
        [wrap]="options.wrap"
        [cols]="options.cols"
        [rows]="options.rows"
        [attr.placeholder]="model.local.placeholder"
        [ngClass]="model.css.control"
        adfHTMLDomElement
        [required]="options.required ? '' : null"
        [attr.min]="options.min"
        [attr.max]="options.max"
        [maxlength]="options.maxLength"
      ></textarea>
      <adf-error-container [model]="model"></adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: BasicTextareaComponent }],
})
export class BasicTextareaComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlTextareaOptions;
}
