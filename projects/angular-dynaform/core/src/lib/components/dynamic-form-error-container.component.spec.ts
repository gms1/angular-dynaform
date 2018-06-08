// tslint:disable no-null-keyword no-unbound-method no-unused-variable prefer-const
import {FormControl} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormErrorContainerComponent} from '../components/dynamic-form-error-container.component';
import {ControlModel, DynamicValidationError} from '../../public_api';


describe('DynamicFormErrorContainerComponent', () => {

  it('should sort multiple errors (having order property)', () => {
    const fakeForm: any = {config: {showMultipleErrors: true}};
    const fakeModel: any = {ngControl: new FormControl()};
    const comp = new DynamicFormErrorContainerComponent(fakeForm);
    comp.model = fakeModel;

    const inputErrors: any = {
      error1: {key: 'error1', order: 2, message: 'error1 occurred'},
      error2: {key: 'error2', order: 1, message: 'error2 occurred'}
    };

    comp.model.ngControl.setErrors(inputErrors);
    comp.ngDoCheck();
    const outputErrors = comp.errors as DynamicValidationError[];
    expect(outputErrors.length).toBe(2, 'should have 2 errors');
    expect(outputErrors[0]).toBe(inputErrors.error2);
    expect(outputErrors[1]).toBe(inputErrors.error1);

  });

  it('should sort multiple errors (2nd without order property)', () => {
    const fakeForm: any = {config: {showMultipleErrors: true}};
    const fakeModel: any = {ngControl: new FormControl()};
    const comp = new DynamicFormErrorContainerComponent(fakeForm);
    comp.model = fakeModel;

    const inputErrors: any = {
      error1: {key: 'error1', order: 2, message: 'error1 occurred'},
      error2: {key: 'error2', message: 'error2 occurred'}
    };

    comp.model.ngControl.setErrors(inputErrors);
    comp.ngDoCheck();
    const outputErrors = comp.errors as DynamicValidationError[];
    expect(outputErrors.length).toBe(2, 'should have 2 errors');
    expect(outputErrors[0]).toBe(inputErrors.error2);
    expect(outputErrors[1]).toBe(inputErrors.error1);

  });

  it('should sort multiple errors (1st without order property)', () => {
    const fakeForm: any = {config: {showMultipleErrors: true}};
    const fakeModel: any = {ngControl: new FormControl()};
    const comp = new DynamicFormErrorContainerComponent(fakeForm);
    comp.model = fakeModel;

    const inputErrors: any = {
      error1: {key: 'error1', message: 'error1 occurred'},
      error2: {key: 'error2', order: 1, message: 'error2 occurred'}
    };

    comp.model.ngControl.setErrors(inputErrors);
    comp.ngDoCheck();
    const outputErrors = comp.errors as DynamicValidationError[];
    expect(outputErrors.length).toBe(2, 'should have 2 errors');
    expect(outputErrors[0]).toBe(inputErrors.error1);
    expect(outputErrors[1]).toBe(inputErrors.error2);

  });

});
