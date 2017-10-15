import {FormGroup} from '@angular/forms';
import {NgNullControl} from './ng-null-control';

// ==============================================================================================================================
// NgFormGroups should not throw an exception if a value for NgNullControls is not provided to the setValue method
//
export class NgFormGroup extends FormGroup {
  constructor(formState?: any) { super(formState); }
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
