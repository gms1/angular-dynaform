// tslint:disable use-input-property-decorator use-output-property-decorator
import {
  ArrayModel,
  ArrayOptions,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent
} from '@angular-dynaform/core';
import {Component} from '@angular/core';

@Component({
  selector: 'adf-basic-array-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <fieldset
        [id]="model.id"
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
        <legend
          *ngIf="model.local.label"
          [ngClass]="model.css.label"
          [innerHTML]="model.local.label"
        ></legend>
        <ng-container *ngIf="model.header" >
          <div [ngClass]="model.header.css.content">
            <ng-container *ngFor="let item of model.header.items;" adfControlComponent [model]="item" >
            </ng-container>
          </div>
        </ng-container>
        <adf-error-container [model]="model">
        </adf-error-container>
        <div
          [formArrayName]="model.key"
          [ngClass]="model.css.content"
        >
          <ng-container
            *ngFor="let arrayItem of model.items; let i=index"
            [formGroupName]="i"
          >
            <div [ngClass]="arrayItem.css.content">
              <ng-container *ngFor="let item of arrayItem.items;" adfControlComponent [model]="item" >
              </ng-container>
            </div>
          </ng-container>
        </div>
        <ng-container *ngIf="model.footer" >
          <div [ngClass]="model.footer.css.content">
            <ng-container *ngFor="let item of model.footer.items;" adfControlComponent [model]="item" >
            </ng-container>
          </div>
        </ng-container>
      </fieldset>
    </div>
  `,

  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: BasicArrayComponent}]
})
export class BasicArrayComponent extends DynamicFormControlComponent<ArrayModel> {
  model!: ArrayModel;
  options!: ArrayOptions;
}
