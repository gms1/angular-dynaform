// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSwitchOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-material-switch-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <mat-slide-toggle
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        adfHTMLDomElement
        [required]="options.required ? '' : null"
      ></mat-slide-toggle>
      <adf-error-container [model]="model"></adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialSwitchComponent }],
})
export class MaterialSwitchComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSwitchOptions;
}
