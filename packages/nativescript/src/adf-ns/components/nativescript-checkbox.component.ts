// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-checkbox-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <adf-custom-checkbox
      [formControlName]="model.key"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
      <Span
        class="adf-back-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label">
      </Span>
    </adf-custom-checkbox>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptCheckboxComponent}]
})
export class NativeScriptCheckboxComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSwitchOptions;
}
