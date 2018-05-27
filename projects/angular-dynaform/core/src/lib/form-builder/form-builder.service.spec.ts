import {TestBed} from '@angular/core/testing';

import {FormBuilder} from '../form-builder';
import {ControlConfig, ControlType, ModelType} from '../config';
import {mainExampleConfig} from '../spec/test.config';
import {clone} from '../utils/clone';

describe('form-builder test suite', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [FormBuilder]});
    fb = TestBed.get(FormBuilder);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('FormBuilder should be able to build a form', () => {
    expect(fb).toBeDefined('failed to resolve FormBuilder');
    const form = fb.createForm({id: 'exampleForm', updateOn: 'blur'});
    const person = form.group.addSubset({id: 'person', controlType: ControlType.CONTROL_DIVISION});
    expect(person.options).toEqual({});

    const address =
        form.group.addGroup({id: 'address', controlType: ControlType.CONTROL_FIELDSET, options: {label: 'Address'}});
    const contacts = form.group.addArray({
      id: 'contacts',
      controlType: ControlType.CONTROL_ARRAY,
      jp: '/contacts',
      options: {label: 'Contacts', initialItemCount: 1}
    });
    const info = form.group.addSubset({id: 'info', controlType: ControlType.CONTROL_DIVISION});
    const buttondiv = form.group.addSubset({
      id: 'buttondivision',
      controlType: [ControlType.CONTROL_DIVISION],
      options: {css: {content: 'button-division-content'}}
    });

    const salutationOptions = {valueOptions: [{value: 'mr', label: 'Mr.'}, {value: 'ms', label: 'Ms.'}]};
    const salutationPartialConfig = {
      id: 'salutation',
      controlType: ControlType.CONTROL_RADIOGROUP,
      options: salutationOptions,
      validators: ['required'],
      jp: '/greeting'
    };

    const saluationConfig: ControlConfig = clone(salutationPartialConfig);
    saluationConfig.modelType = ModelType.MODEL_VALUE;

    const salutationCtrl = person.group.addControl(salutationPartialConfig);
    expect(salutationCtrl.options).toEqual(salutationOptions, 'salution options not initialized properly');
    expect(salutationCtrl.config).toEqual(saluationConfig, 'salutation config not initialized properly');

    person.group.addControl({
      id: 'title',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'Title', placeholder: 'Enter your title', maxLength: 30, minLength: 2},
      validators: ['minLength', 'maxLength'],
      jp: '/title'
    });
    person.group.addControl({
      id: 'firstName',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'First name', placeholder: 'Enter your first name', maxLength: 30, minLength: 4},
      validators: ['required', 'minLength', 'maxLength'],
      jp: '/name/first'
    });
    person.group.addControl({
      id: 'lastName',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'Last name', placeholder: 'Enter your last name', maxLength: 30, minLength: 4},
      validators: ['required', 'minLength', 'maxLength'],
      jp: '/name/last'
    });
    person.group.addControl({
      id: 'birthday',
      controlType: [ControlType.CONTROL_DATEPICKER, ControlType.CONTROL_INPUT],
      options: {label: 'Birthday name', placeholder: 'Enter your birthday', inputType: 'date'},
      validators: ['required'],
      jp: '/birthday'
    });

    address.group.addControl({
      id: 'street',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'Street', placeholder: 'Enter street'},
      jp: '/address/street'
    });
    address.group.addControl({
      id: 'postcode',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'Postcode', placeholder: 'Enter postcode'},
      jp: '/address/postcode'
    });


    contacts.header.options.css = {content: 'button-division-content'};
    contacts.header.addButton(
        {id: 'addContact', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Add'}, action: 'arrayAddItem'});
    contacts.header.addButton({
      id: 'insertContact',
      controlType: ControlType.CONTROL_BUTTON,
      options: {label: 'Insert'},
      action: 'arrayInsertItem'
    });
    contacts.header.addSeparator({
      id: 'separatorContactButtons',
      controlType: ControlType.CONTROL_SEPARATOR,
      options: {css: {container: 'button-separator'}}
    });
    contacts.header.addButton({
      id: 'deleteContact',
      controlType: ControlType.CONTROL_BUTTON,
      options: {label: 'Delete'},
      action: 'arrayDeleteItem'
    });

    contacts.group.addControl({
      id: 'contactType',
      key: 'type',
      controlType: ControlType.CONTROL_SELECT,
      options: {
        label: 'Type',
        valueOptions: [{value: 'phone', label: 'Telephone'}, {value: 'email', label: 'Email'}],
        placeholder: 'Select an option'
      },
      jp: 'carrier'
    });
    contacts.group.addControl({
      id: 'contactValue',
      key: 'value',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'Value', placeholder: 'Enter a value'},
      jp: 'value'
    });

    info.group.addControl({
      id: 'memo',
      controlType: ControlType.CONTROL_TEXTAREA,
      options: {
        label: 'Memo',
        placeholder: 'Memo',
        maxLength: 250,
        minLength: 0,
        readOnly: false,
        cols: 60,
        rows: 7,
        wrap: true
      },
      jp: '/notes'
    });
    const checkboxdiv =
        info.group.addSubset({id: 'checkboxdivision', controlType: ControlType.CONTROL_DIVISION, jp: '/options'});
    checkboxdiv.group.addControl({
      id: 'atc',
      controlType: ControlType.CONTROL_CHECKBOX,
      options: {label: 'Accept Terms and conditions', value: false},
      jp: 'atc',
      updateOn: 'change'
    });
    checkboxdiv.group.addControl({
      id: 'newsletter',
      controlType: ControlType.CONTROL_CHECKBOX,
      options: {label: 'Subscribe to newsletter', value: true},
      jp: 'newsletter',
      relations: {enable: 'atc'}
    });

    buttondiv.group.addButton(
        {id: 'clear', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Clear'}, action: 'clear'});
    buttondiv.group.addSeparator({
      id: 'separatorMainButtons',
      controlType: ControlType.CONTROL_SEPARATOR,
      options: {css: {container: 'button-separator'}}
    });
    buttondiv.group.addButton(
        {id: 'reset', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Reset'}, action: 'reset'});
    buttondiv.group.addButton(
        {id: 'submit', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Submit'}, action: 'submit'});


    expect(form.toFormConfig())
        .toEqual(mainExampleConfig, 'form builder created config should be same as the config of the main example');


  });


});
