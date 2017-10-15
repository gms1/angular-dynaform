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
  ModelType
} from '@angular-dynaform/core';

export const formConfig: FormConfig = {
  id: 'exampleForm',
  options: {
    group: [
      {
        key: 'salutation',
        id: 'salutation',
        modelType: ModelType.MODEL_VALUE,
        controlType: ControlType.CONTROL_RADIOGROUP,
        options: {valueOptions: [{value: 'mr', label: 'Mr.'}, {value: 'ms', label: 'Ms.'}]},
        validators: ['required'],
        jp: '/greeting'
      },
      {
        key: 'title',
        id: 'title',
        modelType: ModelType.MODEL_VALUE,
        controlType: ControlType.CONTROL_INPUT,
        options: {label: 'Title', placeholder: 'Enter your title', maxLength: 30, minLength: 2},
        validators: ['minLength', 'maxLength'],
        jp: '/title'
      },
      {
        key: 'firstName',
        id: 'firstName',
        modelType: ModelType.MODEL_VALUE,
        controlType: ControlType.CONTROL_INPUT,
        options: {label: 'First name', placeholder: 'Enter your first name', maxLength: 30, minLength: 4},
        validators: ['required', 'minLength', 'maxLength'],
        jp: '/name/first'
      }
/*      
      ,
      {
        key: 'lastName',
        id: 'lastName',
        modelType: ModelType.MODEL_VALUE,
        controlType: ControlType.CONTROL_INPUT,
        options: {label: 'Last name', placeholder: 'Enter your last name', maxLength: 30, minLength: 4},
        validators: ['required', 'minLength', 'maxLength'],
        jp: '/name/last'
      },
      {
        key: 'address',
        id: 'address',
        modelType: ModelType.MODEL_GROUP,
        controlType: ControlType.CONTROL_FIELDSET,
        options: {
          label: 'Address',
          group: [
            {
              key: 'street',
              id: 'street',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: {label: 'Street', placeholder: 'Enter street'},
              jp: '/address/street'
            },
            {
              key: 'postcode',
              id: 'postcode',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_INPUT,
              options: {label: 'Postcode', placeholder: 'Enter postcode'},
              jp: '/address/postcode'
            }
          ]
        }
      },
      {
        key: 'contacts',
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
                key: 'add',
                id: 'addContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_BUTTON,
                options: {label: 'Add'},
                action: 'arrayAddItem'
              },
              {
                key: 'insert',
                id: 'insertContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_BUTTON,
                options: {label: 'Insert'},
                action: 'arrayInsertItem'
              },
              {
                key: 'separator',
                id: 'separatorContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_SEPARATOR,
                options: {css: {container: 'button-separator'}}
              },
              {
                key: 'delete',
                id: 'deleteContact',
                modelType: ModelType.MODEL_NULL,
                controlType: ControlType.CONTROL_BUTTON,
                options: {label: 'Delete'},
                action: 'arrayDeleteItem'
              }
            ],
            css: {content: 'button-division-content'}

          },
          item: {
            group: [
              {
                key: 'type',
                id: 'contactType',
                modelType: ModelType.MODEL_VALUE,
                controlType: ControlType.CONTROL_SELECT,
                options: {
                  label: 'Type',
                  valueOptions: [{value: 'phone', label: 'Telephone'}, {value: 'email', label: 'Email'}],
                  placeholder: 'Select an option'
                },
                jp: 'carrier'
              },
              {
                key: 'value',
                id: 'contactValue',
                modelType: ModelType.MODEL_VALUE,
                controlType: ControlType.CONTROL_INPUT,
                options: {label: 'Value', placeholder: 'Enter a value'},
                jp: 'value'
              }
            ]
          }
        }
      },
      {
        key: 'memo',
        id: 'memo',
        modelType: ModelType.MODEL_VALUE,
        controlType: ControlType.CONTROL_TEXTAREA,
        options: {label: 'Memo', maxLength: 250, minLength: 0, readOnly: false, cols: 60, rows: 7, wrap: true},
        jp: '/notes'
      },
      {
        id: 'checkboxdivision',
        modelType: ModelType.MODEL_SUBSET,
        controlType: ControlType.CONTROL_DIVISION,
        jp: '/options',
        options: {
          group: [
            {
              key: 'atc',
              id: 'atc',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_CHECKBOX,
              options: {label: 'Accept Terms and conditions', value: false},
              jp: 'atc'
            },
            {
              key: 'newsletter',
              id: 'newsletter',
              modelType: ModelType.MODEL_VALUE,
              controlType: ControlType.CONTROL_CHECKBOX,
              options: {label: 'Subscribe to newsletter', value: true},
              jp: 'newsletter'
            }
          ]
        }
      },
      {
        id: 'buttondivision',
        modelType: ModelType.MODEL_SUBSET,
        controlType: [ControlType.CONTROL_DIVISION],
        options: {
          group: [
            {
              key: 'resetButton',
              id: 'reset',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: {label: 'Reset'},
              action: 'reset'
            },
            {
              key: 'submitButon',
              id: 'submit',
              modelType: ModelType.MODEL_NULL,
              controlType: ControlType.CONTROL_BUTTON,
              options: {label: 'Submit'},
              action: 'submit'
            }
          ],
          css: {content: 'button-division-content'}
        }
      }
*/      
    ]
  }
};



