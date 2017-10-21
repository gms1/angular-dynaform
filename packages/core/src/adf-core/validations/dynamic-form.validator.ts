// tslint:disable max-classes-per-file no-null-keyword
import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidatorFn, Validators} from '@angular/forms';

import {ValueControlModel} from '../models/control-model';
import {ControlModel} from '../models/control-model.interface';

import {ValidationError} from './validation-error.interface';

export abstract class DynamicFormValidatorBase<Fn> {
  abstract validate(control: ControlModel, key: string, order?: number): Fn;

  protected buildError(
      control: ControlModel, key: string, order: number, defaultMsg: string, constraint?: any,
      params?: string[]): ValidationError {
    return {key, order, message: this.message(control, key, defaultMsg, constraint, params)};
  }

  protected message(control: ControlModel, key: string, defaultMsg: string, constraint?: any, params?: string[]):
      string {
    // TODO: error message internationalization
    return defaultMsg;
  }
}

export abstract class DynamicFormValidator extends DynamicFormValidatorBase<ValidatorFn> {}

export abstract class DynamicFormAsyncValidator extends DynamicFormValidatorBase<AsyncValidatorFn> {}


@Injectable()
export class ControlRequiredValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!Validators.required(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, 'is required')};
    };
  }
}

@Injectable()
export class ControlRequiredTrueValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!Validators.requiredTrue(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, 'should be true')};
    };
  }
}

@Injectable()
export class ControlMinLengthValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const minLength = control.options && control.options.minLength ? control.options.minLength : 0;
    if (!minLength) {
      return () => null;
    }
    const fn = Validators.minLength(minLength);
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!fn(c)) {
        return null;
      }
      return {
        [key]: this.buildError(control, key, order || 0, `minimum length of ${minLength} not reached`, minLength)
      };
    };
  }
}

@Injectable()
export class ControlMaxLengthValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const maxLength = control.options && control.options.maxLength ? control.options.maxLength : 0;
    if (!maxLength) {
      return () => null;
    }
    const fn = Validators.maxLength(maxLength);
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!fn(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, `maximum length of ${maxLength} exceeded`, maxLength)};
    };
  }
}


@Injectable()
export class ControlMinValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const min = control.options && control.options.min ? control.options.min : 0;
    if (min === undefined) {
      return () => null;
    }
    const fn = Validators.min(min);
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!fn(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, `minimum limit of ${min} exceeded`, min)};
    };
  }
}

@Injectable()
export class ControlMaxValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const max = control.options && control.options.max ? control.options.max : 0;
    if (max === undefined) {
      return () => null;
    }
    const fn = Validators.max(max);
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!fn(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, `maximum limit of ${max} exceeded`, max)};
    };
  }
}



@Injectable()
export class ControlPatternValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    const pattern = control.options && control.options.pattern ? control.options.pattern : undefined;
    if (!pattern) {
      return () => null;
    }
    const fn = Validators.pattern(pattern);
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!fn(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, `wrong pattern`, pattern)};
    };
  }
}

@Injectable()
export class ControlEmailValidator extends DynamicFormValidator {
  validate(control: ValueControlModel, key: string, order?: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: ValidationError} | null => {
      if (!Validators.email(c)) {
        return null;
      }
      return {[key]: this.buildError(control, key, order || 0, `invalid email address`)};
    };
  }
}
