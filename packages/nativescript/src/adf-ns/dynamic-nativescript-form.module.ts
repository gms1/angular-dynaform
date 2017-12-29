import {ControlType, DynamicFormModule, DynamicFormService} from '@angular-dynaform/core';
import {CommonModule} from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {NativeScriptFormsModule} from 'nativescript-angular/forms';

import {TNSCheckBoxModule} from 'nativescript-checkbox/angular';

import {CustomCheckBox} from './components/custom-checkbox.component';
import {CustomListPicker} from './components/custom-listpicker.component';

import {DynamicNSDomElementDirective} from './directives/dynamic-ns-dom-element.directive';

import {NativeScriptArrayComponent} from './components/nativescript-array.component';
import {NativeScriptButtonComponent} from './components/nativescript-button.component';
import {NativeScriptCheckboxComponent} from './components/nativescript-checkbox.component';
import {NativeScriptDivisionComponent} from './components/nativescript-division.component';
import {NativeScriptErrorComponent} from './components/nativescript-error.component';
import {NativeScriptFieldsetComponent} from './components/nativescript-fieldset.component';
import {NativeScriptFormComponent} from './components/nativescript-form.component';
import {NativeScriptTextFieldComponent} from './components/nativescript-textfield.component';
import {NativeScriptRadioGroupComponent} from './components/nativescript-radiogroup.component';
import {NativeScriptListPickerComponent} from './components/nativescript-listpicker.component';
import {NativeScriptSeparatorComponent} from './components/nativescript-separator.component';
import {NativeScriptSliderComponent} from './components/nativescript-slider.component';

import {NativeScriptSwitchComponent} from './components/nativescript-switch.component';
import {NativeScriptTextViewComponent} from './components/nativescript-textview.component';
import {NativeScriptControlType} from './models';

const entryComponents: any[] = [
  NativeScriptFormComponent, NativeScriptErrorComponent, NativeScriptArrayComponent, NativeScriptDivisionComponent,
  NativeScriptFieldsetComponent, NativeScriptButtonComponent, NativeScriptCheckboxComponent,
  NativeScriptTextFieldComponent, NativeScriptRadioGroupComponent, NativeScriptListPickerComponent,
  NativeScriptSeparatorComponent, NativeScriptSliderComponent, NativeScriptSwitchComponent,
  NativeScriptTextViewComponent
];

const moduleDeclarations: any[] = [DynamicNSDomElementDirective, CustomCheckBox, CustomListPicker, entryComponents];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DynamicFormModule, NativeScriptFormsModule, TNSCheckBoxModule],
  declarations: [moduleDeclarations], entryComponents,
  exports: [DynamicFormModule, entryComponents],
  schemas: [NO_ERRORS_SCHEMA]  // TODO: is it possible to avoid the need for NO_ERRORS_SCHEMA?
})
export class DynamicNativeScriptFormModule {
  constructor(
      private dynamicFormService: DynamicFormService,
      @Optional() @SkipSelf() parentModule: DynamicNativeScriptFormModule) {
    if (parentModule) {
      return;
    }
    this.dynamicFormService.setFormControlComponent(NativeScriptFormComponent, true);
    this.dynamicFormService.setErrorComponent(NativeScriptErrorComponent, true);

    // register default control components:
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_ARRAY, NativeScriptArrayComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_FIELDSET, NativeScriptFieldsetComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_DIVISION, NativeScriptDivisionComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_BUTTON, NativeScriptButtonComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SEPARATOR, NativeScriptSeparatorComponent, true);

    this.dynamicFormService.setControlComponent(ControlType.CONTROL_CHECKBOX, NativeScriptCheckboxComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_INPUT, NativeScriptTextFieldComponent, true);
    this.dynamicFormService.setControlComponent(
        ControlType.CONTROL_RADIOGROUP, NativeScriptListPickerComponent,
        /* TODO: NativeScriptRadioGroupComponent, */ true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SELECT, NativeScriptListPickerComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SLIDER, NativeScriptSliderComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_SWITCH, NativeScriptSwitchComponent, true);
    this.dynamicFormService.setControlComponent(ControlType.CONTROL_TEXTAREA, NativeScriptTextViewComponent, true);


    // register nativescript control components:
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_ARRAY, NativeScriptArrayComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_FIELDSET, NativeScriptFieldsetComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_DIVISION, NativeScriptDivisionComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_BUTTON, NativeScriptButtonComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_SEPARATOR, NativeScriptSeparatorComponent, true);

    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_CHECKBOX, NativeScriptCheckboxComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_TEXTFIELD, NativeScriptTextFieldComponent, true);
    // TODO: this.dynamicFormService.setControlComponent(
    //    NativeScriptControlType.CONTROL_RADIOGROUP, NativeScriptRadioGroupComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_LISTPICKER, NativeScriptListPickerComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_SLIDER, NativeScriptSliderComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_SWITCH, NativeScriptSwitchComponent, true);
    this.dynamicFormService.setControlComponent(
        NativeScriptControlType.CONTROL_TEXTVIEW, NativeScriptTextViewComponent, true);
  }
}
