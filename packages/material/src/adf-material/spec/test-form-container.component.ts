import {Component, ViewChild} from '@angular/core';

import {DynamicForm, DynamicFormService, FormModel} from '@angular-dynaform/core';

@Component({
  selector: 'form-container-test-component',
  template: `
<div>
  <adf-form
    [model]="model"
    (adfSubmit)="onSubmit()"
    (adfReset)="onReset()"
  >
  </adf-form>
</div>
  `,
  styles: []
})
export class TestFormContainerComponent {
  @ViewChild(DynamicForm) form: DynamicForm;
  model: FormModel;

  constructor(public dynamicFormService: DynamicFormService) {}

  onSubmit(event: Event): void {}
  onReset(): void {}
}
