import {Injector, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FormConfig, FormI18n, ControlConfig, ModelType, ControlType} from '../config';
import {DynamicFormService} from '../services/dynamic-form.service';

import {ModelHelper} from './model-helper';
import {GroupModel} from './group-model';
import {ControlModel} from './control-model.interface';

import {JsonPointer} from 'jsonpointerx';

export class FormModel {
  dynamicFormService: DynamicFormService;
  injector: Injector;
  group: GroupModel;

  private _config: FormConfig;
  private _i18n?: FormI18n;

  get config(): FormConfig { return this._config; }
  set config(config: FormConfig) {
    this._config = config;
    let groupConfig: ControlConfig = {
      id: config.id,
      modelType: ModelType.MODEL_GROUP,
      controlType: ControlType.CONTROL_UNKNOWN,  // this model has no corresponding control component
      updateOn: config.updateOn,
      validators: config.validators,
      asyncValidators: config.asyncValidators,
      options: config.options,
      user: config.user
    };
    this.group = this.dynamicFormService.modelFactory.createRootGroup(groupConfig, this);
    this.group.setCSSClasses(this.group.css.container, 'adf-form-container');
    this.group.setCSSClasses(this.group.css.control, 'adf-form-control');
    this.group.setCSSClasses(this.group.css.content, 'adf-form-content');
    this.group.setCSSClasses(this.group.css.error, 'adf-form-error');
  }

  get i18n(): FormI18n|undefined { return this._i18n; }
  set i18n(i18n: FormI18n|undefined) {
    this._i18n = i18n;
    this.group.reTranslate();
  }

  get value(): any { return this.group.value; }
  get valueChanges(): Observable<any> { return this.group.valueChanges; }

  get valid(): boolean { return this.group.valid; }
  get status(): string { return this.group.status; }
  get statusChanges(): Observable<string> { return this.group.statusChanges; }

  get pristine(): boolean { return this.group.pristine; }
  get touched(): boolean { return this.group.touched; }

  private _initValue: any;

  // see ModelHelper.repairDisabledState why this dirty hack is currently required:
  private _dirtyHackForDisabledStateCalled: boolean;

  constructor(dynamicFormService: DynamicFormService, injector: Injector, config: FormConfig, i18n?: FormI18n) {
    this.dynamicFormService = dynamicFormService;
    this.injector = injector;
    this._i18n = i18n;
    this.config = config;  // create the group control
    this._dirtyHackForDisabledStateCalled = false;
  }

  initValue(value?: any): void {
    this.group.reset(value);
    this._initValue = this.value;
    if (!this._dirtyHackForDisabledStateCalled) {
      ModelHelper.repairDisabledState(this.group);
      this._dirtyHackForDisabledStateCalled = true;
    }
  }

  resetValue(): void {
    this.group.reset(this._initValue);
    if (!this._dirtyHackForDisabledStateCalled) {
      ModelHelper.repairDisabledState(this.group);
      this._dirtyHackForDisabledStateCalled = true;
    }
  }

  clearValue(): void {
    if (this.initValue) {
      let prevValue = this.group.ngControl.value;
      this.group.ngControl.reset();
      ModelHelper.setDirtyIfChanged(this.group, prevValue);
      // emit event to notify controls
      (this.valueChanges as EventEmitter<any>).emit(this.value);
    } else {
      this.group.ngControl.reset();
    }
    if (!this._dirtyHackForDisabledStateCalled) {
      ModelHelper.repairDisabledState(this.group);
      this._dirtyHackForDisabledStateCalled = true;
    }
  }



  initValueFromAppModel(appData: any, appPointerPrefix?: string): any {
    let newVal = this.valueFromAppModel(appData, appPointerPrefix);
    this.initValue(newVal);
  }

  valueFromAppModel(appData: any, appPointerPrefix?: string): any {
    return this.group.valueFromAppModel(
        {}, appData, appPointerPrefix ? JsonPointer.compile(appPointerPrefix) : undefined);
  }

  valueToAppModel(appData: any, appPointerPrefix?: string): any {
    return this.group.valueToAppModel(appData, appPointerPrefix ? JsonPointer.compile(appPointerPrefix) : undefined);
  }

  findControlByPath(path: string|string[]): ControlModel|undefined {
    let searchPath = Array.isArray(path) ? path : path.split('.');

    let resModel: ControlModel = this.group;

    for (let segment of searchPath) {
      let foundModel = resModel.getControl(segment);
      if (!foundModel) {
        return undefined;
      }
      resModel = foundModel;
    }
    return resModel;
  }
}
