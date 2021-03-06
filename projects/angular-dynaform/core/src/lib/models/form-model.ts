import { Injector, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { FormConfig, FormI18n, ControlConfig, ModelType, ControlType } from '../config';
import { DynamicFormService } from '../services/dynamic-form.service';

import { ControlModel } from './control-model';
import { GroupModel, GroupModelBase } from './group-model';
import { ArrayModel } from './array-model';
import { ValueModel } from './value-model';

import { JsonPointer } from 'jsonpointerx';

export class FormModel {
  dynamicFormService: DynamicFormService;
  injector: Injector;
  group!: GroupModel;

  private _config!: FormConfig;
  private _i18n?: FormI18n;

  get config(): FormConfig {
    return this._config;
  }
  set config(config: FormConfig) {
    this._config = config;
    const groupConfig: ControlConfig = {
      id: config.id,
      modelType: ModelType.MODEL_GROUP,
      controlType: ControlType.CONTROL_UNKNOWN, // this model has no corresponding control component
      updateOn: config.updateOn,
      validators: config.validators,
      asyncValidators: config.asyncValidators,
      options: config.options,
      user: config.user,
    };
    this.group = this.dynamicFormService.modelFactory.createRootGroup(groupConfig, this);
    this.group.setCSSClasses(this.group.css.container, 'adf-form-container');
    this.group.setCSSClasses(this.group.css.control, 'adf-form-control');
    this.group.setCSSClasses(this.group.css.content, 'adf-form-content');
    this.group.setCSSClasses(this.group.css.error, 'adf-form-error');
  }

  get i18n(): FormI18n | undefined {
    return this._i18n;
  }
  set i18n(i18n: FormI18n | undefined) {
    this._i18n = i18n;
    this.group.reTranslate();
  }

  get value(): any {
    return this.group.value;
  }
  get valueChanges(): Observable<any> {
    return this.group.valueChanges;
  }

  get valid(): boolean {
    return this.group.valid;
  }
  get status(): string {
    return this.group.status;
  }
  get statusChanges(): Observable<string> {
    return this.group.statusChanges;
  }

  get pristine(): boolean {
    return this.group.pristine;
  }
  get touched(): boolean {
    return this.group.touched;
  }

  private _initValue: any;

  constructor(
    dynamicFormService: DynamicFormService,
    injector: Injector,
    config: FormConfig,
    i18n?: FormI18n,
  ) {
    this.dynamicFormService = dynamicFormService;
    this.injector = injector;
    this._i18n = i18n;
    this.config = config; // create the group control
  }

  initValue(value?: any): void {
    this.group.reset(value);
    this._initValue = this.value;
  }

  resetValue(): void {
    this.group.reset(this._initValue);
  }

  clearValue(): void {
    if (this._initValue) {
      this.group.ngControl.reset(undefined, { emitEvent: false });
      setDirtyIfChanged(this.group, this._initValue);
      // emit event to notify controls
      (this.valueChanges as EventEmitter<any>).emit(this.value);
    } else {
      this.group.ngControl.reset();
    }
  }

  initValueFromAppModel(appData: any, appPointerPrefix?: string): any {
    const newVal = this.valueFromAppModel(appData, appPointerPrefix);
    this.initValue(newVal);
  }

  valueFromAppModel(appData: any, appPointerPrefix?: string): any {
    return this.group.valueFromAppModel(
      {},
      appData,
      appPointerPrefix ? JsonPointer.compile(appPointerPrefix) : undefined,
    );
  }

  valueToAppModel(appData: any, appPointerPrefix?: string): any {
    return this.group.valueToAppModel(
      appData,
      appPointerPrefix ? JsonPointer.compile(appPointerPrefix) : undefined,
    );
  }

  findControlByPath(path: string | string[]): ControlModel | undefined {
    const searchPath = Array.isArray(path) ? path : path.split('.');

    let resModel: ControlModel = this.group;

    for (const segment of searchPath) {
      const foundModel = resModel.getControl(segment);
      if (!foundModel) {
        return undefined;
      }
      resModel = foundModel;
    }
    return resModel;
  }
}

function setDirtyIfChanged(item: ControlModel, fromFormValue: any): void {
  if (item instanceof GroupModelBase || item instanceof ArrayModel) {
    (item.items as ControlModel[]).forEach((childItem: ControlModel) => {
      setDirtyIfChanged(childItem, fromFormValue);
    });
    if (item instanceof ArrayModel && item.jpForm) {
      const cmpValue = item.jpForm.get(fromFormValue);
      if (Array.isArray(cmpValue) && cmpValue.length !== item.items.length) {
        item.ngControl.markAsDirty();
      }
    }
  } else if (item instanceof ValueModel && item.jpForm) {
    const cmpValue = item.jpForm.get(fromFormValue);
    // tslint:disable-next-line triple-equals
    if (cmpValue != item.value) {
      item.ngControl.markAsDirty();
    }
  }
}
