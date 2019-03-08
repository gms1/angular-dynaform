// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-nativescript-switch',
  template: `
    <StackLayout [formGroup]="model.ngGroup" [visibility]="model.hidden ? 'collapsed' : 'visible'">
      <Label
        *ngIf="model.local.label"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [text]="model.local.label"
      ></Label>
      <Switch
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        adfNSDomElement
        [required]="options.required"
      ></Switch>
      <adf-error-container [model]="model"></adf-error-container>
    </StackLayout>
  `,
  inputs: ['model'],
  providers: [
    { provide: DynamicFormControlComponentBase, useExisting: NativeScriptSwitchComponent },
  ],
})
export class NativeScriptSwitchComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSwitchOptions;
}
