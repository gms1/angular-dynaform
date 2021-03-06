import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  ControlModel,
  DynamicFormValidatorFn,
  DynamicFormAsyncValidatorFn,
} from '../../public_api';
import {
  DynamicFormValidatorRegistry,
  DynamicFormAsyncValidatorRegistry,
} from '../validations/dynamic-form.validator';

export const testPatternValidate: DynamicFormValidatorFn = (key: string, control: ControlModel) => {
  const pattern = control.options && control.options.pattern ? control.options.pattern : undefined;
  if (!pattern) {
    return DynamicFormValidatorRegistry.nullValidator;
  }
  let regex: RegExp;
  if (typeof pattern === 'string') {
    regex = new RegExp(pattern);
  } else {
    regex = pattern.toString();
  }
  return (ctrl: AbstractControl): ValidationErrors | null => {
    if (!ctrl.value) {
      return null;
    }
    const res = regex.test(ctrl.value)
      ? null
      : { pattern: { requiredPattern: pattern, actualValue: ctrl.value } };
    return res;
  };
};

export const testAsyncPatternValidate: DynamicFormAsyncValidatorFn = (
  key: string,
  control: ControlModel,
) => {
  const pattern = control.options && control.options.pattern ? control.options.pattern : undefined;
  if (!pattern) {
    return DynamicFormAsyncValidatorRegistry.nullValidator;
  }
  let regex: RegExp;
  if (typeof pattern === 'string') {
    regex = new RegExp(pattern);
  } else {
    regex = pattern.toString();
  }
  return (ctrl: AbstractControl): Promise<ValidationErrors | null> => {
    if (!ctrl.value) {
      return Promise.resolve(null);
    }
    const res = regex.test(ctrl.value)
      ? null
      : { pattern: { requiredPattern: pattern, actualValue: ctrl.value } };
    return Promise.resolve(res);
  };
};
