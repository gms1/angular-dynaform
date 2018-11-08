import {Component, DoCheck, Input} from '@angular/core';

import {ControlModel} from '../models/control-model';

import {DynamicFormErrorContainer} from './dynamic-form-error-container';
import {DynamicForm} from './dynamic-form';
import {DynamicValidationError} from '../validations/dynamic-validation-error';

const INTERPOLATION_REGEX = new RegExp('\\{\\{([\\s\\S]*?)\\}\\}', 'g');


@Component({
  selector: 'adf-error-container',
  template: `
    <ng-container *ngIf="model.touched">
      <ng-container *ngFor="let error of errors;" adfErrorComponent [model]="model" [error]="error" >
      </ng-container>
    </ng-container>
  `
})
export class DynamicFormErrorContainerComponent implements DynamicFormErrorContainer, DoCheck {
  @Input() model!: ControlModel;

  errors?: DynamicValidationError[];

  constructor(public form: DynamicForm) {}

  ngDoCheck(): void {
    if (!this.model.ngControl.errors) {
      this.errors = undefined;
      return;
    }

    // TODO: we may want to filter errors for subset and form groups having subsets
    let sortedErrors: {key: string, payload: any}[] =
        Object.keys(this.model.ngControl.errors)
            .map((key) => {
              return {key, payload: (this.model.ngControl.errors as any)[key] as any};
            })
            .sort((a, b) => (a.payload.order || 0) - (b.payload.order || 0));

    if (!this.form.config.showMultipleErrors) {
      sortedErrors = [sortedErrors[0]];
    }
    this.errors = sortedErrors.map((err) => this.buildError(this.model, err.key, err.payload));
  }

  // TODO: this should go somewhere else, but waiting for proper i18n support...waiting...waiting...waiting...
  protected buildError(control: ControlModel, key: string, payload: any): DynamicValidationError {
    let msg = control.local && control.local.errors && control.local.errors[key];
    msg = msg || (control.formModel.i18n && control.formModel.i18n.errors && control.formModel.i18n.errors[key]);
    msg = msg || (control.formModel.config.errors && control.formModel.config.errors[key]);
    msg = msg || key;

    const inParts = msg.split(INTERPOLATION_REGEX);
    if (inParts.length <= 1) {
      return {key, message: msg};
    }
    const outParts: string[] = [];
    for (let i = 0; i < inParts.length; i++) {
      const part: string = inParts[i];
      if (i % 2 === 0) {
        // string part
        outParts.push(part);
      } else if (part.trim().length > 0) {
        // expression part
        if (payload[part]) {
          outParts.push(String(payload[part]));
        } else {
          outParts.push(`{{${part}}}`);
        }
      }
    }
    return {key, message: outParts.join('')};
  }
}
