import {GroupOptions} from './control-options.interface';

export interface FormConfig {
  id: string;

  name?: string;
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
