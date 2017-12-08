// tslint:disable use-input-property-decorator use-output-property-decorator no-access-missing-member
import {
  ArrayModel,
  ArrayOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-nativescript-array-component',
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
        [ngClass]="model.css.label"
        [innerHTML]="model.local.label"
      ></StackLayout>
      <ng-container *ngIf="model.header" >
        <StackLayout [ngClass]="model.header.css.content">
          <ng-container *ngFor="let item of model.header.items;" adfControlComponent [model]="item" >
          </ng-container>
        </StackLayout>
      </ng-container>
      <adf-error-container [model]="model">
      </adf-error-container>
      <StackLayout
        [formArrayName]="model.key"
        [ngClass]="model.css.content"
      >
        <ng-container
          *ngFor="let arrayItem of model.items; let i=index"
          [formGroupName]="i"
        >
          <StackLayout [ngClass]="arrayItem.css.content">
            <ng-container *ngFor="let item of arrayItem.items;" >
              <ng-container adfControlComponent [model]="item" >
              </ng-container>
            </ng-container>
          </StackLayout>
        </ng-container>
      </StackLayout>
      <ng-container *ngIf="model.footer" >
        <StackLayout [ngClass]="model.footer.css.content">
          <ng-container *ngFor="let item of model.footer.items;" adfControlComponent [model]="item" >
          </ng-container>
        </StackLayout>
      </ng-container>
    </StackLayout>
  </StackLayout>
`,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: NativeScriptArrayComponent}]
})
export class NativeScriptArrayComponent extends DynamicFormControlComponent<ArrayModel> {
  model: ArrayModel;
  options: ArrayOptions;
}
