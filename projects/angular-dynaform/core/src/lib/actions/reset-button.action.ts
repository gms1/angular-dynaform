import {Subject} from 'rxjs';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';

import {FormGroup} from '@angular/forms';

import {DynamicFormAction} from './dynamic-form.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

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
    this.rootFormGroup.valueChanges.pipe(map(() => this.rootFormGroup.dirty ? true : false), distinctUntilChanged())
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
  onClick(event?: Event): boolean {
    if (this.rootFormGroup.pristine) {
      // do not trigger the reset event on the form element:
      /* istanbul ignore if */
      if (event) {
        // NOTE: this should not happen; reset button should be disabled on pristine form
        event.stopImmediatePropagation();
        event.preventDefault();
        }
      return false;
    } else {
      // bubble up: trigger the reset event on the form element
      // return true to emit the output-click event of the control component
      return true;
    }
  }

  // enable button on dirty and disable button on pristine state
  protected updateState(dirty: boolean): void {
    if (dirty) {
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
