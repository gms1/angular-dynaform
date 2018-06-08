import {AbstractControl, FormArray} from '@angular/forms';


import {AbstractControlOptions} from './ng-abstract';


export interface NgArrayModelHandler { updateLength(length: number, isMinimum?: boolean): void; }


/**
 * @description NgFormArray extends FormArray
 * In the setValue/patchValue/reset calls, the length of the array can be updated on-the-fly
 * using the NgArrayModelHandler interface
 *
 * @internal
 * @export
 */
export class NgFormArray extends FormArray {
  model?: NgArrayModelHandler;

  constructor(controls: AbstractControl[], options: AbstractControlOptions) {
    super(controls, options);
  }

  setValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this.updateLength(value.length);
    super.setValue(value, options);
  }

  patchValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    if (value.length > this.length) {
      this.updateLength(value.length, true);
    }
    super.patchValue(value, options);
  }

  reset(value?: any[], options?: {onlySelf?: boolean; emitEvent?: boolean}): void {
    this.updateLength(value ? value.length : 0);
    super.reset(value, options);
  }

  updateLength(length: number, isMinLength?: boolean): void {
    if (this.model) {
      this.model.updateLength(length, isMinLength);
    }
  }
}
