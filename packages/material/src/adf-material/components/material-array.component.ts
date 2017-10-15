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
  selector: 'adf-material-array-component',
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
        ></legend>
        <adf-group-container
          *ngIf="model.header"
          [ngClass]="model.header.css.content"
          [model]="model.header"
        >
        </adf-group-container>
        <adf-error-container [model]="model">
        </adf-error-container>
        <div
          [formArrayName]="model.key"
          [ngClass]="model.css.content"
        >
          <ng-container
            *ngFor="let item of model.items; let i=index"
            [formGroupName]="i"
          >
            <adf-group-container
              [ngClass]="item.css.content"
              [model]="item"
            >
            </adf-group-container>
          </ng-container>
        </div>
        <adf-group-container
          *ngIf="model.footer"
          [ngClass]="model.footer.css.content"
          [model]="model.footer"
        >
        </adf-group-container>
      </fieldset>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialArrayComponent}]
})
export class MaterialArrayComponent extends DynamicFormControlComponent<ArrayModel> {
  model: ArrayModel;
  options: ArrayOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
