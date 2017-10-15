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
        <adf-group-container
          [model]="model"
          [ngClass]="model.css.content"
        >
        </adf-group-container>
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
