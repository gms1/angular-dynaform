// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlInputOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-input-component',
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
      <input
        [formControlName]="model.key"
        [id]="model.id"
        [type]="options.inputType || 'text'"
        [readonly]="options.readOnly"
        [attr.autocomplete]="model.autoComplete"
        [attr.placeholder]="model.local.placeholder"
        [ngClass]="model.css.control"
        adfHTMLDomElement
        [required]="options.required ? '' : null"
        [attr.min]="options.min"
        [attr.max]="options.max"
        [maxlength]="options.maxLength"
      />
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicInputComponent}]
})
export class BasicInputComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlInputOptions;
}
