import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


import {
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from './components/dynamic-form-control.component';
import {DynamicFormErrorContainerComponent} from './components/dynamic-form-error-container.component';
import {DynamicFormErrorComponent} from './components/dynamic-form-error.component';
import {DynamicFormFormControlComponent} from './components/dynamic-form-form-control.component';
import {DynamicFormComponent} from './components/dynamic-form.component';

import {DynamicFormControlComponentDirective} from './directives/dynamic-form-control-component.directive';
import {DynamicFormDomElementDirective} from './directives/dynamic-form-dom-element.directive';
import {DynamicFormHTMLDomElementDirective} from './directives/dynamic-form-html-dom-element.directive';
import {DynamicFormErrorComponentDirective} from './directives/dynamic-form-error-component.directive';
import {DynamicFormFormControlComponentDirective} from './directives/dynamic-form-form-control-component.directive';

import {DynamicFormComponentFactoryService} from './services/dynamic-form-component-factory.service';
import {DynamicFormModelFactoryService} from './services/dynamic-form-model-factory.service';
import {DynamicFormService} from './services/dynamic-form.service';

import {
  ArrayButtonAddAction,
  ArrayButtonDeleteAction,
  ArrayButtonInsertAction,
  SubmitButtonAction,
  ResetButtonAction,
  ClearButtonAction,
  StepperButtonPrevAction,
  StepperButtonNextAction
} from './actions';


import {FormBuilder} from './form-builder/form-builder.service';


const dynamicFormExportDirectives = [
  DynamicFormHTMLDomElementDirective, DynamicFormControlComponentDirective, DynamicFormFormControlComponentDirective,
  DynamicFormErrorComponentDirective, DynamicFormDomElementDirective
];

const dynamicFormDirectives = [dynamicFormExportDirectives];

const dynamicFormEntryComponents =
    [DynamicFormControlComponentBase, DynamicFormFormControlComponent, DynamicFormErrorComponent];

const dynamicFormExportComponents =
    [DynamicFormComponent, DynamicFormControlComponent, DynamicFormErrorContainerComponent];

const dynamicFormComponents = [dynamicFormEntryComponents, dynamicFormExportComponents];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [dynamicFormDirectives, dynamicFormComponents],
  entryComponents: dynamicFormEntryComponents,
  exports: [dynamicFormExportDirectives, dynamicFormExportComponents],
  providers: [DynamicFormComponentFactoryService, DynamicFormModelFactoryService, FormBuilder]
})
export class DynamicFormModule {
  constructor(private dynamicFormService: DynamicFormService, @Optional() @SkipSelf() parentModule: DynamicFormModule) {
    if (parentModule) {
      console.warn('DynamicFormModule is already loaded. Import it in the AppModule');
      return;
    }
    this.dynamicFormService.actionTypes.setType('submit', SubmitButtonAction);
    this.dynamicFormService.actionTypes.setType('reset', ResetButtonAction);
    this.dynamicFormService.actionTypes.setType('clear', ClearButtonAction);
    this.dynamicFormService.actionTypes.setType('arrayAddItem', ArrayButtonAddAction);
    this.dynamicFormService.actionTypes.setType('arrayInsertItem', ArrayButtonInsertAction);
    this.dynamicFormService.actionTypes.setType('arrayDeleteItem', ArrayButtonDeleteAction);
    this.dynamicFormService.actionTypes.setType('stepperPrev', StepperButtonPrevAction);
    this.dynamicFormService.actionTypes.setType('stepperNext', StepperButtonNextAction);
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicFormModule,
      providers: [
        // our singleton service:
        DynamicFormService
      ]
    };
  }
}
