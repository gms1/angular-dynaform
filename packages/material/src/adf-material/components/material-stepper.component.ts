import {Component} from '@angular/core';
import {
  DynamicForm,
  DynamicFormService,
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions
} from '@angular-dynaform/core';

// TODO: vertical stepper
// TODO: support for prev/next buttons/actions
// TODO(?): attributes on stepper: linear
// TODO(?): attributes on step: optional, editable, completed?
@Component({
  selector: 'adf-material-tab-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
      [hidden]="model.hidden"
    >
      <div
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
        <adf-error-container [model]="model">
        </adf-error-container>
        <mat-horizontal-stepper adfHTMLDomElement [ngClass]="model.css.content">
          <mat-step *ngFor="let item of model.items; let i=index"
            [stepControl]="item.ngControl"
          >
            <ng-template matStepLabel>{{item.local.label}}</ng-template>
            <ng-template adfControlComponent [model]="item" >
            </ng-template>
          </mat-step>
        </mat-horizontal-stepper>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialStepperComponent}]
})
export class MaterialStepperComponent extends DynamicFormControlComponent<GroupModelBase> {
  model: GroupModelBase;
  options: GroupOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
