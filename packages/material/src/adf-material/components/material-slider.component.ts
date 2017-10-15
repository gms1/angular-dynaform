// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSliderOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-material-input-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
    >
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <mat-slider
        [formControlName]="model.key"
        [id]="model.id"
        [min]="options.min"
        [max]="options.max"
        [step]="options.step"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
      </mat-slider>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialSliderComponent}]
})
export class MaterialSliderComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlSliderOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
