// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-radiogroup-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
      [hidden]="model.hidden"
    >
      <mat-radio-group
        [id]="model.id"
        [formControlName]="model.key"
        ngDefaultControl
        adfHTMLDomElement
        [ngClass]="model.css.control"
      >
        <mat-radio-button *ngFor="let opt of model.local.valueOptions"
          [value]="opt.value"
        >
          <span [innerHTML]="opt.label"></span>
        </mat-radio-button>
      </mat-radio-group>
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialRadioGroupComponent}]
})
export class MaterialRadioGroupComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSelectOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
