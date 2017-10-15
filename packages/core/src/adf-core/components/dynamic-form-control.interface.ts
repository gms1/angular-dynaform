import {OnChanges, OnDestroy, OnInit} from '@angular/core';
import {EventEmitter} from '@angular/core';

import {ControlOptions} from '../config/control-options.interface';
import {ControlModel} from '../models/control-model.interface';

import {DynamicForm} from './dynamic-form.interface';

export interface DynamicFormControl extends OnChanges, OnInit, OnDestroy {
  form: DynamicForm;
  model: ControlModel;

  // the 'options' property is equal to the 'model.options' property
  // this opens the possibility to specify a concrete type ( not the 'ControlOptions' type )
  // inside a component to make ngc (4.0.1) happy
  options: ControlOptions;

  focusChanges: EventEmitter<any>;
  click: EventEmitter<any>;
}
