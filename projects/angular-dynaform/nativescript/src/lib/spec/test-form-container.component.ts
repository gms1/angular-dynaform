// tslint:disable component-selector
import { Component, ViewChild } from '@angular/core';

import { DynamicForm, DynamicFormService, FormModel } from '@angular-dynaform/core';

@Component({
  selector: 'adf-test-form-container-component',
  template: `
    <div>
      <adf-form [model]="model" (adfSubmit)="onSubmit()" (adfReset)="onReset()"></adf-form>
    </div>
  `,
  styles: [],
})
export class TestFormContainerComponent {
  @ViewChild(DynamicForm) form!: DynamicForm;
  model!: FormModel;

  constructor(public dynamicFormService: DynamicFormService) {}

  onSubmit(event: Event): void {}
  onReset(): void {}
}
