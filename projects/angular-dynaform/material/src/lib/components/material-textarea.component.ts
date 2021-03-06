// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-material-textarea-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <mat-form-field [ngClass]="model.css.control">
        <textarea
          matInput
          [formControlName]="model.key"
          [id]="model.id"
          [readonly]="options.readOnly"
          [wrap]="options.wrap"
          [cols]="options.cols"
          [rows]="options.rows"
          [placeholder]="model.local.placeholder"
          [ngClass]="model.css.control"
          adfHTMLDomElement
          [required]="options.required ? '' : null"
          [attr.min]="options.min"
          [attr.max]="options.max"
          [maxlength]="options.maxLength"
        ></textarea>
        <span matPrefix *ngIf="options.icon">
          <mat-icon>{{ options.icon }}</mat-icon>
        </span>
        <adf-error-container [model]="model"></adf-error-container>
        <mat-hint [innerHTML]="model.local.hint"></mat-hint>
      </mat-form-field>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialTextareaComponent }],
})
export class MaterialTextareaComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlTextareaOptions;
}
