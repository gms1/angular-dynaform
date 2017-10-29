import {OnChanges, OnDestroy} from '@angular/core';

import {ControlModel} from '../models/control-model.interface';
import {DynamicValidationError} from '../validations/dynamic-validation-error.interface';

import {DynamicForm} from './dynamic-form.interface';

export interface DynamicFormError extends OnChanges, OnDestroy {
  form: DynamicForm;
  model: ControlModel;
  error: DynamicValidationError;
}
