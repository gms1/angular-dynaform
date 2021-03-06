// tslint:disable use-input-property-decorator use-output-property-decorator use-life-cycle-interface
import {
  NullModel,
  ControlBaseOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-material-button-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <button
        mat-raised-button
        [formControlName]="model.key"
        [id]="model.id"
        [ngClass]="model.css.control"
        [type]="buttonType"
        adfHTMLDomElement
        ngDefaultControl
      >
        <span [ngClass]="model.css.control" [innerHTML]="model.local.label"></span>
      </button>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialButtonComponent }],
})
export class MaterialButtonComponent extends DynamicFormControlComponent<NullModel> {
  model!: NullModel;
  options!: ControlBaseOptions;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      if (this.model.ngControl.disabled) {
        this.model.ngControl.enable({ emitEvent: false });
        this.model.ngControl.disable();
      } else {
        this.model.ngControl.disable({ emitEvent: false });
        this.model.ngControl.enable();
      }
    });
  }
}
