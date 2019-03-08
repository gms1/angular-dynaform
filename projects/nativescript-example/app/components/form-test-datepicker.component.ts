import { DynamicFormService, FormBuilder, FormBuilderSubset } from '@angular-dynaform/core';
import { NativeScriptControlType } from '@angular-dynaform/nativescript';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test DatePicker';
const FORM_ID = 'test-datepicker';
const TEST_CONTROL_ID = 'test-datepicker-control';
const TEST_CONTROL_LABEL = 'datepicker';
// const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-datepicker',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestDatePickerComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: NativeScriptControlType.CONTROL_DATEPICKER,
      options: { label: TEST_CONTROL_LABEL },
    });
  }
}
