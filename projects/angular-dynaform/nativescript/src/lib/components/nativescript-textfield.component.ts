// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlInputOptions,
  DynamicForm,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component, ElementRef, OnChanges} from '@angular/core';

// TODO: implement CustomTextView to support numeric input

@Component({
  selector: 'adf-nativescript-textfield-component',
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
    >
    </Label>
    <TextField
      [formControlName]="model.key"
      [id]="model.id"
      [secureproperty]="opts.secureProperty"
      [editable]="!options.readOnly"
      [maxLength]="options.maxLength"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
    <!--
    [hint]="options.local.placeholder"
    -->
    </TextField>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptTextFieldComponent}]
})
export class NativeScriptTextFieldComponent extends DynamicFormControlComponent<ValueControlModel> implements
    OnChanges {
  model!: ValueControlModel;
  options!: ControlInputOptions;
  opts: {[key: string]: any};

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
    this.opts = {};
    this.opts.secureProperty = false;
  }

  ngOnChanges(): void {
    if (this.options) {
      this.opts.secureProperty = this.options.inputType === 'password' ? true : false;
    }
  }
}
