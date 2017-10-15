import {FormControl} from '@angular/forms';

// ==============================================================================================================================
// NgNullControls always have an undefined value (for e.g Buttons, which should not influence the form data model)
//
// TODO:
// on the other hand, it might have been better to not even create a FormControl for such controls or, as we did for the
// FormArray headers/footers, to register such controls as childs of an independent FormGroup

export class NgNullControl extends FormControl {
  constructor(formState?: any) { super(formState); }
  get value(): any { return undefined; }
  patchValue(value: any, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {}
  setValue(value: any, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {}
  reset(value?: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void {}
}
