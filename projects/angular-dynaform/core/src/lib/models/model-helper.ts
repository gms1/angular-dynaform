import {ControlModel} from './control-model';
import {ArrayModel} from './array-model';
import {GroupModelBase} from './group-model';
import {ValueControlModel} from './control-model-base';

// tslint:disable no-namespace
export namespace ModelHelper {
  export function copyStates(fromItem: ControlModel, toItem: ControlModel): void {
    if ((fromItem instanceof GroupModelBase && toItem instanceof GroupModelBase) ||
        (fromItem instanceof ArrayModel && toItem instanceof ArrayModel)) {
      const len: number = Math.min(fromItem.items.length, toItem.items.length);
      for (let i = 0; i < len; i++) {
        copyStates(fromItem.items[i], toItem.items[i]);
      }
    }
    if (fromItem.ngControl.touched) {
      toItem.ngControl.markAsTouched({onlySelf: true});
    } else {
      toItem.ngControl.markAsUntouched({onlySelf: true});
    }
    if (fromItem.ngControl.dirty) {
      toItem.ngControl.markAsDirty({onlySelf: true});
    } else {
      toItem.ngControl.markAsPristine({onlySelf: true});
    }
  }


  export function setDirtyIfChanged(item: ControlModel, fromFormValue: any): void {
    if ((item instanceof GroupModelBase) || (item instanceof ArrayModel)) {
      (item.items as ControlModel[]).forEach((childItem: ControlModel) => {
        setDirtyIfChanged(childItem, fromFormValue);
      });
      if (item instanceof ArrayModel && item.jpForm) {
        const cmpValue = item.jpForm.get(fromFormValue);
        if (Array.isArray(cmpValue) && cmpValue.length !== item.items.length) {
          item.ngControl.markAsDirty();
        }
      }
    } else if (item instanceof ValueControlModel && item.jpForm) {
      const cmpValue = item.jpForm.get(fromFormValue);
      // tslint:disable-next-line triple-equals
      if (cmpValue != item.value) {
        item.ngControl.markAsDirty();
      }
    }
  }
}
