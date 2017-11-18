// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-textview-component',
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
    <TextView
      [formControlName]="model.key"
      [id]="model.id"
      [maxLength]="options.maxLength"
      [editable]="!options.readOnly"
      [col]="options.cols"
      [row]="options.rows"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    <!-- TODO: properties:
    [minlength]="options.minLength"
    [wrap]="options.wrap"
    [attr.placeholder]="model.local.placeholder"
    -->
    </TextView>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptTextViewComponent}]
})
export class NativeScriptTextViewComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlTextareaOptions;
}
