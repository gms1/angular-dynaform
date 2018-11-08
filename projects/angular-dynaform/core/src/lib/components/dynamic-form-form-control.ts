import {EventEmitter} from '@angular/core';

import {GroupOptions} from '../config/control-options';
import {GroupModel} from '../models/group-model';

import {DynamicFormControl} from './dynamic-form-control';
import {DynamicForm} from './dynamic-form';

export interface DynamicFormFormControl extends DynamicFormControl {
  form: DynamicForm;
  model: GroupModel;
  options: GroupOptions;

  submit: EventEmitter<any>;
  reset: EventEmitter<any>;

  onSubmit(event?: Event): void;
  onReset(event?: Event): void;
}
