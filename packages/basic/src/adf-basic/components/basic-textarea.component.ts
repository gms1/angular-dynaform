// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ControlTextareaOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicForm,
  DynamicFormService,
  ValueControlModel
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-textarea-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [ngClass]="model.css.container"
      [hidden]="model.hidden"
    >
      <label
        *ngIf="model.local.label"
        [attr.for]="model.id"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></label>
      <textarea
        [formControlName]="model.key"
        [id]="model.id"
        [maxlength]="options.maxLength"
        [minlength]="options.minLength"
        [readonly]="options.readOnly"
        [wrap]="options.wrap"
        [cols]="options.cols"
        [rows]="options.rows"
        [attr.placeholder]="model.local.placeholder"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
      </textarea>
      <adf-error-container [model]="model">
      </adf-error-container>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicTextareaComponent}]
})
export class BasicTextareaComponent extends DynamicFormControlComponent<ValueControlModel> {
  model: ValueControlModel;
  options: ControlTextareaOptions;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    super(form, dynamicFormService);
  }
}
