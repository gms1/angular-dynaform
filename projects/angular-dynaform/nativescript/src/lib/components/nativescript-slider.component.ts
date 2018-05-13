// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSliderOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: step is currently not supported

@Component({
  selector: 'adf-nativescript-slider-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <Label
      *ngIf="model.local.label"
      class="adf-front-label"
      [ngClass]="model.css.label"
      [innerHTML]="model.local.label"
    ></Label>
    <Slider
      [formControlName]="model.key"
      [id]="model.id"
      [minValue]="options.min"
      [maxValue]="options.max"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    </Slider>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,

  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptSliderComponent}]
})
export class NativeScriptSliderComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSliderOptions;
}
