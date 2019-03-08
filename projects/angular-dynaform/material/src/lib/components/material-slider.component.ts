// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSliderOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-material-slider-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <mat-slider
        [formControlName]="model.key"
        [id]="model.id"
        [step]="options.step"
        [ngClass]="model.css.control"
        adfHTMLDomElement
        [required]="options.required ? '' : null"
        [attr.min]="options.min"
        [attr.max]="options.max"
      ></mat-slider>
      <adf-error-container [model]="model"></adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialSliderComponent }],
})
export class MaterialSliderComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSliderOptions;
}
