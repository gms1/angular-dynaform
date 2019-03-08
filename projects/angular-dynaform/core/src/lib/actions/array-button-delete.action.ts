import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ArrayButtonAction } from './array-button.action';
import { DynamicFormControlComponentBase } from '../components/dynamic-form-control.component';

// delete array item

// tslint:disable use-life-cycle-interface
export class ArrayButtonDeleteAction extends ArrayButtonAction {
  private _unsubscribeSelectionChange?: Subject<any>;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
  }

  // tslint:disable-next-line use-life-cycle-interface
  ngOnInit(): void {
    super.ngOnInit();
    this.subscribeSelectionChange();
  }

  ngOnDestroy(): void {
    this.unsubscribeSelectionChange();
    super.ngOnDestroy();
  }

  // the handler for the click event on the delete button element
  onClick(event?: Event): void {
    /* istanbul ignore if */
    if (!this.targetArray) {
      return;
    }
    this.targetArray.deleteItem();
  }

  protected subscribeSelectionChange() {
    this.selectionChanged(this.targetArray ? this.targetArray.selectedIndex : -1);
    if (this.targetArray) {
      this._unsubscribeSelectionChange = new Subject<any>();
      this.targetArray.selectionChange
        .pipe(takeUntil(this._unsubscribeSelectionChange))
        .subscribe((newIndex) => {
          this.selectionChanged(newIndex);
        });
    }
  }

  protected unsubscribeSelectionChange() {
    if (this._unsubscribeSelectionChange) {
      this._unsubscribeSelectionChange.next();
      this._unsubscribeSelectionChange.complete();
    }
  }

  protected selectionChanged(newIndex: number): void {
    if (!this.targetArray || newIndex < 0) {
      if (this.model.ngControl.enabled) {
        this.model.ngControl.disable();
      }
    } else {
      if (this.model.ngControl.disabled) {
        this.model.ngControl.enable();
      }
    }
  }
}
