// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-radiogroup-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <fieldset
        [id]="model.id"
        ngDefaultControl
        adfHTMLDomElement
        [ngClass]="model.css.control"
      >
        <label *ngFor="let opt of model.local.valueOptions">
          <input
            [formControlName]="model.key"
            type="radio"
            [value]="opt.value"
          />
          <span [innerHTML]="opt.label"></span>
        </label>
      </fieldset>
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-back-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicRadioGroupComponent}]
})
export class BasicRadioGroupComponent extends DynamicFormControlComponent<ValueControlModel> {
  model!: ValueControlModel;
  options!: ControlSelectOptions;
}