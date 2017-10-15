import {OnChanges, SimpleChanges} from '@angular/core';

// TODO: create a custom component using ValueControlAccessor and use it here to modify the form model

// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlSelectOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-select-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [ngClass]="model.css.container"
  >
    <Label
      *ngIf="model.local.label"
      [attr.for]="model.id"
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
  model: ValueControlModel;
  options: ControlSelectOptions;

  listPickerItems: Array<string>;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.model.local || !this.model.local.valueOptions) {
      this.listPickerItems = [];
    } else {
      this.listPickerItems = this.model.local.valueOptions.map((opt) => opt.label);
    }
    super.ngOnChanges(changes);
  }
}
