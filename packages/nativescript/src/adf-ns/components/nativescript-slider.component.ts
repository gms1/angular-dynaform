// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSliderOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-input-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [ngClass]="model.css.container"
  >
    <Label
      *ngIf="model.local.label"
      [attr.for]="model.id"
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
    <!-- TODO: property:   [step]="options.step" -->
    </Slider>

    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,

  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptSliderComponent}]
})
export class NativeScriptSliderComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSliderOptions;
}
