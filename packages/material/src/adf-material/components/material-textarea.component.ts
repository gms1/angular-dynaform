// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-textarea-component',
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
      <mat-form-field [ngClass]="model.css.control">
        <textarea matInput
          [formControlName]="model.key"
          [id]="model.id"
          [maxlength]="options.maxLength"
          [minlength]="options.minLength"
          [readonly]="options.readOnly"
          [wrap]="options.wrap"
          [cols]="options.cols"
          [rows]="options.rows"
          [placeholder]="model.local.placeholder"
          [ngClass]="model.css.control"
          adfHTMLDomElement
        >
        </textarea>
        <adf-error-container [model]="model">
        </adf-error-container>
      </mat-form-field>
  </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialTextareaComponent}]
})
export class MaterialTextareaComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlTextareaOptions;
}
