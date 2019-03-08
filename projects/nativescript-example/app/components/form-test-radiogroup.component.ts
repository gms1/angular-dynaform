import { DynamicFormService, FormBuilder, FormBuilderSubset } from '@angular-dynaform/core';
import { NativeScriptControlType } from '@angular-dynaform/nativescript';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test RadioGroup';
const FORM_ID = 'test-radiogroup';
const TEST_CONTROL_ID = 'test-radiogroup-control';
const TEST_CONTROL_LABEL = 'radiogroup';
// const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-radiogroup',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestRadioGroupComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: NativeScriptControlType.CONTROL_RADIOGROUP,
      options: {
        label: TEST_CONTROL_LABEL,
        valueOptions: [{ value: 'mr', label: 'Mr' }, { value: 'ms', label: 'Ms' }],
      },
    });
  }
}
