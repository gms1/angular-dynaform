// tslint:disable max-classes-per-file no-null-keyword
import {AbstractControl, AsyncValidatorFn, ValidatorFn, Validators, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ControlModel} from '../models/control-model.interface';

import {DynamicValidationError} from './dynamic-validation-error.interface';
import {FnRegistry} from '../utils/fn-registry';

// tslint:disable-next-line interface-over-type-literal
export declare type DynamicValidationErrorResult = {
  [key: string]: DynamicValidationError;
};


export type DynamicFormValidatorFn = (key: string, control: ControlModel) => ValidatorFn;
export type DynamicFormAsyncValidatorFn = (key: string, control: ControlModel) => AsyncValidatorFn;


export abstract class DynamicFormValidationBase<Fn> {
  abstract validateWrap(control: ControlModel, key: string|string[], order: number): Fn[];

  abstract validate(key: string, control: ControlModel): Fn;

  protected buildError(control: ControlModel, key: string, order: number, error: ValidationErrors):
      DynamicValidationErrorResult {
    const msg = (control.local.errors && control.local.errors[key]) ||
        (control.formModel.i18n && control.formModel.i18n.errors && control.formModel.i18n.errors[key]) ||
        control.formModel.config.errors && control.formModel.config.errors[key] || key;
    return {[key]: {key, order, message: msg || key}};
  }
  }

export abstract class DynamicFormValidation extends DynamicFormValidationBase<ValidatorFn> {
  validateWrap(control: ControlModel, key: string|string[], order: number): ValidatorFn[] {
    const res: ValidatorFn[] = [];
    if (Array.isArray(key)) {
      key.forEach((keyItem) => {
        res.push(this.validateKey(control, keyItem, order++));
      });
    } else {
      res.push(this.validateKey(control, key, order));
      }
    return res;
  }

  private validateKey(control: ControlModel, key: string, order: number): ValidatorFn {
    const fn: ValidatorFn = this.validate(key, control);
    return (c: AbstractControl): DynamicValidationErrorResult | null => {
      const res = fn(c);
      return res === null ? res : super.buildError(control, key, order, res);
    };
  }
  }

export abstract class DynamicFormAsyncValidation extends DynamicFormValidationBase<AsyncValidatorFn> {
  validateWrap(control: ControlModel, key: string|string[], order: number): AsyncValidatorFn[] {
    const res: AsyncValidatorFn[] = [];
    if (Array.isArray(key)) {
      key.forEach((keyItem) => {
        res.push(this.validateKey(control, keyItem, order++));
      });
    } else {
      res.push(this.validateKey(control, key, order));
      }
    return res;
  }

  private validateKey(control: ControlModel, key: string, order: number): AsyncValidatorFn {
    const fn: AsyncValidatorFn = this.validate(key, control);
    return (c: AbstractControl): Promise<DynamicValidationErrorResult|null>|
        Observable<DynamicValidationErrorResult|null> => {
      // tslint:disable-next-line
      let res = fn(c);
      if (res instanceof Promise) {
        return res.then((value) => value === null ? null : super.buildError(control, key, order, value));
      } else if (res instanceof Observable) {
        return res.pipe(map((value) => value === null ? value : super.buildError(control, key, order, value)));
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
      return DynamicFormValidatorRegistry.NullValidator;
      }
    return dffn(key, control);
  }

  static NullValidator = () => null;

  // tslint:disable no-unbound-method
  static required(key: string, control: ControlModel): ValidatorFn {
    return Validators.required;
  }
  static requiredTrue(key: string, control: ControlModel): ValidatorFn {
    return Validators.requiredTrue;
  }
  static minLength(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.minLength !== 'number') {
      return DynamicFormValidatorRegistry.NullValidator;
      }
    return Validators.minLength(control.options.minLength);
  }
  static maxLength(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.maxLength !== 'number') {
      return DynamicFormValidatorRegistry.NullValidator;
      }
    return Validators.maxLength(control.options.maxLength);
  }
  static min(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.min !== 'number') {
      return DynamicFormValidatorRegistry.NullValidator;
      }
    return Validators.min(control.options.min);
  }
  static max(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.max !== 'number') {
      return DynamicFormValidatorRegistry.NullValidator;
      }
    return Validators.max(control.options.max);
  }
  static pattern(key: string, control: ControlModel): ValidatorFn {
    if (!control.options || typeof control.options.pattern !== 'string') {
      return DynamicFormValidatorRegistry.NullValidator;
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
      return DynamicFormAsyncValidatorRegistry.NullValidator;
      }
    return dffn(key, control);
  }

  static NullValidator = () => Promise.resolve(null);
}
