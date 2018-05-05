// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-fieldset-component',
  template: `
  <StackLayout
    [formGroup]="model.ngGroup"
    [visibility]="model.hidden ? 'collapsed' : 'visible'"
  >
    <StackLayout
      [id]="model.id"
      [ngClass]="model.css.control"
      adfNSDomElement
    >
      <StackLayout
        *ngIf="model.local.label"
        class="adf-front-label"
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      >
      </StackLayout>
      <adf-error-container [model]="model">
      </adf-error-container>
      <StackLayout [ngClass]="model.css.content">
        <ng-container *ngFor="let item of model.items;" adfControlComponent [model]="item" >
        </ng-container>
      </StackLayout>
    </StackLayout>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptFieldsetComponent}]
})
export class NativeScriptFieldsetComponent extends DynamicFormControlComponent<GroupModelBase> {
  model!: GroupModelBase;
  options!: GroupOptions;
}