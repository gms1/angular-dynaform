// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  NullControlModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-separator-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
      <Span [ngClass]="model.css.control"
      [innerHTML]="model.local.label"
    ></Span>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptSeparatorComponent}]
})
export class NativeScriptSeparatorComponent extends DynamicFormControlComponent<NullControlModel> {
  model!: NullControlModel;
  options!: ControlBaseOptions;
}
