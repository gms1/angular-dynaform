// tslint:disable prefer-const
import {NgNullControl} from './ng-null-control';

describe('ng-null-control', () => {
  let ngNullControl: NgNullControl;

  beforeEach(() => {
    ngNullControl = new NgNullControl();
  });

  it('value should be undefined on newly created control', () => {
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined');
  });
  it('value should be undefined if set to undefined', () => {
    ngNullControl.setValue(undefined);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to undefined');
  });
  it('value should be undefined if set to null', () => {
    ngNullControl.setValue(null);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to null');
  });
  it('value should be undefined if set to text', () => {
    ngNullControl.setValue('hello');
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting a text');
  });
  it('value should be undefined if patched to undefined', () => {
    ngNullControl.patchValue(undefined);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to undefined');
  });
  it('value should be undefined if patched to null', () => {
    ngNullControl.patchValue(null);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to null');
  });
  it('value should be undefined if patched to text', () => {
    ngNullControl.patchValue('hello');
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting a text');
  });
  it('value should be undefined after reset', () => {
    ngNullControl.setValue('hello');
    ngNullControl.reset();
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after reset');
  });

});
