
export enum NativeScriptControlType {
  CONTROL_UNKNOWN = 'ns:unknown',

  // controls for group or subset model:
  CONTROL_DIVISION = 'ns:division',
  CONTROL_FIELDSET = 'ns:fieldset',

  // controls for array model:
  CONTROL_ARRAY = 'ns:array',

  // controls for value model:
  CONTROL_TEXTFIELD = 'ns:textfield',
  CONTROL_TEXTVIEW = 'ns:textview',
  CONTROL_SWITCH = 'ns:switch',
  CONTROL_SLIDER = 'ns:slider',

  CONTROL_CHECKBOX = 'ns:checkbox',
  CONTROL_RADIOGROUP = 'ns:radiogroup',
  CONTROL_LISTPICKER = 'ns:listpicker',

  // controls for null model:
  CONTROL_BUTTON = 'ns:button',
  CONTROL_SEPARATOR = 'ns:separator'
}
