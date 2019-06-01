import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  DynamicForm,
  DynamicFormService,
  FormModel,
  ControlType,
  FormConfig,
  ModelType,
} from '@angular-dynaform/core';

@Component({
  selector: 'app-stepper-example',
  template: `
    <div class="stepper-example">
      <mat-card class="mat-card">
        <mat-card-header>
          <mat-card-title>
            <h2>{{ title }}</h2>
            <h4>{{ subTitle }}</h4>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <adf-form [model]="model" (adfSubmit)="onSubmit()" (adfReset)="onReset()"></adf-form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [],
})
export class StepperExampleComponent implements OnInit {
  @ViewChild(DynamicForm, { static: true }) form!: DynamicForm;

  @Input()
  title!: string;

  @Input()
  subTitle!: string;

  @Input()
  config!: FormConfig;

  model!: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {}

  onSubmit(): void {
    console.log('SUBMITTED');
    console.log('  form model: [', JSON.stringify(this.form.value, undefined, 2), ']');
  }
  onReset(): void {
    console.log('RESETTED');
    console.log('  form model: [', JSON.stringify(this.form.value, undefined, 2), ']');
  }

  ngOnInit(): void {
    this.model = this.dynamicFormService.createFormModel(this.config);
  }
}

export const stepperHorizantalExample1Config: FormConfig = {
  id: 'stepperExampleForm1',
  updateOn: 'blur',
  options: {
    group: [
      {
        id: 'stepper',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_STEPPER, // use stepper group-control
        options: {
          label: 'Stepper',
          group: [
            {
              id: 'step1',
              modelType: ModelType.MODEL_GROUP,
              controlType: ControlType.CONTROL_DIVISION,
              options: {
                label: 'Step1',
                group: [
                  {
                    id: 'Field1',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_RADIOGROUP,
                    options: {
                      valueOptions: [
                        { value: '11', label: '1' },
                        { value: '12', label: '2' },
                        { value: '13', label: '3' },
                      ],
                    },
                    validators: ['required'],
                  },
                ],
              },
            },
            {
              id: 'step2',
              modelType: ModelType.MODEL_GROUP,
              controlType: ControlType.CONTROL_DIVISION,
              options: {
                label: 'Step2',
                group: [
                  {
                    id: 'Field2',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_RADIOGROUP,
                    options: {
                      valueOptions: [
                        { value: '21', label: '4' },
                        { value: '22', label: '5' },
                        { value: '23', label: '6' },
                      ],
                    },
                    validators: ['required'],
                  },
                ],
              },
            },
            {
              id: 'step3',
              modelType: ModelType.MODEL_GROUP,
              controlType: ControlType.CONTROL_DIVISION,
              options: {
                label: 'Step3',
                group: [
                  {
                    id: 'Field3',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_RADIOGROUP,
                    options: {
                      valueOptions: [
                        { value: '31', label: '7' },
                        { value: '32', label: '8' },
                        { value: '33', label: '9' },
                      ],
                    },
                    validators: ['required'],
                  },
                ],
              },
            },
          ],
        },
      },
      {
        id: 'buttondivision',
        modelType: ModelType.MODEL_SUBSET,
        controlType: [ControlType.CONTROL_DIVISION],
        options: {
          group: [
            {
              id: 'prev',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: { label: 'Prev' },
              action: 'stepperPrev',
            },
            {
              id: 'next',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: { label: 'Next' },
              action: 'stepperNext',
            },
            {
              id: 'separatorButtons',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_SEPARATOR,
              options: { css: { container: 'button-separator' } },
            },
            {
              id: 'submit',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: { label: 'Submit' },
              action: 'submit',
            },
          ],
          css: { content: 'button-division-content' },
        },
      },
    ],
  },
};

export const stepperHorizantalExample2Config: FormConfig = {
  id: 'stepperExampleForm2',
  updateOn: 'blur',
  options: {
    group: [
      {
        id: 'stepper',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_STEPPER, // use stepper group-control
        options: {
          label: 'Stepper',
          group: [
            {
              id: 'step1',
              modelType: ModelType.MODEL_GROUP,
              controlType: ControlType.CONTROL_DIVISION,
              options: {
                label: 'Step1',
                group: [
                  {
                    id: 'Field1',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_RADIOGROUP,
                    options: {
                      valueOptions: [
                        { value: '11', label: '1' },
                        { value: '12', label: '2' },
                        { value: '13', label: '3' },
                      ],
                    },
                    validators: ['required'],
                  },
                  {
                    id: 'buttondivisionStep1',
                    modelType: ModelType.MODEL_SUBSET,
                    controlType: [ControlType.CONTROL_DIVISION],
                    options: {
                      group: [
                        {
                          id: 'prevStep1',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Prev' },
                          action: 'stepperPrev',
                        },
                        {
                          id: 'nextStep1',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Next' },
                          action: 'stepperNext',
                        },
                        {
                          id: 'separatorStep1Buttons',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_SEPARATOR,
                          options: { css: { container: 'button-separator' } },
                        },
                        {
                          id: 'submitStep1',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Submit' },
                          action: 'submit',
                        },
                      ],
                      css: { content: 'button-division-content' },
                    },
                  },
                ],
              },
            },
            {
              id: 'step2',
              modelType: ModelType.MODEL_GROUP,
              controlType: ControlType.CONTROL_DIVISION,
              options: {
                label: 'Step2',
                group: [
                  {
                    id: 'Field2',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_RADIOGROUP,
                    options: {
                      valueOptions: [
                        { value: '21', label: '4' },
                        { value: '22', label: '5' },
                        { value: '23', label: '6' },
                      ],
                    },
                    validators: ['required'],
                  },
                  {
                    id: 'buttondivisionStep2',
                    modelType: ModelType.MODEL_SUBSET,
                    controlType: [ControlType.CONTROL_DIVISION],
                    options: {
                      group: [
                        {
                          id: 'prevStep2',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Prev' },
                          action: 'stepperPrev',
                        },
                        {
                          id: 'nextStep2',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Next' },
                          action: 'stepperNext',
                        },
                        {
                          id: 'separatorStep2Buttons',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_SEPARATOR,
                          options: { css: { container: 'button-separator' } },
                        },
                        {
                          id: 'submitStep2',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Submit' },
                          action: 'submit',
                        },
                      ],
                      css: { content: 'button-division-content' },
                    },
                  },
                ],
              },
            },
            {
              id: 'step3',
              modelType: ModelType.MODEL_GROUP,
              controlType: ControlType.CONTROL_DIVISION,
              options: {
                label: 'Step3',
                group: [
                  {
                    id: 'Field3',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_RADIOGROUP,
                    options: {
                      valueOptions: [
                        { value: '31', label: '7' },
                        { value: '32', label: '8' },
                        { value: '33', label: '9' },
                      ],
                    },
                    validators: ['required'],
                  },
                  {
                    id: 'buttondivisionStep3',
                    modelType: ModelType.MODEL_SUBSET,
                    controlType: [ControlType.CONTROL_DIVISION],
                    options: {
                      group: [
                        {
                          id: 'prevStep3',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Prev' },
                          action: 'stepperPrev',
                        },
                        {
                          id: 'nextStep3',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Next' },
                          action: 'stepperNext',
                        },
                        {
                          id: 'separatorStep3Buttons',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_SEPARATOR,
                          options: { css: { container: 'button-separator' } },
                        },
                        {
                          id: 'submitStep3',
                          modelType: ModelType.MODEL_NULL,
                          controlType: ControlType.CONTROL_BUTTON,
                          options: { label: 'Submit' },
                          action: 'submit',
                        },
                      ],
                      css: { content: 'button-division-content' },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

@Component({
  selector: 'app-stepper-examples',
  template: `
    <div class="stepper-examples">
      <app-stepper-example
        [title]="title1"
        [subTitle]="subTitle1"
        [config]="config1"
      ></app-stepper-example>
      <app-stepper-example
        [title]="title2"
        [subTitle]="subTitle2"
        [config]="config2"
      ></app-stepper-example>
    </div>
  `,
  styles: [],
})
export class StepperExamplesComponent {
  title1 = 'Horizontal Stepper Example 1';
  subTitle1 = 'buttons below stepper';
  config1: FormConfig = stepperHorizantalExample1Config;
  title2 = 'Horizontal Stepper Example 2';
  subTitle2 = 'buttons inside stepper';
  config2: FormConfig = stepperHorizantalExample2Config;
}
