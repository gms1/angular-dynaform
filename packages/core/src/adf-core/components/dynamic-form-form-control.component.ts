// tslint:disable use-life-cycle-interface
//   codelyzer does not recognize that the DynamicFormFormControl extend DynamicFormControl which extends the interfaces
//   for the
//   lify-cycle hooks
// tslint:disable use-input-property-decorator use-output-property-decorator
import {Component, ElementRef, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';

import {GroupOptions} from '../config/control-options.interface';
import {GroupModel} from '../models/group-model';

import {DynamicFormControlComponentBase, DynamicFormControlComponent} from './dynamic-form-control.component';
import {DynamicFormFormControl} from './dynamic-form-form-control.interface';
import {DynamicForm} from './dynamic-form.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

@Component({
  selector: 'adf-form-contol-component',
  template: `Please provide a form-control-component!
  `,
  inputs: ['model'],
  outputs: ['submit', 'reset'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: DynamicFormFormControlComponent}]
})
export class DynamicFormFormControlComponent extends DynamicFormControlComponent<GroupModel> implements
    DynamicFormFormControl {
  @Input()
  model: GroupModel;

  options: GroupOptions;

  @Output()
  submit: EventEmitter<any>;

  @Output()
  reset: EventEmitter<any>;


  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
    this.submit = new EventEmitter<any>(false);
    this.reset = new EventEmitter<any>(false);
  }

  ngOnChanges(changes: SimpleChanges): void { super.ngOnChanges(changes); }

  ngOnInit(): void { super.ngOnInit(); }

  ngOnDestroy(): void { super.ngOnDestroy(); }

  onSubmit(event: Event): void {
    // do not bubble up
    event.stopImmediatePropagation();
    event.preventDefault();
    // emit output submit event:
    // this event will be forwarded by the DynamicFormFormControlComponentDirective
    // to the DynamicFormComponent
    this.submit.emit();
  }

  onReset(event: Event): void {
    // do not bubble up
    event.stopImmediatePropagation();
    event.preventDefault();
    this.form.resetValue();
    // emit output reset event:
    // this event will be forwarded by the DynamicFormFormControlComponentDirective
    // to the DynamicFormComponent
    this.reset.emit();
  }
}
