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

  /*
   * TODO: this is a dirty hack which requires further investigation!
   * using material2 the disabled state of the model somehow gets lost and the DOM elements, specially buttons,
   * are showing up as enabled.
   * I havn't seen this behaviour for other elements; it never happend for an initialially disabled checkbox (see
   * 'newsletter' in our material example form)
   * Also the same form in basic-HTML (see our basic HTM example form) worked as expected!
   * As soon as the form was filled with initial values (from the parent view inside ngAfterViewInit using setTimeout )
   * all worked fine
   */
  export function repairDisabledState(item: ControlModel): void {
    if (item instanceof GroupModelBase) {
      item.items.forEach((childItem: ControlModel) => { repairDisabledState(childItem); });
    } else if (item instanceof ArrayModel) {
      if (item.header) {
        repairDisabledState(item.header);
      }
      item.items.forEach((childItem: ControlModel) => { repairDisabledState(childItem); });
      if (item.footer) {
        repairDisabledState(item.footer);
      }
    } else {
      if (item.ngControl.disabled) {
        item.ngControl.enable({emitEvent: false});
        item.ngControl.disable({emitEvent: false});
      }
    }
  }
}
