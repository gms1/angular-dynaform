import { DynamicFormAction } from './dynamic-form.action';

export class ClearButtonAction extends DynamicFormAction {
  // the handler for the click event on the clear button element
  onClick(event?: Event): void {
    this.model.formModel.clearValue();
  }
}
