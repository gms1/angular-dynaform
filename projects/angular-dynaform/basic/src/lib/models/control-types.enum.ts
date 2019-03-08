export enum BasicControlType {
  CONTROL_UNKNOWN = 'basic:unknown',

  // controls for group or subset model:
  CONTROL_DIVISION = 'basic:division',
  CONTROL_FIELDSET = 'basic:fieldset',
  CONTROL_TABGROUP = 'basic:tabgroup',
  CONTROL_STEPPER = 'basic:stepper',

  // controls for array model:
  CONTROL_ARRAY = 'basic:array',

  // controls for value model:
  CONTROL_CHECKBOX = 'basic:checkbox',
  CONTROL_INPUT = 'basic:input',
  CONTROL_RADIOGROUP = 'basic:radiogroup',
  CONTROL_SELECT = 'basic:select',
  CONTROL_SLIDER = 'basic:slider',
  CONTROL_SWITCH = 'basic:switch',
  CONTROL_TEXTAREA = 'basic:textarea',
  CONTROL_DATEPICKER = 'basic:datepicker',
  CONTROL_TIMEPICKER = 'basic:timepicker',
  CONTROL_LISTPICKER = 'basic:listpicker',
  CONTROL_UPLOAD = 'basic:upload',

  // controls for null model:
  CONTROL_BUTTON = 'basic:button',
  CONTROL_SEPARATOR = 'basic:separator',
}
