import {ControlConfig} from './control-config.interface';
import {ControlCssOptions} from './control-css-options.interface';


export interface ValueOptions {
  value: any;
  label: string;
}


export interface ControlBaseOptions {
  /**
   * The label of the control
   * ignore for MODEL_SUBSET (TODO?)
   * @type {string}
   */
  label?: string;

  css?: ControlCssOptions;

  [key: string]: any;
}


export interface ArrayOptions extends ControlBaseOptions {
  initialItemCount?: number;
  header?: GroupOptions;
  item: GroupOptions;
  footer?: GroupOptions;
}


export interface GroupOptions extends ControlBaseOptions { group: ControlConfig[]; }

export interface ControlValueOptions extends ControlBaseOptions {
  /**
   * The initial value for the control
   *
   * @type {*}
   */
  value?: any;

  /**
   * The placeholder of the control
   *
   * @type {string}
   */
  placeholder?: string;

  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface ControlInputOptions extends ControlValueOptions {
  /**
   * The type of the input control
   *
   * @type {string} [inputType="text"] - the type (equivalent to the type attribute of the <input> HTML tag)
   * WARN: not all types may be supported by all ui libraries
   * TODO: we should at least provide a fallback (using *ngSwitchCase?) for: 'number' and 'password'
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
   *
   * @type {ControlSelectOption[]}
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
  readOnly?: boolean;
  cols?: number;
  rows?: number;
  wrap?: boolean;
}


export type ControlOptions = ControlBaseOptions | GroupOptions | ArrayOptions | ControlInputOptions |
    ControlSelectOptions | ControlSliderOptions | ControlSwitchOptions | ControlTextareaOptions;
