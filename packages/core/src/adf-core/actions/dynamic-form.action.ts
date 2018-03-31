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

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}

  onClick(event?: Event): boolean {
    // return true to emit the output-click event of the control component
    return true;
  }

  onBlur(event?: Event): void {}
  onFocus(event?: Event): void {}
}
