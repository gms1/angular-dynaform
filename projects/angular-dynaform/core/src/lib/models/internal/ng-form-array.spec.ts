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

describe('ng-form-array', () => {
  let ary: NgFormArrayWrapper;
  beforeEach(() => {
    ary = new NgFormArrayWrapper();

  });

  it('NgFormArray', () => {
    ary.updateLength(5);
    expect(ary.ngControl.length).toEqual(5, 'increasing length failed');
    ary.updateLength(3);
    expect(ary.ngControl.length).toEqual(3, 'decreasing length failed');
    ary.updateLength(1, true);
    expect(ary.ngControl.length).toEqual(3, 'setting smaller minimum length failed');
    ary.updateLength(7, true);
    expect(ary.ngControl.length).toEqual(7, 'setting greater minimum length failed');

    ary.ngControl.model = undefined;
    try {
      ary.ngControl.updateLength(5);
    } catch (e) {
      fail(e);
    }


  });


});
