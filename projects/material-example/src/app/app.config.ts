// tslint:disable no-unused-variable
import {
  ArrayOptions,
  ControlConfig,
  ControlBaseOptions,
  ControlInputOptions,
  ControlSelectOptions,
  ControlType,
  FormConfig,
  FormI18n,
  GroupOptions,
  ModelType,
} from '@angular-dynaform/core';

export const mainExampleConfig: FormConfig = {
  id: 'exampleForm',
  updateOn: 'blur',
  options: {
    group: [
      {
        id: 'person',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_DIVISION,
        options: {
          group: [
            {
              id: 'salutation',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_RADIOGROUP,
              options: {
                valueOptions: [{ value: 'mr', label: 'Mr.' }, { value: 'ms', label: 'Ms.' }],
              },
              validators: ['required'],
              jp: '/greeting',
            },
            {
              id: 'title',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: {
                label: 'Title',
                placeholder: 'Enter your title',
                maxLength: 30,
                minLength: 2,
              },
              validators: ['minLength', 'maxLength'],
              jp: '/title',
            },
            {
              id: 'firstName',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: {
                label: 'First name',
                placeholder: 'Enter your first name',
                maxLength: 30,
                minLength: 4,
                required: true,
              },
              validators: ['required', 'minLength', 'maxLength'],
              jp: '/name/first',
            },
            {
              id: 'lastName',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: {
                label: 'Last name',
                placeholder: 'Enter your last name',
                maxLength: 30,
                minLength: 4,
                required: true,
              },
              validators: ['required', 'minLength', 'maxLength'],
              jp: '/name/last',
            },
            {
              id: 'birthday',
              modelType: ModelType.MODEL_VALUE,
              controlType: [ControlType.CONTROL_DATEPICKER, ControlType.CONTROL_INPUT],
              options: {
                label: 'Birthday name',
                placeholder: 'Enter your birthday',
                inputType: 'date',
                required: true,
              },
              validators: ['required'],
              jp: '/birthday',
            },
          ],
        },
      },
      {
        id: 'address',
        modelType: ModelType.MODEL_GROUP,
        controlType: ControlType.CONTROL_FIELDSET,
        options: {
          label: 'Address',
          group: [
            {
              id: 'street',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: { label: 'Street', placeholder: 'Enter street' },
              jp: '/address/street',
            },
            {
              id: 'postcode',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: { label: 'Postcode', placeholder: 'Enter postcode' },
              jp: '/address/postcode',
            },
          ],
        },
      },
      {
        id: 'contacts',
        modelType: ModelType.MODEL_ARRAY,
        controlType: ControlType.CONTROL_ARRAY,
        jp: '/contacts',
        options: {
          label: 'Contacts',
          initialItemCount: 1,
          header: {
            group: [
              {
                id: 'addContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_BUTTON,
                options: { label: 'Add' },
                action: 'arrayAddItem',
              },
              {
                id: 'insertContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_BUTTON,
                options: { label: 'Insert' },
                action: 'arrayInsertItem',
              },
              {
                id: 'separatorContactButtons',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_SEPARATOR,
                options: { css: { container: 'button-separator' } },
              },
              {
                id: 'deleteContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_BUTTON,
                options: { label: 'Delete' },
                action: 'arrayDeleteItem',
              },
            ],
            css: { content: 'button-division-content' },
          },
          item: {
            group: [
              {
                id: 'contactType',
                key: 'type',
                modelType: ModelType.MODEL_VALUE,
                controlType: ControlType.CONTROL_SELECT,
                options: {
                  label: 'Type',
                  valueOptions: [
                    { value: 'phone', label: 'Telephone' },
                    { value: 'email', label: 'Email' },
                  ],
                  placeholder: 'Select an option',
                },
                jp: 'carrier',
              },
              {
                id: 'contactValue',
                key: 'value',
                modelType: ModelType.MODEL_VALUE,
                controlType: ControlType.CONTROL_INPUT,
                options: { label: 'Value', placeholder: 'Enter a value' },
                jp: 'value',
              },
            ],
          },
        },
      },
      {
        id: 'info',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_DIVISION,
        options: {
          group: [
            {
              id: 'memo',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_TEXTAREA,
              options: {
                label: 'Memo',
                placeholder: 'Memo',
                maxLength: 250,
                minLength: 0,
                readOnly: false,
                cols: 60,
                rows: 7,
                wrap: true,
              },
              jp: '/notes',
            },
            {
              id: 'checkboxdivision',
              modelType: ModelType.MODEL_SUBSET,
              controlType: ControlType.CONTROL_DIVISION,
              jp: '/options',
              options: {
                group: [
                  {
                    id: 'atc',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: { label: 'Accept Terms and conditions', value: false },
                    jp: 'atc',
                    updateOn: 'change',
                  },
                  {
                    id: 'newsletter',
                    modelType: ModelType.MODEL_VALUE,
                    controlType: ControlType.CONTROL_CHECKBOX,
                    options: { label: 'Subscribe to newsletter', value: true },
                    jp: 'newsletter',
                    relations: { enable: 'atc' },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        id: 'buttondivision',
        modelType: ModelType.MODEL_SUBSET,
        controlType: [ControlType.CONTROL_DIVISION],
        options: {
          group: [
            {
              id: 'clear',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: { label: 'Clear' },
              action: 'clear',
            },
            {
              id: 'separatorMainButtons',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_SEPARATOR,
              options: { css: { container: 'button-separator' } },
            },
            {
              id: 'reset',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: { label: 'Reset' },
              action: 'reset',
            },
            {
              id: 'submit',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: { label: 'Submit' },
              action: 'submit',
            },
          ],
          css: { content: 'button-division-content' },
        },
      },
    ],
  },
};

export const mainExampleFormLanguages: { [key: string]: FormI18n } = {
  en: {
    controls: {
      salutation: { valueOptions: [{ value: 'mr', label: 'Mr.' }, { value: 'ms', label: 'Ms.' }] },
      title: { label: 'Title', placeholder: 'Enter your title' },
      firstName: { label: 'First name', placeholder: 'Enter your first name' },
      lastName: { label: 'Last name', placeholder: 'Enter your last name' },
      birthday: { label: 'Birthday', placeholder: 'Enter your birthday' },
      address: { label: 'Address' },
      street: { label: 'Street', placeholder: 'Enter street' },
      postcode: { label: 'Postcode', placeholder: 'Bitte postcode' },
      contacts: { label: 'Contacts' },
      addContact: { label: 'add' },
      insertContact: { label: 'insert' },
      deleteContact: { label: 'delete' },
      contactType: {
        label: 'Type',
        placeholder: 'Select an option',
        valueOptions: [{ value: 'phone', label: 'Telephone' }, { value: 'email', label: 'Email' }],
      },
      contactValue: { label: 'Tel/Email', placeholder: 'Enter a value' },
      memo: { label: 'Memo', placeholder: 'Memo' },
      atc: { label: 'Accept Terms and conditions' },
      newsletter: { label: 'Subscribe to newsletter' },
      clear: { label: 'Clear' },
      reset: { label: 'Reset' },
      submit: { label: 'Submit' },
    },
    errors: {
      required: 'is required',
      minLength: 'minimum length ${requiredLength}',
      maxLength: 'maximum length ${requiredLength}',
    },
  },
  de: {
    controls: {
      salutation: {
        valueOptions: [{ value: 'mr', label: 'Herr' }, { value: 'ms', label: 'Frau' }],
      },
      title: { label: 'Titel', placeholder: 'Bitte geben Sie Ihren Titel ein' },
      firstName: { label: 'Vorname', placeholder: 'Bitte geben Sie Ihren Vornamen ein' },
      lastName: { label: 'Nachname', placeholder: 'Bitte geben Sie Ihren Nachnamen ein' },
      birthday: { label: 'Geburtstag', placeholder: 'Bitte geben Sie Ihren Geburtstag ein' },
      address: { label: 'Adresse' },
      street: { label: 'Straße', placeholder: 'Bitte geben Sie Ihre Straße ein' },
      postcode: { label: 'PLZ./Ort', placeholder: 'Bitte geben Sie Postleitzahl und Ort ein' },
      contacts: { label: 'Kontakte' },
      addContact: { label: 'neu' },
      insertContact: { label: 'einfügen' },
      deleteContact: { label: 'löschen' },
      contactType: {
        label: 'Kontaktart',
        placeholder: 'Bitte geben Sie die gewünschte Kontaktart ein',
        valueOptions: [{ value: 'phone', label: 'Telephon' }, { value: 'email', label: 'Email' }],
      },
      contactValue: { label: 'Tel/Email', placeholder: '' },
      memo: { label: 'Notiz', placeholder: 'Notiz' },
      atc: { label: 'AGB akzeptiert' },
      newsletter: { label: 'Newsletter abonnieren' },
      clear: { label: 'Leeren' },
      reset: { label: 'Zurücksetzen' },
      submit: { label: 'Ok' },
    },
    errors: {
      required: 'wird benötigt',
      minLength: 'minimale Länge ${requiredLength}',
      maxLength: 'maximale Länge ${requiredLength}',
    },
  },
};

export const mainExampleFormModelData = {
  salutation: 'mr',
  firstName: 'Chuck',
  lastName: 'Norris',
  birthday: '1940-03-10',
  address: { street: 'P.O. Box 872', postcode: 'TX 77868' },
  contacts: [{ type: 'email', value: 'chuck@norris.com' }],
};

export const mainExampleAppModelData = {
  greeting: 'mr',
  name: { first: 'Chuck', last: 'Norris' },
  birthday: '1940-03-10',
  address: { street: 'P.O. Box 872', postcode: 'TX 77868' },
  contacts: [{ carrier: 'email', value: 'chuck@norris.com' }],
};
