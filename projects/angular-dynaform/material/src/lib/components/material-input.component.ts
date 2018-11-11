// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlInputOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-input-component',
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
        <input matInput
          [formControlName]="model.key"
          [id]="model.id"
          [type]="options.inputType || 'text'"
          [readonly]="options.readOnly"
          [attr.autocomplete]="model.autoComplete"
          [placeholder]="model.local.placeholder"
          [ngClass]="model.css.control"
          adfHTMLDomElement
          [required]="options.required ? '' : null"
          [attr.min]="options.min"
          [attr.max]="options.max"
          [maxlength]="options.maxLength"
        />
        <span matPrefix *ngIf="options.icon">
          <mat-icon>options.icon</mat-icon>
        </span>
        <adf-error-container [model]="model">
        </adf-error-container>
        <mat-hint>model.local.hint</mat-hint>
      </mat-form-field>
  </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialInputComponent}]
})
export class MaterialInputComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlInputOptions;
}
