// tslint:disable use-life-cycle-interface
import {takeUntil} from 'rxjs/operators/takeUntil';
import {Subject} from 'rxjs/Subject';

import {DynamicFormAction} from './dynamic-form.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// delete array item

export class ArrayButtonDeleteAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.model.parentArray) {
      this.updateState((this.model.parentArray.selectedIndex));
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
        this.model.enable();
      }
    } else {
      if (this.model.ngControl.enabled) {
        this.model.disable();
      }
    }
  }
}
