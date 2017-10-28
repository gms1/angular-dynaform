// tslint:disable use-life-cycle-interface
//   codelyzer does not recognize that the DynamicFormControl extends the interfaces for the lify-cycle hooks
import {Component, EventEmitter, Input, Output, SimpleChanges, Type} from '@angular/core';

import {DynamicFormControl} from './dynamic-form-control.interface';
import {DynamicForm} from './dynamic-form.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

import {ControlOptions} from '../config/control-options.interface';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormAction} from '../actions/dynamic-form.action';
import {RelationAction} from '../actions/relation.action';

@Component({
  selector: 'adf-contol-component-base',
  template: `Please provide a control-component for '{{model.config.controlType}}!'`
})
// tslint:disable-next-line component-class-suffix
export class DynamicFormControlComponentBase implements DynamicFormControl {
  @Input()
  get model(): ControlModel { return this._model; }
  set model(model: ControlModel) {
    this._model = model;
    this.options = this.model.options;
    if (this.action) {
      this.action.model = model;
    }
  }

  private _model: ControlModel;
  options: ControlOptions;

  @Output()
  focusChanges: EventEmitter<any>;

  @Output()
  click: EventEmitter<any>;

  action?: DynamicFormAction;
  buttonType: string;

  private relationAction?: RelationAction;

  constructor(public form: DynamicForm, public dynamicFormService: DynamicFormService) {
    this.focusChanges = new EventEmitter<any>();
    this.click = new EventEmitter<any>();
    this.buttonType = 'button';
  }

  ngOnChanges(changes: SimpleChanges): void {}


  ngOnInit(): void {
    if (this.model.enableIf || this.model.showIf) {
      this.relationAction = new RelationAction(this.model);
      this.relationAction.ngOnInit();
    }
    if (this.model.config.action) {
      let type: Type<DynamicFormAction>|undefined =
          this.dynamicFormService.actionTypes.getType(this.model.config.action);
      if (!type) {
        throw new Error(`no type registered for '${this.model.config.action}'`);
      }
      this.action = new type();  // DI not supported, because we may need multiple instances for the same type
      this.action.name = this.model.config.action;
      this.action.model = this.model;
      if (this.model.config.action === 'submit' || this.model.config.action === 'reset') {
        this.buttonType = this.model.config.action;
      }
      this.action.ngOnInit();
    }
  }


  ngOnDestroy(): void {
    if (this.action) {
      this.action.ngOnDestroy();
    }
    if (this.relationAction) {
      this.relationAction.ngOnDestroy();
    }
  }

  onElementBlur(event?: Event): void {
    if (this.action) {
      this.action.onBlur(event);
    }
    this.focusChanges.emit(false);
  }

  onElementFocus(event?: Event): void {
    if (this.action) {
      this.action.onFocus(event);
    }
    if (this.model.parentArray && this.model.parentArrayIdx !== undefined) {
      this.model.parentArray.currIndex = this.model.parentArrayIdx;
    }
    this.focusChanges.emit(true);
  }

  onElementClick(event?: Event): void {
    if (this.action) {
      if (!this.action.onClick(event)) {
        return;
      }
    }
    this.click.emit(event);
  }
}

// tslint:disable use-input-property-decorator use-output-property-decorator
@Component({
  selector: 'adf-contol-component',
  inputs: ['model'],
  outputs: ['focusChanges', 'click'],
  template: `Please provide a control-component for '{{model.config.controlType}}!'`
})
export class DynamicFormControlComponent<M extends ControlModel> extends DynamicFormControlComponentBase {
  @Input()
  model: M;

  constructor(form: DynamicForm, public dynamicFormService: DynamicFormService) { super(form, dynamicFormService); }
}
