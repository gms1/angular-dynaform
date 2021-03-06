// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-material-select-component',
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
        <mat-select
          [formControlName]="model.key"
          [id]="model.id"
          [placeholder]="model.local.placeholder"
          [multiple]="options.multiple"
          [ngClass]="model.css.control"
          adfHTMLDomElement
          [required]="options.required ? '' : null"
        >
          <mat-option *ngFor="let opt of model.local.valueOptions" [value]="opt.value">
            <span [innerHTML]="opt.label"></span>
          </mat-option>
        </mat-select>
        <span matPrefix *ngIf="options.icon">
          <mat-icon>{{ options.icon }}</mat-icon>
        </span>
        <adf-error-container [model]="model"></adf-error-container>
        <mat-hint [innerHTML]="model.local.hint"></mat-hint>
      </mat-form-field>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialSelectComponent }],
})
export class MaterialSelectComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSelectOptions;
}
