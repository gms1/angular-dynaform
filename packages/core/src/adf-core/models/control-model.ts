import {FormControl} from '@angular/forms';

import {ControlConfig} from '../config/control-config.interface';
import {ControlBaseOptions, ControlValueOptions} from '../config/control-options.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

import {ArrayModel} from './array-model';
import {AbstractControlModel} from './control-model.interface';
import {FormModel} from './form-model';
import {GroupModelBase} from './group-model';

import {AbstractControlOptions} from './internal/ng-abstract';
import {NgNullControl} from './internal/ng-null-control';

import {JsonPointer} from 'jsonpointerx';

// basic controls for MODEL_VALUE, MODEL_NULL
//   having a ngControl property of type FormControl

export abstract class ControlModelBase<O> extends AbstractControlModel<FormControl, O> {
  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, options: O, ngControl: FormControl,
      formModel: FormModel, parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(dynamicFormService, config, options, ngControl, formModel, parentGroup, parentArray, parentArrayIdx);
    this.setCSSClasses(this.css.container, 'adf-control-container');
    this.setCSSClasses(this.css.control, 'adf-control-control');
    this.setCSSClasses(this.css.label, 'adf-control-label');
    this.setCSSClasses(this.css.error, 'adf-control-error');
  }
}


export class NullControlModel extends ControlModelBase<ControlBaseOptions> {
  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, formModel: FormModel, parentGroup: GroupModelBase,
      parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config, (config.options || {}) as ControlBaseOptions, new NgNullControl(), formModel,
        parentGroup, parentArray, parentArrayIdx);
  }
}


export class ValueControlModel extends ControlModelBase<ControlValueOptions> {
  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, formModel: FormModel, parentGroup: GroupModelBase,
      parentArray?: ArrayModel, parentArrayIdx?: number) {
    super(
        dynamicFormService, config, (config.options || {}) as ControlValueOptions,
        new FormControl(
            {
              disabled: config.disabled,
              value: config.options && (config.options as ControlValueOptions).value ?
                  (config.options as ControlValueOptions).value :
                  ''
            },
            {updateOn: config.updateOn}),
        formModel, parentGroup, parentArray, parentArrayIdx);
    this.createValidators();
    this.createAsyncValidators();
  }


  valueFromAppModel(formData: any, appData: any, appPointerPrefix?: JsonPointer): any {
    if (this.jpApp) {
      let appValue = (appPointerPrefix ? appPointerPrefix.concat(this.jpApp) : this.jpApp).get(appData);
      // tslint:disable-next-line triple-equals
      this.jpForm.set(formData, appValue == undefined ? undefined : appValue);
    }
    return appData;
  }

  valueToAppModel(appData: any, appPointerPrefix?: JsonPointer): any {
    if (this.jpApp) {
      (appPointerPrefix ? appPointerPrefix.concat(this.jpApp) : this.jpApp)
          // tslint:disable-next-line triple-equals
          .set(appData, this.value == undefined ? undefined : this.value);
    }
    return appData;
  }
}
