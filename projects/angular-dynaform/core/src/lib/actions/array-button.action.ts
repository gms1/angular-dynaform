import { DynamicFormAction } from './dynamic-form.action';
import { DynamicFormControlComponentBase } from '../components/dynamic-form-control.component';
import { ArrayModel } from '../models/array-model';

export class ArrayButtonAction extends DynamicFormAction {
  targetArray?: ArrayModel;

  constructor(comp: DynamicFormControlComponentBase) {
    super(comp);
    this.targetArray = this.model.parentArray;
  }

  // tslint:disable-next-line use-life-cycle-interface
  ngOnInit(): void {
    super.ngOnInit();
    if (!this.targetArray) {
      this.model.ngControl.disable();
    }
  }
}
