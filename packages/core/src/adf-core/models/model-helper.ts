import {ControlModel} from './control-model.interface';
import {ArrayModel} from './array-model';
import {GroupModelBase} from './group-model';
import {ValueControlModel} from './control-model';

// tslint:disable no-namespace
export namespace ModelHelper {
  export function copyStates(fromItem: ControlModel, toItem: ControlModel): void {
    if ((fromItem instanceof GroupModelBase && toItem instanceof GroupModelBase) ||
        (fromItem instanceof ArrayModel && toItem instanceof ArrayModel)) {
      let len: number = Math.min(fromItem.items.length, toItem.items.length);
      for (let i: number = 0; i < len; i++) {
        copyStates(fromItem.items[i], toItem.items[i]);
      }
    } else {
      if (fromItem.ngControl.touched) {
        if (toItem.ngControl.untouched) {
          toItem.ngControl.markAsTouched({onlySelf: true});
        }
      } else {
        if (toItem.ngControl.touched) {
          toItem.ngControl.markAsUntouched();
        }
      }
      if (fromItem.ngControl.dirty) {
        if (toItem.ngControl.pristine) {
          toItem.ngControl.markAsDirty({onlySelf: true});
        }
      } else {
        if (toItem.ngControl.dirty) {
          toItem.ngControl.markAsPristine();
        }
      }
    }
  }


  export function setDirtyIfChanged(item: ControlModel, fromFormValue: any): void {
    if ((item instanceof GroupModelBase) || (item instanceof ArrayModel)) {
      (item.items as ControlModel[]).forEach((childItem: ControlModel) => {
        setDirtyIfChanged(childItem, fromFormValue);
      });
      if (item instanceof ArrayModel && item.jpForm) {
        let cmpValue = item.jpForm.get(fromFormValue);
        if (Array.isArray(cmpValue) && cmpValue.length !== item.items.length) {
          item.ngControl.markAsDirty();
        }
      }
    } else if (item instanceof ValueControlModel && item.jpForm) {
      let cmpValue = item.jpForm.get(fromFormValue);
      // tslint:disable-next-line triple-equals
      if (cmpValue != item.value) {
        item.ngControl.markAsDirty();
      }
    }
  }
}
