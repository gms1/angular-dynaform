// tslint:disable no-use-before-declare
import {Injectable, Injector} from '@angular/core';

import {ControlConfig, ModelType, GroupOptions, ControlType} from '../config';
import {FormConfig} from '../config/form-config.interface';
import {FormI18n} from '../config/form-i18n.interface';
import {ArrayModel} from '../models/array-model';
import {NullControlModel, ValueControlModel} from '../models/control-model';
import {ControlModel} from '../models/control-model.interface';
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
      config: ControlConfig, formModel: FormModel, parentGroup?: GroupModelBase, parentArray?: ArrayModel,
      parentArrayIdx?: number): ControlModel {
    if (config.modelType === ModelType.MODEL_GROUP) {
      return new GroupModel(formModel.dynamicFormService, config, formModel, parentGroup, parentArray, parentArrayIdx);
    }
    if (!parentGroup) {
      throw new Error(`internal error: no parentGroup defined for control '${config.id}'`);
    }
    // TODO: error handling for duplicate key values using parentGroup.ngControl which should be fine, even for subsets
    switch (config.modelType) {
      case ModelType.MODEL_ARRAY:
        return new ArrayModel(
            formModel.dynamicFormService, config, formModel, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_SUBSET:
        return new SubsetModel(
            formModel.dynamicFormService, config, formModel, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_VALUE:
        return new ValueControlModel(
            formModel.dynamicFormService, config, formModel, parentGroup, parentArray, parentArrayIdx);
      case ModelType.MODEL_NULL:
        return new NullControlModel(
            formModel.dynamicFormService, config, formModel, parentGroup, parentArray, parentArrayIdx);
      default:
        throw new Error(`model type '${config.modelType}' defined for '${config.id}' is unknown`);
    }
  }



  // create a GroupModel (for header, footer or an array items) for a given array
  createArrayGroup(
      id: string, formModel: FormModel, parentArray: ArrayModel, parentArrayIdx: number,
      options: GroupOptions): GroupModel {
    let groupConfig: ControlConfig = {
      id,
      modelType: ModelType.MODEL_GROUP,
      controlType:
          ControlType.CONTROL_UNKNOWN,  // this is part of the parent array and does not have a own control component
      options
    };

    return new GroupModel(formModel.dynamicFormService, groupConfig, formModel, undefined, parentArray, parentArrayIdx);
  }
}
