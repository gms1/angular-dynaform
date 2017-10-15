// tslint:disable max-classes-per-file
import {OnDestroy, OnInit} from '@angular/core';

import {ControlModel} from '../models/control-model.interface';


export class DynamicFormAction implements OnInit, OnDestroy {
  public model: ControlModel;
  public name: string;

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  onClick(event?: Event): boolean {
    // return true to emit the output-click event of the control component
    return true;
  }

  onBlur(event?: Event): void {}
  onFocus(event?: Event): void {}
}
