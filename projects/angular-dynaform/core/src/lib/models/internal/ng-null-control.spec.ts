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
  it('value should be undefined if set to undefined (without options)', () => {
    ngNullControl.setValue(undefined);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to undefined');
  });
  it('value should be undefined if set to undefined (with options)', () => {
    ngNullControl.setValue(undefined, {onlySelf: false, emitEvent: true});
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to undefined');
  });
  it('value should be undefined if set to null (without options)', () => {
    ngNullControl.setValue(null);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to null');
  });
  it('value should be undefined if set to null (with options)', () => {
    ngNullControl.setValue(null, {onlySelf: false, emitEvent: true});
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to null');
  });
  it('value should be undefined if set to text (without options)', () => {
    ngNullControl.setValue('hello');
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting a text');
  });
  it('value should be undefined if set to text (with options)', () => {
    ngNullControl.setValue('hello', {onlySelf: false, emitEvent: true});
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting a text');
  });
  it('value should be undefined if patched to undefined (without options)', () => {
    ngNullControl.patchValue(undefined);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to undefined');
  });
  it('value should be undefined if patched to undefined (with options)', () => {
    ngNullControl.patchValue(undefined, {onlySelf: false, emitEvent: true});
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to undefined');
  });
  it('value should be undefined if patched to null (without options)', () => {
    ngNullControl.patchValue(null);
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to null');
  });
  it('value should be undefined if patched to null (with options)', () => {
    ngNullControl.patchValue(null, {onlySelf: false, emitEvent: true});
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting to null');
  });
  it('value should be undefined if patched to text (without options)', () => {
    ngNullControl.patchValue('hello');
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting a text');
  });
  it('value should be undefined if patched to text (with options)', () => {
    ngNullControl.patchValue('hello', {onlySelf: false, emitEvent: true});
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after setting a text');
  });
  it('value should be undefined after reset', () => {
    ngNullControl.setValue('hello');
    ngNullControl.reset();
    expect(ngNullControl.value).toBeUndefined('value of NgNullControl is defined after reset');
  });

});
