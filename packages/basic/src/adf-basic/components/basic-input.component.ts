// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlInputOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-input-component',
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
      <!--
        [minlength]="options.minLength"
        [min]="options.min"
        [max]="options.max"
        [step]="options.step"
      -->
  <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicInputComponent}]
})
export class BasicInputComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlInputOptions;
}
