// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSliderOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '../../public_api';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-test-slider-component',
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
        [min]="options.min"
        [max]="options.max"
        [step]="options.step"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      />
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: TestSliderComponent}]
})
export class TestSliderComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSliderOptions;
}