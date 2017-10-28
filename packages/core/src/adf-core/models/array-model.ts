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
// 'arrayid[idx].'
// In case of delete/insert operations this prefix stays the same, because we only delete/add such item nodes at the end
// of the array and are moving the values of the item nodes around

export class ArrayModel extends AbstractControlModel<NgFormArray, ArrayOptions> {
  header?: GroupModelBase;
  items: GroupModelBase[];
  footer?: GroupModelBase;

  private _currIndex: number;
  get currIndex(): number { return this._currIndex; }
  set currIndex(currIndex: number) {
    if (currIndex < 0) {
      return;
    }
    this._currIndex = currIndex;
  }

  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, formModel: FormModel, parentPath?: string[],
      parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config, (config.options || {item: {}}) as ArrayOptions,
        new NgFormArray([], {updateOn: config.updateOn}), formModel, parentPath, parentGroup, parentArray,
        parentArrayIdx);
    this.items = [];
    this.setCSSClasses(this.css.container, 'adf-array-container');
    this.setCSSClasses(this.css.control, 'adf-array-control');
    this.setCSSClasses(this.css.content, 'adf-array-content');
    this.setCSSClasses(this.css.label, 'adf-array-label');
    this.setCSSClasses(this.css.error, 'adf-array-error');
    this.ngControl.model = this;
    this._currIndex = -1;
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

  addItem(): void { this.updateLength(this.items.length + 1); }

  // NOTE: the insert operation increases the array length and moves the values
  // of the items with a larger index to the end.
  // Neither components nor model items are moved during this operation
  insertItem(index: number = this._currIndex): void {
    if (index < 0) {
      index = 0;
    }
    if (index > this.items.length) {
      index = this.items.length;
    }
    this.addItem();
    for (let idx = this.items.length - 1; idx > index; idx--) {
      ArrayModel.copyItem(this.items[idx - 1], this.items[idx]);
    }
    this.items[index].reset();
  }

  // NOTE: the delete operation moves the items with a larger index forward by one position
  // and decreases the array length afterwards
  // Neither components nor model items are moved during this operation
  deleteItem(index: number = this._currIndex): void {
    if (index < 0 || index >= this.items.length) {
      return;
    }
    let lastIdx = this.items.length - 1;
    for (let idx = index; idx < lastIdx; idx++) {
      ArrayModel.copyItem(this.items[idx + 1], this.items[idx]);
    }
    this.updateLength(lastIdx);
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
  }


  getId(id: string, idx: number, parentGroup?: GroupModelBase): string {
    if (parentGroup) {
      switch (idx) {
        case HEADER_IDX:
          return `${this.id}:HEADER.${id}`;
        case FOOTER_IDX:
          return `${this.id}:FOOTER.${id}`;
        default:
          return `${this.id}[${idx}].${id}`;
      }
    } else {
      switch (idx) {
        case HEADER_IDX:
        case FOOTER_IDX:
          return `${this.id}:${id}`;
        default:
          return `${this.id}[${idx}]`;
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
