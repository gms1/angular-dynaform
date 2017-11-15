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
  selector: 'adf-material-form-component',
  template: `
    <div
      [ngClass]="model.css.container"
    >
      <form
        [formGroup]="model.ngControl"
        [id]="model.id"
        [ngClass]="model.css.control"
        (ngSubmit)="onSubmit($event)"
        (reset)="onReset($event)"

        adfHTMLDomElement
        novalidate
      >
        <adf-group-container
          [model]="model"
          [ngClass]="model.css.content"
        >
        </adf-group-container>
      </form>
    </div>
  `,
  inputs: ['model'],
  outputs: ['submit', 'reset'],
  providers: [
    {
      provide: DynamicFormControlComponentBase,
      useExisting: MaterialFormComponent
    },  // required to support 'adfHTMLDomElement' directive
    {provide: DynamicFormFormControlComponent, useExisting: MaterialFormComponent}
  ]
})
export class MaterialFormComponent extends DynamicFormFormControlComponent {
  model: GroupModel;
  options: GroupOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
