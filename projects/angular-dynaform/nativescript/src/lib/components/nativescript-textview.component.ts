// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ControlTextareaOptions,
  DynamicForm,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicFormService,
  ValueModel
} from '@angular-dynaform/core';
import {Component, ElementRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';

const TEXTVIEW_DEFAULT_MAXLENGTH = 250;
const TEXTVIEW_DEFAULT_COLS = 30;
const TEXTVIEW_DEFAULT_ROWS = 10;

@Component({
  selector: 'adf-nativescript-textview',
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
    <TextView
      [formControlName]="model.key"
      [id]="model.id"
      [maxLength]="opts.maxLength"
      [editable]="!options.readOnly"
      [textWrap]="options.wrap"
      [col]="opts.col"
      [row]="opts.row"
      [hint]="model.local.placeholder"
      [ngClass]="model.css.control"
      adfNSDomElement
      [required]="options.required"
    >
    </TextView>
    <adf-error-container [model]="model">
    </adf-error-container>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptTextViewComponent}]
})
export class NativeScriptTextViewComponent extends DynamicFormControlComponent<ValueModel> implements OnInit,
                                                                                                      OnChanges {
  model!: ValueModel;
  options!: ControlTextareaOptions;
  opts: {[key: string]: any};

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
    this.opts = {};
  }

  setOptsDefaults(): void {
    this.opts.maxLength = TEXTVIEW_DEFAULT_MAXLENGTH;
    this.opts.col = TEXTVIEW_DEFAULT_COLS;
    this.opts.row = TEXTVIEW_DEFAULT_ROWS;
  }

  updateOpts(): void {
    this.setOptsDefaults();
    this.opts.maxLength = this.options.maxLength ? this.options.maxLength : TEXTVIEW_DEFAULT_MAXLENGTH;
    this.opts.col = this.options.cols ? this.options.cols : TEXTVIEW_DEFAULT_COLS;
    this.opts.row = this.options.rows ? this.options.rows : TEXTVIEW_DEFAULT_ROWS;
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
