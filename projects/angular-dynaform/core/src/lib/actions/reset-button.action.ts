import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { FormGroup } from '@angular/forms';

import { DynamicFormAction } from './dynamic-form.action';
import { DynamicFormControlComponentBase } from '../components/dynamic-form-control.component';

// tslint:disable use-life-cycle-interface
export class ResetButtonAction extends DynamicFormAction {
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
    this.rootFormGroup.valueChanges
      .pipe(
        map(() => (this.rootFormGroup.dirty ? true : false)),
        distinctUntilChanged(),
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((dirty) => {
        this.updateState(dirty);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    super.ngOnDestroy();
  }

  // the handler for the click event on the reset button element
  onClick(event?: Event): void {
    /* istanbul ignore if */
    if (this.rootFormGroup.pristine) {
      // NOTE: this should not happen; reset button should be disabled on pristine form
      // do not trigger the reset event on the form element:
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
          this.component.form.formControlRef.instance.onReset();
        }
      }
    }
  }

  // enable button on dirty and disable button on pristine state
  protected updateState(dirty: boolean): void {
    if (dirty) {
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
