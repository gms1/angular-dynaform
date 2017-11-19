import {Component, ElementRef, ViewChild} from '@angular/core';
import {map} from 'rxjs/operators/map';

import {
  GroupModelBase,
  DynamicForm,
  DynamicFormControlComponentBase,
  DynamicFormControlComponent,
  DynamicFormService,
  GroupOptions,
  Stepper
} from '@angular-dynaform/core';
import {MatStepper} from '@angular/material';

// TODO: using the #steps template didn't work
//   may be related to https://github.com/angular/material2/issues/8014
@Component({
  selector: 'adf-material-tab-component',
  template: `
    <div
      [formGroup]="model.ngGroup"
      [hidden]="model.hidden"
    >
      <div
        [ngClass]="model.css.control"
        adfHTMLDomElement
      >
        <adf-error-container [model]="model">
        </adf-error-container>

        <!--ng-template #steps>
            <mat-step *ngFor="let item of model.items; let i=index"
              [stepControl]="item.ngControl"
            >
              <ng-template matStepLabel>{{item.local.label}}</ng-template>
              <ng-template adfControlComponent [model]="item"></ng-template>
            </mat-step>
        </ng-template-->

        <ng-container *ngIf="options.matStepperVertical; else horizontalStepper" >
          <mat-vertical-stepper [ngClass]="model.css.content" [linear]="options.matStepperLinear" #stepper>
            <!--ng-container *ngTemplateOutlet="steps"></ng-container-->
            <mat-step *ngFor="let item of model.items; let i=index"
              [stepControl]="item.ngControl"
              [optional]="options.matStepOptional" [editable]="options.matStepEditable" [completed]="options.matStepCompleted"
            >
              <ng-template matStepLabel>{{item.local.label}}</ng-template>
              <ng-template adfControlComponent [model]="item"></ng-template>
            </mat-step>
        </mat-vertical-stepper>
        </ng-container>

        <ng-template #horizontalStepper >
          <mat-horizontal-stepper [ngClass]="model.css.content" [linear]="options.matStepperLinear" #stepper>
            <!--ng-container *ngTemplateOutlet="steps"></ng-container-->
            <mat-step *ngFor="let item of model.items; let i=index"
              [stepControl]="item.ngControl"
              [optional]="options.matStepOptional" [editable]="options.matStepEditable" [completed]="options.matStepCompleted"
            >
              <ng-template matStepLabel>{{item.local.label}}</ng-template>
              <ng-template adfControlComponent [model]="item"></ng-template>
            </mat-step>
        </mat-horizontal-stepper>
        </ng-template>
      </div>
    </div>
  `,
  inputs: ['model'],
  providers: [{provide: DynamicFormControlComponentBase, useExisting: MaterialStepperComponent}]
})
export class MaterialStepperComponent extends DynamicFormControlComponent<GroupModelBase> {
  model: GroupModelBase;
  options: GroupOptions;

  @ViewChild('stepper') private matStepper: MatStepper;

  stepper?: Stepper;

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
  }

  ngOnInit(): void {
    if (this.matStepper) {
      this.stepper = {
        prev: () => this.matStepper.previous(),
        next: () => this.matStepper.next(),
        selectionChange: () => this.matStepper.selectionChange.pipe(map((sc) => sc.selectedIndex)),
        length: () => this.matStepper._steps ? this.matStepper._steps.length : 0
      };
      if (!this.form.stepper) {
        this.form.stepper = this.stepper;
      }
    }
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.form.stepper === this.stepper) {
      this.form.stepper = undefined;
    }
  }
}
