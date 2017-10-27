[![npm version](https://badge.fury.io/js/%40angular-dynaform%2Fcore.svg)](https://badge.fury.io/js/%40angular-dynaform%2Fcore)
[![Build Status](https://api.travis-ci.org/gms1/angular-dynaform.svg?branch=master)](https://travis-ci.org/gms1/angular-dynaform)
[![Known Vulnerabilities](https://snyk.io/test/github/gms1/angular-dynaform/badge.svg)](https://snyk.io/test/github/gms1/angular-dynaform)
[![DeepScan Grade](https://deepscan.io/api/projects/698/branches/1106/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=698&bid=1106)
[![Greenkeeper badge](https://badges.greenkeeper.io/gms1/angular-dynaform.svg)](https://greenkeeper.io/)

# angular-dynaform

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

* [Plunker for basic HTML](http://plnkr.co/edit/x8elnFR7fgDWIjvn8OZF?p=preview)
* [Plunker for Material2](http://plnkr.co/edit/ZZuywOIH92FtsmHRp6ks?p=preview)

## TODO list

* nativescript templates
* generate JSON Patch (RFC 6902) for changes applied to the form/application data
* multi-page/step forms
* support for angular's internationalization
  (depends on angular v5.x [#11405](https://github.com/angular/angular/issues/11405))
* observable select options
* advanced formatting/parsing of form values
* autocomplete
* form(Config/Model)Builder?
* improve documentation and tests
* enable option fullTemplateTypeCheck for remaining packages (already enabled in 'core')

> NOTE: Asking for any help! Your contribution is highly welcome!

## Table of Contents

* [Getting Started](#getting-started)
* [Basic Usage](#basic-usage)
* [Customization](#customization)

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
    <adf-form [model]="model" (adfSubmit)="onSubmit($event)" (adfReset)="onReset($event)">
    </adf-form>
  `,
  styleUrls: []
})
export class MyFormComponent {
  @ViewChild(DynamicFormComponent) dynaForm: DynamicFormComponent;
  model: FormModel;

  constructor(private dynamicFormService: DynamicFormService) {
    this.model = this.dynamicFormService.createFormModel(formConfig);
  }

  onSubmit(event: Event): void { }
  onReset(event: Event): void { }

}
```

* create the form config:

  * JSON configuration:

  [Configuration of the plunker example:](./packages/material-example/src/app/app.config.ts)

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
    DnamicControl dynaControl = dynaForm.findComponentById(id);

    // subscribe to form value changes:
    dynaControl.model.valueChanges.subscribe(...);

    // get/set form value:
    value = dynaControl.model.value;
    dynaControl.model.value = value;

    // patch/set form value:
    dynaControl.model.patchValue(value);
    dynaControl.model.setValue(value);
```

* observable focus changes:

```typescript
    DnamicControl dynaControl = dynaForm.findComponentById(id);

    // subscribe to focus changes:
    dynaControl.model.focusChanges.subscribe((focus) => { console.log(focus ? 'got focus' : 'lost focus');});

    // subscribe to click event:
    dynaControl.model.click.subscribe(...);
```

* get/set form data using an application data model to form data model mapping

call 'dynaForm.initValueFromAppModel' instead of 'dynaForm.initValue' and 'dynaForm.valueToAppModel({})' instead of 'dynaForm.value'

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

## Customization

### custom components (DI)

you can subclass the base class **DynamicFormControlComponentBase**, the generic subclass **DynamicFormControlComponent** or any of the UI-specific subclasses to create your own custom control.

To be able to refer to this class from the form configuration, your class type must be registered with a new or existing name, which can then be used for the **ControlConfig.controlType** property.
Please see **DynamicFormService.setControlComponent** for the registration.

Angulars dependency injection will be used to instantiate your component, so please do not forget to provide **DynamicFormControlComponentBase** using your existing class.

### custom validators (DI)

you can subclass either **DynamicFormValidator** or **DynamicFormAsyncValidator** to create your own validator.

To be able to refer to this validator from the form configuration, your class type must be registered with a new or existing name, which can then be configured using the **ControlConfig.validators** or **ControlConfig.asyncValidators** poperties.
Please see **DynamicFormService.validatorTypes.setType** for the registration.

Angulars dependency injection will be used to instantiate your validation class.

### custom form actions (no DI)

you can subclass **DynamicFormAction** to create your own dynamic form action.
Please see **DynamicFormService.actionTypes.setType** for the registration.

To be able to refer to this action from the form configuration, your class type must be registered with a new or existing name, which can then be configured using the **ControlConfig.action** poperty.

## License

**angular-dynaform** is licensed under the MIT

[LICENSE](./LICENSE)

## Release Notes

[CHANGELOG](./CHANGELOG.md)
