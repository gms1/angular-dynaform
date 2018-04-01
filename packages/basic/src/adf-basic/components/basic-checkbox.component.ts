// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-checkbox-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <input
        [formControlName]="model.key"
        [id]="model.id"
        type="checkbox"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      />
      <label
        [attr.for]="model.id"
        class="adf-back-label"
        [ngClass]="model.css.label"
      >
        <span [ngClass]="model.css.label"
          [innerHTML]="model.local.label">
        </span>
      </label>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicCheckboxComponent}]
})
export class BasicCheckboxComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSwitchOptions;
}
