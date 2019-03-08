import {
  ControlType,
  DynamicFormService,
  FormBuilder,
  FormBuilderSubset,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test TextView';
const FORM_ID = 'test-textview';
const TEST_CONTROL_ID = 'test-textview-control';
const TEST_CONTROL_LABEL = 'textview';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-textview',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestTextViewComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: ControlType.CONTROL_TEXTAREA,
      options: {
        label: TEST_CONTROL_LABEL,
        placeholder: TEST_CONTROL_PLACEHOLDER,
        cols: 20,
        rows: 5,
        wrap: true,
      },
    });
  }
}
