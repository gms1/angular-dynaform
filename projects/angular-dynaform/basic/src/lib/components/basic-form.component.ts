// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  DynamicFormControlComponentBase,
  DynamicFormFormControlComponent,
  GroupModel,
  GroupOptions,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-basic-form-component',
  template: `
    <div>
      <form
        [formGroup]="model.ngControl"
        [id]="model.id"
        [ngClass]="model.css.control"
        (ngSubmit)="onSubmit($event)"
        (reset)="onReset($event)"
        adfHTMLDomElement
        novalidate
      >
        <div [ngClass]="model.css.content">
          <ng-container
            *ngFor="let item of model.items"
            adfControlComponent
            [model]="item"
          ></ng-container>
        </div>
      </form>
    </div>
  `,
  inputs: ['model'],
  outputs: ['submit', 'reset'],
  providers: [
    {
      provide: DynamicFormControlComponentBase,
      useExisting: BasicFormComponent,
    }, // required to support 'adfHTMLDomElement' directive
    { provide: DynamicFormFormControlComponent, useExisting: BasicFormComponent },
  ],
})
export class BasicFormComponent extends DynamicFormFormControlComponent {
  model!: GroupModel;
  options!: GroupOptions;
}
