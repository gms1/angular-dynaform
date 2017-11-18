// tslint:disable use-life-cycle-interface
//   codelyzer does not recognize that the DynamicFormControl extends the interfaces for the lify-cycle hooks
import {Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, Type} from '@angular/core';

import {DynamicFormControl} from './dynamic-form-control.interface';
import {DynamicForm} from './dynamic-form.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

import {ControlOptions} from '../config/control-options.interface';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormAction} from '../actions/dynamic-form.action';
import {RelationAction} from '../actions/relation.action';

const defaultButtonType = 'button';

@Component({
  selector: 'adf-contol-component-base',
  template: `Please provide a control-component for '{{ model.config.controlType }}!'`
})
// tslint:disable-next-line component-class-suffix
export class DynamicFormControlComponentBase implements DynamicFormControl {
  private _model: ControlModel;
  options: ControlOptions;

  @Input()
  get model(): ControlModel { return this._model; }
  set model(model: ControlModel) {
    this._model = model;
    this.options = this.model.options;
    if (this.action) {
      this.action.model = model;
    }
  }

  @Output()
  focusChanges: EventEmitter<any>;

  @Output()
  click: EventEmitter<any>;

  get elementRef(): ElementRef { return this._elementRef; }

  buttonType: string;

  private action?: DynamicFormAction;
  private relationAction?: RelationAction;

  constructor(
      public form: DynamicForm, public dynamicFormService: DynamicFormService, private _elementRef: ElementRef) {
    this.focusChanges = new EventEmitter<any>();
    this.click = new EventEmitter<any>();
    this.buttonType = defaultButtonType;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.action) {
      this.action.ngOnChanges(changes);
    }
  }


  ngOnInit(): void {
    if (this.model.enableIf || this.model.showIf) {
      this.relationAction = new RelationAction(this);
      this.relationAction.ngOnInit();
    }
    if (this.model.config.action) {
      let type: Type<DynamicFormAction>|undefined =
          this.dynamicFormService.actionTypes.getType(this.model.config.action);
      if (!type) {
        throw new Error(`no type registered for '${this.model.config.action}'`);
      }
      this.action = new type(this);  // DI not supported, because we may need multiple instances for the same type
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
    if (this.model.parentArray && this.model.parentArrayIdx !== undefined && this.model.parentArrayIdx >= 0) {
      this.model.parentArray.selectedIndex = this.model.parentArrayIdx;
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
  template: `Please provide a control-component for '{{ model.config.controlType }}!'`
})
export class DynamicFormControlComponent<M extends ControlModel> extends DynamicFormControlComponentBase {
  @Input()
  model: M;

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
  }
}
