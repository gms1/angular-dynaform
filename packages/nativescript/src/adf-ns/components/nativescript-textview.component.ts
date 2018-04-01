// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-textview-component',
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
    <TextView
      [formControlName]="model.key"
      [id]="model.id"
      [maxLength]="options.maxLength"
      [editable]="!options.readOnly"
      [textWrap]="options.wrap"
      [col]="options.cols"
      [row]="options.rows"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    <!--
    [hint]="options.local.placeholder"
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
  model!: ValueControlModel;
  options!: ControlTextareaOptions;
}
