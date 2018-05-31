import {AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';
import {NgNullControl} from './ng-null-control';
import {AbstractControlOptions} from './ng-abstract';

/**
 * @description NgFormGroup extends FormGroup
 * in the 'setValue' call, it does not throw if no value is provided for a child of type NgNullControl
 *
 * @internal
 * @export
 */
export class NgFormGroup extends FormGroup {
  constructor(controls: {[key: string]: AbstractControl}, options: AbstractControlOptions) {
    super(controls, options);
  }


  /**
   * provides default values for all childs of instance NgNullControl
   * before calling the parent setValue method.
   * So the strict check for other controls is kept, but NgNullControls do not need to be initialized
   */
  setValue(value: any, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    let v: any;
    v = Object.assign({}, value);
    Object.keys(this.controls).forEach((name) => {
      if (this.controls[name] instanceof NgNullControl) {
        v[name] = '';
      }
    });
    super.setValue(v, options);
  }
}
