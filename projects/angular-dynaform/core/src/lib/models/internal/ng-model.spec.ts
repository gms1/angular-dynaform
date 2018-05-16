// tslint:disable prefer-const
import {NgFormGroup} from './ng-form-group';
import {NgNullControl} from './ng-null-control';
import {NgFormArray, NgArrayModelHandler} from './ng-form-array';
import {FormControl} from '@angular/forms';
import {createNgFormGroupSubset, NgFormGroupSubset} from './ng-form-group-subset';



class NgFormArrayWrapper implements NgArrayModelHandler {
  ngControl: NgFormArray;
  constructor() {
    this.ngControl = new NgFormArray([]);
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
    return new NgFormGroup({});
  }
}

describe('ng-model test suite', () => {
  it('NgNullControl', () => {
    let ctrl = new NgNullControl();
    ctrl.setValue('asdf');
    expect(ctrl.value).toBeUndefined('setValue failed on NgNullControl');
    ctrl.patchValue('asdf');
    expect(ctrl.value).toBeUndefined('patchValue failed on NgNullControl');
    ctrl.reset('asdf');
    expect(ctrl.value).toBeUndefined('reset failed on NgNullControl');
    ctrl.reset();
    expect(ctrl.value).toBeUndefined('reset failed on NgNullControl');
  });

  it('NgFormGroup having NgNullControl', () => {
    let ctrl = new NgNullControl();
    let grp = new NgFormGroup({ngnull: ctrl});

    grp.setValue({ngnull: 'asdf'});
    expect(grp.value.ngnull).toBeUndefined('setValue failed on NgFormGroup');
    grp.setValue({ngnull: 'asdf'});
    expect(grp.value.ngnull).toBeUndefined('patchValue failed on NgFormGroup');
    grp.setValue({ngnull: 'asdf'});
    expect(grp.value.ngnull).toBeUndefined('reset failed on NgFormGroup');
    grp.reset();
    expect(grp.value.ngnull).toBeUndefined('reset failed on NgFormGroup');

  });

  it('NgFormArray', () => {
    let ary: NgFormArrayWrapper = new NgFormArrayWrapper();
    ary.updateLength(5);
    expect(ary.ngControl.length).toEqual(5, 'increasing length failed');
    ary.updateLength(3);
    expect(ary.ngControl.length).toEqual(3, 'decreasing length failed');
    ary.updateLength(1, true);
    expect(ary.ngControl.length).toEqual(3, 'setting smaller minimum length failed');
    ary.updateLength(7, true);
    expect(ary.ngControl.length).toEqual(7, 'setting greater minimum length failed');

  });

  it('NgFormGroup and Subset', () => {
    let grp: NgFormGroup = new NgFormGroup({a: new FormControl(), b: new FormControl(), c: new FormControl()});
    let subsetGroup1: NgFormGroupSubset = createNgFormGroupSubset(grp);
    let subsetGroup2: NgFormGroupSubset = createNgFormGroupSubset(grp, {c: grp.controls.c});
    subsetGroup1.subset = {b: grp.controls.b};

    grp.setValue({a: 1, b: 2, c: 3});
    grp.controls.b.reset();
    grp.controls.b.setErrors({required: true});
    expect(grp.valid).toBeFalsy();
    expect(grp.invalid).toBeTruthy();
    expect(subsetGroup1.valid).toBeFalsy();
    expect(subsetGroup1.invalid).toBeTruthy();
    expect(subsetGroup2.valid).toBeTruthy();
    expect(subsetGroup2.invalid).toBeFalsy();
    expect(subsetGroup1 instanceof NgFormGroup).toBeTruthy();
    expect(subsetGroup2 instanceof NgFormGroup).toBeTruthy();

  });

});
