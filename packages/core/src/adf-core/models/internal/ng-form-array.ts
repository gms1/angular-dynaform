import {AbstractControl, AsyncValidatorFn, FormArray, ValidatorFn} from '@angular/forms';

import {ArrayModel} from '../array-model';

// ==============================================================================================================================
// FormArray subclass to be able to adjust the length of the array to the input value of setValue/patchValue

export class NgFormArray extends FormArray {
  model: ArrayModel;

  constructor(
      controls: AbstractControl[], validator?: ValidatorFn|undefined, asyncValidator?: AsyncValidatorFn|undefined) {
    super(controls, validator, asyncValidator);
  }

  setValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this.updateLength(value ? value.length : 0);
    super.setValue(value, options);
  }

  patchValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    let minLength = value ? value.length : 0;
    if (minLength < this.length) {
      this.updateLength(minLength);
    }
    super.patchValue(value, options);
  }

  reset(value?: any[], options?: {onlySelf?: boolean; emitEvent?: boolean}): void {
    this.updateLength(value ? value.length : 0);
    super.reset(value, options);
  }

  updateLength(length: number): void { this.model.updateLength(length); }
}
