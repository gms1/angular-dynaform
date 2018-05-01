import {DynamicFormAction} from './dynamic-form.action';

// add array item

export class ArrayButtonAddAction extends DynamicFormAction {
  // the handler for the click event on the add button element
  onClick(event?: Event): boolean {
    if (!this.model.parentArray) {
      return true;
    }
    this.model.parentArray.addItem();
    return true;
  }
}
