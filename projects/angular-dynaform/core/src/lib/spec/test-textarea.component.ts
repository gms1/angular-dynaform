// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '../../public_api';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-test-textarea-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
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
        [maxlength]="options.maxLength"
        [readonly]="options.readOnly"
        [wrap]="options.wrap"
        [cols]="options.cols"
        [rows]="options.rows"
        [attr.placeholder]="model.local.placeholder"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
      </textarea>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: TestTextareaComponent}]
})
export class TestTextareaComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlTextareaOptions;
}
