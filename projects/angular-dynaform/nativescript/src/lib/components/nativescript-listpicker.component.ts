import {Component} from '@angular/core';

// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueModel
} from '@angular-dynaform/core';

@Component({
  selector: 'adf-nativescript-listpicker',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <Label
      *ngIf="model.local.label"
      class="adf-front-label"
      [ngClass]="model.css.label"
      [text]="model.local.label"
      ></Label>
    <adf-custom-listpicker
      [formControlName]="model.key"
      [valueOptions]="model.local.valueOptions"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    <!-- TODO: not implemented: "options.multiple" -->
    </adf-custom-listpicker>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptListPickerComponent}]
})
export class NativeScriptListPickerComponent extends DynamicFormControlComponent<ValueModel> {
  model!: ValueModel;
  options!: ControlSelectOptions;
}
