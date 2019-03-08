// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  GroupModelBase,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  GroupOptions,
} from '@angular-dynaform/core';
import { Component } from '@angular/core';

// NOTES: template works for GroupModel and SubsetModel

@Component({
  selector: 'adf-material-division-component',
  template: `
    <div [formGroup]="model.ngGroup" [hidden]="model.hidden">
      <div [ngClass]="model.css.control" adfHTMLDomElement>
        <adf-error-container [model]="model"></adf-error-container>
        <div [ngClass]="model.css.content">
          <ng-container
            *ngFor="let item of model.items"
            adfControlComponent
            [model]="item"
          ></ng-container>
        </div>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{ provide: DynamicFormControlComponentBase, useExisting: MaterialDivisionComponent }],
})
export class MaterialDivisionComponent extends DynamicFormControlComponent<GroupModelBase> {
  model!: GroupModelBase;
  options!: GroupOptions;
}
