// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  NullModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-basic-button-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <button
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        [type]="buttonType"
        adfHTMLDomElement
        ngDefaultControl
      >
        <span [ngClass]="model.css.label" [innerHTML]="model.local.label"></span>
      </button>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: BasicButtonComponent }],
})
export class BasicButtonComponent extends DynamicFormControlComponent<NullModel> {
  model!: NullModel;
  options!: ControlBaseOptions;
}
