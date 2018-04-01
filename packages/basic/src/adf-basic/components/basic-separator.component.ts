// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  NullControlModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-separator-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <span [ngClass]="model.css.control"
        [innerHTML]="model.local.label"
      ></span>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicSeparatorComponent}]
})
export class BasicSeparatorComponent extends DynamicFormControlComponent<NullControlModel> {
  model!: NullControlModel;
  options!: ControlBaseOptions;
}
