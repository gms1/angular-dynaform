import {AfterViewInit, OnInit} from '@angular/core';
import {StepperButtonBaseAction} from './stepper-button-base';

// prev-button for a stepper component

export class StepperButtonPrevAction extends StepperButtonBaseAction implements AfterViewInit, OnInit {
  onClick(event?: Event): boolean {
    if (this.stepper) {
      this.stepper.prev();
      }
    return true;
  }

  onIndexChange(index: number): void {
    if (!this.stepper || !index) {
      /* istanbul ignore else */
      if (this.model.ngControl.enabled) {
        this.model.ngControl.disable();
      }
    } else {
      if (this.model.ngControl.disabled) {
        this.model.ngControl.enable();
      }
    }
  }
}
