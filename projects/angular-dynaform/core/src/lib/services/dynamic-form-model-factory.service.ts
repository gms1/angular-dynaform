// tslint:disable no-use-before-declare
import {Injectable, Injector} from '@angular/core';

import {ControlConfig, ModelType, GroupOptions, ControlType} from '../config';
import {FormConfig} from '../config/form-config';
import {FormI18n} from '../config/form-i18n';
import {ArrayModel} from '../models/array-model';
import {NullControlModel, ValueControlModel} from '../models/control-model-base';
import {ControlModel} from '../models/control-model';
import {FormModel} from '../models/form-model';
import {GroupModelBase, SubsetModel, GroupModel} from '../models/group-model';

import {DynamicFormService} from './dynamic-form.service';

// a class containing the factory methods for instantiating the form model as a tree of ControlModel classes

@Injectable()
export class DynamicFormModelFactoryService {
  // NOTES:
  // this injector will not be used to inject the model itself, but for injecting dependencies like validators
  constructor(public injector: Injector) {}

  createFormModel(dynamicFormService: DynamicFormService, config: FormConfig, i18n?: FormI18n, injector?: Injector):
      FormModel {
    return new FormModel(dynamicFormService, injector || this.injector, config, i18n);
  }

  createControl(
      config: ControlConfig, formModel: FormModel, parentPath?: string[], parentGroup?: GroupModelBase,
      parentArray?: ArrayModel, parentArrayIdx?: number): ControlModel {
    if (!parentGroup) {
      throw new Error(`internal error: no parentGroup defined for control '${config.id}'`);
    }
    switch (config.modelType) {
      case ModelType.MODEL_GROUP:
        return new GroupModel(
            formModel.dynamicFormService, config, formModel, parentPath, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_ARRAY:
        return new ArrayModel(
            formModel.dynamicFormService, config, formModel, parentPath, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_SUBSET:
        return new SubsetModel(
            formModel.dynamicFormService, config, formModel, parentPath, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_VALUE:
        return new ValueControlModel(
            formModel.dynamicFormService, config, formModel, parentPath, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_NULL:
        return new NullControlModel(
            formModel.dynamicFormService, config, formModel, undefined, parentGroup, parentArray, parentArrayIdx);
      default:
        throw new Error(`model type '${config.modelType}' defined for '${config.id}' is unknown`);
    }
  }

  // create the root GroupModel
  createRootGroup(config: ControlConfig, formModel: FormModel): GroupModel {
    return new GroupModel(formModel.dynamicFormService, config, formModel);
  }

  // create a GroupModel (for header, footer or an array items) for a given array
  createArrayGroup(
      id: string, formModel: FormModel, parentArray: ArrayModel, parentArrayIdx: number, options: GroupOptions,
      parentPath?: string[]): GroupModel {
    const groupConfig: ControlConfig = {
      id,
      modelType: ModelType.MODEL_GROUP,
      controlType: ControlType.CONTROL_UNKNOWN,  // does not have a corresponding control component, will be shown as
                                                 // part of the parent array component
      options
    };

    return new GroupModel(
        formModel.dynamicFormService, groupConfig, formModel, parentPath, undefined, parentArray, parentArrayIdx);
  }
}
