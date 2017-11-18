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

// TODO: vertical stepper
// TODO: support for prev/next buttons/actions
// TODO(?): attributes on stepper: linear
// TODO(?): attributes on step: optional, editable, completed?
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
        <mat-horizontal-stepper [ngClass]="model.css.content" #stepper>
          <mat-step *ngFor="let item of model.items; let i=index"
            [stepControl]="item.ngControl"
          >
            <ng-template matStepLabel>{{item.local.label}}</ng-template>
            <ng-template adfControlComponent [model]="item" >
            </ng-template>
          </mat-step>
        </mat-horizontal-stepper>
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
