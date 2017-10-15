// tslint:disable use-life-cycle-interface
//   codelyzer does not recognize that the DynamicFormError extends the interfaces for the lify-cycle hooks
import {Component, Input, SimpleChanges} from '@angular/core';

import {ControlOptions} from '../config/control-options.interface';
import {ControlModel} from '../models/control-model.interface';
import {ValidationError} from '../validations/validation-error.interface';

import {DynamicFormError} from './dynamic-form-error.interface';
import {DynamicForm} from './dynamic-form.interface';

@Component({selector: 'adf-error-component', template: `Please provide a component for displaying error messages!'`})
export class DynamicFormErrorComponent implements DynamicFormError {
  @Input()
  get model(): ControlModel { return this._model; }
  set model(model: ControlModel) {
    this._model = model;
    this.options = this.model.options;
  }

  @Input()
  error: ValidationError;

  private _model: ControlModel;
  options: ControlOptions;

  constructor(public form: DynamicForm) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}
}
