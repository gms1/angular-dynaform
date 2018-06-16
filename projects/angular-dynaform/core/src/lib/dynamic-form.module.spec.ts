// tslint:disable no-null-keyword no-unbound-method no-unused-variable prefer-const
import {APP_BASE_HREF} from '@angular/common';
import {DebugElement} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {
  ArrayModel,
  ControlConfig,
  ControlType,
  DynamicForm,
  DynamicFormComponent,
  DynamicFormControl,
  DynamicFormModule,
  DynamicFormService,
  FormModel,
  ModelType,
  ArrayButtonAddAction,
  ArrayButtonInsertAction,
  ArrayButtonDeleteAction,
  FormConfig,
  Stepper
} from '../public_api';
import {TestFormContainerComponent, TestFormControlComponent, TestErrorComponent} from './spec';
import {
  TestArrayComponent,
  TestButtonComponent,
  TestCheckboxComponent,
  TestDivisionComponent,
  TestFieldsetComponent,
  TestInputComponent,
  TestRadioGroupComponent,
  TestSelectComponent,
  TestSeparatorComponent,
  TestSliderComponent,
  TestStepperComponent,
  TestSwitchComponent,
  TestTextareaComponent,
  testPatternValidate,
  testAsyncPatternValidate
} from './spec';

import {
  mainExampleConfig,
  mainExampleFormLanguages,
  mainExampleFormModelData,
  mainExampleAppModelData
} from './spec/test.config';

import {cleanValue} from './utils/clone';

