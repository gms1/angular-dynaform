import {GroupOptions} from './control-options';

export interface FormBaseConfig {
  /**
   */
  id: string;

  /**
   * default update strategy of the form
   */
  updateOn?: 'change'|'blur'|'submit';
  /**
   * sync validators
   */
  validators?: string|string[];
  /**
   * async validators
   */
  asyncValidators?: string|string[];
  /**
   * error messages for the validators
   */
  errors?: {[key: string]: string};

  /**
   */
  showMultipleErrors?: boolean;

  /**
   * additional user data
   */
  user?: any;
}

export interface FormConfig extends FormBaseConfig {
  /**
   * group options
   */
  options: GroupOptions;
}
