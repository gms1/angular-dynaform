import { Injectable } from '@angular/core';
import { FormBaseConfig } from '../config';
import { FormBuilderFactory, FormBuilderForm } from './form-builder.factory';

// ---------------------------------------------------------------
@Injectable()
export class FormBuilder {
  private _factory: FormBuilderFactory;

  constructor() {
    this._factory = new FormBuilderFactory();
  }

  createForm(config: FormBaseConfig): FormBuilderForm {
    return this._factory.createForm(config);
  }
}
