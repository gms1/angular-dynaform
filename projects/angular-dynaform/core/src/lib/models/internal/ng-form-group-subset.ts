import { NgFormGroup } from './ng-form-group';
// tslint:disable no-unused-variable no-unnecessary-class

/**
 * @description NgFormGroupSubset is a proxy for NgFormGroup
 * it makes the valid/invalid properties subset aware
 * a feature which is currently only required if MODEL_SUBSET is used for MatSep.stepControl
 * to check the validity of a material step
 *
 * @internal
 * @export
 */
export declare type NgFormGroupSubset = NgFormGroup & {
  subset: { [key: string]: any };
};

export function createNgFormGroupSubset(
  target: NgFormGroup,
  subset?: { [key: string]: any },
): NgFormGroupSubset {
  const controls = { subset: subset || {} };
  return new Proxy(target, {
    get: (object: any, key, proxy): any => {
      switch (key) {
        case 'subset':
          return controls.subset;
        case 'valid':
          for (const k of Object.keys(controls.subset)) {
            if (object.controls[k].invalid) {
              return false;
            }
          }
          return true;
        case 'invalid':
          for (const k of Object.keys(controls.subset)) {
            if (object.controls[k].valid) {
              return false;
            }
          }
          return true;
        default:
          return object[key];
      }
    },
    set: (object: any, key, value, proxy): boolean => {
      if (key === 'subset') {
        controls.subset = value;
      } else {
        object[key] = value;
      }
      return true;
    },
  });
}
