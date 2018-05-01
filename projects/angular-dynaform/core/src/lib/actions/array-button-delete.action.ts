import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {DynamicFormAction} from './dynamic-form.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// delete array item

// tslint:disable use-life-cycle-interface
export class ArrayButtonDeleteAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.model.parentArray) {
      this.model.ngControl.disable();
      this.model.parentArray.selectionChange.pipe(takeUntil(this.unsubscribe)).subscribe((newIndex) => {
        this.updateState(newIndex);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    super.ngOnDestroy();
  }

  // the handler for the click event on the delete button element
  onClick(event?: Event): boolean {
    if (!this.model.parentArray) {
      return true;
    }
    this.model.parentArray.deleteItem();
    return true;
  }

  protected updateState(newIndex: number): void {
    if (!this.model.parentArray) {
      return;
      }
    if (newIndex >= 0) {
      if (this.model.ngControl.disabled) {
        this.model.ngControl.enable();
      }
    } else {
      if (this.model.ngControl.enabled) {
        this.model.ngControl.disable();
      }
    }
  }
}
