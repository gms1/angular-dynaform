// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: currently we are using the listpicker component instead of the radiogroup component
// TODO: the 'nativescript-checkbox' module has support for radiobutton group, but I think
// it would be a good idea to implement a CustomRadioGroup having a similar interface like the CustomListPicker

@Component({
  selector: 'adf-nativescript-radiogroup-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
      <RadioGroup
      [id]="model.id"
      ngDefaultControl
      adfNSDomElement
    >
      <Label
        *ngIf="model.local.label"
        [ngClass]="model.css.label"
        [text]="model.local.label"
      ></Label>
      <RadioButton *ngFor="let opt of model.local.valueOptions"
        [formControlName]="model.key"
        [ngClass]="model.css.control"
      >
        <!-- TODO: value  [value]="opt.value" -->
        <Span [innerHTML]="opt.label"></Span>
      </RadioButton>
    </RadioGroup>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptRadioGroupComponent}]
})
export class NativeScriptRadioGroupComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSelectOptions;
}
