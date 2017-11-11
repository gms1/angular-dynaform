// tslint:disable max-classes-per-file
import {OnDestroy, OnInit} from '@angular/core';

import {ControlModel} from '../models/control-model.interface';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';


export class DynamicFormAction implements OnInit, OnDestroy {
  public component: DynamicFormControlComponentBase;
  public model: ControlModel;

  constructor(component: DynamicFormControlComponentBase) {
    this.component = component;
    this.model = component.model;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  onClick(event?: Event): boolean {
    // return true to emit the output-click event of the control component
    return true;
  }

  onBlur(event?: Event): void {}
  onFocus(event?: Event): void {}
}
