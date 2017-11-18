// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

// TODO: currently we are using the switch component instead of the checkbox component

@Component({
  selector: 'adf-nativescript-checkbox-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [ngClass]="model.css.container"
  >
    <Label
      [attr.for]="model.id"
      [ngClass]="model.css.label"
    >
      <CheckBox
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        adfNSDomElement
      >
        <Span [ngClass]="model.css.label"
          [innerHTML]="model.local.label">
        </Span>
      </CheckBox>
    </Label>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptCheckboxComponent}]
})
export class NativeScriptCheckboxComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSwitchOptions;
}
