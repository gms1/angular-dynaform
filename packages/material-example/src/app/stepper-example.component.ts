import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {
  DynamicForm,
  DynamicFormService,
  FormModel,
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions,
  ControlConfig,
  ControlType,
  FormConfig,
  ModelType
} from '@angular-dynaform/core';


export const stepperExampleConfig: FormConfig = {
  id: 'stepperExampleForm',
  updateOn: 'blur',
  options: {
    group: [{
      id: 'stepper',
      modelType: ModelType.MODEL_SUBSET,
      controlType: ControlType.CONTROL_STEPPER,
      options: {
        label: 'Stepper',
        group: [
          {
            id: 'tab1',
            modelType: ModelType.MODEL_SUBSET,
            controlType: ControlType.CONTROL_DIVISION,
            options: {
              label: 'Tab1',
              group: [
                {
                  id: 'tab1Field1',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field1'}
                },
                {
                  id: 'tab1Field2',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field2'}
                },
                {
                  id: 'tab1Field3',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field3'}
                }
              ]
            }
          },
          {
            id: 'tab2',
            modelType: ModelType.MODEL_SUBSET,
            controlType: ControlType.CONTROL_DIVISION,
            options: {
              label: 'Tab2',
              group: [
                {
                  id: 'tab2Field1',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field1'}
                },
                {
                  id: 'tab2Field2',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field2'}
                },
                {
                  id: 'tab2Field3',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field3'}
                }
              ]
            }
          },
          {
            id: 'tab3',
            modelType: ModelType.MODEL_SUBSET,
            controlType: ControlType.CONTROL_DIVISION,
            options: {
              label: 'Tab3',
              group: [
                {
                  id: 'tab3Field1',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field1'}
                },
                {
                  id: 'tab3Field2',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field2'}
                },
                {
                  id: 'tab3Field3',
                  modelType: ModelType.MODEL_VALUE,
                  controlType: ControlType.CONTROL_CHECKBOX,
                  options: {label: 'Field3'}
                },
                {
                  id: 'buttondivision',
                  modelType: ModelType.MODEL_SUBSET,
                  controlType: [ControlType.CONTROL_DIVISION],
                  options: {
                    group: [{
                      key: 'submitButon',
                      id: 'submit',
                      modelType: ModelType.MODEL_NULL,
                      controlType: ControlType.CONTROL_BUTTON,
                      options: {label: 'Submit'},
                      action: 'submit'
                    }],
                    css: {content: 'button-division-content'}
                  }
                }
              ]
            }
          }
        ]
      }
    }]
  }
};


@Component({
  selector: 'stepper-example',
  template: `
<div class="stepper-example">
  <mat-card class="mat-card">
    <mat-card-header>
      <mat-card-title><h2>Stepper Example</h2></mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <adf-form
        [model]="model"
        (adfSubmit)="onSubmit()"
        (adfReset)="onReset()"
      >
      </adf-form>
    </mat-card-content>
  </mat-card>
</div>
  `,
  styles: []
})
export class StepperExampleComponent implements AfterViewInit {
  @ViewChild(DynamicForm) form: DynamicForm;

  model: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {
    this.model = this.dynamicFormService.createFormModel(stepperExampleConfig);
  }

  onSubmit(): void {
    console.log('SUBMITTED');
    console.log('  form model: [', JSON.stringify(this.form.value, undefined, 2), ']');
  }
  onReset(): void {
    console.log('RESETTED');
    console.log('  form model: [', JSON.stringify(this.form.value, undefined, 2), ']');
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.form.initValue({}); });
  }
}
