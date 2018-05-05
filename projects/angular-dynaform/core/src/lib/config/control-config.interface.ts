import {ControlOptions} from './control-options.interface';
// tslint:disable: no-empty-interface


/**
 *
 * @export
 */
export interface ControlConfig {
  /**
   * The form model type
   * ```
   * values:
   *   ModelType.MODEL_GROUP: a group of controls
   *     corresponds to Angular FormGroup
   *   ModelType.MODEL_SUBSET: a subset of controls of a parents MODEL_GROUP
   *   ModelType.MODEL_VALUE: a control having a (input) value
   *     corresponds to Angular FormControl
   *   ModelType.MODEL_NULL: a control with a value we do not care
   *     corresponds to Angular FormControl, but returns 'undefined' as value and so do not pariticipate in the
   *     aggregated form value; use this for buttons/separators/...
   *   ModelType.MODEL_ARRAY: an array of MODEL_GROUP items all with the same structur
   *     corresponds to Angular FormArray
   * ```
   */
  modelType: string;
  /**
   * The control type
   * if more types are specified, the first type which is found in the registry wins
   *
   * ```
   * control types for MODEL_GROUP or MODEL_SUBSET:
   *   ControlType.CONTROL_DIVISION
   *   ControlType.CONTROL_FIELDSET
   *   ControlType.CONTROL_TABGROUP
   *   ControlType.CONTROL_STEPPER

   * control type for MODEL_ARRAY:
   *   ControlType.CONTROL_ARRAY

   * controls for MODEL_VALUE:
   *   ControlType.CONTROL_CHECKBOX
   *   ControlType.CONTROL_INPUT
   *   ControlType.CONTROL_RADIOGROUP
   *   ControlType.CONTROL_SELECT
   *   ControlType.CONTROL_SLIDER
   *   ControlType.CONTROL_SWITCH
   *   ControlType.CONTROL_TEXTAREA
   *   ControlType.CONTROL_DATEPICKER

   * controls for MODEL_NULL:
   *   ControlType.CONTROL_BUTTON
   *   ControlType.CONTROL_SEPARATOR
   * ```
   */
  controlType: string|string[];
  /**
   * The unique id (for the DOM element)
   *
   * all ids of array (DOM) child elements will be prefixed by 'arrayId-index-' to be unique
   */
  id: string;
  /**
   * The key of the control
   *
   * will be used to sync a FormControl in the FormGroup to the form control (DOM) element.
   * required, but using 'id' as default
   *
   * if parent is a MODEL_SUBSET this control will be added to the ancestor FormGroup
   */
  key?: string;

  /**
   * The hide this control
   */
  hidden?: boolean;

  /**
   * The disable flag to disable this control
   */
  disabled?: boolean;

  /**
   * update strategy of the control
   *
   * (the event on which this control will update itself)
   * default: 'change'
   */
  updateOn?: 'change'|'blur'|'submit';

  /**
   * sync validators
   *
   * ignore for MODEL_NULL or MODEL_SUBSET
   */
  validators?: string|string[];
  /**
   * async validators
   *
   * ignore for MODEL_NULL or MODEL_SUBSET
   */
  asyncValidators?: string|string[];
  /**
   * error messages for the validators
   */
  errors?: {[key: string]: string};
  /**
   * relations
   *
   * javascript expressions to enable/disabe and show/hide controls
   *
   */
  relations?: RelationExpressions;

  /**
   * action
   *
   * ```
   * predefined actions:
   * 'reset'           ... enable/disable a reset button ( based on pristine/dirty state )
   * 'submit'          ... enable/disable a submit button ( based on valid/invalid state )
   * 'arrayAddItem'    ... add an array item
   * 'arrayInsertItem' ... insert an array item at current selected position
   * 'arrayDeleteItem' ... delete array item at current selected position
   * ```
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


/**
 * define conditions (javascript expressions) based
 * on predicate values of related form controls
 *
 * A control with the key 'foo' in the root-FormGroup
 * can be referenced as 'foo'. If this control is a FormGroup
 * having a child 'bar', the later can be referenced as 'foo.bar'.
 * All of this referenced values will be observed for changes so a recalculation
 * of the expression can be performed
 *
 */
export interface RelationExpressions {
  show?: string;
  enable?: string;
}
