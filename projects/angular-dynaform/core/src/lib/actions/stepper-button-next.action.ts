import {AfterViewInit, OnInit} from '@angular/core';
import {StepperButtonBaseAction} from './stepper-button-base';

// next-button for a stepper component

export class StepperButtonNextAction extends StepperButtonBaseAction implements AfterViewInit, OnInit {
  onClick(event?: Event): boolean {
    if (this.stepper) {
      this.stepper.next();
    }
    return true;
  }

  onIndexChange(index: number): void {
    if (!this.stepper || index === this.stepper.length() - 1) {
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
