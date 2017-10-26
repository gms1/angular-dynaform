// tslint:disable use-life-cycle-interface
import {takeUntil} from 'rxjs/operators';

import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

import {DynamicFormAction} from './dynamic-form.action';

// enable the submit button if form is valid, disable otherwise

export class SubmitButtonAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;
  private rootFormGroup: FormGroup;

  constructor() {
    super();
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.rootFormGroup = this.model.formModel.group.ngControl;
    this.updateState(this.rootFormGroup.status);
    this.rootFormGroup.statusChanges.pipe(takeUntil(this.unsubscribe)).subscribe((status) => {
      this.updateState(status);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    super.ngOnDestroy();
  }

  // the handler for the click event on the submit button element
  onClick(event?: Event): boolean {
    if (!this.rootFormGroup.valid) {
      // do not trigger the submit event on the form element:
      if (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
      return false;
    } else {
      // bubble up: trigger the submit (ngSubmit) event on the form element:
      // return true to emit the output-click event of the control component
      return true;
    }
  }

  // enable button on valid and disable button on invalid state
  protected updateState(status: string): void {
    if (status === 'VALID') {
      if (this.model.ngControl.disabled) {
        this.model.ngControl.enable({emitEvent: false});
      }
    } else {
      if (!this.model.ngControl.disabled) {
        this.model.ngControl.disable({emitEvent: false});
      }
    }
  }
}
