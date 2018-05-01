import {GroupOptions} from './control-options.interface';

export interface FormConfig {
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
   * group options
   */
  options: GroupOptions;

  /**
   * additional user data
   */
  user?: any;
}
