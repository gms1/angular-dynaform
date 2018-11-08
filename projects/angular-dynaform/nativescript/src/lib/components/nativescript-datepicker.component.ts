// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-switch',
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
    <DatePicker
      [formControlName]="model.key"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
      [required]="options.required"
    >
    </DatePicker>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptDatePickerComponent}]
})
export class NativeScriptDatePickerComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSwitchOptions;
}
