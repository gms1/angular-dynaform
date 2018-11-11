// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSliderOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: step is currently not supported

@Component({
  selector: 'adf-nativescript-slider',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <Label
      *ngIf="model.local.label"
      class="adf-front-label"
      [ngClass]="model.css.label"
      [text]="model.local.label"
    >
    </Label>
    <Slider
      [formControlName]="model.key"
      [id]="model.id"
      [minValue]="options.min"
      [maxValue]="options.max"
      [ngClass]="model.css.control"
      adfNSDomElement
      [required]="options.required"
    >
    </Slider>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,

  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptSliderComponent}]
})
export class NativeScriptSliderComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSliderOptions;
}
