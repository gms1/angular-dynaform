import {ArrayButtonAction} from './array-button.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// add array item

export class ArrayButtonAddAction extends ArrayButtonAction {
  constructor(comp: DynamicFormControlComponentBase) {
    super(comp);
  }

  // the handler for the click event on the add button element
  onClick(event?: Event): void {
    /* istanbul ignore if */
    if (!this.targetArray) {
      return;
    }
    this.targetArray.addItem();
  }
}
