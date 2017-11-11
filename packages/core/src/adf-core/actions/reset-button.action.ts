// tslint:disable use-life-cycle-interface
import {takeUntil} from 'rxjs/operators/takeUntil';

import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

import {DynamicFormAction} from './dynamic-form.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

export class ResetButtonAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;
  private rootFormGroup: FormGroup;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.rootFormGroup = this.model.formModel.group.ngControl;
    this.updateState();
    this.rootFormGroup.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(() => { this.updateState(); });
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
      if (event) {
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
  protected updateState(): void {
    if (this.rootFormGroup.dirty && this.model.ngControl.disabled) {
      this.model.ngControl.enable({emitEvent: false});
    }
    if (this.rootFormGroup.pristine && this.model.ngControl.enabled) {
      this.model.ngControl.disable({emitEvent: false});
    }
  }
}
