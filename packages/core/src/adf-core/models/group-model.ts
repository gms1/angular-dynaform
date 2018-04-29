// tslint:disable no-use-before-declare
import {FormGroup} from '@angular/forms';

import {ControlConfig} from '../config/control-config.interface';
import {GroupOptions} from '../config/control-options.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

import {ArrayModel} from './array-model';
import {ControlModel, AbstractControlModel} from './control-model.interface';
import {FormModel} from './form-model';

import {NgFormGroup} from './internal/ng-form-group';
import {createNgFormGroupSubset} from './internal/ng-form-group-subset';

import {JsonPointer} from 'jsonpointerx';

// groups for model type MODEL_GROUP (GroupModel)
//   have their own FormGroup assigned to the ngControl property
// groups for model type MODEL_SUBSET (SubsetModel)
//   have their ngControl property set to their parents ngControl property (FormGroup)
//   so child items will be registered for the parent FormGroup

export class GroupModelBase extends AbstractControlModel<FormGroup, GroupOptions> {
  _items: ControlModel[];
  get items(): ControlModel[] {
    return this._items;
  }

  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, ngControl: FormGroup, formModel: FormModel,
      parentPath?: string[], parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config, (config.options || {group: []}) as GroupOptions, ngControl, formModel, parentPath,
        parentGroup, parentArray, parentArrayIdx);
    this._items = [];
    this.setCSSClasses(this.css.container, 'adf-group-container');
    this.setCSSClasses(this.css.control, 'adf-group-control');
    this.setCSSClasses(this.css.content, 'adf-group-content');
    this.setCSSClasses(this.css.error, 'adf-group-error');
  }

  reTranslate(): void {
    this.items.forEach((item) => {
      item.reTranslate();
    });
    super.reTranslate();
  }

  protected createItems(): void {
    this.options.group.forEach((itemConfig) => this.createItem(itemConfig));
  }

  protected createItem(itemConfig: ControlConfig): ControlModel {
    const control = this.dynamicFormService.modelFactory.createControl(
        itemConfig, this.formModel, this.path, this, this.parentArray, this.parentArrayIdx);
    this.items.push(control);
    if (!(control instanceof SubsetModel)) {
      // NOTES: SubsetModel is using the same ngControl (FormGroup) as the parentGroup, so adding a subset to the
      // ngControl of the parent, would lead to 'Maximum call stack size exceeded'

      // TODO: error handling for duplicate key values
      this.ngControl.addControl(control.key, control.ngControl);
      }
    return control;
  }

  valueFromAppModel(formData: any, appData: any, appPointerPrefix?: JsonPointer): any {
    this.items.forEach((item) => {
      item.valueFromAppModel(formData, appData, appPointerPrefix);
    });
    return formData;
  }

  valueToAppModel(appData: any, appPointerPrefix?: JsonPointer): any {
    this.items.forEach((item) => {
      item.valueToAppModel(appData, appPointerPrefix);
    });
    return appData;
  }
  }

export class GroupModel extends GroupModelBase {
  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, formModel: FormModel, parentPath?: string[],
      parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config, new NgFormGroup({}, {updateOn: config.updateOn}), formModel, parentPath,
        parentGroup, parentArray, parentArrayIdx);
    this.createItems();
    this.createValidators();
    this.createAsyncValidators();
    if (config.disabled) {
      this.disable();
    }
  }

  protected createItem(itemConfig: ControlConfig): ControlModel {
    const control = super.createItem(itemConfig);
    if (!control.path || control instanceof SubsetModel) {
      // not part of the form data model
      return control;
    }
    this.controls[control.key] = control;
    return control;
  }
  }

export class SubsetModel extends GroupModelBase {
  superGroup: GroupModel;
  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, formModel: FormModel, parentPath?: string[],
      parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config,
        // tslint:disable-next-line no-unnecessary-type-assertion
        SubsetModel.getSuperGroup(parentGroup as GroupModelBase).ngControl, formModel, parentPath, parentGroup,
        parentArray, parentArrayIdx);
    // tslint:disable-next-line no-unnecessary-type-assertion
    this.superGroup = SubsetModel.getSuperGroup(this.parentGroup as GroupModelBase) as GroupModel;
    this._ngSubsetControl = createNgFormGroupSubset(this.superGroup.ngControl, this.controls);
    this.createItems();
    if (config.disabled) {
      this.disable();
    }
  }


  protected createItem(itemConfig: ControlConfig): ControlModel {
    const control = super.createItem(itemConfig);
    if (!control.path || control instanceof SubsetModel) {
      // not part of the form data model
      return control;
    }
    // registering child control as child of super group:
    this.superGroup.controls[control.key] = control;
    // registering child control as our child:
    this.controls[control.key] = control;
    return control;
  }


  static getSuperGroup(parent: GroupModelBase): GroupModel {
    let ancestor: GroupModelBase = parent;
    while (!(ancestor instanceof GroupModel) && ancestor.parentGroup) {
      ancestor = ancestor.parentGroup;
      }
    return ancestor as GroupModel;
  }
}
