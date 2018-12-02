import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {DynamicForm, DynamicFormService, FormModel, ControlType, FormConfig, ModelType} from '@angular-dynaform/core';


export const tabGroupExampleConfig: FormConfig = {
  id: 'tabGroupExampleForm',
  updateOn: 'blur',
  options: {
    group: [
      {
        id: 'header',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_DIVISION,
        options: {
          group: [{
            id: 'name',
            modelType: ModelType.MODEL_VALUE,
            controlType: ControlType.CONTROL_INPUT,
            options: {label: 'Name', placeholder: 'Enter the name'}
          }]
        }
      },
      {
        id: 'tabGroup',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_TABGROUP,  // use tabgroup control
        options: {
          label: 'TabGroup',
          matTabGroupDynamicHeight: true,
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
                    options: {label: 'Field 1'}
                  },
                  {
                    id: 'tab1Field2',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: {label: 'Field 2'}
                  },
                  {
                    id: 'tab1Field3',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: {label: 'Field 3'}
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
                    options: {label: 'Field 4'}
                  },
                  {
                    id: 'tab2Field2',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: {label: 'Field 5'}
                  },
                  {
                    id: 'tab2Field3',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: {label: 'Field 6'}
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
                    options: {label: 'Field 7'}
                  },
                  {
                    id: 'tab3Field2',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: {label: 'Field 8'}
                  },
                  {
                    id: 'tab3Field3',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: {label: 'Field 9'}
                  }
                ]
              }
            }
          ]
        }
      },
      {
        id: 'buttondivision',
        modelType: ModelType.MODEL_SUBSET,
        controlType: [ControlType.CONTROL_DIVISION],
        options: {
          group: [
            {
              key: 'clearButton',
              id: 'clear',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: {label: 'Clear'},
              action: 'clear'
            },
            {
              key: 'separator',
              id: 'separatorMainButtons',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_SEPARATOR,
              options: {css: {container: 'button-separator'}}
            },
            {
              key: 'resetButton',
              id: 'reset',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: {label: 'Reset'},
              action: 'reset'
            },
            {
              key: 'submitButton',
              id: 'submit',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: {label: 'Submit'},
              action: 'submit'
            }
          ],
          css: {content: 'button-division-content'}
        }
      }
    ]
  }
};


@Component({
  selector: 'app-tabgroup-example',
  template: `
<div class="tabgroup-example">
  <mat-card class="mat-card">
    <mat-card-header>
      <mat-card-title><h2>TabGroup Example</h2></mat-card-title>
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
export class TabGroupExampleComponent implements AfterViewInit {
  @ViewChild(DynamicForm) form!: DynamicForm;

  model: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {
    this.model = this.dynamicFormService.createFormModel(tabGroupExampleConfig);
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
    setTimeout(() => {
      this.form.initValue({});
    });
  }
}
