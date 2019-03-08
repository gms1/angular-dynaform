// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  NullModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-nativescript-button',
  template: `
    <StackLayout [formGroup]="model.ngGroup" [visibility]="model.hidden ? 'collapsed' : 'visible'">
      <Button
        [formControlName]="model.key"
        [id]="model.id"
        class="btn"
        [ngClass]="model.css.control"
        adfNSDomElement
        ngDefaultControl
        [text]="model.local.label"
      ></Button>
    </StackLayout>
  `,
  inputs: ['model'],
  providers: [
    { provide: DynamicFormControlComponentBase, useExisting: NativeScriptButtonComponent },
  ],
})
export class NativeScriptButtonComponent extends DynamicFormControlComponent<NullModel> {
  model!: NullModel;
  options!: ControlBaseOptions;
}
