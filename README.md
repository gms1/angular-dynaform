# angular-dynaform

[![npm (scoped)](https://img.shields.io/npm/v/@angular-dynaform/core.svg?colorB=007ec6)](https://www.npmjs.com/package/%40angular-dynaform%2Fcore)
[![Known Vulnerabilities](https://snyk.io/test/github/gms1/angular-dynaform/badge.svg)](https://snyk.io/test/github/gms1/angular-dynaform)
[![Build Status](https://api.travis-ci.org/gms1/angular-dynaform.svg?branch=master)](https://travis-ci.org/gms1/angular-dynaform)
[![Coverage Status](https://coveralls.io/repos/github/gms1/angular-dynaform/badge.svg?branch=master&service=github)](https://coveralls.io/github/gms1/angular-dynaform?branch=master)
[![DeepScan Grade](https://deepscan.io/api/projects/698/branches/1106/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=698&bid=1106)
[![Dependency Status](https://david-dm.org/gms1/angular-dynaform.svg)](https://david-dm.org/gms1/angular-dynaform)
[![Greenkeeper badge](https://badges.greenkeeper.io/gms1/angular-dynaform.svg)](https://greenkeeper.io/)


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


**angular-dynaform** is a library for rapid development of model-driven reactive forms for mobile and web

## Features

* generic, expressive and extendable form library
* JSON serializable form configuration
* shared forms for mobile and web
* form builder
* observable form values and form value updates using angulars form model as a tree of FormGroups/FormArrays/FormControls
* observable focus changes
* application data model to form data model mapping
* enable/disable or show/hide fields based on conditions defined on related field values
* generic internationalization (labels, placeholders, options (select/radiobutton))
* easily extensible through:
  * custom components
  * custom validators
  * custom actions (triggered by blur/focus/click events) and/or observing value/status changes

## Supported UI-Frameworks

* [Material](https://github.com/angular/material2)
* [Nativescript Angular](https://github.com/NativeScript/nativescript-angular/)

## Links

* [Example on Stackblitz](https://stackblitz.com/edit/gms1-angular-dynaform-material)

## TODO

[TODO](./TODO.md)

> NOTE: Asking for any help! Your contribution is highly welcome!

## Table of Contents

* [Getting Started](#getting-started)
* [Basic Usage](#basic-usage)
* [Customization](#customization)
* [Control-types](#control-types)
* [License](#license)
* [Release Notes](#release-notes)
* [Contributing](#contributing)

## Getting Started

* install the packages:

```shell
npm install @angular-dynaform/core --save
npm install @angular-dynaform/material --save
```

> NOTE: please install required peer dependencies if they are not already installed

```shell
npm install @angular/common @angular/core @angular/forms rxjs jsep jsonpointerx
```

## Basic Usage

* import the form modules in the root NgModule of your application:

```typescript
@NgModule({
  ...
  imports: [DynamicFormModule.forRoot(), DynamicMaterialFormModule, ...],
  ...
})
export class AppModule {
}
```

* in other modules, import only the 'DynamicFormModule' and do not import the UI specific modules (e.g 'DynamicMaterialFormModule'):

```typescript
@NgModule({
  ...
  imports: [DynamicFormModule],
  ...
})
export class SharedModule {
}
```

* implement a form:

```typescript
@Component({
  selector: 'app-basic-form',
  template: `
    <adf-form [model]="formModel" (adfSubmit)="onSubmit($event)">
    </adf-form>
  `
})
export class BasicFormComponent {
  @ViewChild(DynamicForm) dynaForm!: DynamicForm;
  formModel: FormModel;

  readonly formConfig: FormConfig = {
    id: 'basic',
    updateOn: 'change',
    options: {
      group: [
        {
          id: 'name',
          modelType: ModelType.MODEL_VALUE,
          controlType: ControlType.CONTROL_INPUT,
          options: {label: 'name', placeholder: 'Enter your name', maxLength: 30, minLength: 4},
          validators: ['required', 'minLength', 'maxLength']
        },
        {
          id: 'submit',
          modelType: ModelType.MODEL_NULL,
          controlType: ControlType.CONTROL_BUTTON,
          options: {label: 'Submit'},
          action: 'submit'
        }
      ]
    }
  };

  name?: string;

  constructor(private dynamicFormService: DynamicFormService) {
    this.formModel = this.dynamicFormService.createFormModel(this.formConfig);
  }

  onSubmit(event: Event): void {
    this.name = this.formModel.value.name;
  }
}
```

* create the form config:

  * using the Form Builder:

   inject `FormBuilder` into your component class. You can then call its method 'createForm' to create an instance of 'FormBuilderForm'

```typescript

    const form = formBuilder.createForm({id: 'exampleForm', updateOn: 'blur'});

    // create divisions:
    const persondiv = form.group.addSubset({id: 'person', controlType: ControlType.CONTROL_DIVISION});
    const buttondiv = form.group.addSubset({
      id: 'buttondivision',
      controlType: [ControlType.CONTROL_DIVISION],
      options: {css: {content: 'button-division-content'}}
    });

    // add controls to the persondiv division:
    persondiv.group.addControl({
      id: 'salutation',
      controlType: ControlType.CONTROL_RADIOGROUP,
      options: {valueOptions: [{value: 'mr', label: 'Mr.'}, {value: 'ms', label: 'Ms.'}]},
      validators: ['required']
    });
    persondiv.group.addControl({
      id: 'title',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'Title', placeholder: 'Enter your title', maxLength: 30, minLength: 2},
      validators: ['minLength', 'maxLength']
    });
    persondiv.group.addControl({
      id: 'name',
      controlType: ControlType.CONTROL_INPUT,
      options: {label: 'name', placeholder: 'Enter your name', maxLength: 60, minLength: 4},
      validators: ['required', 'minLength', 'maxLength']
    });

    // add controls to the button division:
    buttondiv.group.addButton(
        {id: 'clear', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Clear'}, action: 'clear'});
    buttondiv.group.addSeparator({
      id: 'separatorMainButtons',
      controlType: ControlType.CONTROL_SEPARATOR,
      options: {css: {container: 'button-separator'}}
    });
    buttondiv.group.addButton(
        {id: 'reset', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Reset'}, action: 'reset'});
    buttondiv.group.addButton(
        {id: 'submit', controlType: ControlType.CONTROL_BUTTON, options: {label: 'Submit'}, action: 'submit'});

    // create to form configuration:
    const formConfig: FormConfig = form.toFormConfig();

```

  * JSON configuration:

  [Configuration of the plunker example](./projects/material-example/src/app/app.config.ts)

  [ControlConfig Interface](./projects/angular-dynaform/core/src/lib/config/control-config.ts)

* observable form value and form value update:

```typescript
    // subscribe to form value changes:
    dynaForm.valueChanges.subscribe(...);

    // get form value:
    value = dynaForm.value;

    // init form value (undefined for empty form):
    dynaForm.initValue(value);

    // clear form value:
    dynaForm.clearValue();

    // reset form value to the last value provided to 'initValue':
    dynaForm.resetValue();

```

* observable control values and control value updates:

```typescript
    ctrlModel = dynaForm.findComponentById(id).model;
    ctrlModel = dynaForm.model.findControlByPath(path);

    // subscribe to form value changes:
    ctrlModel.valueChanges.subscribe(...);

    // get form value:
    value = ctrlModel.value;

    // patch/set form value:
    ctrlModel.patchValue(value);
    ctrlModel.setValue(value);
```

* observable focus changes and click events:

```typescript
    ctrlComp = dynaForm.findComponentById(id);

    // subscribe to focus changes:
    ctrlComp.focusChanges.subscribe((focus) => { console.log(focus ? 'got focus' : 'lost focus');});

    // subscribe to click event:
    ctrlComp.click.subscribe(...);
```

* get/set form data using an application data model to form data model mapping

In your form configuration define the JSON pointer to the application data model and
use 'dynaForm.initValueFromAppModel' instead of 'dynaForm.initValue' and 'dynaForm.valueToAppModel' instead of 'dynaForm.value'

* enable/disable or show/hide fields based on conditions defined on related field values

In the relations expressions, you can combine all common arithmetic, comparison, and logical operators, as well as references to form control values. 'foo.bar' would reference the value of the 'bar' control in the 'foo' group;
In this example, the 'newsletter' checkbox will only be enabled if the 'atc' checkbox has been selected:

```typescript
          group: [
            {
              key: 'atc',
              controlType: ControlType.CONTROL_CHECKBOX,
              ...
            },
            {
              key: 'newsletter',
              controlType: ControlType.CONTROL_CHECKBOX,
              ...
              relations: {enable: 'atc'}
            }
          ]
```

* layout/styling

you can optionally assign additional CSS classes using **ControlConfig.options.css** and let **angular-dynaform** add them to the container, control, label sections of the corresponding component

The following CSS classes are predefined:

  * on all components: 'adf-container', 'adf-control', 'adf-content', 'adf-error' and 'adf-label'
  * on the form-control-component: 'adf-form-container', 'adf-form-control', 'adf-form-content', 'adf-form-error'
  * on all group-components: 'adf-group-container', 'adf-group-control', 'adf-group-content', 'adf-group-error' and 'adf-group-label'
  * on all array-components: 'adf-array-container', 'adf-array-control', 'adf-array-content', 'adf-array-error' and 'adf-array-label'
  * on all array-header sections: 'adf-header-content'
  * on all array-footer sections: 'adf-footer-content'
  * on the array-item sections: 'adf-array-item' and if the item is selected: 'adf-array-item-selected'
  * for all non-group and non-array-components: 'adf-control-container', 'adf-control-control', 'adf-control-content', 'adf-control-error' and 'adf-control-label'

## Customization

### custom components (DI)

you can subclass the base class **DynamicFormControlComponentBase**, the generic subclass **DynamicFormControlComponent** or any of the UI-specific subclasses to create your own custom control.

To be able to refer to this class from the form configuration, your class type must be registered with a new or existing name, which can then be used for the **ControlConfig.controlType** property.
Please see **DynamicFormService.setControlComponent** for the registration.

Angulars dependency injection will be used to instantiate your component, so please do not forget to provide **DynamicFormControlComponentBase** using your existing class.

### custom form actions (no DI)

you can subclass **DynamicFormAction** to create your own dynamic form action.

To be able to refer to this action from the form configuration, your class type must be registered with a new or existing name, which can then be configured using the **ControlConfig.action** poperty.
Please see **DynamicFormService.actionTypes.setType** for the registration.

### custom validators

implement either **DynamicFormValidatorFn** or **DynamicFormAsyncValidatorFn** and register your function using
**DynamicFormService.validatorFn.setFn** or **DynamicFormService.asyncValidatorFn.setFn**

## Control-types

| Model                     | Control    | HTML  | Material | Nativescript     |
|---------------------------|------------|-------|----------|------------------|
|  ArrayModel:
|                           | Array      |  yes  |  yes     | yes              |
|  Group- or Subset-Model:
|                           | Fieldset   |  yes  |  yes     | yes              |
|                           | Division   |  yes  |  yes     | yes              |
|                           | Tabgroup   |       |  yes     |                  |
|                           | Stepper    |       |  yes     |                  |
|  ValueControlModel:
|                           | Checkbox   |  yes  |  yes     |  yes             |
|                           | Datepicker |  *    |  yes     |  yes**           |
|                           | Input      |  yes  |  yes     |  yes (TextField) |
|                           | Radiogroup |  yes  |  yes     |  yes             |
|                           | Select     |  yes  |  yes     |                  |
|                           | Slider     |  yes  |  yes     |  yes             |
|                           | Switch     |  yes  |  yes     |  yes             |
|                           | Textarea   |  yes  |  yes     |  yes (TextView)  |
|                           | Listpicker |       |          |  yes             |
|  NullControlModel:
|                           | Button     |  yes  |  yes     |  yes             |
|                           | Separator  |  yes  |  yes     |  yes             |
|                           |            |       |          |                  |

*) you can use "input type='date'" as replacement for a datepicker

**) reports date as utc-timestamp

e.g if timezone is "Central European Summer Time" and selected date is "2018-06-06"
 the value of the form control is set to "2018-06-05T22:00:00.000Z"

## License

**angular-dynaform** is licensed under the MIT license

[LICENSE](./LICENSE)

## Release Notes

[CHANGELOG](./CHANGELOG.md)

## Contributing

[CONTRIBUTING](./CONTRIBUTING.md)
