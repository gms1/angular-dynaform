import {AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {AbstractControlOptions} from './ng-abstract';

// ==============================================================================================================================
/**
 * @description NgNullControl extends FormControl
 * This class does not provide a value (is always undefined) and so does not participate in the aggregated value
 * of its ancestors. It can be used for buttons/separators,..which can then be treated exactly the same as any other
 * FormControl (e.g inside of templates, to enable/disable the control,...)
 *
 * another possible use-case:
 * together with our NgFormGroup, a hidden NgNullControl can be used to filter obsolete values, which would otherwise
 * throw if a 'setValue' call would provide a value for a no longer existing FormControl
 *
 * @internal
 * @export
 */
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
