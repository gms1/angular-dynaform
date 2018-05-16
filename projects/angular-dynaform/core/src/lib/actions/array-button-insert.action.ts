import {ArrayButtonAction} from './array-button.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// insert array item

export class ArrayButtonInsertAction extends ArrayButtonAction {
  constructor(comp: DynamicFormControlComponentBase) {
    super(comp);
  }

  // the handler for the click event on the insert button element
  onClick(event?: Event): boolean {
    /* istanbul ignore if */
    if (!this.targetArray) {
      // NOTE: this should not happen; button should be disabled
      return true;
    }
    this.targetArray.insertItem();
    return true;
  }
}
