import { ValueOptions } from './control-options';

export interface ControlI18n {
  label?: string;
  hint?: string;
  placeholder?: string;
  valueOptions?: ValueOptions[];
  errors?: { [key: string]: string };
}