describe('core-module test suite', () => {
  let fixture: ComponentFixture<TestFormContainerComponent>;
  let debugElement: DebugElement;
  let container: TestFormContainerComponent;
  let form: DynamicFormComponent;
  let service: DynamicFormService;
  let model: FormModel;

  function findComponentById(id: string): DynamicFormControl {
    const comp = form.findComponentById(id);
    if (!comp) {
      throw new Error(`component with id "${id}" not found`);
      }
    return comp;
    }

  function setComponentValue(comp: DynamicFormControl, value: any) {
    fixture.detectChanges();
    comp.model.ngControl.setValue(value);
    fixture.detectChanges();
    }

  function findDebugElementById(id: string): DebugElement {
    const dbgEl = debugElement.query(By.css(`#${id}`));
    expect(dbgEl instanceof DebugElement).toBe(true, `element with id "${id}" not found`);
    return dbgEl;
    }

  function findInputElement(dbgEl: DebugElement): HTMLInputElement {
    const tagName = (dbgEl.nativeElement as HTMLElement).tagName;
    if (tagName === 'INPUT') {
      return dbgEl.nativeElement;
      }
    const htmlInput = dbgEl.nativeElement.querySelector('input');
    expect(htmlInput).toBeTruthy(`element ${name} (${tagName}) does not have an input-element`);
    return htmlInput;
    }

  function setElementInput(dbgEl: DebugElement, value: any) {
    fixture.detectChanges();
    const htmlInput: HTMLInputElement = findInputElement(dbgEl);
    dbgEl.triggerEventHandler('focus', null);
    htmlInput.value = value;
    htmlInput.dispatchEvent(new Event('input'));
    dbgEl.triggerEventHandler('blur', null);
    fixture.detectChanges();
    }

  function clickElementInput(dbgEl: DebugElement) {
    fixture.detectChanges();
    const htmlInput: HTMLInputElement = findInputElement(dbgEl);
    dbgEl.triggerEventHandler('focus', null);
    htmlInput.click();
    dbgEl.triggerEventHandler('blur', null);
    fixture.detectChanges();
    }

  function clickElement(dbgEl: DebugElement) {
    fixture.detectChanges();
    dbgEl.nativeElement.click();
    fixture.detectChanges();
    }


  const entryComponents = [
    TestFormControlComponent, TestErrorComponent, TestArrayComponent, TestButtonComponent, TestCheckboxComponent,
    TestDivisionComponent, TestFieldsetComponent, TestInputComponent, TestRadioGroupComponent, TestSelectComponent,
    TestSeparatorComponent, TestSliderComponent, TestStepperComponent, TestSwitchComponent, TestTextareaComponent
  ];

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DynamicFormModule.forRoot()],
      declarations: [TestFormContainerComponent, ...entryComponents],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, DynamicFormService]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {set: {entryComponents}});
    service = TestBed.get(DynamicFormService);

    // register test components
    service.setFormControlComponent(TestFormControlComponent);
    service.setErrorComponent(TestErrorComponent);
    service.setControlComponent(ControlType.CONTROL_ARRAY, TestArrayComponent, true);
    service.setControlComponent(ControlType.CONTROL_FIELDSET, TestFieldsetComponent, true);
    service.setControlComponent(ControlType.CONTROL_DIVISION, TestDivisionComponent, true);
    service.setControlComponent(ControlType.CONTROL_BUTTON, TestButtonComponent, true);
    service.setControlComponent(ControlType.CONTROL_SEPARATOR, TestSeparatorComponent, true);

    service.setControlComponent(ControlType.CONTROL_CHECKBOX, TestCheckboxComponent, true);
    service.setControlComponent(ControlType.CONTROL_INPUT, TestInputComponent, true);
    service.setControlComponent(ControlType.CONTROL_RADIOGROUP, TestRadioGroupComponent, true);
    service.setControlComponent(ControlType.CONTROL_SELECT, TestSelectComponent, true);
    service.setControlComponent(ControlType.CONTROL_SLIDER, TestSliderComponent, true);
    service.setControlComponent(ControlType.CONTROL_STEPPER, TestStepperComponent, true);
    service.setControlComponent(ControlType.CONTROL_SWITCH, TestSwitchComponent, true);
    service.setControlComponent(ControlType.CONTROL_TEXTAREA, TestTextareaComponent, true);

    service.validatorFn.setFn('testSyncValidator', testPatternValidate);
    service.asyncValidatorFn.setFn('testAsyncValidator', testAsyncPatternValidate);
    fixture = TestBed.createComponent(TestFormContainerComponent);
  });

  beforeEach(async() => {
    expect(fixture).toBeDefined('fixture is not defined');
    debugElement = fixture.debugElement;
    expect(debugElement instanceof DebugElement).toBe(true, 'debugElement is not defined');
    container = fixture.componentInstance;
    expect(container instanceof TestFormContainerComponent).toBe(true, 'container is not defined');
    service = container.dynamicFormService;
    expect(service instanceof DynamicFormService).toBe(true, 'service is not defined');
    expect(container.form instanceof DynamicFormComponent)
        .toBe(true, 'form is not an instance of DynamicFormComponent');
    form = container.form as DynamicFormComponent;

    let testConfig: FormConfig = JSON.parse(JSON.stringify(mainExampleConfig));
    const testControlGroup: ControlConfig[] = (testConfig as any).options.group[0].options.group;

    // add array footer
    (testConfig as any).options.group[2].options.footer = {
      group: [{id: 'footer', modelType: ModelType.MODEL_NULL, controlType: ControlType.CONTROL_SEPARATOR}]
    };


    // add controls for validation testing:
    testControlGroup.push({
      id: 'testRequiredTrueValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['requiredTrue'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testNullMinLengthValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['minLength'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testNullMaxLengthValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['maxLength'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testMinValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {min: 3},
      validators: ['min'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testNullMinValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['min'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testMaxValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {max: 3},
      validators: ['max'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testNullMaxValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['max'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testPatternValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {pattern: '^isAPattern$'},
      validators: ['pattern'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testNullPatternValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['pattern'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testEmailValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['email'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testSyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {pattern: '^sync$'},
      validators: ['testSyncValidator'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testAsyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {pattern: '^async$'},
      asyncValidators: ['testAsyncValidator'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testUndefinedSyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['testUndefinedSyncValidator'],
      disabled: true
    });
    testControlGroup.push({
      id: 'testUndefinedAsyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      asyncValidators: ['testUndefinedAsyncValidator'],
      disabled: true
    });

    // add controls for array action testing:

    testControlGroup.push({
      id: 'addContact2',
      modelType: ModelType.MODEL_NULL,
      controlType: ControlType.CONTROL_BUTTON,
      action: 'arrayAddItem'
    });
    testControlGroup.push({
      id: 'insertContact2',
      modelType: ModelType.MODEL_NULL,
      controlType: ControlType.CONTROL_BUTTON,
      action: 'arrayInsertItem'
    });
    testControlGroup.push({
      id: 'deleteContact2',
      modelType: ModelType.MODEL_NULL,
      controlType: ControlType.CONTROL_BUTTON,
      action: 'arrayDeleteItem'
    });

    // add controls for relations-showIf testing:

    testControlGroup.push({
      id: 'newsletter2',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_CHECKBOX,
      relations: {show: 'atc'}
    });
    testControlGroup.push({
      id: 'newsletter3',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_CHECKBOX,
      relations: {enable: 'unknown'}
    });

    // add controls for stepper-button action testing:
    testControlGroup.push({
      id: 'stepper',
      modelType: ModelType.MODEL_GROUP,
      controlType: ControlType.CONTROL_STEPPER,
      disabled: true,
      options: {steps: 3}
    });
    testControlGroup.push({
      id: 'stepperPrev',
      modelType: ModelType.MODEL_NULL,
      controlType: ControlType.CONTROL_BUTTON,
      action: 'stepperPrev',
      disabled: true
    });
    testControlGroup.push({
      id: 'stepperNext',
      modelType: ModelType.MODEL_NULL,
      controlType: ControlType.CONTROL_BUTTON,
      action: 'stepperNext',
      disabled: true
    });

    model = service.createFormModel(testConfig, mainExampleFormLanguages.en);
    expect(model instanceof FormModel).toBe(true, 'model is not defined');
    container.model = model;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  // --------------------------------------------------------------------------------------------------
  // ACTIONS
  // --------------------------------------------------------------------------------------------------
  it('submit/reset should be disabled on invalid/pristine form', () => {
    expect(form.uiProperties).toEqual({});

    // empty form should be invalid, because some fields are required
    expect(form.valid).toBe(false, 'empty form is valid');
    expect(form.pristine).toBe(true, 'new empty form is not pristine');
    expect(form.touched).toBe(false, 'new empty form is touched');
    expect(form.status).toBe('INVALID', `empty form has status ${form.status}`);

    let resetComp = findComponentById('reset');
    let submitComp = findComponentById('submit');
    let clearComp = findComponentById('clear');
    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');
    let clearEl = findDebugElementById('clear');

    // reset should be disabled on pristine form
    expect(resetComp.model.ngControl.disabled).toBeTruthy('reset button not disabled on pristine form');
    spyOn(container, 'onReset');
    clickElement(resetEl);
    expect(container.onReset).toHaveBeenCalledTimes(0);

    // submit should be disabled on invalid form
    expect(submitComp.model.ngControl.disabled).toBeTruthy('submit button not disabled on invalid form');
    spyOn(container, 'onSubmit');
    clickElement(submitEl);
    expect(container.onSubmit).toHaveBeenCalledTimes(0);

    // clear should be enabled
    expect(clearComp.model.ngControl.disabled).toBeFalsy('clear button is not enabled');
    clickElement(clearEl);
    expect(cleanValue(form.value)).toEqual({address: {}, contacts: []}, '1st cleared value is not empty');
    expect(form.valid).toBe(false, 'cleared form is valid');
    expect(form.pristine).toBe(true, 'empty form should not be touched after clear');
    form.clearValue();
    expect(cleanValue(form.value)).toEqual({address: {}, contacts: []}, '2nd cleared value is not empty');

  });

  // --------------------------------------------------------------------------------------------------
  it('submit/reset should be enabled/disabled on valid and pristine form', () => {
    // initialized form should be valid
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');
    expect(form.pristine).toBe(true, 'initialized form is not pristine');
    expect(form.touched).toBe(false, 'initialized form is touched');
    expect(form.status).toBe('VALID', `initialized form has status ${form.status}`);

    let resetComp = findComponentById('reset');
    let submitComp = findComponentById('submit');
    let clearComp = findComponentById('clear');
    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');
    let clearEl = findDebugElementById('clear');

    // reset should be disabled on pristine form
    expect(resetComp.model.ngControl.disabled).toBeTruthy('reset button not disabled on pristine form');
    spyOn(container, 'onReset');
    clickElement(resetEl);
    expect(container.onReset).toHaveBeenCalledTimes(0);

    // submit should be enabled on valid form
    expect(submitComp.model.ngControl.disabled).toBeFalsy('submit button not enabled on valid form');
    spyOn(container, 'onSubmit');
    clickElement(submitEl);
    expect(container.onSubmit).toHaveBeenCalledTimes(1);

    // submitted value should be same as initial value
    expect(cleanValue(form.value)).toEqual(mainExampleFormModelData, 'submitted value is different to initial value');

    // clear should be enabled
    expect(clearComp.model.ngControl.disabled).toBeFalsy('clear button is not enabled');
    clickElement(clearEl);
    expect(cleanValue(form.value)).toEqual({address: {}, contacts: []}, '1st cleared value is not empty');
    expect(form.valid).toBe(false, 'cleared form is valid');
    // TODO: expect(form.pristine).toBe(true, 'initialized form should be touched after clear');

    form.clearValue();
    expect(cleanValue(form.value)).toEqual({address: {}, contacts: []}, '2nd cleared value is not empty');
  });

  // --------------------------------------------------------------------------------------------------
  it('submit should be enabled on valid form', () => {
    // initialized form should be valid and pristine
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');
    expect(form.pristine).toBe(true, 'initialized form is not pristine');
    expect(form.touched).toBe(false, 'initialized form is touched');
    expect(form.status).toBe('VALID', `initialized form has status ${form.status}`);

    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');
    let lastNameEl = findDebugElementById('lastName');

    // sending input, having minLength not reached
    setElementInput(lastNameEl, 'X');

    expect(form.model.group.pristine).toBe(false, 'form should be dirty after user input');
    expect(form.valid).toBe(false, 'dirty form is valid');

    // submit should be disabled on invalid form
    spyOn(container, 'onSubmit');
    clickElement(submitEl);
    expect(container.onSubmit).toHaveBeenCalledTimes(0);

    // reset should be enabled on dirty form
    spyOn(container, 'onReset');
    clickElement(resetEl);
    expect(container.onReset).toHaveBeenCalledTimes(1);
    expect(form.model.group.pristine).toBe(true, 'form should be pristine after reset');

    // resetting twice should not be possible
    clickElement(resetEl);
    expect(container.onReset).toHaveBeenCalledTimes(1);

    // form should be resetted to initial value and should be valid
    expect(form.valid).toBe(true, 'resetted form is not valid');

    // submit should be enabled because form should have been resetted to valid initial value
    clickElement(submitEl);
    expect(container.onSubmit).toHaveBeenCalledTimes(1);

    // submitted value should be same as initial value
    expect(cleanValue(form.value)).toEqual(mainExampleFormModelData, 'submitted value is different to initial value');
  });


  it('subscription to form.valueChanges and form.statusChanges', () => {
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');
    expect(form.status).toBe('VALID', `initialized form has status ${form.status}`);

    const values: any[] = [];
    const states: string[] = [];
    let subValue = form.valueChanges.subscribe(val => values.push(val));
    let subState = form.statusChanges.subscribe(state => states.push(state));

    let lastNameEl = findDebugElementById('lastName');
    setElementInput(lastNameEl, 'X');

    subValue.unsubscribe();
    subState.unsubscribe();

    expect(values.length).toBeGreaterThan(0, 'got no valueChange event');
    expect(states.length).toBeGreaterThan(0, 'got no statusChange event');

    expect(values[values.length - 1].lastName).toBe('X', 'got wrong input from valueChange event');
    expect(states[states.length - 1]).toBe('INVALID', 'got wrong state from valueChange event');
  });

  // --------------------------------------------------------------------------------------------------
  // ARRAY ACTIONS
  // --------------------------------------------------------------------------------------------------
  it('delete array item', () => {
    form.initValue(mainExampleFormModelData);

    let contactsComp = findComponentById('contacts');
    let contactsModel: ArrayModel;

    if (contactsComp.model instanceof ArrayModel) {
      contactsModel = contactsComp.model;
    } else {
      throw new Error(`resolved contacts component model is not an array model`);
    }

    expect(contactsModel.items.length).toBe(1, 'contacts array has not been initialized properly');

    let contactsTypeEl = findDebugElementById('contacts-0-contactType');

    contactsTypeEl.triggerEventHandler('focus', null);
    expect(contactsModel.selectedIndex).toBe(0, 'current index has not been set by focus on contactType field');

    let contactsDeleteComp = findComponentById('contacts-HEADER-deleteContact');
    let contactsDeleteEl = findDebugElementById('contacts-HEADER-deleteContact');

    expect(contactsDeleteComp.model.ngControl.disabled).toBe(false, 'contact delete button not properly initialized');

    clickElement(contactsDeleteEl);
    expect(contactsModel.items.length).toBe(0, 'contacts array item has not been deleted');

    expect(contactsDeleteComp.model.ngControl.disabled)
        .toBe(true, 'contact delete button has not been disabled after deleting all items');
  });


  // --------------------------------------------------------------------------------------------------
  it('add array item', () => {
    form.initValue(mainExampleFormModelData);

    let contactsComp = findComponentById('contacts');
    let contactsModel: ArrayModel;

    if (contactsComp.model instanceof ArrayModel) {
      contactsModel = contactsComp.model;
    } else {
      throw new Error(`resolved contacts component model is not an array model`);
    }

    expect(contactsModel.items.length).toBe(1, 'contacts array has not been initialized properly');

    let contacts0ValueEl = findDebugElementById('contacts-0-contactValue');
    let contact0Value = contacts0ValueEl.nativeElement.value;

    contacts0ValueEl.triggerEventHandler('focus', null);
    contacts0ValueEl.triggerEventHandler('blur', null);
    expect(contactsModel.selectedIndex).toBe(0, 'current index has not been set to the 1st item of the contact array');

    let contactsAddEl = findDebugElementById('contacts-HEADER-addContact');
    clickElement(contactsAddEl);

    expect(contactsModel.items.length).toBe(2, 'contacts array item has not been added');

    contacts0ValueEl = findDebugElementById('contacts-0-contactValue');
    expect(contacts0ValueEl.nativeElement.value)
        .toBe(contact0Value, 'got wrong contact value for old item after adding new item');

    let contacts1ValueEl = findDebugElementById('contacts-1-contactValue');
    expect(contacts1ValueEl.nativeElement.value).toBe('', 'got wrong contact value for new item');

    contacts1ValueEl.triggerEventHandler('focus', null);
    contacts1ValueEl.triggerEventHandler('blur', null);
    expect(contactsModel.selectedIndex).toBe(1, 'current index has not been set to the 2nd item of the contact array');

  });


  // --------------------------------------------------------------------------------------------------
  it('insert array item', () => {
    form.initValue(mainExampleFormModelData);

    let contactsComp = findComponentById('contacts');
    let contactsModel: ArrayModel;

    if (contactsComp.model instanceof ArrayModel) {
      contactsModel = contactsComp.model;
    } else {
      throw new Error(`resolved contacts component model is not an array model`);
    }

    expect(contactsModel.items.length).toBe(1, 'contacts array has not been initialized properly');

    let contacts0ValueEl = findDebugElementById('contacts-0-contactValue');
    let contactValue = contacts0ValueEl.nativeElement.value;

    contacts0ValueEl.triggerEventHandler('focus', null);
    contacts0ValueEl.triggerEventHandler('blur', null);
    expect(contactsModel.selectedIndex).toBe(0, 'current index has not been set by focus on contactValue field');

    let contactsInsertEl = findDebugElementById('contacts-HEADER-insertContact');
    clickElement(contactsInsertEl);

    expect(contactsModel.items.length).toBe(2, 'contacts array item has not been inserted');

    let contacts1ValueEl = findDebugElementById('contacts-1-contactValue');
    expect(contacts1ValueEl.nativeElement.value).toBe(contactValue, 'got wrong contact value after inserting item');

  });



  // --------------------------------------------------------------------------------------------------
  it('array-button actions without target array should be disabled', () => {
    form.initValue(mainExampleFormModelData);
    let contactsInsert2Comp = findComponentById('insertContact2');
    let contactsAddt2ElComp = findComponentById('addContact2');
    let contactsDelete2ElComp = findComponentById('deleteContact2');

    expect(contactsInsert2Comp.model.ngControl.disabled).toBeTruthy('button insertContact2 is enabled');
    expect(contactsAddt2ElComp.model.ngControl.disabled).toBeTruthy('button addContact2 is enabled');
    expect(contactsDelete2ElComp.model.ngControl.disabled).toBeTruthy('button deleteContact2 is enabled');

  });


  // --------------------------------------------------------------------------------------------------
  // APPLICATION DATA MODEL
  // --------------------------------------------------------------------------------------------------
  it('should init and submit mapped application model data', () => {
    // initialized form should be valid and pristine
    form.initValueFromAppModel(mainExampleAppModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');

    expect(cleanValue(form.value)).toEqual(cleanValue(form.valueFromAppModel(mainExampleAppModelData)));

    let submitEl = findDebugElementById('submit');
    clickElement(submitEl);

    // submitted value should be same as initial value
    // dirty hack to provide 'options' propert as empty object
    let cmpAppData = Object.assign(mainExampleAppModelData);
    if (!cmpAppData.options) {
      cmpAppData.options = {};
    }
    expect(cleanValue(form.valueToAppModel({}))).toEqual(cmpAppData, 'submitted value is different to initial value');
  });


  // --------------------------------------------------------------------------------------------------
  // RELATIONS
  // --------------------------------------------------------------------------------------------------
  it('should enable/disabled a field if related field has been checked/unchecked', () => {
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');

    let newsLetterComp = findComponentById('newsletter');
    let atcEl = findDebugElementById('atc');

    expect(newsLetterComp.model.ngControl.disabled)
        .toBe(true, 'newsletter component is not disabled on initialization');

    clickElementInput(atcEl);

    expect(newsLetterComp.model.ngControl.disabled)
        .toBe(false, 'newsletter component is not enabled after atc has been selected');

    clickElementInput(atcEl);

    expect(newsLetterComp.model.ngControl.disabled)
        .toBe(true, 'newsletter component is not disabled after atc has been deselected');

  });

  it('should show/hide a field if related field has been checked/unchecked', () => {
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');

    let newsLetterComp = findComponentById('newsletter2');
    let atcEl = findDebugElementById('atc');

    expect(newsLetterComp.model.hidden).toBe(true, 'newsletter2 component is not hidden on initialization');

    clickElementInput(atcEl);

    expect(newsLetterComp.model.hidden).toBe(false, 'newsletter2 component is not shown after atc has been selected');

    clickElementInput(atcEl);

    expect(newsLetterComp.model.hidden).toBe(true, 'newsletter2 component is not hidden after atc has been deselected');

  });

  it('should disable a field if related field is not undefined', () => {
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');

    let newsLetterComp = findComponentById('newsletter3');

    expect(newsLetterComp.model.ngControl.disabled).toBe(true, 'newsletter3 component is enabled on initialization');

  });


  // --------------------------------------------------------------------------------------------------
  // FOCUS CHANGES
  // --------------------------------------------------------------------------------------------------
  it('should listen to focus change events', () => {
    let lastNameComp = findComponentById('lastName');
    let lastNameEl = findDebugElementById('lastName');

    let hasFocus;
    lastNameComp.focusChanges.subscribe((v: boolean) => {
      hasFocus = v;
    });

    lastNameEl.triggerEventHandler('focus', null);
    expect(hasFocus).toBeTruthy('focus change not triggered the focus event');
    lastNameEl.triggerEventHandler('blur', null);
    expect(hasFocus).toBeFalsy('focus change not triggered the blur event');

    lastNameComp.focusChanges.unsubscribe();

  });

  // --------------------------------------------------------------------------------------------------
  // CLICK EVENTS
  // --------------------------------------------------------------------------------------------------
  it('should listen to click events', () => {
    let lastNameComp = findComponentById('lastName');
    let lastNameEl = findDebugElementById('lastName');

    let clicked = 0;
    lastNameComp.click.subscribe(() => {
      ++clicked;
    });

    clickElement(lastNameEl);
    clickElement(lastNameEl);
    clickElement(lastNameEl);
    expect(clicked).toBe(3, 'click event has not been triggered 3 times');

    lastNameComp.click.unsubscribe();
  });

  // --------------------------------------------------------------------------------------------------
  // VALIDATIONS
  // --------------------------------------------------------------------------------------------------
  it('requiredTrue-validator', () => {
    let testComp = findComponentById('testRequiredTrueValidator');
    let testEl = findDebugElementById('testRequiredTrueValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');

    setComponentValue(testComp, '');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid: '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, true);  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);

  });


  // --------------------------------------------------------------------------------------------------
  it('min-validator', () => {
    // min: 3
    let testComp = findComponentById('testMinValidator');
    let testEl = findDebugElementById('testMinValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
    '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, '1');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid: '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, '4');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);

  });

  // --------------------------------------------------------------------------------------------------
  it('max-validator', () => {
    // max: 3
    let testComp = findComponentById('testMaxValidator');
    let testEl = findDebugElementById('testMaxValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
    '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, '4');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid: '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, '3');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);

  });


  // --------------------------------------------------------------------------------------------------
  it('pattern-validator', () => {
    // pattern: '^isAPattern$'
    let testComp = findComponentById('testPatternValidator');
    let testEl = findDebugElementById('testPatternValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
      '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'isNotAPattern');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid: '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'isAPattern');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);

  });


  // --------------------------------------------------------------------------------------------------
  it('email-validator', () => {
    let testComp = findComponentById('testEmailValidator');
    let testEl = findDebugElementById('testEmailValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
        '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'github.com');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid:
     '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'www.gms@gmx.at');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);

  });

  // --------------------------------------------------------------------------------------------------
  it('sync test-validator', () => {
    // pattern: '^sync$'
    let testComp = findComponentById('testSyncValidator');
    let testEl = findDebugElementById('testSyncValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
          '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'no');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid:
           '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'sync');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);

  });

  // --------------------------------------------------------------------------------------------------
  it('async test-validator', () => {
    // pattern: '^async$'
    let testComp = findComponentById('testAsyncValidator');
    let testEl = findDebugElementById('testAsyncValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
            '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'no');  // component should not be valid

    expect(testComp.model.ngControl.valid).toBeFalsy(`dirty component is valid:
                   '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'async');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`fixed component is not valid: '${testComp.model.ngControl.value}'`);
  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured minLength-validator', () => {
    let testComp = findComponentById('testNullMinLengthValidator');
    let testEl = findDebugElementById('testNullMinLengthValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`enabled component is not valid: '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'a');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);
  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured maxLength-validator', () => {
    let testComp = findComponentById('testNullMaxLengthValidator');
    let testEl = findDebugElementById('testNullMaxLengthValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`enabled component is not valid: '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'a');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);
  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured min-validator', () => {
    let testComp = findComponentById('testNullMinValidator');
    let testEl = findDebugElementById('testNullMinValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
        '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, '1');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);

  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured max-validator', () => {
    let testComp = findComponentById('testNullMaxValidator');
    let testEl = findDebugElementById('testNullMaxValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
        '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, '6');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);

  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured patttern-validator', () => {
    let testComp = findComponentById('testNullPatternValidator');
    let testEl = findDebugElementById('testNullPatternValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
        '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'asdf');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);
  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured sync test-validator', () => {
    let testComp = findComponentById('testUndefinedSyncValidator');
    let testEl = findDebugElementById('testUndefinedSyncValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
        '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'asdf');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);
  });

  // --------------------------------------------------------------------------------------------------
  it('unconfigured async test-validator', () => {
    let testComp = findComponentById('testUndefinedAsyncValidator');
    let testEl = findDebugElementById('testUndefinedAsyncValidator');
    form.initValue(mainExampleFormModelData);

    testComp.model.ngControl.enable();
    fixture.detectChanges();
    expect(testComp.model.ngControl.disabled).toBeFalsy('element is not enabled');
    expect(testComp.model.ngControl.errors).toBeFalsy(`enabled component is not valid:
        '${testComp.model.ngControl.value}'`);

    setComponentValue(testComp, 'asdf');  // component should be valid

    expect(testComp.model.ngControl.errors)
        .toBeFalsy(`dirty component is not valid: '${testComp.model.ngControl.value}'`);
  });


  // --------------------------------------------------------------------------------------------------
  it('stepper actions', () => {
    let stepperPrevComp = findComponentById('stepperPrev');
    let stepperNextComp = findComponentById('stepperNext');
    stepperPrevComp.model.ngControl.enable();
    stepperNextComp.model.ngControl.enable();

    let stepperComp = findComponentById('stepper');
    stepperComp.model.ngControl.enable();

    let stepperPrevEl = findDebugElementById('stepperPrev');
    let stepperNextEl = findDebugElementById('stepperNext');

    expect(form.stepper).toBeDefined('stepper is not defined');
    let stepper = form.stepper as Stepper;
    let index = 0;

    stepper.selectionChange().subscribe(idx => index = idx);

    expect(index).toBe(0, 'initial index is not 0');
    expect(stepperNextComp.model.ngControl.disabled).toBe(false, 'next not enabled on initial index 0');

    clickElement(stepperNextEl);
    expect(index).toBe(1, 'first click on next didn\'t work');
    clickElement(stepperNextEl);
    expect(index).toBe(2, 'second click on next didn\'t work');
    expect(stepperNextComp.model.ngControl.disabled).toBe(true, 'next not disabled on index 2');

    clickElement(stepperPrevEl);
    expect(index).toBe(1, 'first click on prev didn\'t work');
    clickElement(stepperPrevEl);
    expect(index).toBe(0, 'second click on prev didn\'t work');
    expect(stepperNextComp.model.ngControl.disabled).toBe(false, 'next not enabled on index 0');
    expect(stepperPrevComp.model.ngControl.disabled).toBe(true, 'prev not disabled on index 0');
    clickElement(stepperNextEl);
    expect(index).toBe(1, 'third click on next didn\'t work');
    expect(stepperPrevComp.model.ngControl.disabled).toBe(false, 'prev not enabled on index 1');

  });

  // --------------------------------------------------------------------------------------------------
  it('array set/patch value', () => {
    form.initValue(mainExampleFormModelData);

    let contactsComp = findComponentById('contacts');
    let contactsModel: ArrayModel;

    if (contactsComp.model instanceof ArrayModel) {
      contactsModel = contactsComp.model;
    } else {
      throw new Error(`resolved contacts component model is not an array model`);
      }
    let value = contactsComp.model.ngControl.value;
    contactsModel.patchValue([{'type': 'email', 'value': 'chuck@gmx.net'}]);
    expect(contactsComp.model.ngControl.value).toEqual([{'type': 'email', 'value': 'chuck@gmx.net'}]);

    contactsModel.patchValue([]);
    expect(contactsComp.model.ngControl.value).toEqual([{'type': 'email', 'value': 'chuck@gmx.net'}]);

    contactsModel.setValue(
        [{'type': 'email', 'value': 'chuck@norris.com'}, {'type': 'email', 'value': 'chuck@gmx.net'}]);
    expect(contactsComp.model.ngControl.value).toEqual([
      {'type': 'email', 'value': 'chuck@norris.com'}, {'type': 'email', 'value': 'chuck@gmx.net'}
    ]);

    contactsModel.setValue([{'type': 'email', 'value': 'chuck@norris.com'}]);
    expect(contactsComp.model.ngControl.value).toEqual([{'type': 'email', 'value': 'chuck@norris.com'}]);

  });


  // --------------------------------------------------------------------------------------------------
  it('basic i18n', () => {
    form.model.i18n = mainExampleFormLanguages.de;


    form.initValue(mainExampleFormModelData);

    const personModel = form.model.findControlByPath('person');
    expect(personModel).toBeUndefined('found model by path "person", but this should be a subset');

    const firstNameModel = form.model.findControlByPath('firstName');
    expect(firstNameModel).toBeDefined('model not found for "firstName"');
    expect(!firstNameModel || firstNameModel.local.label).toBe('Vorname');

    const salutationModel = form.model.findControlByPath('salutation');
    expect(!salutationModel || (salutationModel as any).local.valueOptions[0].label).toBe('Herr');

  });


});
