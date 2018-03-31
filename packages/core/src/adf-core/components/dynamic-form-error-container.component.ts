import {Component, DoCheck, Input} from '@angular/core';

import {ControlModel} from '../models/control-model.interface';
import {DynamicValidationError} from '../validations/dynamic-validation-error.interface';

import {DynamicFormErrorContainer} from './dynamic-form-error-container.interface';
import {DynamicForm} from './dynamic-form.interface';

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
  @Input()
  model!: ControlModel;

  errors?: DynamicValidationError[];

  constructor(public form: DynamicForm) {
  }

  ngDoCheck(): void {
    if (!this.model.ngControl.errors) {
      if (this.errors && this.errors.length) {
        this.errors = [];
      }
      return;
    }
    this.errors = [];
    // TODO: we may want to filter errors for subset and form groups having subsets
    let sortedErrors: DynamicValidationError[] = Object.values(this.model.ngControl.errors)
                                                     .filter((v) => v.message)
                                                     .sort((a, b) => (a.order || 0) - (b.order || 0));

    if (this.form.config.showMultipleErrors) {
      this.errors = sortedErrors;
    } else {
      this.errors.push(sortedErrors[0]);
    }
  }
}
