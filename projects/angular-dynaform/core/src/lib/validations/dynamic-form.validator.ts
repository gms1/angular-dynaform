// tslint:disable max-classes-per-file no-null-keyword
import {AbstractControl, AsyncValidatorFn, ValidatorFn, Validators, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ControlModel} from '../models/control-model';

import {FnRegistry} from '../utils/fn-registry';


export type DynamicFormValidatorFn = (key: string, control: ControlModel) => ValidatorFn;
export type DynamicFormAsyncValidatorFn = (key: string, control: ControlModel) => AsyncValidatorFn;


export abstract class DynamicFormValidationBase<Fn> {
  abstract createValidators(control: ControlModel, key: string|string[], order: number): Fn[];

  abstract validate(key: string, control: ControlModel): Fn;


  protected enrichResult(error: ValidationErrors|null, key: string, order: number): ValidationErrors|null {
    if (!error) {
      return error;
    }
    let result: ValidationErrors;
    // the result should have our given 'key' as key
    if (error[key]) {
      result = {[key]: error[key]};
    } else {
      const errKeys = Object.keys(error);
      if (errKeys.length >= 1) {
        result = {[key]: error[errKeys[0]]};
      } else {
        result = {[key]: {}};
      }
    }
    // enrich by 'order' number
    if (Object.keys(result[key]).length >= 1) {
      result[key]['order'] = order;
    } else {
      result[key] = {order};
    }
    return result;
  }
}

export abstract class DynamicFormValidation extends DynamicFormValidationBase<ValidatorFn> {
  createValidators(control: ControlModel, key: string|string[], order: number): ValidatorFn[] {
    const res: ValidatorFn[] = [];
    if (Array.isArray(key)) {
      key.forEach((keyItem) => {
        res.push(this.createValidator(control, keyItem, order++));
      });
    } else {
      res.push(this.createValidator(control, key, order));
    }
    return res;
  }

  private createValidator(control: ControlModel, key: string, order: number): ValidatorFn {
    const fn: ValidatorFn = this.validate(key, control);
    return (c: AbstractControl): ValidationErrors|null => {
      return this.enrichResult(fn(c), key, order);
    };
  }
}

export abstract class DynamicFormAsyncValidation extends DynamicFormValidationBase<AsyncValidatorFn> {
  createValidators(control: ControlModel, key: string|string[], order: number): AsyncValidatorFn[] {
    const res: AsyncValidatorFn[] = [];
    if (Array.isArray(key)) {
      key.forEach((keyItem) => {
        res.push(this.createValidator(control, keyItem, order++));
      });
    } else {
      res.push(this.createValidator(control, key, order));
    }
    return res;
  }

  private createValidator(control: ControlModel, key: string, order: number): AsyncValidatorFn {
    const fn: AsyncValidatorFn = this.validate(key, control);
    return (c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null> => {
      const res = fn(c);
      if (res instanceof Promise) {
        return res.then((value) => this.enrichResult(value, key, order));
      } else if (res instanceof Observable) {
        return res.pipe(map((value) => this.enrichResult(value, key, order)));
      } else {
        return res;
      }
    };
  }
}

export class DynamicFormValidatorRegistry extends DynamicFormValidation {
  reg: FnRegistry<DynamicFormValidatorFn>;

  constructor() {
    super();
    this.reg = new FnRegistry();
    // tslint:disable no-unbound-method
    this.setFn('required', DynamicFormValidatorRegistry.required);
    this.setFn('requiredTrue', DynamicFormValidatorRegistry.requiredTrue);
    this.setFn('minLength', DynamicFormValidatorRegistry.minLength);
    this.setFn('maxLength', DynamicFormValidatorRegistry.maxLength);
    this.setFn('min', DynamicFormValidatorRegistry.min);
    this.setFn('max', DynamicFormValidatorRegistry.max);
    this.setFn('pattern', DynamicFormValidatorRegistry.pattern);
    this.setFn('email', DynamicFormValidatorRegistry.email);
    // tslint:enable no-unbound-method
  }

  setFn(key: string, fn: DynamicFormValidatorFn, ifNotExist?: boolean): void {
    this.reg.setFn(key, fn, false);
  }

  validate(key: string, control: ControlModel): ValidatorFn {
    const dffn = this.reg.getFn(key);
    if (!dffn) {
      return DynamicFormValidatorRegistry.nullValidator;
    }
    return dffn.call(control, key, control);
  }

  static nullValidator(c: AbstractControl): ValidationErrors|null {
    return null;
  }

  // tslint:disable no-unbound-method
  static required(key: string, control: ControlModel): ValidatorFn {
    return Validators.required;
  }
  static requiredTrue(key: string, control: ControlModel): ValidatorFn {
    return Validators.requiredTrue;
  }
  static minLength(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.minLength !== 'number') {
      return DynamicFormValidatorRegistry.nullValidator;
    }
    return Validators.minLength(control.options.minLength);
  }
  static maxLength(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.maxLength !== 'number') {
      return DynamicFormValidatorRegistry.nullValidator;
    }
    return Validators.maxLength(control.options.maxLength);
  }
  static min(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.min !== 'number') {
      return DynamicFormValidatorRegistry.nullValidator;
    }
    return Validators.min(control.options.min);
  }
  static max(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.max !== 'number') {
      return DynamicFormValidatorRegistry.nullValidator;
    }
    return Validators.max(control.options.max);
  }
  static pattern(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.pattern !== 'string') {
      return DynamicFormValidatorRegistry.nullValidator;
    }
    return Validators.pattern(control.options.pattern);
  }
  static email(key: string, control: ControlModel): ValidatorFn {
    return Validators.email;
  }
  // tslint:enable no-unbound-method
}


export class DynamicFormAsyncValidatorRegistry extends DynamicFormAsyncValidation {
  reg: FnRegistry<DynamicFormAsyncValidatorFn>;


  constructor() {
    super();
    this.reg = new FnRegistry();
  }

  setFn(key: string, fn: DynamicFormAsyncValidatorFn, ifNotExist?: boolean): void {
    this.reg.setFn(key, fn, false);
  }

  validate(key: string, control: ControlModel): AsyncValidatorFn {
    const dffn = this.reg.getFn(key);
    if (!dffn) {
      return DynamicFormAsyncValidatorRegistry.nullValidator;
    }
    return dffn.call(control, key, control);
  }

  static nullValidator(c: AbstractControl): Promise<ValidationErrors|null> {
    return Promise.resolve(null);
  }
}
