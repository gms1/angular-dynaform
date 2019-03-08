import { Component, ElementRef, Input, SimpleChanges } from '@angular/core';

import { ControlOptions } from '../config/control-options';
import { ControlModel } from '../models/control-model';

import { DynamicFormError } from './dynamic-form-error';
import { DynamicForm } from './dynamic-form';
import { DynamicValidationError } from '../validations/dynamic-validation-error';

@Component({
  selector: 'adf-error-component',
  template: `
    Please provide a component for displaying error messages!'
  `,
})
// tslint:disable use-life-cycle-interface
export class DynamicFormErrorComponent implements DynamicFormError {
  @Input()
  get model(): ControlModel {
    return this._model;
  }
  set model(model: ControlModel) {
    this._model = model;
    this.options = this.model.options;
  }

  @Input() error!: DynamicValidationError;

  private _model!: ControlModel;
  options!: ControlOptions;

  get elementRef(): ElementRef {
    return this._elementRef;
  }

  constructor(public form: DynamicForm, private _elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}
}
