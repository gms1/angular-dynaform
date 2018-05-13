// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  NullControlModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '../../public_api';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-test-button-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <button
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        [type]="buttonType"

        adfHTMLDomElement
        ngDefaultControl
      >
      <span [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></span>
      </button>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: TestButtonComponent}]
})
export class TestButtonComponent extends DynamicFormControlComponent<NullControlModel> {
  model!: NullControlModel;
  options!: ControlBaseOptions;
}
