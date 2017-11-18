// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlInputOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: make toggle optional

@Component({
  selector: 'adf-material-input-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
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
        <input matInput
          [formControlName]="model.key"
          [id]="model.id"
          type="text"
          [readonly]="options.readOnly"
          [maxlength]="options.maxLength"
          [placeholder]="model.local.placeholder"
          [ngClass]="model.css.control"
          adfHTMLDomElement
          [matDatepicker]="myDatepicker"
        />
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
          <adf-error-container [model]="model">
          </adf-error-container>
        </mat-form-field>
  </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialDatepickerComponent}]
})
export class MaterialDatepickerComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlInputOptions;
}
