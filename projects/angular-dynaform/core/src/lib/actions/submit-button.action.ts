import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FormGroup } from '@angular/forms';

import { DynamicFormAction } from './dynamic-form.action';
import { DynamicFormControlComponentBase } from '../components/dynamic-form-control.component';

// enable the submit button if form is valid, disable otherwise

// tslint:disable use-life-cycle-interface
export class SubmitButtonAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;
  private rootFormGroup!: FormGroup;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.rootFormGroup = this.model.formModel.group.ngControl;
    this.model.ngControl.disable();
    this.rootFormGroup.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        distinctUntilChanged(),
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((valid) => {
        this.updateState(valid);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    super.ngOnDestroy();
  }

  // the handler for the click event on the submit button element
  onClick(event?: Event): void {
    /* istanbul ignore if */
    if (!this.rootFormGroup.valid) {
      // do not trigger the submit event on the form element:
      // NOTE: this should not happen, submit button should be disabled if form is invalid
      if (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    } else {
      // istanbul ignore if */
      if (!event || !event.bubbles) {
        // no bubble up: e.g for nativescript
        // emit event to forms form-control
        if (this.component.form.formControlRef && this.component.form.formControlRef.instance) {
          this.component.form.formControlRef.instance.onSubmit();
        }
      }
    }
  }

  // enable button on valid and disable button on invalid state
  protected updateState(valid: boolean): void {
    if (valid) {
      /* istanbul ignore else */
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
