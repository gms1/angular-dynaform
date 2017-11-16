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

// NOTES: template works for GroupModel and SubsetModel

@Component({
  selector: 'adf-material-fieldset-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
      [hidden]="model.hidden"
    >
      <fieldset
        [id]="model.id"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
        <legend
          *ngIf="model.local.label"
          [ngClass]="model.css.label"
          [innerHTML]="model.local.label"
        >
        </legend>
        <adf-error-container [model]="model">
        </adf-error-container>
        <div [ngClass]="model.css.content">
          <ng-container *ngFor="let item of model.items;" adfControlComponent [model]="item" >
          </ng-container>
        </div>
      </fieldset>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialFieldsetComponent}]
})
export class MaterialFieldsetComponent extends DynamicFormControlComponent<GroupModelBase> {
  model: GroupModelBase;
  options: GroupOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
