// tslint:disable max-classes-per-file no-null-keyword
import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidatorFn, Validators, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {ValueControlModel} from '../models/control-model';
import {ControlModel} from '../models/control-model.interface';

import {DynamicValidationError} from './dynamic-validation-error.interface';

// tslint:disable-next-line interface-over-type-literal
export declare type DynamicValidationErrorResult = {
  [key: string]: DynamicValidationError;
};


// tslint:disable-next-line no-empty-interface
export interface DynamicValidatorFn extends ValidatorFn { (c: AbstractControl): DynamicValidationErrorResult|null; }
// tslint:disable-next-line no-empty-interface
export interface DynamicAsyncValidatorFn extends AsyncValidatorFn {
  (c: AbstractControl): Promise<DynamicValidationErrorResult|null>|Observable<DynamicValidationErrorResult|null>;
}

export abstract class DynamicFormValidatorBase<DFn extends Fn, Fn> {
  abstract validateWrap(control: ControlModel, key: string, order?: number): DFn;

  abstract validate(control: ControlModel, key: string, order: number): Fn;

  protected buildError(control: ControlModel, key: string, order: number, error: ValidationErrors):
      DynamicValidationErrorResult {
    // TODO: internationalization
    return {[key]: {key, order, message: key}};
  }
}


export abstract class DynamicFormValidator extends DynamicFormValidatorBase<DynamicValidatorFn, ValidatorFn> {
  validateWrap(control: ControlModel, key: string, order?: number): DynamicValidatorFn {
    let fn: ValidatorFn = this.validate(control, key, order || 0);
    return (c: AbstractControl): DynamicValidationErrorResult | null => {
      let res = fn(c);
      return res === null ? res : super.buildError(control, key, order || 0, res);
    };
  }
}

export abstract class DynamicFormAsyncValidator extends
    DynamicFormValidatorBase<DynamicAsyncValidatorFn, AsyncValidatorFn> {
  validateWrap(control: ControlModel, key: string, order?: number): DynamicAsyncValidatorFn {
    let fn: AsyncValidatorFn = this.validate(control, key, order || 0);
    return (c: AbstractControl): Promise<DynamicValidationErrorResult|null>|
        Observable<DynamicValidationErrorResult|null> => {
      // tslint:disable-next-line
      let res = fn(c);
      if (res instanceof Promise) {
        return res.then((value) => value === null ? null : super.buildError(control, key, order || 0, value));
      } else if (res instanceof Observable) {
        return res.pipe(map((value) => value === null ? value : super.buildError(control, key, order || 0, value)));
      } else {
        return res;
      }
    };
  }
}


@Injectable()
export class ControlRequiredValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn { return Validators.required; }
}

@Injectable()
export class ControlRequiredTrueValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn { return Validators.requiredTrue; }
}

@Injectable()
export class ControlMinLengthValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const minLength = control.options && control.options.minLength ? control.options.minLength : 0;
    if (!minLength) {
      return () => null;
    }
    return Validators.minLength(minLength);
  }
}

@Injectable()
export class ControlMaxLengthValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const maxLength = control.options && control.options.maxLength ? control.options.maxLength : 0;
    if (!maxLength) {
      return () => null;
    }
    return Validators.maxLength(maxLength);
  }
}


@Injectable()
export class ControlMinValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const min = control.options && control.options.min ? control.options.min : 0;
    if (min === undefined) {
      return () => null;
    }
    return Validators.min(min);
  }
}

@Injectable()
export class ControlMaxValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const max = control.options && control.options.max ? control.options.max : 0;
    if (max === undefined) {
      return () => null;
    }
    return Validators.max(max);
  }
}



@Injectable()
export class ControlPatternValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const pattern = control.options && control.options.pattern ? control.options.pattern : undefined;
    if (!pattern) {
      return () => null;
    }
    return Validators.pattern(pattern);
  }
}

@Injectable()
export class ControlEmailValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn { return Validators.email; }
}
