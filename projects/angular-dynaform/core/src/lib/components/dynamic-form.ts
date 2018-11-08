// tslint:disable component-class-suffix
import {ComponentRef, EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {FormConfig} from '../config/form-config';
import {FormModel} from '../models/form-model';

import {DynamicFormControl} from './dynamic-form-control';
import {DynamicFormFormControl} from './dynamic-form-form-control';

import {Stepper} from '../models/stepper';

export interface UIProperties {
  [key: string]: any;
}


// TODO: changed from interface to injectable abstract class
@Injectable()
export abstract class DynamicForm {
  abstract model: FormModel;
  abstract config: FormConfig;

  abstract get adfSubmit(): EventEmitter<any>;
  abstract get adfReset(): EventEmitter<any>;

  abstract get value(): any;
  abstract get valueChanges(): Observable<any>;

  abstract get valid(): boolean;
  abstract get status(): string;
  abstract get statusChanges(): Observable<string>;

  abstract get pristine(): boolean;
  abstract get touched(): boolean;

  abstract get uiProperties(): UIProperties;

  formControlRef: ComponentRef<DynamicFormFormControl>|undefined;
  stepper?: Stepper;

  abstract initValue(value?: any): void;
  abstract clearValue(): void;
  abstract resetValue(): void;

  abstract initValueFromAppModel(appData: any, appPointerPrefix?: string): any;
  abstract valueFromAppModel(appData: any, appPointerPrefix?: string): any;
  abstract valueToAppModel(appData: any, appPointerPrefix?: string): any;

  abstract registerComponent(id: string, control: DynamicFormControl): void;
  abstract unRegisterComponent(id: string): void;

  abstract findComponentById(id: string): DynamicFormControl|undefined;
  abstract findParentComponent(control: DynamicFormControl): DynamicFormControl|undefined;
}
