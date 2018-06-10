import {DynamicFormService, FormBuilder, FormBuilderSubset} from '@angular-dynaform/core';
import {NativeScriptControlType} from '@angular-dynaform/nativescript';
import {Component} from '@angular/core';
import {FormTestBaseComponent} from './form-test-base.component';

const TITLE = 'Test CheckBox';
const FORM_ID = 'test-checkbox';
const TEST_CONTROL_ID = 'test-checkbox-control';
const TEST_CONTROL_LABEL = 'checkbox';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({selector: 'adf-form-test-checkbox', moduleId: module.id, templateUrl: './form-test-base.component.html'})
export class FormTestCheckBoxComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, {id: FORM_ID, updateOn: 'change'});
  }


  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: NativeScriptControlType.CONTROL_CHECKBOX,
      options: {label: TEST_CONTROL_LABEL}
    });
  }
}
