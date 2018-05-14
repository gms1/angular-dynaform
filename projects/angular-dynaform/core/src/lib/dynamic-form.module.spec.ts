// tslint:disable no-null-keyword no-unbound-method no-unused-variable prefer-const
import {APP_BASE_HREF} from '@angular/common';
import {DebugElement} from '@angular/core';
import {fakeAsync, TestBed, tick, ComponentFixture} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {
  ArrayModel,
  ControlType,
  DynamicForm,
  DynamicFormControl,
  DynamicFormModule,
  DynamicFormService,
  FormModel,
  ModelType
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

function cleanValue(value: any): any {
  return JSON.parse(JSON.stringify(value, (k, v) => (v === null) ? undefined : v, 2));
}

describe('test suite', () => {
  let fixture: ComponentFixture<TestFormContainerComponent>;
  let debugElement: DebugElement;
  let container: TestFormContainerComponent;
  let form: DynamicForm;
  let service: DynamicFormService;
  let model: FormModel;

  function findComponentById(id: string): DynamicFormControl {
    let res = form.findComponentById(id);
    if (!res) {
      throw new Error(`component with id "${id}" not found`);
      }
    return res;
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
    TestSeparatorComponent, TestSliderComponent, TestSwitchComponent, TestTextareaComponent
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
    form = container.form;
    expect(form instanceof DynamicForm).toBe(true, 'form is not defined');

    // add controls for validation testing:
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testRequiredTrueValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['requiredTrue'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testNullMinLengthValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['minLength'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testNullMaxLengthValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['maxLength'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testMinValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {min: 3},
      validators: ['min'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testNullMinValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['min'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testMaxValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {max: 3},
      validators: ['max'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testNullMaxValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['max'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testPatternValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {pattern: '^isAPattern$'},
      validators: ['pattern'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testNullPatternValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['pattern'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testEmailValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['email'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testSyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {pattern: '^sync$'},
      validators: ['testSyncValidator'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testAsyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      options: {pattern: '^async$'},
      asyncValidators: ['testAsyncValidator'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testUndefinedSyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      validators: ['testUndefinedSyncValidator'],
      disabled: true
    });
    (mainExampleConfig as any).options.group[0].options.group.push({
      id: 'testUndefinedAsyncValidator',
      modelType: ModelType.MODEL_VALUE,
      controlType: ControlType.CONTROL_INPUT,
      asyncValidators: ['testUndefinedAsyncValidator'],
      disabled: true
    });
    model = service.createFormModel(mainExampleConfig, mainExampleFormLanguages.en);
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
  it('submit should be disabled on invalid (empty) form', () => {
    // empty form should be invalid, because some fields are required
    expect(form.valid).toBe(false, 'empty form is valid');

    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');

    // reset should be disabled on pristine form
    spyOn(container, 'onReset');
    clickElement(resetEl);
    expect(container.onReset).toHaveBeenCalledTimes(0);

    // submit should be disabled on invalid form
    spyOn(container, 'onSubmit');
    clickElement(submitEl);
    expect(container.onSubmit).toHaveBeenCalledTimes(0);
  });

  // --------------------------------------------------------------------------------------------------
  it('submit should be enabled on valid (properly initialized) form', () => {
    // initialized form should be valid
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');

    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');

    // reset should be disabled on pristine form
    spyOn(container, 'onReset');
    clickElement(resetEl);
    expect(container.onReset).toHaveBeenCalledTimes(0);

    // submit should be enabled on valid form
    spyOn(container, 'onSubmit');
    clickElement(submitEl);
    expect(container.onSubmit).toHaveBeenCalledTimes(1);

    // submitted value should be same as initial value
    expect(cleanValue(form.value)).toEqual(mainExampleFormModelData, 'submitted value is different to initial value');
  });

  // --------------------------------------------------------------------------------------------------
  it('submit should be enabled on valid (properly initialized) form', () => {
    // initialized form should be valid and pristine
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');
    expect(form.model.group.pristine).toBe(true, 'newly initialized form should be pristine');

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

  // --------------------------------------------------------------------------------------------------
  // ARRAY ACTIONS
  // --------------------------------------------------------------------------------------------------
  it('should be able to delete array item', () => {
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
  it('should be able to add array item', () => {
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
    expect(contactsModel.selectedIndex).toBe(0, 'current index has not been set by focus on contactType field');

    let contactsAddEl = findDebugElementById('contacts-HEADER-addContact');
    clickElement(contactsAddEl);

    expect(contactsModel.items.length).toBe(2, 'contacts array item has not been added');

    contacts0ValueEl = findDebugElementById('contacts-0-contactValue');
    expect(contacts0ValueEl.nativeElement.value)
        .toBe(contactValue, 'got wrong contact value for old item after adding new item');

    let contacts1ValueEl = findDebugElementById('contacts-1-contactValue');
    expect(contacts1ValueEl.nativeElement.value).toBe('', 'got wrong contact value for new item');

  });


  // --------------------------------------------------------------------------------------------------
  it('should be able to insert array item', () => {
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
  // APPLICATION DATA MODEL
  // --------------------------------------------------------------------------------------------------
  it('should init and submit mapped application model data', () => {
    // initialized form should be valid and pristine
    form.initValueFromAppModel(mainExampleAppModelData);
    expect(form.valid).toBe(true, 'initialized form is not valid');

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
  it('requiredTrue-validator should work', () => {
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


  it('min-validator should work', () => {
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

  it('max-validator should work', () => {
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


  it('pattern-validator should work', () => {
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


  it('email-validator should work', () => {
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

  it('sync test-validator should work', () => {
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

  it('async test-validator should work', () => {
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

  it('unconfigured minLength-validator should work', () => {
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

  it('unconfigured maxLength-validator should work', () => {
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

  it('unconfigured min-validator should work', () => {
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

  it('unconfigured max-validator should work', () => {
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

  it('unconfigured patttern-validator should work', () => {
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

  it('unconfigured sync test-validator should work', () => {
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

  it('unconfigured async test-validator should work', () => {
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



});
