// tslint:disable no-null-keyword no-unbound-method no-unused-variable prefer-const
import {NgFormGroupSubset, createNgFormGroupSubset} from './ng-form-group-subset';
import {NgNullControl} from './ng-null-control';
import {FormControl} from '@angular/forms';
import {NgFormGroup} from './ng-form-group';

describe('ng-null-control', () => {

  it('NgFormGroup and Subset', () => {
    let grp = new NgFormGroup({a: new FormControl(), b: new FormControl(), c: new FormControl()}, {updateOn: 'change'});
    let subsetGroup1 = createNgFormGroupSubset(grp);
    let subsetGroup2 = createNgFormGroupSubset(grp, {c: grp.controls.c});
    subsetGroup1.subset = {b: grp.controls.b};

    expect(subsetGroup1.subset).toEqual({b: grp.controls.b}, 'subset 1 has wrong subset');
    expect(subsetGroup2.subset).toEqual({c: grp.controls.c}, 'subset 2 has wrong subset');
    expect(subsetGroup2.controls).toBe(grp.controls, 'subset 2 has wrong controls');

    expect((subsetGroup2 as any).unknown).toBeUndefined('unknown property is defined');
    (subsetGroup2 as any).unknown = 'foo';
    expect((subsetGroup2 as any).unknown).toBe('foo', 'unknown property was wrongly defined');

    grp.setValue({a: 1, b: 2, c: 3});
    grp.controls.b.reset();
    grp.controls.b.setErrors({required: true});
    expect(grp.valid).toBeFalsy('group should be invalid');
    expect(grp.invalid).toBeTruthy('group should not be valid');
    expect(subsetGroup1.valid).toBeFalsy('subset 1 should be invalid');
    expect(subsetGroup1.invalid).toBeTruthy('subset 1 should not be valid');
    expect(subsetGroup2.valid).toBeTruthy('subset 2 should be valid');
    expect(subsetGroup2.invalid).toBeFalsy('subset 2 should not be invalid');
    expect(subsetGroup1 instanceof NgFormGroup).toBeTruthy('subset 1 is not a NgFormGroup');
    expect(subsetGroup2 instanceof NgFormGroup).toBeTruthy('subset 2 is not a NgFormGroup');

  });


});
