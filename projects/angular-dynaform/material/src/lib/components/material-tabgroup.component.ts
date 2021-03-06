// tslint:disable use-input-property-decorator use-output-property-decorator
import { Component } from '@angular/core';
import {
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions,
} from '@angular-dynaform/core';

@Component({
  selector: 'adf-material-tab-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <div [ngClass]="model.css.control" adfHTMLDomElement>
        <adf-error-container [model]="model"></adf-error-container>
        <mat-tab-group
          adfHTMLDomElement
          [ngClass]="model.css.content"
          [dynamicHeight]="options.matTabGroupDynamicHeight"
        >
          <mat-tab *ngFor="let item of model.items">
            <ng-template mat-tab-label>{{ item.local.label }}</ng-template>
            <ng-template adfControlComponent [model]="item"></ng-template>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialTabGroupComponent }],
})
export class MaterialTabGroupComponent extends DynamicFormControlComponent<GroupModelBase> {
  model!: GroupModelBase;
  options!: GroupOptions;
}
