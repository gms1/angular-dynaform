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
  selector: 'adf-material-division-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <div
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
        <adf-error-container [model]="model">
        </adf-error-container>
        <adf-group-container
          [model]="model"
          [ngClass]="model.css.content"
        >
        </adf-group-container>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialDivisionComponent}]
})
export class MaterialDivisionComponent extends DynamicFormControlComponent<GroupModelBase> {
  model: GroupModelBase;
  options: GroupOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
