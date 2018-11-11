// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  NullModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '../../public_api';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-test-separator-component',
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
  providers: [{provide: DynamicFormControlComponentBase, useExisting: TestSeparatorComponent}]
})
export class TestSeparatorComponent extends DynamicFormControlComponent<NullModel> {
  model!: NullModel;
  options!: ControlBaseOptions;
}
