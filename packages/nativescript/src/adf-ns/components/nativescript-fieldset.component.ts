// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  GroupOptions
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-fieldset-component',
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
      >
      </StackLayout>
      <adf-error-container [model]="model">
      </adf-error-container>
      <div [ngClass]="model.css.content">
        <ng-container *ngFor="let item of model.items;" adfControlComponent [model]="item" >
        </ng-container>
      </div>
    </StackLayout>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptFieldsetComponent}]
})
export class NativeScriptFieldsetComponent extends DynamicFormControlComponent<GroupModelBase> {
  model: GroupModelBase;
  options: GroupOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
