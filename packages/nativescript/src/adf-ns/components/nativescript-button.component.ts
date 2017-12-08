// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  NullControlModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-button-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <Button
      [formControlName]="model.key"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
      ngDefaultControl
    >
      <Span [ngClass]="model.css.control"
        [innerHTML]="model.local.label"
      ></Span>
    </Button>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptButtonComponent}]
})
export class NativeScriptButtonComponent extends DynamicFormControlComponent<NullControlModel> {
  model: NullControlModel;
  options: ControlBaseOptions;
}
