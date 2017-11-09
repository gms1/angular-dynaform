export enum ControlType {

  CONTROL_UNKNOWN = 'type:unknown',

  // controls for group or subset model:
  CONTROL_DIVISION = 'type:division',
  CONTROL_FIELDSET = 'type:fieldset',
  CONTROL_TABS = 'type:tabs',
  CONTROL_STEPS = 'type:steps',

  // controls for array model:
  CONTROL_ARRAY = 'type:array',

  // controls for value model:
  CONTROL_CHECKBOX = 'type:checkbox',
  CONTROL_INPUT = 'type:input',
  CONTROL_RADIOGROUP = 'type:radiogroup',
  CONTROL_SELECT = 'type:select',
  CONTROL_SLIDER = 'type:slider',
  CONTROL_SWITCH = 'type:switch',
  CONTROL_TEXTAREA = 'type:textarea',
  CONTROL_DATEPICKER = 'type:datepicker',
  CONTROL_TIMEPICKER = 'type:timepicker',
  CONTROL_LISTPICKER = 'type:listpicker',
  CONTROL_UPLOAD = 'type:upload',

  // controls for null model:
  CONTROL_BUTTON = 'type:button',
  CONTROL_SEPARATOR = 'type:separator'
}
