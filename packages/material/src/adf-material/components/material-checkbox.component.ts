// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-checkbox-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <label
        [attr.for]="model.id"
        [ngClass]="model.css.label"
      >
        <mat-checkbox
          [formControlName]="model.key"
          [id]="model.id"
          [ngClass]="model.css.control"
          adfHTMLDomElement
        >
        </mat-checkbox>
        <span [ngClass]="model.css.label"
          [innerHTML]="model.local.label">
        </span>
      </label>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialCheckboxComponent}]
})
export class MaterialCheckboxComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSwitchOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
