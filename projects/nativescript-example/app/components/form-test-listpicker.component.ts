import {DynamicFormService, FormBuilder, FormBuilderSubset} from '@angular-dynaform/core';
import {NativeScriptControlType} from '@angular-dynaform/nativescript';
import {Component} from '@angular/core';
import {FormTestBaseComponent} from './form-test-base.component';

const TITLE = 'Test ListPicker';
const FORM_ID = 'test-listpicker';
const TEST_CONTROL_ID = 'test-listpicker-control';
const TEST_CONTROL_LABEL = 'listpicker';
const TEST_CONTROL_PLACEHOLDER = 'placeholder';

@Component({selector: 'adf-form-test-listpicker', moduleId: module.id, templateUrl: './form-test-base.component.html'})
export class FormTestListPickerComponent extends FormTestBaseComponent {
  constructor(dynamicFormService: DynamicFormService, formBuilder: FormBuilder) {
    super(dynamicFormService, formBuilder, TITLE, {id: FORM_ID, updateOn: 'change'});
  }


  addControl(fieldsdiv: FormBuilderSubset): void {
    fieldsdiv.group.addControl({
      id: TEST_CONTROL_ID,
      controlType: NativeScriptControlType.CONTROL_LISTPICKER,
      options: {
        label: TEST_CONTROL_LABEL,
        placeholder: TEST_CONTROL_PLACEHOLDER,
        valueOptions: [{value: 'mr', label: 'Mr'}, {value: 'ms', label: 'Ms'}]
      }
    });
  }
}
