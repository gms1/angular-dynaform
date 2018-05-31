// tslint:disable prefer-const
import {NgFormGroup} from './ng-form-group';
import {NgNullControl} from './ng-null-control';
import {NgFormArray, NgArrayModelHandler} from './ng-form-array';
import {FormControl} from '@angular/forms';
import {createNgFormGroupSubset, NgFormGroupSubset} from './ng-form-group-subset';



class NgFormArrayWrapper implements NgArrayModelHandler {
  ngControl: NgFormArray;
  constructor() {
    this.ngControl = new NgFormArray([], {updateOn: 'change'});
    this.ngControl.model = this;
  }
  updateLength(length: number, isMinimum?: boolean): void {
    if (!isMinimum) {
      while (this.ngControl.length > length) {
        this.ngControl.removeAt(this.ngControl.length - 1);
      }
      }
    while (this.ngControl.length < length) {
      this.ngControl.push(this.createItem());
    }
  }
  createItem(): NgFormGroup {
    return new NgFormGroup({}, {updateOn: 'change'});
  }
}

describe('ng-form-array', () => {
  let ary: NgFormArrayWrapper;
  beforeEach(() => {
    ary = new NgFormArrayWrapper();

  });

  it('update NgFormArray length using NgArrayModelHandler implementation', () => {
    ary.updateLength(5);
    expect(ary.ngControl.length).toEqual(5, 'increasing length failed');
    ary.updateLength(3);
    expect(ary.ngControl.length).toEqual(3, 'decreasing length failed');
    ary.updateLength(1, true);
    expect(ary.ngControl.length).toEqual(3, 'setting smaller minimum length failed');
    ary.updateLength(7, true);
    expect(ary.ngControl.length).toEqual(7, 'setting greater minimum length failed');
  });


  it('update NgFormArray length without NgArrayModelHandler model should not throw', () => {
    ary.updateLength(7, true);

    ary.ngControl.model = undefined;
    try {
      ary.ngControl.updateLength(5);
    } catch (e) {
      fail(e);
    }
  });


  it('update NgFormArray length by patching value without options', () => {
    ary.updateLength(1, true);
    const v: any[] = [{}, {}];
    try {
      ary.ngControl.patchValue(v);
    } catch (e) {
      fail(e);
    }
    expect(ary.ngControl.value.length).toBe(2, 'failed to increase NgFormArray length by patchValue');
  });

  it('update NgFormArray length by patching value using options', () => {
    ary.updateLength(1, true);
    const v: any[] = [{}, {}];
    try {
      ary.ngControl.patchValue(v, {onlySelf: false, emitEvent: true});
    } catch (e) {
      fail(e);
    }
    expect(ary.ngControl.value.length).toBe(2, 'failed to increase NgFormArray length by patchValue');
  });


  it('update NgFormArray length by set value without options', () => {
    ary.updateLength(1, true);
    const v: any[] = [{}, {}];
    try {
      ary.ngControl.setValue(v);
    } catch (e) {
      fail(e);
    }
    expect(ary.ngControl.value.length).toBe(2, 'failed to increase NgFormArray length by setValue');
  });

  it('update NgFormArray length by set value using options', () => {
    ary.updateLength(1, true);
    const v: any[] = [{}, {}];
    try {
      ary.ngControl.setValue(v, {onlySelf: false, emitEvent: true});
    } catch (e) {
      fail(e);
    }
    expect(ary.ngControl.value.length).toBe(2, 'failed to increase NgFormArray length by setValue');
  });

});