export const formLanguages = {
  en: {
    salutation: {valueOptions: [{value: 'mr', label: 'Mr.'}, {value: 'ms', label: 'Ms.'}]},
    title: {label: 'Title', placeholder: 'Enter your title'},
    firstName: {label: 'First name', placeholder: 'Enter your first name'},
    lastName: {label: 'Last name', placeholder: 'Enter your last name'},
    address: {label: 'Address'},
    street: {label: 'Street', placeholder: 'Enter street'},
    postcode: {label: 'Postcode', placeholder: 'Bitte postcode'},
    contacts: {label: 'contacts'},
    addContact: {label: 'add'},
    insertContact: {label: 'insert'},
    deleteContact: {label: 'delete'},
    contactType: {
      label: 'type',
      placeholder: 'Select an option',
      valueOptions: [{value: 'phone', label: 'Telephone'}, {value: 'email', label: 'Email'}]
    },
    contactValue: {label: 'Tel/Email', placeholder: 'Enter a value'},
    memo: {label: 'Memo'},
    atc: {label: 'Accept Terms and conditions'},
    newsletter: {label: 'Subscribe to newsletter'},
    reset: {label: 'Reset'},
    submit: {label: 'Submit'}
  } as FormI18n,
  de: {
    salutation: {valueOptions: [{value: 'mr', label: 'Herr'}, {value: 'ms', label: 'Frau'}]},
    title: {label: 'Titel', placeholder: 'Bitte geben Sie Ihren Titel ein'},
    firstName: {label: 'Vorname', placeholder: 'Bitte geben Sie Ihren Vornamen ein'},
    lastName: {label: 'Nachname', placeholder: 'Bitte geben Sie Ihren Nachnamen ein'},
    address: {label: 'Adresse'},
    street: {label: 'Straße', placeholder: 'Bitte geben Sie Ihre Straße ein'},
    postcode: {label: 'PLZ./Ort', placeholder: 'Bitte geben Sie Postleitzahl und Ort ein'},
    contacts: {label: 'Kontakte'},
    addContact: {label: 'neu'},
    insertContact: {label: 'einfügen'},
    deleteContact: {label: 'löschen'},
    contactType: {
      label: 'Kontaktart',
      placeholder: 'Bitte geben Sie die gewünschte Kontaktart ein',
      valueOptions: [{value: 'phone', label: 'Telephon'}, {value: 'email', label: 'Email'}]
    },
    contactValue: {label: 'Tel/Email', placeholder: ''},
    memo: {label: 'Notiz'},
    atc: {label: 'AGB akzeptiert'},
    newsletter: {label: 'Newsletter abonnieren'},
    reset: {label: 'Zurücksetzen'},
    submit: {label: 'Ok'}
  } as FormI18n
};


export const formModelData = {
  salutation: 'mr',
  firstName: 'Chuck',
  lastName: 'Norris',
  address: {street: 'P.O. Box 872', postcode: 'TX 77868'},
  contacts: [{type: 'email', value: 'chuck@norris.com'}]
};

export const appModelData = {
  greeting: 'mr',
  name: {first: 'Chuck', last: 'Norris'},
  address: {street: 'P.O. Box 872', postcode: 'TX 77868'},
  contacts: [{carrier: 'email', value: 'chuck@norris.com'}]
};
