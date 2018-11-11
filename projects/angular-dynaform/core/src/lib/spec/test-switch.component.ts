// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel
} from '../../public_api';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-test-switch-component',
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
        type="range"
        min="0"
        max="1"
        step="1"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      />
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: TestSwitchComponent}]
})
export class TestSwitchComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSwitchOptions;
}
