import {Component} from '@angular/core';
import {
  DynamicForm,
  DynamicFormService,
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions
} from '@angular-dynaform/core';


// TODO: dynamicHeight attribute

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
        <mat-tab-group adfHTMLDomElement [ngClass]="model.css.content">
          <mat-tab *ngFor="let item of model.items;" >
            <ng-template mat-tab-label>{{item.local.label}}</ng-template>
            <ng-template adfControlComponent [model]="item" >
            </ng-template>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialTabGroupComponent}]
})
export class MaterialTabGroupComponent extends DynamicFormControlComponent<GroupModelBase> {
  model: GroupModelBase;
  options: GroupOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
