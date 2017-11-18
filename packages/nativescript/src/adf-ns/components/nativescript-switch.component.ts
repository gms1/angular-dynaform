// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-input-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
      <Label
      *ngIf="model.local.label"
      [attr.for]="model.id"
      [ngClass]="model.css.label"
      [innerHTML]="model.local.label"
    ></Label>
    <Switch
      [formControlName]="model.key"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    </Switch>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptSwitchComponent}]
})
export class NativeScriptSwitchComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSwitchOptions;
}
