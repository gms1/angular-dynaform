// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  NullControlModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-separator-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [ngClass]="model.css.container"
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
  model: NullControlModel;
  options: ControlBaseOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
