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
* application data model to form data model mapping
* generic internationalization (labels, placeholders, options (select/radiobutton))
* easily extensible through:
  * custom components
  * custom validators
  * custom actions (triggered by blur/focus/click events)

> NOTE: development is in early stage!

## Supported UI-Frameworks

* [Material](https://github.com/angular/material2)
* [TODO: Nativescript](https://www.nativescript.org/)

## Links

* [Plunker for basic HTML](http://plnkr.co/edit/OES85TVO33XHM725fpBg?p=preview)
* [Plunker for Material2](http://plnkr.co/edit/CNZQPDm4ygfHgQLJG9Eo?p=preview)

## TODO list

* nativescript templates
* generate JSON Patch (RFC 6902) for changes applied to the form/application data
* enable/disable or show/hide fields based on conditions defined on related field values
* multi-page/step forms
* support for angular's internationalization
  (depends on angular v5.x [#11405](https://github.com/angular/angular/issues/11405))
* support for validation on blur event (depends on angular v5 [#18514](https://github.com/angular/angular/pull/18514))
* observable select options
* advanced formatting/parsing of form values
* autocomplete
* form(Config/Model)Builder?
* improve documentation and tests

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

  [Sample](./packages/material-example/src/app/app.config.ts)

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

* observable control events:

```typescript
    DnamicControl dynaControl = dynaForm.findComponentById(id);

    // subscribe to focus changes:
    dynaControl.model.focusChanges.subscribe((focus) => { console.log(focus ? 'got focus' : 'lost focus');});

    // subscribe to click event:
    dynaControl.model.click.subscribe(...);
```

* get/set form data using an application data model to form data model mapping

call 'dynaForm.initValueFromAppModel' instead of 'dynaForm.initValue' and 'dynaForm.valueToAppModel({})' instead of 'dynaForm.value'

## TODO: Customization

* custom validators (DI)
* custom components (DI)
* custom form actions (no DI)
