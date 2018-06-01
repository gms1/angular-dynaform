import {EventEmitter} from '@angular/core';

import {GroupOptions} from '../config/control-options.interface';
import {GroupModel} from '../models/group-model';

import {DynamicFormControl} from './dynamic-form-control.interface';
import {DynamicForm} from './dynamic-form.interface';

export interface DynamicFormFormControl extends DynamicFormControl {
  form: DynamicForm;
  model: GroupModel;
  options: GroupOptions;

  submit: EventEmitter<any>;
  reset: EventEmitter<any>;

  onSubmit(event?: Event): void;
  onReset(event?: Event): void;
}
