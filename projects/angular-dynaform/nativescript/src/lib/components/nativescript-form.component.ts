// tslint:disable use-input-property-decorator use-output-property-decorator
// import { Component, EventEmitter, Output } from '@angular/core';
import {
  DynamicFormControlComponentBase,
  DynamicFormFormControlComponent,
  GroupModel,
  GroupOptions
} from '@angular-dynaform/core';
import {Component} from '@angular/core';


@Component({
  selector: 'adf-nativescript-form',
  template: `
  <StackLayout>
    <StackLayout
      [formGroup]="model.ngControl"
      [id]="model.id"
      [ngClass]="model.css.control"

      adfNSDomElement
    >
      <FlexboxLayout [ngClass]="model.css.content">
        <ng-container *ngFor="let item of model.items;" adfControlComponent [model]="item" >
        </ng-container>
      </FlexboxLayout>
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
  model!: GroupModel;
  options!: GroupOptions;

  // TODO: onSubmit/onReset
}
