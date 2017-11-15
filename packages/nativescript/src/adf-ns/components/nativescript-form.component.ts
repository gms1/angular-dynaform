// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
// import { Component, EventEmitter, Output } from '@angular/core';
import {
  DynamicFormControlComponentBase,
  DynamicForm,
  DynamicFormService,
  DynamicFormFormControlComponent,
  GroupModel,
  GroupOptions
} from '@angular-dynaform/core';
import {Component} from '@angular/core';


@Component({
  selector: 'adf-nativescript-form-component',
  template: `
  <StackLayout
    [ngClass]="model.css.container"
  >
    <StackLayout
      [formGroup]="model.ngControl"
      [id]="model.id"
      [ngClass]="model.css.control"

      adfNSDomElement
    >
      <adf-group-container
        [model]="model"
        [ngClass]="model.css.content"
      >
      </adf-group-container>
    </StackLayout>
  </StackLayout>
`,
  inputs: ['model'],
  outputs: ['submit', 'reset'],
  providers: [
    {
      provide: DynamicFormControlComponentBase,
      useExisting: NativeScriptFormComponent
    },  // required to support 'adfNSDomElement' directive
    {provide: DynamicFormFormControlComponent, useExisting: NativeScriptFormComponent}
  ]
})
export class NativeScriptFormComponent extends DynamicFormFormControlComponent {
  model: GroupModel;
  options: GroupOptions;

  // TODO: onSubmit/onReset

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
