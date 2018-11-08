// tslint:disable no-forward-ref
import {Component, ComponentRef, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';

import {FormConfig} from '../config/form-config';
import {FormModel} from '../models/form-model';

import {DynamicFormControl} from './dynamic-form-control';
import {DynamicFormFormControl} from './dynamic-form-form-control';
import {DynamicForm, UIProperties} from './dynamic-form';

import {Stepper} from '../models/stepper';


@Component({
  selector: 'adf-form',
  template: `<ng-container adfFormControlComponent [model]="model.group" ></ng-container>`,
  providers: [{provide: DynamicForm, useExisting: DynamicFormComponent}]
})
export class DynamicFormComponent extends DynamicForm {
  config!: FormConfig;


  @Input()
  get model(): FormModel {
    return this._model;
  }
  set model(model: FormModel) {
    this._model = model;
    this.config = this.model.config;
  }

  @Output()
  get adfSubmit(): EventEmitter<any> {
    return this._submit;
  }

  @Output()
  get adfReset(): EventEmitter<any> {
    return this._reset;
  }

  get value(): any {
    return this.model.value;
  }
  get valueChanges(): Observable<any> {
    return this.model.valueChanges;
  }

  get valid(): boolean {
    return this.model.valid;
  }
  get status(): string {
    return this.model.status;
  }
  get statusChanges(): Observable<string> {
    return this.model.statusChanges;
  }

  get pristine(): boolean {
    return this.model.pristine;
  }
  get touched(): boolean {
    return this.model.touched;
  }

  get uiProperties(): UIProperties {
    return this._uiProperties;
  }

  formControlRef: ComponentRef<DynamicFormFormControl>|undefined;
  stepper?: Stepper;

  private _model!: FormModel;
  private _submit: EventEmitter<any>;
  private _reset: EventEmitter<any>;

  private mapIdToControl: Map<string, DynamicFormControl>;

  _uiProperties: UIProperties;

  constructor() {
    super();
    this._submit = new EventEmitter<any>(false);
    this._reset = new EventEmitter<any>(false);
    this.mapIdToControl = new Map<string, DynamicFormControl>();
    this._uiProperties = {};
  }

  initValue(value?: any): void {
    this.model.initValue(value);
  }
  resetValue(): void {
    this.model.resetValue();
  }
  clearValue(): void {
    this.model.clearValue();
  }


  initValueFromAppModel(appData: any, appPointerPrefix?: string): any {
    this.model.initValueFromAppModel(appData, appPointerPrefix);
  }

  valueFromAppModel(appData: any, appPointerPrefix?: string): any {
    return this.model.valueFromAppModel(appData, appPointerPrefix);
  }

  valueToAppModel(appData: any, appPointerPrefix?: string): any {
    return this.model.valueToAppModel(appData, appPointerPrefix);
  }

  registerComponent(id: string, control: DynamicFormControl): void {
    this.mapIdToControl.set(id, control);
  }

  unRegisterComponent(id: string): void {
    this.mapIdToControl.delete(id);
  }

  findComponentById(id: string): DynamicFormControl|undefined {
    return this.mapIdToControl.get(id);
  }

  findParentComponent(control: DynamicFormControl): DynamicFormControl|undefined {
    let parentId: string|undefined;
    let found: DynamicFormControl|undefined;

    parentId = control.model.parentGroup ? control.model.parentGroup.id : undefined;
    found = parentId ? this.findComponentById(parentId) : undefined;
    if (!found) {
      parentId = control.model.parentArray ? control.model.parentArray.id : undefined;
      found = parentId ? this.findComponentById(parentId) : undefined;
    }
    return found;
  }
}
