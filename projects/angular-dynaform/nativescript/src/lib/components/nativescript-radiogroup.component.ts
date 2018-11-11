// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: currently we are using the listpicker component instead of the radiogroup component
// TODO: the 'nativescript-checkbox' module has support for radiobutton group, but I think
// it would be a good idea to implement a CustomRadioGroup having a similar interface like the CustomListPicker

@Component({
  selector: 'adf-nativescript-radiogroup',
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
    <adf-custom-radiogroup
      [formControlName]="model.key"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
      [text]="model.local.label"
      [valueOptions]="options.valueOptions"
    >
    </adf-custom-radiogroup>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptRadioGroupComponent}]
})
export class NativeScriptRadioGroupComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSelectOptions;
}
