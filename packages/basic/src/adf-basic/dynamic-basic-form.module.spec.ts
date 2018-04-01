// tslint:disable no-null-keyword no-unbound-method
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
import {DynamicBasicFormModule} from './public_api';
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

describe('test suite', () => {
  let fixture: ComponentFixture<TestFormContainerComponent>;
  let debugElement: DebugElement;
  let container: TestFormContainerComponent;
  let form: DynamicForm;
  let service: DynamicFormService;
  let model: FormModel;

  function findDebugElementById(id: string): DebugElement {
    let res = debugElement.query(By.css(`#${id}`));
    expect(res instanceof DebugElement).toBe(true, `element with id "${id}" not found`);
    return res;
    }

  function findComponentById(id: string): DynamicFormControl {
    let res = form.findComponentById(id);
    if (!res) {
      throw new Error(`component with id "${id}" not found`);
      }
    return res;
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
  it('submit should be disabled on invalid (empty) form', () => {
    // empty form should be invalid, because some fields are required
    expect(form.valid).toBe(false, 'form is valid but should not');

    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');

    // reset should be disabled on pristine form
    spyOn(container, 'onReset');
    resetEl.nativeElement.click();
    expect(container.onReset).toHaveBeenCalledTimes(0);

    // submit should be disabled on invalid form
    spyOn(container, 'onSubmit');
    submitEl.nativeElement.click();
    expect(container.onSubmit).toHaveBeenCalledTimes(0);
  });

  // --------------------------------------------------------------------------------------------------
  it('submit should be enabled on valid (properly initialized) form', () => {
    // initialized form should be valid
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'form is not valid but should be');

    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');

    // reset should be disabled on pristine form
    spyOn(container, 'onReset');
    resetEl.nativeElement.click();
    expect(container.onReset).toHaveBeenCalledTimes(0);

    // submit should be enabled on valid form
    spyOn(container, 'onSubmit');
    submitEl.nativeElement.click();
    expect(container.onSubmit).toHaveBeenCalledTimes(1);

    // submitted value should be same as initial value
    expect(cleanValue(form.value)).toEqual(mainExampleFormModelData, 'submitted value is different to initial value');
  });

  // --------------------------------------------------------------------------------------------------
  it('submit should be enabled on valid (properly initialized) form', () => {
    // initialized form should be valid and pristine
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'form is not valid but should be');
    expect(form.model.group.pristine).toBe(true, 'newly initialized form should be pristine');

    let resetEl = findDebugElementById('reset');
    let submitEl = findDebugElementById('submit');
    let lastNameEl = findDebugElementById('lastName');

    // sending input, having minLength not reached
    lastNameEl.nativeElement.value = 'X';
    lastNameEl.nativeElement.dispatchEvent(new Event('input'));
    lastNameEl.triggerEventHandler('blur', null);
    expect(form.model.group.pristine).toBe(false, 'form should be dirty after user input');
    expect(form.valid).toBe(false, 'dirty form is valid but should not');

    // submit should be disabled on invalid form
    spyOn(container, 'onSubmit');
    submitEl.nativeElement.click();
    expect(container.onSubmit).toHaveBeenCalledTimes(0);

    // reset should be enabled on dirty form
    spyOn(container, 'onReset');
    resetEl.nativeElement.click();
    expect(container.onReset).toHaveBeenCalledTimes(1);
    expect(form.model.group.pristine).toBe(true, 'form should be pristine after reset');

    // resetting twice should not be possible
    resetEl.nativeElement.click();
    expect(container.onReset).toHaveBeenCalledTimes(1);

    // form should be resetted to initial value and should be valid
    expect(form.valid).toBe(true, 'form is not valid but should be');

    // submit should be enabled because form should have been resetted to valid initial value
    submitEl.nativeElement.click();
    expect(container.onSubmit).toHaveBeenCalledTimes(1);

    // submitted value should be same as initial value
    expect(cleanValue(form.value)).toEqual(mainExampleFormModelData, 'submitted value is different to initial value');
  });

  // --------------------------------------------------------------------------------------------------
  it('should init and submit mapped application model data', () => {
    // initialized form should be valid and pristine
    form.initValueFromAppModel(mainExampleAppModelData);
    expect(form.valid).toBe(true, 'form is not valid but should be');

    let submitEl = findDebugElementById('submit');
    submitEl.nativeElement.click();

    // submitted value should be same as initial value
    // dirty hack to provide 'options' propert as empty object
    let cmpAppData = Object.assign(mainExampleAppModelData);
    if (!cmpAppData.options) {
      cmpAppData.options = {};
    }
    expect(cleanValue(form.valueToAppModel({}))).toEqual(cmpAppData, 'submitted value is different to initial value');
  });


  // --------------------------------------------------------------------------------------------------
  it('should enable a field if related field has been checked', () => {
    form.initValue(mainExampleFormModelData);
    expect(form.valid).toBe(true, 'form is not valid but should be');

    let newsLetterComp = findComponentById('newsletter');

    expect(newsLetterComp.model.ngControl.disabled)
        .toBe(true, 'newsletter component is not disabled on initialization');

    let atcEl = findDebugElementById('atc');
    let newsLetterEl = findDebugElementById('newsletter');

    expect(newsLetterEl.nativeElement.getAttribute('disabled') === null)
        .toBeFalsy('newsletter field is not disabled on initialization');

    atcEl.nativeElement.click();

    expect(newsLetterEl.nativeElement.getAttribute('disabled'))
        .toBeNull('newsletter field is not enabled after atc has been selected');

    expect(newsLetterComp.model.ngControl.disabled)
        .toBe(false, 'newsletter component is not enabled after atc has been selected');
  });

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
  it('should listen to click events', () => {
    let lastNameComp = findComponentById('lastName');
    let lastNameEl = findDebugElementById('lastName');

    let clicked = 0;
    lastNameComp.click.subscribe(() => {
      ++clicked;
    });

    lastNameEl.nativeElement.click();
    lastNameEl.nativeElement.click();
    lastNameEl.nativeElement.click();
    expect(clicked).toBe(3, 'click event has not been triggered 3 times');

    lastNameComp.click.unsubscribe();
  });

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

    let contactsDeleteEl = findDebugElementById('contacts-HEADER-deleteContact');
    contactsDeleteEl.nativeElement.click();
    expect(contactsModel.items.length).toBe(0, 'contacts array item has not been deleted');

    expect(contactsDeleteEl.nativeElement.getAttribute('disabled'))
        .toBe('', 'contact delete button has not been disabled after deleting all items');
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
    contactsAddEl.nativeElement.click();

    fixture.detectChanges();

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
    contactsInsertEl.nativeElement.click();

    fixture.detectChanges();

    expect(contactsModel.items.length).toBe(2, 'contacts array item has not been inserted');

    let contacts1ValueEl = findDebugElementById('contacts-1-contactValue');
    expect(contacts1ValueEl.nativeElement.value).toBe(contactValue, 'got wrong contact value after inserting item');

  });


});
