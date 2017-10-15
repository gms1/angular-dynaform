import {GroupOptions} from './control-options.interface';

export interface FormConfig {
  id: string;

  name?: string;
  /**
   * validators
   *
   * @type {string | string[]}
   */
  validators?: string|string[];
  /**
   * async validators
   *
   * @type {string | string[]}
   */
  asyncValidators?: string|string[];
  /**
   * group options
   *
   * @type {GroupOptions}
   */
  options: GroupOptions;



  showMultipleErrors?: boolean;

  /**
   * additional user data
   *
   * @type {*}
   */
  user?: any;
}
