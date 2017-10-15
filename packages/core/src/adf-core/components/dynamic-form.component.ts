// tslint:disable no-forward-ref
import {Component, ComponentRef, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FormModel} from '../models/form-model';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormControlComponentBase} from './dynamic-form-control.component';
// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormControl} from './dynamic-form-control.interface';
import {DynamicFormFormControl} from './dynamic-form-form-control.interface';
import {DynamicForm} from './dynamic-form.interface';



@Component({
  selector: 'adf-form',
  template: `<ng-container adfFormControlComponent [model]="model.group" ></ng-container>`,
  providers: [{provide: DynamicForm, useExisting: DynamicFormComponent}]
})
export class DynamicFormComponent extends DynamicForm {
  @Input()
  get model(): FormModel { return this._model; }
  set model(model: FormModel) {
    this._model = model;
    this.config = this.model.config;
  }

  @Output()
  get adfSubmit(): EventEmitter<any> { return this._submit; }

  @Output()
  get adfReset(): EventEmitter<any> { return this._reset; }

  get value(): any { return this.model.value; }
  get valueChanges(): Observable<any> { return this.model.valueChanges; }

  get valid(): boolean { return this.model.valid; }
  get status(): string { return this.model.status; }
  get statusChanges(): Observable<string> { return this.model.statusChanges; }

  get pristine(): boolean { return this.model.pristine; }
  get touched(): boolean { return this.model.touched; }

  formControlRef: ComponentRef<DynamicFormFormControl>|undefined;

  private _model: FormModel;
  private _submit: EventEmitter<any> = new EventEmitter<any>(false);
  private _reset: EventEmitter<any> = new EventEmitter<any>(false);

  private mapIdToControl: Map<string, DynamicFormControl> = new Map<string, DynamicFormControl>();

  constructor() { super(); }

  initValue(value?: any): void { this.model.initValue(value); }
  resetValue(): void { this.model.resetValue(); }
  clearValue(): void { this.model.clearValue(); }


  initValueFromAppModel(appData: any, appPointerPrefix?: string): any {
    this.model.initValueFromAppModel(appData, appPointerPrefix);
  }

  valueFromAppModel(appData: any, appPointerPrefix?: string): any {
    return this.model.valueFromAppModel(appData, appPointerPrefix);
  }

  valueToAppModel(appData: any, appPointerPrefix?: string): any {
    return this.model.valueToAppModel(appData, appPointerPrefix);
  }

  registerComponent(id: string, control: DynamicFormControl): void { this.mapIdToControl.set(id, control); }

  unRegisterComponent(id: string): void { this.mapIdToControl.delete(id); }

  findComponentById(id: string): DynamicFormControl|undefined { return this.mapIdToControl.get(id); }
}
