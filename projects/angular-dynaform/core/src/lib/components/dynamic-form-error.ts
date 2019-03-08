import { OnChanges, OnDestroy } from '@angular/core';

import { ControlModel } from '../models/control-model';
import { DynamicValidationError } from '../validations/dynamic-validation-error';

import { DynamicForm } from './dynamic-form';

export interface DynamicFormError extends OnChanges, OnDestroy {
  form: DynamicForm;
  model: ControlModel;
  error: DynamicValidationError;
}
