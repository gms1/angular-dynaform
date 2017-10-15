// tslint:disable use-life-cycle-interface

import {FormGroup} from '@angular/forms';

import {DynamicFormAction} from './dynamic-form.action';

export class ClearButtonAction extends DynamicFormAction {
  // the handler for the click event on the clear button element
  onClick(event?: Event): boolean {
    this.model.formModel.clearValue();
    return true;
  }
}
