// tslint:disable use-life-cycle-interface
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

import {DynamicFormAction} from './dynamic-form.action';

// delete array item

export class ArrayButtonDeleteAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;

  constructor() {
    super();
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.model.parentArray) {
      this.model.parentArray.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(() => { this.updateState(); });
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
    this.updateState();
    return true;
  }

  protected updateState(): void {
    if (!this.model.parentArray) {
      return;
    }
    if (this.model.parentArray.items.length && this.model.ngControl.disabled) {
      this.model.enable();
    }
    if (!this.model.parentArray.items.length && this.model.ngControl.enabled) {
      this.model.disable();
    }
  }
}
