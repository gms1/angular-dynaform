import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlType, DynamicForm, FormConfig, FormModel, ModelType, DynamicFormService} from '@angular-dynaform/core';


@Component({
  selector: 'app-basic-form',
  template: `
    <adf-form [model]="formModel" (adfSubmit)="onSubmit($event)">
    </adf-form>
  `
})
export class BasicFormComponent {
  @ViewChild(DynamicForm) dynaForm!: DynamicForm;
  formModel: FormModel;

  readonly formConfig: FormConfig = {
    id: 'basic',
    updateOn: 'change',
    options: {
      group: [
        {
          id: 'name',
          modelType: ModelType.MODEL_VALUE,
          controlType: ControlType.CONTROL_INPUT,
          options: {label: 'name', placeholder: 'Enter your name', maxLength: 30, minLength: 4},
          validators: ['required', 'minLength', 'maxLength']
        },
        {
          id: 'submit',
          modelType: ModelType.MODEL_NULL,
          controlType: ControlType.CONTROL_BUTTON,
          options: {label: 'Submit'},
          action: 'submit'
        }
      ]
    }
  };

  name?: string;

  constructor(private dynamicFormService: DynamicFormService) {
    this.formModel = this.dynamicFormService.createFormModel(this.formConfig);
  }

  onSubmit(event: Event): void {
    this.name = this.formModel.value.name;
  }
}

@Component({
  selector: 'app-basic-form-container',
  template: `
<div class="basic-form-example">
  <mat-card class="mat-card">
    <mat-card-header>
      <mat-card-title *ngIf="formComponent.name; else fresh">Basic Form for {{formComponent.name}}</mat-card-title>
      <ng-template #fresh>Basic Form</ng-template>
    </mat-card-header>
    <mat-card-content>
      <app-basic-form></app-basic-form>
    </mat-card-content>
  </mat-card>
</div>
  `,
  styles: []
})
export class BasicFormContainerComponent {
  @ViewChild(BasicFormComponent) formComponent!: BasicFormComponent;
}
