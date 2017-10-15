import {ControlOptions} from './control-options.interface';


// tslint:disable: no-empty-interface


export interface ControlConfig {
  /**
   * The form model type
   *
   * @type {string}
   */
  modelType: string;
  /**
   * The control type
   * if more types are specified, the first type which is found in the registry wins
   *
   * @type {string|string[]}
   */
  controlType: string|string[];
  /**
   * The unique id (for the DOM element)
   *
   * all ids of array (DOM) child elements will be prefixed by 'arrayId[index].' to be unique
   *
   * @type {string}
   */
  id: string;
  /**
   * The key of the control
   *
   * will be used to sync a FormControl in the FormGroup to the form control (DOM) element
   * ignore for MODEL_SUBSET
   * required otherwise, but using 'id' as default
   *
   * @type {string}
   */
  key?: string;

  /**
   * The disable flag to disable this control
   *
   * @type {boolean}
   */
  disabled?: boolean;
  /**
   * validators
   * TODO: validators for MODEL_SUBSET
   * ignore for MODEL_NULL
   *
   * @type {string | string[]}
   */
  validators?: string|string[];
  /**
   * async validators
   * TODO: async validators for MODEL_SUBSET
   * ignore for MODEL_NULL
   *
   * @type {string | string[]}
   */
  asyncValidators?: string|string[];

  /**
   * action
   *
   * predefined actions:
   * 'reset'           ... enable/disable a reset button ( based on pristine/dirty state )
   * 'submit'          ... enable/disable a submit button ( based on valid/invalid state )
   * 'arrayAddItem'    ... add an array item
   * 'arrayInsertItem' ... insert an array item at current selected position
   * 'arrayDeleteItem' ... delete array item at current selected position
   *
   * @type {string}
   */
  action?: string;

  /**
   * additional control specific options
   *
   * @type {ControlOptions}
   */
  options?: ControlOptions;


  /**
   * JSON pointer (application data model specific)
   *
   * @type {ControlOptions}
   */
  jp?: string;

  /**
   * additional user data
   *
   * @type {*}
   */
  user?: any;
}
