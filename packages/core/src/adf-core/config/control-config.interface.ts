import {ControlOptions} from './control-options.interface';


// tslint:disable: no-empty-interface


export interface ControlConfig {
  /**
   * The form model type
   */
  modelType: string;
  /**
   * The control type
   * if more types are specified, the first type which is found in the registry wins
   */
  controlType: string|string[];
  /**
   * The unique id (for the DOM element)
   *
   * all ids of array (DOM) child elements will be prefixed by 'arrayId[index].' to be unique
   */
  id: string;
  /**
   * The key of the control
   *
   * will be used to sync a FormControl in the FormGroup to the form control (DOM) element
   * ignore for MODEL_SUBSET
   * required otherwise, but using 'id' as default
   */
  key?: string;

  /**
   * The disable flag to disable this control
   */
  disabled?: boolean;
  /**
   * validators
   * TODO: validators for MODEL_SUBSET
   * ignore for MODEL_NULL
   */
  validators?: string|string[];
  /**
   * async validators
   * TODO: async validators for MODEL_SUBSET
   * ignore for MODEL_NULL
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
   */
  action?: string;

  /**
   * additional control specific options
   */
  options?: ControlOptions;


  /**
   * JSON pointer (application data model specific)
   */
  jp?: string;

  /**
   * additional user data
   */
  user?: any;
}
