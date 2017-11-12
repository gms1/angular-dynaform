import {EventEmitter} from '@angular/core';
import {ControlConfig} from '../config/control-config.interface';
import {ArrayOptions} from '../config/control-options.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

import {AbstractControlModel, ControlModel} from './control-model.interface';
import {FormModel} from './form-model';
import {GroupModelBase} from './group-model';
import {ModelHelper} from './model-helper';
import {NgFormArray} from './internal/ng-form-array';

import {JsonPointer} from 'jsonpointerx';

const HEADER_IDX = -1;
const FOOTER_IDX = -2;

// the array item nodes ( see property items ), header and footer, are of type 'GroupModel'
//   they do not have a parentGroup propery set, because their parent is the ArrayModel

// the IDs of the hole control-model tree of an array item with array id 'arrayid' and index 'idx' will be prefixed by
// 'arrayid-idx_'
// In case of delete/insert operations this prefix stays the same, because we only delete/add such item nodes at the end
// of the array and are moving the values of the item nodes around

export class ArrayModel extends AbstractControlModel<NgFormArray, ArrayOptions> {
  header?: GroupModelBase;
  items: GroupModelBase[];
  footer?: GroupModelBase;

  selectionChange: EventEmitter<number>;

  private _selectedIndex: number;
  get selectedIndex(): number { return this._selectedIndex; }
  set selectedIndex(newIndex: number) {
    // tslint:disable-next-line triple-equals
    if (newIndex == undefined || newIndex < 0) {
      newIndex = HEADER_IDX;
    }
    if (newIndex === HEADER_IDX && this._selectedIndex < this.items.length) {
      // keep valid selectedIndex if new index is out of range
      return;
    }
    if (this._selectedIndex !== newIndex) {
      this._selectedIndex = newIndex;
      this.selectionChange.emit(this._selectedIndex);
    }
  }


  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, formModel: FormModel, parentPath?: string[],
      parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config, (config.options || {item: {}}) as ArrayOptions,
        new NgFormArray([], {updateOn: config.updateOn}), formModel, parentPath, parentGroup, parentArray,
        parentArrayIdx);
    this.items = [];
    this._selectedIndex = HEADER_IDX;
    this.selectionChange = new EventEmitter<number>();
    this.setCSSClasses(this.css.container, 'adf-array-container');
    this.setCSSClasses(this.css.control, 'adf-array-control');
    this.setCSSClasses(this.css.content, 'adf-array-content');
    this.setCSSClasses(this.css.label, 'adf-array-label');
    this.setCSSClasses(this.css.error, 'adf-array-error');
    this.ngControl.model = this;
    this.createHeader();
    this.createFooter();
    if (this.options.initialItemCount) {
      this.ngControl.updateLength(this.options.initialItemCount);
    }
    this.createValidators();
    this.createAsyncValidators();
    if (config.disabled) {
      this.disable();
    }
  }

  getControl(key: string): ControlModel|undefined {
    let idx = parseInt(key, 10);
    if (isNaN(idx) || this.items.length <= idx) {
      return undefined;
    }
    return this.items[idx];
  }

  addItem(): void {
    let length = this.items.length;
    // NOTE: dirty/pristine is not observable, so as a praktical workaround some code
    // may rely on the correct dirty/pristine state if valueChanges
    // to keep this code working, we have to set the dirty flag before updating any value
    this.ngControl.markAsDirty();
    this.ngControl.markAsTouched();
    this.updateLength(length + 1);
    this.items[length].ngControl.markAsDirty();
  }

  // NOTE: the insert operation increases the array length and moves the values
  // of the items with a larger index to the end.
  // Neither components nor model items are moved during this operation
  insertItem(index: number = this.selectedIndex): void {
    if (index < 0) {
      index = 0;
    }
    if (index > this.items.length) {
      index = this.items.length;
    }
    // NOTE: dirty/pristine is not observable, so as a praktical workaround some code
    // may rely on the correct dirty/pristine state if valueChanges
    // to keep this code working, we have to set the dirty flag before updating any value
    this.ngControl.markAsDirty();
    this.ngControl.markAsTouched();
    this.updateLength(this.items.length + 1);
    for (let idx = this.items.length - 1; idx > index; idx--) {
      ArrayModel.copyItem(this.items[idx - 1], this.items[idx]);
    }
    this.items[index].reset();
    this.items[index].ngControl.markAsDirty();
  }

  // NOTE: the delete operation moves the items with a larger index forward by one position
  // and decreases the array length afterwards
  // Neither components nor model items are moved during this operation
  deleteItem(index: number = this.selectedIndex): void {
    if (index < 0 || index >= this.items.length) {
      return;
    }
    // NOTE: dirty/pristine is not observable, so as a praktical workaround some code
    // may rely on the correct dirty/pristine state if valueChanges
    // to keep this code working, we have to set the dirty flag before updating any value
    this.ngControl.markAsDirty();
    this.ngControl.markAsTouched();
    let newLength = this.items.length - 1;
    for (let idx = index; idx < newLength; idx++) {
      ArrayModel.copyItem(this.items[idx + 1], this.items[idx]);
    }
    this.updateLength(newLength);
  }


  updateLength(length: number): void {
    while (this.ngControl.length > length) {
      this.ngControl.removeAt(this.ngControl.length - 1);
    }
    if (this.items.length > length) {
      this.items.splice(length);
    }
    if (this.items.length < length) {
      while (this.items.length < length) {
        this.items.push(this.dynamicFormService.modelFactory.createArrayGroup(
            `${this.items.length}`, this.formModel, this, this.items.length, this.options.item, this.path));
      }
    }
    while (this.ngControl.length < length) {
      this.ngControl.push(this.items[this.ngControl.length].ngControl);
    }
    if (this.selectedIndex >= this.items.length) {
      this.selectedIndex = HEADER_IDX;
    }
  }


  getId(id: string, idx: number, parentGroup?: GroupModelBase): string {
    if (parentGroup) {
      switch (idx) {
        case HEADER_IDX:
          return `${this.id}-HEADER-${id}`;
        case FOOTER_IDX:
          return `${this.id}-FOOTER-${id}`;
        default:
          return `${this.id}-${idx}-${id}`;
      }
    } else {
      switch (idx) {
        case HEADER_IDX:
        case FOOTER_IDX:
          return `${this.id}-${id}`;
        default:
          return `${this.id}-${idx}`;
      }
    }
  }


  reTranslate(): void {
    if (this.header) {
      this.header.reTranslate();
    }
    if (this.footer) {
      this.footer.reTranslate();
    }
    this.items.forEach((item) => { item.reTranslate(); });
    super.reTranslate();
  }

  protected createHeader(): GroupModelBase|undefined {
    if (this.options.header) {
      this.header = this.dynamicFormService.modelFactory.createArrayGroup(
          'HEADER', this.formModel, this, HEADER_IDX, this.options.header);
    }
    return this.header;
  }

  protected createFooter(): GroupModelBase|undefined {
    if (this.options.footer) {
      this.footer = this.dynamicFormService.modelFactory.createArrayGroup(
          'FOOTER', this.formModel, this, FOOTER_IDX, this.options.footer);
    }
    return this.footer;
  }


  valueFromAppModel(formData: any, appData: any, appPointerPrefix?: JsonPointer): any {
    if (!this.jpApp || !this.jpForm) {
      return formData;
    }
    let appValue = (appPointerPrefix ? appPointerPrefix.concat(this.jpApp) : this.jpApp).get(appData);
    if (!Array.isArray(appValue)) {
      this.jpForm.set(formData, undefined);
      return formData;
    }
    let formValue: any[] = [];
    formValue.length = appValue.length;
    this.jpForm.set(formData, formValue);
    this.items.forEach((item) => { item.valueFromAppModel(formData, appData, appPointerPrefix); });
    return formData;
  }

  valueToAppModel(appData: any, appPointerPrefix?: JsonPointer): any {
    if (!this.jpApp) {
      return appData;
    }
    let jpCurr = appPointerPrefix ? appPointerPrefix.concat(this.jpApp) : this.jpApp;
    let appArray = jpCurr.get(appData) || [];
    appArray.length = this.items.length;
    jpCurr.set(appData, appArray);

    this.items.forEach((item, idx) => { item.valueToAppModel(appData, appPointerPrefix); });
    return appData;
  }


  static copyItem(fromItem: GroupModelBase, toItem: GroupModelBase): void {
    toItem.value = fromItem.value;
    ModelHelper.copyStates(fromItem, toItem);
  }
}
