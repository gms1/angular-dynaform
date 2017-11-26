import {Component, ElementRef, ViewChild, AfterViewInit, EventEmitter} from '@angular/core';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {Subject} from 'rxjs/Subject';

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
              [stepControl]="item.ngSubsetControl ? item.ngSubsetControl : item.ngControl"
              [optional]="options.matStepOptional" [editable]="options.matStepEditable" [completed]="options.matStepCompleted"
            >
              <ng-template matStepLabel>{{item.local.label}}</ng-template>
              <ng-template adfControlComponent [model]="item"></ng-template>
            </mat-step>
        </ng-template-->

        <ng-container *ngIf="options.matStepperVertical; else horizontalStepper" >
          <mat-vertical-stepper [ngClass]="model.css.content" [linear]="options.matStepperLinear === undefined ? false : options.matStepperLinear" #stepper>
            <!--ng-container *ngTemplateOutlet="steps"></ng-container-->
            <mat-step *ngFor="let item of model.items; let i=index"
              [stepControl]="item.ngSubsetControl ? item.ngSubsetControl : item.ngControl"
              [editable]="options.matStepEditable === undefined ? true : options.matStepEditable"
              [optional]="options.matStepOptional"
              [completed]="options.matStepCompleted"
            >
              <ng-template matStepLabel>{{item.local.label}}</ng-template>
              <ng-template adfControlComponent [model]="item"></ng-template>
            </mat-step>
        </mat-vertical-stepper>
        </ng-container>

        <ng-template #horizontalStepper >
          <mat-horizontal-stepper [ngClass]="model.css.content" [linear]="options.matStepperLinear === undefined ? false : options.matStepperLinear" #stepper>
            <!--ng-container *ngTemplateOutlet="steps"></ng-container-->
            <mat-step *ngFor="let item of model.items; let i=index"
              [stepControl]="item.ngSubsetControl ? item.ngSubsetControl : item.ngControl"
              [editable]="options.matStepEditable === undefined ? true : options.matStepEditable"
              [optional]="options.matStepOptional"
              [completed]="options.matStepCompleted"
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
export class MaterialStepperComponent extends DynamicFormControlComponent<GroupModelBase> implements AfterViewInit {
  model: GroupModelBase;
  options: GroupOptions;

  @ViewChild('stepper') private matStepper: MatStepper;

  stepper?: Stepper;

  constructor(form: DynamicForm, dynamicFormService: DynamicFormService, elRef: ElementRef) {
    super(form, dynamicFormService, elRef);
  }

  ngOnInit(): void {
    this.stepper = new MatStepperWrapper(this.matStepper);
    if (!this.form.stepper) {
      this.form.stepper = this.stepper;
    }
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    (this.stepper as MatStepperWrapper).matStepper = this.matStepper;
    super.ngAfterViewInit();
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.stepper) {
      if (this.form.stepper === this.stepper) {
        this.form.stepper = undefined;
      }
      (this.stepper as MatStepperWrapper).matStepper = undefined;
    }
  }
}

/*
 *
 *
 */
class MatStepperWrapper implements Stepper {
  private _selectionChange: EventEmitter<number>;

  private _matStepper?: MatStepper;
  get matStepper(): MatStepper|undefined { return this._matStepper; }
  set matStepper(matStepper: MatStepper|undefined) { this.changeStepper(matStepper); }

  private unsubscribe: Subject<any>;

  constructor(matStepper?: MatStepper) {
    this.matStepper = matStepper;
    this._selectionChange = new EventEmitter<number>();
  }

  // TODO: currently we are not able to test if stepping forward/backward is allowed
  prev(): void {
    if (this.matStepper) {
      this.matStepper.previous();
    }
  }
  next(): void {
    if (this.matStepper) {
      this.matStepper.next();
    }
  }

  selectionChange(): Observable<number> { return this._selectionChange; }

  length(): number { return this.matStepper && this.matStepper._steps ? this.matStepper._steps.length : 0; }

  private changeStepper(matStepper?: MatStepper): void {
    if (this._matStepper === matStepper) {
      return;
    }
    if (this._matStepper) {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
    if (matStepper) {
      this.unsubscribe = new Subject<any>();
      matStepper.selectionChange.pipe(map((sc) => sc.selectedIndex))
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((currIndex) => this._selectionChange.emit(currIndex));
    }
    this._matStepper = matStepper;
  }
}
