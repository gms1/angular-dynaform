import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DynamicFormAction } from './dynamic-form.action';
import { DynamicFormControlComponentBase } from '../components/dynamic-form-control.component';
import { DynamicFormControl } from '../components/dynamic-form-control';
import { Stepper } from '../models/stepper';

// base class for actions on a stepper component

export abstract class StepperButtonBaseAction extends DynamicFormAction
  implements AfterViewInit, OnInit, OnDestroy {
  stepper?: Stepper;
  private unsubscribe: Subject<any>;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
    this.unsubscribe = new Subject<any>();
  }

  abstract onClick(event?: Event): boolean;
  abstract onIndexChange(index: number): void;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.stepper = this.findStepper();
    /* istanbul ignore else */
    if (this.stepper) {
      this.onIndexChange(0);
      this.stepper
        .selectionChange()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((currIndex) => this.onIndexChange(currIndex));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    super.ngOnDestroy();
  }

  private findStepper(): Stepper | undefined {
    let component: DynamicFormControl | undefined = this.component;
    while (component) {
      /* istanbul ignore if */
      if (component.stepper) {
        return component.stepper;
      }
      component = this.component.form.findParentComponent(component);
    }
    return this.component.form.stepper;
  }
}
