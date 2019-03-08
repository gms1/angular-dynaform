import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

// TODO: this types should be provided by @angular/forms
export declare type FormHooks = 'change' | 'blur' | 'submit';
export interface AbstractControlOptions {
  validators?: ValidatorFn | ValidatorFn[] | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  updateOn?: FormHooks;
}
