import {Component, Type, ViewChild} from '@angular/core';

import {DynamicForm, DynamicFormService, FormConfig, FormModel} from '@angular-dynaform/core';

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
  @ViewChild(DynamicForm) form?: DynamicForm;

  model?: FormModel;

  _formConfig?: FormConfig;
  get formConfig(): FormConfig|undefined { return this._formConfig; }
  set formConfig(formConfig: FormConfig|undefined) {
    this._formConfig = formConfig;
    this.model = undefined;
    if (this._formConfig) {
      this.model = this.dynamicFormService.createFormModel(this._formConfig);
    }
  }

  constructor(public dynamicFormService: DynamicFormService) {}

  onSubmit(event: Event): void {}
  onReset(): void {}
}
