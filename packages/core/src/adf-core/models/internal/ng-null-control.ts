import {AbstractControl, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {AbstractControlOptions} from './ng-abstract';

// ==============================================================================================================================
// NgNullControls always have an undefined value (for e.g Buttons, which should not influence the form data model)
//
// TODO:
// on the other hand, it might have been better to not even create a FormControl for such controls or, as we did for the
// FormArray headers/footers, to register such controls as childs of an independent FormGroup

export class NgNullControl extends FormControl {
  constructor(
      formState?: any, validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null) {
    super(formState, validatorOrOpts, asyncValidator);
  }
  get value(): any { return undefined; }
  set value(value: any) {}
  patchValue(value: any, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {}
  setValue(value: any, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {}
  reset(value?: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void {}
}
