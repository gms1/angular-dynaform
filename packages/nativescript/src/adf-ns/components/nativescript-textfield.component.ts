// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlInputOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-textfield-component',
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
    <TextField
      [formControlName]="model.key"
      [id]="model.id"
      [maxLength]="options.maxLength"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    <!-- TODO: properties:
    [type]="options.inputType || 'text'"
    [minlength]="options.minLength"
    [min]="options.min"
    [max]="options.max"
    [step]="options.step"
    [attr.placeholder]="model.local.placeholder"
  -->
    </TextField>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptTextFieldComponent}]
})
export class NativeScriptTextFieldComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlInputOptions;
}
