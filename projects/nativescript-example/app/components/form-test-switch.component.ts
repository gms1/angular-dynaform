import {
  ControlType,
  DynamicFormService,
  FormBuilder,
  FormBuilderSubset,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test Switch';
const FORM_ID = 'test-switch';
const TEST_CONTROL_ID = 'test-switch-control';
const TEST_CONTROL_LABEL = 'switch';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-switch',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestSwitchComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: ControlType.CONTROL_SWITCH,
      options: { label: TEST_CONTROL_LABEL, placeholder: TEST_CONTROL_PLACEHOLDER },
    });
  }
}
