import {ArrayButtonAction} from './array-button.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// insert array item

export class ArrayButtonInsertAction extends ArrayButtonAction {
  constructor(comp: DynamicFormControlComponentBase) {
    super(comp);
  }

  // the handler for the click event on the insert button element
  onClick(event?: Event): void {
    /* istanbul ignore if */
    if (!this.targetArray) {
      return;
    }
    this.targetArray.insertItem();
  }
}
