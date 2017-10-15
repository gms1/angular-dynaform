import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {DynamicForm, DynamicFormService, FormModel} from '@angular-dynaform/core';
import {formConfig, formLanguages, formModelData, appModelData} from './app.config';

@Component({
  selector: 'app-root',
  template: `
<div class="app">
  <h1>{{title}}</h1>
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
export class AppComponent implements AfterViewInit {
  @ViewChild(DynamicForm) form: DynamicForm;

  title: string = 'Angular DynaForm for Basic HTML';
  model: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {
    this.model = this.dynamicFormService.createFormModel(formConfig, formLanguages.en);
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
      // this.form.initValue(formModelData);
      this.form.initValueFromAppModel(appModelData);
    });
  }
}
