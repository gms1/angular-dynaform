// tslint:disable prefer-const
import { NgFormGroup } from './ng-form-group';
import { NgNullControl } from './ng-null-control';
import { FormControl } from '@angular/forms';

describe('ng-null-control', () => {
  let ngFormGroup: NgFormGroup;

  beforeEach(() => {
    ngFormGroup = new NgFormGroup(
      { a: new FormControl(), b: new FormControl(), n: new NgNullControl() },
      { updateOn: 'change' },
    );
  });

  it('setValue should throw if a standard property is missing', () => {
    expect(() => ngFormGroup.setValue({ a: 'foo', n: 'bar' })).toThrow();
  });
  it('setValue should not throw if a null property is missing', () => {
    try {
      ngFormGroup.setValue({ a: 'foo', b: 'bar' });
    } catch (e) {
      fail(e);
    }
    expect(ngFormGroup.value).toEqual({ a: 'foo', b: 'bar', n: undefined });
  });
  it('setValue should not throw if a null property has a value', () => {
    try {
      ngFormGroup.setValue({ a: 'foo', b: 'bar', n: 'baz' });
    } catch (e) {
      fail(e);
    }
    expect(ngFormGroup.value).toEqual({ a: 'foo', b: 'bar', n: undefined });
  });
});
