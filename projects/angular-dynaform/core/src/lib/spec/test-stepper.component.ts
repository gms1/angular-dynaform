// tslint:disable use-input-property-decorator use-output-property-decorator use-life-cycle-interface
// tslint:disable no-use-before-declare
import { Component, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import {
  GroupModelBase,
  DynamicForm,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicFormService,
  GroupOptions,
  Stepper,
} from '../../public_api';

export class TestStepper implements Stepper {
  private _selectionChange: EventEmitter<number>;
  steps: number;
  step: number;

  constructor(steps: number = 0) {
    this._selectionChange = new EventEmitter<number>();
    this.steps = steps;
    this.step = 0;
  }

  prev(): void {
    if (this.step > 0) {
      this.step -= 1;
      this._selectionChange.emit(this.step);
    }
  }
  next(): void {
    if (this.step < this.steps - 1) {
      this.step += 1;
      this._selectionChange.emit(this.step);
    }
  }
  selectionChange(): Observable<number> {
    return this._selectionChange;
  }
  length(): number {
    return this.steps;
  }
}

@Component({
  selector: 'adf-test-stepper-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <div [ngClass]="model.css.control" adfHTMLDomElement>
        <adf-error-container [model]="model"></adf-error-container>
        <ng-template></ng-template>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: TestStepperComponent }],
})
export class TestStepperComponent extends DynamicFormControlComponent<GroupModelBase>
  implements AfterViewInit {
  model!: GroupModelBase;
  options!: GroupOptions;

  stepper?: Stepper;

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
  }

  ngOnInit(): void {
    this.stepper = new TestStepper(this.options ? this.options.steps : 0);
    this.form.stepper = this.stepper;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.form.stepper = this.stepper;
    this.stepper = undefined;
  }
}
