// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

@Component({
  selector: 'adf-nativescript-division',
  template: `
    <StackLayout [formGroup]="model.ngGroup" [visibility]="model.hidden ? 'collapsed' : 'visible'">
      <StackLayout [id]="model.id" [ngClass]="model.css.control" adfNSDomElement>
        <adf-error-container [model]="model"></adf-error-container>
        <FlexboxLayout [ngClass]="model.css.content">
          <ng-container
            *ngFor="let item of model.items"
            adfControlComponent
            [model]="item"
          ></ng-container>
        </FlexboxLayout>
      </StackLayout>
    </StackLayout>
  `,
  inputs: ['model'],
  providers: [
    { provide: DynamicFormControlComponentBase, useExisting: NativeScriptDivisionComponent },
  ],
})
export class NativeScriptDivisionComponent extends DynamicFormControlComponent<GroupModelBase> {
  model!: GroupModelBase;
  options!: GroupOptions;
}
