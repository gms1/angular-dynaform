import {ControlConfig} from './control-config';
import {ControlCssOptions} from './control-css-options';

/*
  value options for the select-control
*/
export interface ValueOptions {
  value: any;
  label: string;
}


export interface ControlBaseOptions {
  /**
   * The label of the control
   */
  label?: string;

  css?: ControlCssOptions;

  /**
   * user defined options or special options for specific ui-frameworks:
   *
   * mat-stepper: see https://github.com/angular/material2/blob/master/src/lib/stepper/stepper.md
   *   matStepperVertical: boolean
   *   matStepperLinear: boolean
   *
   *   mat-step:
   *     matStepOptional: boolean
   *     matStepEditable: boolean
   *     matStepCompleted: boolean
   *
   * mat-tab-group: see https://github.com/angular/material2/blob/master/src/lib/tabs/tabs.md
   *   matTabGroupDynamicHeight: boolean
   *
   * for other user defined option, please use your own prefix (e.g. 'local')
   *
   */
  [key: string]: any;
}



export interface ArrayOptions extends ControlBaseOptions {
  initialItemCount?: number;
  header?: GroupOptions;
  item: GroupOptions;
  footer?: GroupOptions;
}


export interface GroupOptions extends ControlBaseOptions {
  group: ControlConfig[];
}

export interface ControlValueOptions extends ControlBaseOptions {
  /**
   * The initial value for the control
   */
  value?: any;

  /**
   * The placeholder of the control
   */
  placeholder?: string;

  /**
   * indicates that the user cannot modify the value
   */
  readOnly?: boolean;

  /**
   * as boolean, this property indicates if autocomplete should be enabled or disabled
   * as string, it should be either 'on', 'off', or a valid autofill keyword
   * see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#inappropriate-for-the-control
   */
  autoComplete?: string|boolean;

  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  required?: boolean;

  /**
   * hint text (currently only supported for material (input/textarea/select/datepicker))
   */
  hint?: string;


  /**
   * icon prefix (currently only supported for material (input/textarea/select/datepicker))
   */
  icon?: string;
}

export interface ControlInputOptions extends ControlValueOptions {
  /**
   * The type of the input control
   *
   * the type (equivalent to the type attribute of the <input> HTML tag)
   * WARN: not all types may be supported by all ui libraries
   * TODO: we should at least provide a fallback (using *ngSwitchCase? or implementing a custom control) for: 'number'
   * and 'password'
   * TODO: for other types, creating a seperate component should be the way to go
   * e.g for:  date/datetime-local/time/...
   */
  inputType?: string;

  step?: number;  // use e.g '0.01' for fixed-comma, use 'any' for floating-point
}


// TODO: make options observable and add async pipe to template

export interface ControlSelectOptions extends ControlValueOptions {
  /**
   * The options for a select control
   */
  valueOptions?: ValueOptions[];
  multiple?: boolean;
}


export interface ControlSliderOptions extends ControlValueOptions {
  min: number;
  max: number;
  step: number;
}


// tslint:disable no-empty-interface
export interface ControlSwitchOptions extends ControlValueOptions {}


export interface ControlTextareaOptions extends ControlValueOptions {
  cols?: number;
  rows?: number;
  wrap?: boolean;
}


export type ControlOptions = ControlBaseOptions|GroupOptions|ArrayOptions|ControlInputOptions|ControlSelectOptions|
    ControlSliderOptions|ControlSwitchOptions|ControlTextareaOptions;
