// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlInputOptions,
  DynamicForm,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicFormService,
  ValueModel,
} from '@angular-dynaform/core';
import { Component, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';

// TODO: support numeric input

const TEXTFIELD_DEFAULT_MAXLENGTH = 100;
const TEXTFIELD_DEFAULT_KEYBOARDTYPE = null;

@Component({
  selector: 'adf-nativescript-textfield',
  template: `
    <StackLayout [formGroup]="model.ngGroup" [visibility]="model.hidden ? 'collapsed' : 'visible'">
      <Label
        *ngIf="model.local.label"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [text]="model.local.label"
      ></Label>
      <TextField
        [formControlName]="model.key"
        [id]="model.id"
        [secure]="opts.secure"
        [editable]="!options.readOnly"
        [maxLength]="opts.maxLength"
        [hint]="model.local.placeholder"
        [keyboardType]="opts.keyboardType"
        [ngClass]="model.css.control"
        adfNSDomElement
        [required]="options.required"
      ></TextField>
      <adf-error-container [model]="model"></adf-error-container>
    </StackLayout>
  `,
  inputs: ['model'],
  providers: [
    { provide: DynamicFormControlComponentBase, useExisting: NativeScriptTextFieldComponent },
  ],
})
export class NativeScriptTextFieldComponent extends DynamicFormControlComponent<ValueModel>
  implements OnInit, OnChanges {
  model!: ValueModel;
  options!: ControlInputOptions;
  opts!: { [key: string]: any };

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
    this.updateOpts();
  }

  setOptsDefaults(): void {
    this.opts.secure = false;
    this.opts.maxLength = TEXTFIELD_DEFAULT_MAXLENGTH;
    this.opts.keyboardType = TEXTFIELD_DEFAULT_KEYBOARDTYPE;
  }

  updateOpts(): void {
    this.opts = {};
    this.setOptsDefaults();
    this.opts.maxLength = this.options.maxLength
      ? this.options.maxLength
      : TEXTFIELD_DEFAULT_MAXLENGTH;
    if (this.options.inputType) {
      if (this.options.inputType === 'password') {
        this.opts.secure = true;
        this.opts.keyboardType = TEXTFIELD_DEFAULT_KEYBOARDTYPE;
      } else {
        this.opts.secure = false;
        switch (this.options.inputType) {
          case 'datetime-local':
            this.opts.keyboardType = 'datetime';
            break;
          case 'number':
            this.opts.keyboardType = 'number';
            break;
          case 'url':
            this.opts.keyboardType = 'url';
            break;
          case 'email':
            this.opts.keyboardType = 'email';
            break;
          case 'phone':
            this.opts.keyboardType = 'phone';
            break;
          default:
            this.opts.keyboardType = TEXTFIELD_DEFAULT_KEYBOARDTYPE;
            break;
        }
      }
    }
  }

  ngOnInit() {
    this.updateOpts();
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateOpts();
    super.ngOnChanges(changes);
  }
}
