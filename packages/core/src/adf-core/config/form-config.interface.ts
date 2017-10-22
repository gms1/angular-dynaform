import {GroupOptions} from './control-options.interface';

export interface FormConfig {
  id: string;

  name?: string;

  /**
   * default update strategy of the form
   */
  updateOn?: 'change'|'blur'|'submit';
  /**
   * validators
   */
  validators?: string|string[];
  /**
   * async validators
   */
  asyncValidators?: string|string[];
  /**
   * group options
   */
  options: GroupOptions;



  showMultipleErrors?: boolean;

  /**
   * additional user data
   */
  user?: any;
}
