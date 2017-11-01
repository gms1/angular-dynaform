import {Injectable, Type} from '@angular/core';

import {FormConfig} from '../config/form-config.interface';
import {FormI18n} from '../config/form-i18n.interface';
import {FormModel} from '../models/form-model';
import {TypeRegistry} from '../utils/type-registry';

import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';
import {DynamicFormErrorComponent} from '../components/dynamic-form-error.component';
import {DynamicFormFormControlComponent} from '../components/dynamic-form-form-control.component';

import {DynamicFormValidatorRegistry, DynamicFormAsyncValidatorRegistry} from '../validations/dynamic-form.validator';

import {DynamicFormModelFactoryService} from './dynamic-form-model-factory.service';

import {DynamicFormAction} from '../actions/dynamic-form.action';

@Injectable()
export class DynamicFormService {
  // form model factory service
  get modelFactory(): DynamicFormModelFactoryService { return this._modelFactory; }

  // component registry:

  // inject these components by resolving the registered type
  formControlComponentType: Type<DynamicFormFormControlComponent>;
  errorComponentType: Type<DynamicFormErrorComponent>;

  // inject these components by resolving the registered type for a particular name
  _controlComponentTypes: TypeRegistry<DynamicFormControlComponentBase>;
  get controlComponentTypes(): Map<string, Type<DynamicFormControlComponentBase>> {
    return this._controlComponentTypes.snapshot;
  }

  // validator function registry:
  // register your validation functions
  validatorFn: DynamicFormValidatorRegistry;
  asyncValidatorFn: DynamicFormAsyncValidatorRegistry;

  // action registry:
  // instantiate actions for the registered type for a particular name
  // multiple instances are required => not using DI
  actionTypes: TypeRegistry<DynamicFormAction>;

  // constructor
  constructor(private _modelFactory: DynamicFormModelFactoryService) {
    this.validatorFn = new DynamicFormValidatorRegistry();
    this.asyncValidatorFn = new DynamicFormAsyncValidatorRegistry();

    this.actionTypes = new TypeRegistry<DynamicFormAction>();
    this._controlComponentTypes = new TypeRegistry<DynamicFormControlComponentBase>();
  }


  // component registry:
  setControlComponent(typeName: string, component: Type<DynamicFormControlComponentBase>, ifNotExist?: boolean): void {
    this._controlComponentTypes.setType(typeName, component, ifNotExist);
  }

  setFormControlComponent(component: Type<DynamicFormFormControlComponent>, ifNotExist?: boolean): void {
    if (!ifNotExist || !this.formControlComponentType) {
      this.formControlComponentType = component;
    }
  }

  setErrorComponent(component: Type<DynamicFormErrorComponent>, ifNotExist?: boolean): void {
    if (!ifNotExist || !this.errorComponentType) {
      this.errorComponentType = component;
    }
  }

  // create form model:
  createFormModel(config: FormConfig, i18n?: FormI18n): FormModel {
    return this._modelFactory.createFormModel(this, config, i18n);
  }
}
