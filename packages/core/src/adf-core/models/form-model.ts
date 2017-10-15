
import {Injector, EventEmitter} from '@angular/core';
import {AbstractControl, FormGroup, FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {FormConfig, FormI18n, ControlConfig, ModelType, ControlType} from '../config';
import {DynamicFormService} from '../services/dynamic-form.service';

import {GroupModel} from './group-model';

import {JsonPointer} from '../utils/json-pointer';

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
      validators: config.validators,
      asyncValidators: config.asyncValidators,
      options: config.options,
      user: config.user
    };
    this.group = this.dynamicFormService.modelFactory.createControl(groupConfig, this) as GroupModel;
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
  private _emptyValue: any;

  constructor(dynamicFormService: DynamicFormService, injector: Injector, config: FormConfig, i18n?: FormI18n) {
    this.dynamicFormService = dynamicFormService;
    this.injector = injector;
    this._i18n = i18n;
    this.config = config;  // create the group control
    this._emptyValue = this.value;
  }


  initValue(value?: any): void {
    this.group.reset(value);
    this._initValue = this.value;
  }
  resetValue(): void { this.group.reset(this._initValue); }
  clearValue(): void {
    if (this.initValue) {
      this.group.ngControl.markAsUntouched();
      this.group.ngControl.setValue(this._emptyValue);
      this.group.ngControl.markAsDirty();
      // TODO: don't know why the dirty flag gets cleared somehow
      FormModel.deepMarkAsDirty(this.group.ngControl);
      // emit event to notify controls
      (this.valueChanges as EventEmitter<any>).emit(this.value);
    } else {
      this.group.ngControl.reset();
    }
  }



  initValueFromAppModel(appData: any, appPointerPrefix?: string): any {
    let newVal = this.valueFromAppModel(appData, appPointerPrefix);

    console.log(`init new value from application data: `, JSON.stringify(newVal, undefined, 2));

    this.initValue(newVal);
  }

  valueFromAppModel(appData: any, appPointerPrefix?: string): any {
    return this.group.valueFromAppModel(
        {}, appData, appPointerPrefix ? JsonPointer.compile(appPointerPrefix) : undefined);
  }

  valueToAppModel(appData: any, appPointerPrefix?: string): any {
    return this.group.valueToAppModel(appData, appPointerPrefix ? JsonPointer.compile(appPointerPrefix) : undefined);
  }


  static deepMarkAsDirty(control: AbstractControl): void {
    // Mark this control as dirty.
    control.markAsDirty();
    if (control instanceof FormArray) {
      let array: FormArray = control;
      array.controls.forEach((child: AbstractControl) => { FormModel.deepMarkAsDirty(child); });
      return;
    }
    if (control instanceof FormGroup) {
      let group: FormGroup = control;
      Object.values(group.controls).forEach((child: AbstractControl) => { FormModel.deepMarkAsDirty(child); });
      return;
    }
  }
}
