import {ControlType, DynamicFormModule, DynamicFormService} from '@angular-dynaform/core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatStepperModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialArrayComponent} from './components/material-array.component';
import {MaterialButtonComponent} from './components/material-button.component';
import {MaterialCheckboxComponent} from './components/material-checkbox.component';
import {MaterialDatepickerComponent} from './components/material-datepicker.component';
import {MaterialDivisionComponent} from './components/material-division.component';
import {MaterialErrorComponent} from './components/material-error.component';
import {MaterialFieldsetComponent} from './components/material-fieldset.component';
import {MaterialFormComponent} from './components/material-form.component';
import {MaterialInputComponent} from './components/material-input.component';
import {MaterialRadioGroupComponent} from './components/material-radiogroup.component';
import {MaterialSelectComponent} from './components/material-select.component';
import {MaterialSeparatorComponent} from './components/material-separator.component';
import {MaterialSliderComponent} from './components/material-slider.component';
import {MaterialStepperComponent} from './components/material-stepper.component';
import {MaterialSwitchComponent} from './components/material-switch.component';
import {MaterialTabGroupComponent} from './components/material-tabgroup.component';
import {MaterialTextareaComponent} from './components/material-textarea.component';
import {MaterialControlType} from './models';

const moduleDeclarations: any[] = [
  MaterialFormComponent, MaterialErrorComponent, MaterialArrayComponent, MaterialDivisionComponent,
  MaterialFieldsetComponent, MaterialButtonComponent, MaterialCheckboxComponent, MaterialInputComponent,
  MaterialRadioGroupComponent, MaterialSelectComponent, MaterialSeparatorComponent, MaterialSliderComponent,
  MaterialSwitchComponent, MaterialTextareaComponent, MaterialDatepickerComponent, MaterialTabGroupComponent,
  MaterialStepperComponent
];

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, DynamicFormModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatNativeDateModule,
    MatDatepickerModule, MatTabsModule, MatStepperModule
  ],
  declarations: [moduleDeclarations],
  entryComponents: [moduleDeclarations],
  exports: [moduleDeclarations]
})
export class DynamicMaterialFormModule {
  constructor(private dynamicFormService: DynamicFormService) {
    this.dynamicFormService.setFormControlComponent(MaterialFormComponent, true);
    this.dynamicFormService.setErrorComponent(MaterialErrorComponent, true);

    // register default control components:
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_ARRAY, MaterialArrayComponent, true);

    this.dynamicFormService.setControlComponent(ControlType.CONTROL_FIELDSET, MaterialFieldsetComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_DIVISION, MaterialDivisionComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_TABGROUP, MaterialTabGroupComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_STEPPER, MaterialStepperComponent, true);

    this.dynamicFormService.setControlComponent(ControlType.CONTROL_BUTTON, MaterialButtonComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SEPARATOR, MaterialSeparatorComponent, true);

    this.dynamicFormService.setControlComponent(ControlType.CONTROL_CHECKBOX, MaterialCheckboxComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_DATEPICKER, MaterialDatepickerComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_INPUT, MaterialInputComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_RADIOGROUP, MaterialRadioGroupComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SELECT, MaterialSelectComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SLIDER, MaterialSliderComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SWITCH, MaterialSwitchComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_TEXTAREA, MaterialTextareaComponent, true);


    // register material control components:
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_ARRAY, MaterialArrayComponent, true);

    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_FIELDSET, MaterialFieldsetComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_DIVISION, MaterialDivisionComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_TABGROUP, MaterialTabGroupComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_STEPPER, MaterialStepperComponent, true);

    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_BUTTON, MaterialButtonComponent, true);
    this.dynamicFormService.setControlComponent(
        MaterialControlType.CONTROL_SEPARATOR, MaterialSeparatorComponent, true);

    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_CHECKBOX, MaterialCheckboxComponent, true);
    this.dynamicFormService.setControlComponent(
        MaterialControlType.CONTROL_DATEPICKER, MaterialDatepickerComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_INPUT, MaterialInputComponent, true);
    this.dynamicFormService.setControlComponent(
        MaterialControlType.CONTROL_RADIOGROUP, MaterialRadioGroupComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_SELECT, MaterialSelectComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_SLIDER, MaterialSliderComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_SWITCH, MaterialSwitchComponent, true);
    this.dynamicFormService.setControlComponent(MaterialControlType.CONTROL_TEXTAREA, MaterialTextareaComponent, true);
  }
}
