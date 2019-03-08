// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  DynamicFormControlComponentBase,
  DynamicFormFormControlComponent,
  GroupModel,
  GroupOptions,
} from '../../public_api';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-test-form-component',
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
      useExisting: TestFormControlComponent,
    }, // required to support 'adfHTMLDomElement' directive
    { provide: DynamicFormFormControlComponent, useExisting: TestFormControlComponent },
  ],
})
export class TestFormControlComponent extends DynamicFormFormControlComponent {
  model!: GroupModel;
  options!: GroupOptions;
}
