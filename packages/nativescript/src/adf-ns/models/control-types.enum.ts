
export enum NativeScriptControlType {
  CONTROL_UNKNOWN = 'tns:unknown',

  // controls for group or subset model:
  CONTROL_DIVISION = 'tns:division',
  CONTROL_FIELDSET = 'tns:fieldset',
  CONTROL_TABS = 'tns:tabs',
  CONTROL_STEPS = 'tns:steps',

  // controls for array model:
  CONTROL_ARRAY = 'tns:array',

  // controls for value model:
  CONTROL_CHECKBOX = 'tns:checkbox',
  CONTROL_INPUT = 'tns:input',
  CONTROL_RADIOGROUP = 'tns:radiogroup',
  CONTROL_SELECT = 'tns:select',
  CONTROL_SLIDER = 'tns:slider',
  CONTROL_SWITCH = 'tns:switch',
  CONTROL_TEXTAREA = 'tns:textarea',
  CONTROL_DATEPICKER = 'tns:datepicker',
  CONTROL_TIMEPICKER = 'tns:timepicker',
  CONTROL_LISTPICKER = 'tns:listpicker',
  CONTROL_UPLOAD = 'tns:upload',

  // controls for null model:
  CONTROL_BUTTON = 'tns:button',
  CONTROL_SEPARATOR = 'tns:separator'
}
