// tslint:disable no-null-keyword no-unbound-method no-unused-variable prefer-const
import {APP_BASE_HREF} from '@angular/common';
import {DebugElement} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {
  ArrayModel,
  DynamicForm,
  DynamicFormControl,
  DynamicFormModule,
  DynamicFormService,
  FormModel
} from '@angular-dynaform/core';
import {DynamicBasicFormModule} from './dynamic-basic-form.module';
import {TestFormContainerComponent} from './spec/test-form-container.component';
import {
  mainExampleConfig,
  mainExampleFormLanguages,
  mainExampleFormModelData,
  mainExampleAppModelData
} from './spec/test.config';

function cleanValue(value: any): any {
  return JSON.parse(JSON.stringify(value, (k, v) => (v === null) ? undefined : v, 2));
}

describe('basic-module test suite', () => {
  let fixture: ComponentFixture<TestFormContainerComponent>;
  let debugElement: DebugElement;
  let container: TestFormContainerComponent;
  let form: DynamicForm;
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


  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormModule.forRoot(), DynamicBasicFormModule],
      declarations: [TestFormContainerComponent],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
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
  it('submit/reset should be disabled on invalid/pristine form', () => {
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

});
