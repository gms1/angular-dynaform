import { FormControl } from '@angular/forms';

import { ControlConfig } from '../config/control-config';
import { ControlBaseOptions, ControlValueOptions } from '../config/control-options';
import { DynamicFormService } from '../services/dynamic-form.service';

import { ArrayModel } from './array-model';
import { AbstractControlModel } from './control-model';
import { FormModel } from './form-model';
import { GroupModelBase } from './group-model';

import { NgNullControl } from './internal/ng-null-control';

import { JsonPointer } from 'jsonpointerx';

// basic controls for MODEL_VALUE, MODEL_NULL
//   having a ngControl property of type FormControl

export abstract class ControlModelBase<O> extends AbstractControlModel<FormControl, O> {
  constructor(
    dynamicFormService: DynamicFormService,
    config: ControlConfig,
    options: O,
    ngControl: FormControl,
    formModel: FormModel,
    parentPath?: string[],
    parentGroup?: GroupModelBase,
    parentArray?: ArrayModel,
    parentArrayIdx?: number,
  ) {
    super(
      dynamicFormService,
      config,
      options,
      ngControl,
      formModel,
      parentPath,
      parentGroup,
      parentArray,
      parentArrayIdx,
    );
    this.setCSSClasses(this.css.container, 'adf-control-container');
    this.setCSSClasses(this.css.control, 'adf-control-control');
    this.setCSSClasses(this.css.label, 'adf-control-label');
    this.setCSSClasses(this.css.error, 'adf-control-error');
  }
}

export class NullModel extends ControlModelBase<ControlBaseOptions> {
  constructor(
    dynamicFormService: DynamicFormService,
    config: ControlConfig,
    formModel: FormModel,
    parentPath?: string[],
    parentGroup?: GroupModelBase,
    parentArray?: ArrayModel,
    parentArrayIdx?: number,
  ) {
    super(
      dynamicFormService,
      config,
      config.options || {},
      new NgNullControl({ disabled: config.disabled }),
      formModel,
      parentPath,
      parentGroup,
      parentArray,
      parentArrayIdx,
    );
  }
}

export class ValueModel extends ControlModelBase<ControlValueOptions> {
  readonly autoComplete: string;

  constructor(
    dynamicFormService: DynamicFormService,
    config: ControlConfig,
    formModel: FormModel,
    parentPath?: string[],
    parentGroup?: GroupModelBase,
    parentArray?: ArrayModel,
    parentArrayIdx?: number,
  ) {
    super(
      dynamicFormService,
      config,
      (config.options || {}) as ControlValueOptions,
      new FormControl(
        {
          disabled: config.disabled,
          value:
            config.options && (config.options as ControlValueOptions).value !== undefined
              ? (config.options as ControlValueOptions).value
              : null,
        },
        { updateOn: config.updateOn },
      ),
      formModel,
      parentPath,
      parentGroup,
      parentArray,
      parentArrayIdx,
    );
    this.createValidators();
    this.createAsyncValidators();
    this.autoComplete = 'on';
    if (this.config.options) {
      if (typeof this.config.options.autoComplete === 'boolean') {
        this.autoComplete = this.config.options.autoComplete ? 'on' : 'off';
      } else if (typeof this.config.options.autoComplete === 'string') {
        this.autoComplete = this.config.options.autoComplete;
      }
    }
  }

  valueFromAppModel(formData: any, appData: any, appPointerPrefix?: JsonPointer): any {
    if (!this.jpApp || !this.jpForm) {
      return formData;
    }
    const appValue = (appPointerPrefix ? appPointerPrefix.concat(this.jpApp) : this.jpApp).get(
      appData,
    );
    // tslint:disable-next-line triple-equals
    this.jpForm.set(formData, appValue == undefined ? undefined : appValue);
    return appData;
  }

  valueToAppModel(appData: any, appPointerPrefix?: JsonPointer): any {
    if (!this.jpApp) {
      return appData;
    }
    (appPointerPrefix ? appPointerPrefix.concat(this.jpApp) : this.jpApp)
      // tslint:disable-next-line triple-equals
      .set(appData, this.value == undefined ? undefined : this.value);
    return appData;
  }
}

/**
 * @deprecated
 *
 * ValueControlModel
 */
export class ValueControlModel extends ValueModel {}

/**
 * @deprecated
 *
 * NullControlModel
 */
export class NullControlModel extends NullModel {}
