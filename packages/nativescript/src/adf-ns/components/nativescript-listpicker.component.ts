import {Component, OnChanges, SimpleChanges} from '@angular/core';

// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  ValueControlModel
} from '@angular-dynaform/core';

@Component({
  selector: 'adf-nativescript-listpicker-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <Label
      *ngIf="model.local.label"
      class="adf-front-label"
      [ngClass]="model.css.label"
      [innerHTML]="model.local.label"
    ></Label>
    <adf-custom-listpicker
      [formControlName]="model.key"
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
      [items]="listPickerItems"
    >
    <!-- TODO: missing properties: [attr.multiple]="options.multiple" -->
    </adf-custom-listpicker>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptListPickerComponent}]
})
export class NativeScriptListPickerComponent extends DynamicFormControlComponent<ValueControlModel> implements
    OnChanges {
  model!: ValueControlModel;
  options!: ControlSelectOptions;

  listPickerItems: Array<string> = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.model.local || !this.model.local.valueOptions) {
      this.listPickerItems = [];
    } else {
      this.listPickerItems = this.model.local.valueOptions.map((opt) => opt.label);
    }
    super.ngOnChanges(changes);
  }
}
