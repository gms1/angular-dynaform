import {
  ControlType,
  DynamicFormService,
  FormBuilder,
  FormBuilderSubset,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';
import { FormTestBaseComponent } from './form-test-base.component';

const TITLE = 'Test Slider';
const FORM_ID = 'test-slider';
const TEST_CONTROL_ID = 'test-slider-control';
const TEST_CONTROL_LABEL = 'slider';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({
  selector: 'adf-form-test-slider',
  moduleId: module.id,
  templateUrl: './form-test-base.component.html',
})
export class FormTestSliderComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, { id: FORM_ID, updateOn: 'change' });
  }

  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: ControlType.CONTROL_SLIDER,
      options: {
        label: TEST_CONTROL_LABEL,
        placeholder: TEST_CONTROL_PLACEHOLDER,
        min: 0,
        max: 100,
        step: 2,
      },
    });
  }
}
