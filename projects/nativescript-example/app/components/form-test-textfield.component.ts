import {
  ControlType,
  DynamicFormService,
  FormBuilder,
  FormBuilderSubset,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test TextField';
const FORM_ID = 'test-textfield';
const TEST_CONTROL_ID = 'test-textfield-control';
const TEST_CONTROL_LABEL = 'textfield';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-textfield',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestTextFieldComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: ControlType.CONTROL_INPUT,
      updateOn: 'blur',
      options: { label: TEST_CONTROL_LABEL, placeholder: TEST_CONTROL_PLACEHOLDER, maxLength: 30 },
    });
  }
}
