# angular-dynaform
[![Build Status](https://api.travis-ci.org/gms1/angular-dynaform.svg?branch=master)](https://travis-ci.org/gms1/angular-dynaform)
[![Known Vulnerabilities](https://snyk.io/test/github/gms1/angular-dynaform/badge.svg)](https://snyk.io/test/github/gms1/angular-dynaform)
[![DeepScan Grade](https://deepscan.io/api/projects/698/branches/1106/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=698&bid=1106)
[![Greenkeeper badge](https://badges.greenkeeper.io/gms1/angular-dynaform.svg)](https://greenkeeper.io/)
[![npm (scoped)](https://img.shields.io/npm/v/@angular-dynaform/core.svg?colorB=007ec6)](https://www.npmjs.com/package/%40angular-dynaform%2Fcore)

**angular-dynaform** is a library for rapid development of model-driven reactive forms for mobile and web.

## Features

* generic, expressive and extendable form library
* JSON serializable form configuration
* shared forms for mobile(not finished yet) and web
* observable form values and form value updates using angulars form model as a tree of FormGroups/FormArrays/FormControls
* observable focus changes
* application data model to form data model mapping
* enable/disable or show/hide fields based on conditions defined on related field values
* generic internationalization (labels, placeholders, options (select/radiobutton))
* easily extensible through:
  * custom components
  * custom validators
  * custom actions (triggered by blur/focus/click events) and/or observing value/status changes

> NOTE: development is in early stage!

## Supported UI-Frameworks

* [Material](https://github.com/angular/material2)
* [TODO: Nativescript](https://www.nativescript.org/)

## Links

* [Plunker for Material2](http://plnkr.co/edit/ZZuywOIH92FtsmHRp6ks?p=preview)
* [Plunker for basic HTML](http://plnkr.co/edit/x8elnFR7fgDWIjvn8OZF?p=preview)

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

* import the form modules for shared components (e.g for mobile and web): import only the 'DynamicFormModule' and do not import the UI specific modules (e.g 'DynamicMaterialFormModule'):

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
  selector: 'my-form-component',
  template: `
    <adf-form [model]="formModel" (adfSubmit)="onSubmit($event)" (adfReset)="onReset($event)">
    </adf-form>
  `
})
export class MyFormComponent {
  @ViewChild(DynamicFormComponent) dynaForm: DynamicFormComponent;
  formModel: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {
    this.formModel = this.dynamicFormService.createFormModel(formConfig);
  }

  onSubmit(event: Event): void { }
  onReset(event: Event): void { }

}
```

* create the form config:

  * JSON configuration:

  [Configuration of the plunker example](./packages/material-example/src/app/app.config.ts)

  [ControlConfig Interface](./packages/core/src/adf-core/config/control-config.interface.ts)

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

In your form configuration define the JSON pointer to the application data model **ControlConfig.jp** and
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
|                           | Array      |  yes  |  yes     |                  |
|  Group- or Subset-Model:
|                           | Fieldset   |  yes  |  yes     |                  |
|                           | Division   |  yes  |  yes     |                  |
|                           | Tabgroup   |       |  yes     |                  |
|                           | Stepper    |       |  yes     |                  |
|  ValueControlModel:
|                           | Checkbox   |  yes  |  yes     |                  |
|                           | Datepicker |  *    |  yes     |                  |
|                           | Input      |  yes  |  yes     |  yes (TextField) |
|                           | Radiogroup |  yes  |  yes     |                  |
|                           | Select     |  yes  |  yes     |                  |
|                           | Slider     |  yes  |  yes     |                  |
|                           | Switch     |  yes  |  yes     |                  |
|                           | Textarea   |  yes  |  yes     |  yes (TextView)  |
|                           | Listpicker |       |          |  yes             |
|  NullControlModel:
|                           | Button     |  yes  |  yes     |                  |
|                           | Separator  |  yes  |  yes     |                  |
|                           |            |       |          |                  |

*) you can use "input type='date'" as replacement for a datepicker

## License

**angular-dynaform** is licensed under the MIT license

[LICENSE](./LICENSE)

## Release Notes

[CHANGELOG](./CHANGELOG.md)

## Contributing

[CONTRIBUTING](./CONTRIBUTING.md)
