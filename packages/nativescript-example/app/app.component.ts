
import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {DynamicForm, DynamicFormService, FormModel} from '@angular-dynaform/core';
import {
  mainExampleConfig,
  mainExampleFormLanguages,
  mainExampleFormModelData,
  mainExampleAppModelData
} from './app.config';

@Component({
  selector: 'ns-app',

  template: `
  <StackLayout class="page">
    <ActionBar [title]="title" icon="" class="action-bar">
    </ActionBar>
    <adf-form
      [model]="model"
      (adfSubmit)="onSubmit()"
      (adfReset)="onReset()"
    >
    </adf-form>
  </StackLayout>
    `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DynamicForm) form: DynamicForm;

  title: string = 'Angular DynaForm for NativeScript';
  model: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {
    this.model = this.dynamicFormService.createFormModel(mainExampleConfig);
  }

  onSubmit(): void {
    console.log('SUBMITTED');
    console.log('  form model: [', JSON.stringify(this.form.value, undefined, 2), ']');
    console.log('  app model: [', JSON.stringify(this.form.valueToAppModel({}), undefined, 2), ']');
  }
  onReset(): void {
    console.log('RESETTED');
    console.log('  form model: [', JSON.stringify(this.form.value, undefined, 2), ']');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.form.initValue(formModelData));
      this.form.initValueFromAppModel(mainExampleAppModelData);
    });
  }
}
