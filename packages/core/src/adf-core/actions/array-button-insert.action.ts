import {DynamicFormAction} from './dynamic-form.action';

// insert array item

export class ArrayButtonInsertAction extends DynamicFormAction {
  // the handler for the click event on the insert button element
  onClick(event?: Event): boolean {
    if (!this.model.parentArray) {
      return true;
    }
    this.model.parentArray.insertItem();
    return true;
  }
}
