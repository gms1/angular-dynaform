// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: currently we are using the select component instead of the radiogroup component

@Component({
  selector: 'adf-nativescript-radiogroup-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [ngClass]="model.css.container"
  >
    <RadioGroup
      [id]="model.id"
      ngDefaultControl
      adfNSDomElement
    >
      <Label
        *ngIf="model.local.label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
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
  model: ValueControlModel;
  options: ControlSelectOptions;
}
