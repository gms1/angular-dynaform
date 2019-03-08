import { ControlI18n } from './control-i18n';

export interface FormI18n {
  controls: { [key: string]: ControlI18n };
  errors?: { [key: string]: string };
}
