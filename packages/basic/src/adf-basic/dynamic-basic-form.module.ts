import {ControlType, DynamicFormModule, DynamicFormService} from '@angular-dynaform/core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {BasicArrayComponent} from './components/basic-array.component';
import {BasicButtonComponent} from './components/basic-button.component';
import {BasicCheckboxComponent} from './components/basic-checkbox.component';
import {BasicDivisionComponent} from './components/basic-division.component';
import {BasicErrorComponent} from './components/basic-error.component';
import {BasicFieldsetComponent} from './components/basic-fieldset.component';
import {BasicFormComponent} from './components/basic-form.component';
import {BasicInputComponent} from './components/basic-input.component';
import {BasicRadioGroupComponent} from './components/basic-radiogroup.component';
import {BasicSelectComponent} from './components/basic-select.component';
import {BasicSeparatorComponent} from './components/basic-separator.component';
import {BasicSliderComponent} from './components/basic-slider.component';
import {BasicSwitchComponent} from './components/basic-switch.component';
import {BasicTextareaComponent} from './components/basic-textarea.component';
import {BasicControlType} from './models/control-types.enum';

const moduleDeclarations: any[] = [
  BasicFormComponent, BasicErrorComponent, BasicArrayComponent, BasicDivisionComponent, BasicFieldsetComponent,
  BasicButtonComponent, BasicCheckboxComponent, BasicInputComponent, BasicRadioGroupComponent, BasicSelectComponent,
  BasicSeparatorComponent, BasicSliderComponent, BasicSwitchComponent, BasicTextareaComponent
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DynamicFormModule],
  declarations: [moduleDeclarations],
  entryComponents: [moduleDeclarations],
  exports: [moduleDeclarations]
})
export class DynamicBasicFormModule {
  constructor(private dynamicFormService: DynamicFormService) {
    this.dynamicFormService.setFormControlComponent(BasicFormComponent, true);
    this.dynamicFormService.setErrorComponent(BasicErrorComponent, true);

    // register default control components:
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_ARRAY, BasicArrayComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_FIELDSET, BasicFieldsetComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_DIVISION, BasicDivisionComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_BUTTON, BasicButtonComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SEPARATOR, BasicSeparatorComponent, true);

    this.dynamicFormService.setControlComponent(ControlType.CONTROL_CHECKBOX, BasicCheckboxComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_INPUT, BasicInputComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_RADIOGROUP, BasicRadioGroupComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SELECT, BasicSelectComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SLIDER, BasicSliderComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SWITCH, BasicSwitchComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_TEXTAREA, BasicTextareaComponent, true);


    // register basic control components:
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_ARRAY, BasicArrayComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_FIELDSET, BasicFieldsetComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_DIVISION, BasicDivisionComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_BUTTON, BasicButtonComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_SEPARATOR, BasicSeparatorComponent, true);

    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_CHECKBOX, BasicCheckboxComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_INPUT, BasicInputComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_RADIOGROUP, BasicRadioGroupComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_SELECT, BasicSelectComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_SLIDER, BasicSliderComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_SWITCH, BasicSwitchComponent, true);
    this.dynamicFormService.setControlComponent(BasicControlType.CONTROL_TEXTAREA, BasicTextareaComponent, true);
  }
}
