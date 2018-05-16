import {AfterViewInit, OnDestroy, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import {ControlModel} from '../models/control-model.interface';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';


export abstract class DynamicFormAction implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  public component: DynamicFormControlComponentBase;
  public model: ControlModel;

  constructor(component: DynamicFormControlComponentBase) {
    this.component = component;
    this.model = component.model;
  }

  /* istanbul ignore next */
  ngOnInit(): void {}

  /* istanbul ignore next */
  ngAfterViewInit(): void {}

  /* istanbul ignore next */
  ngOnChanges(changes: SimpleChanges): void {}

  /* istanbul ignore next */
  ngOnDestroy(): void {}

  /* istanbul ignore next */
  onClick(event?: Event): boolean {
    // return true to emit the output-click event of the control component
    return true;
  }

  /* istanbul ignore next */
  onBlur(event?: Event): void {}

  /* istanbul ignore next */
  onFocus(event?: Event): void {}
}
