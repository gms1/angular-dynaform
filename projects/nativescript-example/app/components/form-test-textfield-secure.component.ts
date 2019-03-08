import {
  ControlType,
  DynamicFormService,
  FormBuilder,
  FormBuilderSubset,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test TextField Secure';
const FORM_ID = 'test-textfield-secure';
const TEST_CONTROL_ID = 'test-textfield-secure-control';
const TEST_CONTROL_LABEL = 'textfield-secure';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-textfield-secure',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestTextFieldSecureComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: ControlType.CONTROL_INPUT,
      options: {
        label: TEST_CONTROL_LABEL,
        placeholder: TEST_CONTROL_PLACEHOLDER,
        inputType: 'password',
      },
    });
  }
}
