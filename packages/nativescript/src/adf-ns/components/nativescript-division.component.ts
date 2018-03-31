// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-division-component',
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
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptDivisionComponent}]
})
export class NativeScriptDivisionComponent extends DynamicFormControlComponent<GroupModelBase> {
  model!: GroupModelBase;
  options!: GroupOptions;
}
