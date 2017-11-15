// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ArrayModel,
  ArrayOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-array-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [ngClass]="model.css.container"
  >
    <StackLayout
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
      <StackLayout
        *ngIf="model.local.label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></StackLayout>
      <adf-group-container
        *ngIf="model.header"
        [model]="model.header"
        [ngClass]="model.header.css.content"
      >
      </adf-group-container>
      <adf-error-container [model]="model">
      </adf-error-container>
      <StackLayout
        [formArrayName]="model.key"
        [ngClass]="model.css.content"
      >
        <ng-container
          *ngFor="let item of model.items; let i=index"
          [formGroupName]="i"
        >
          <adf-group-container
            [model]="item"
            [ngClass]="item.css.content"
          >
          </adf-group-container>
        </ng-container>
      </StackLayout>
      <adf-group-container
        *ngIf="model.footer"
        [model]="model.footer"
        [ngClass]="model.footer.css.content"
      >
      </adf-group-container>
    </StackLayout>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptArrayComponent}]
})
export class NativeScriptArrayComponent extends DynamicFormControlComponent<ArrayModel> {
  model: ArrayModel;
  options: ArrayOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
