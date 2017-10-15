import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {GroupModelBase} from '../models/group-model';

import {DynamicFormComponent} from './dynamic-form.component';


@Component({
  selector: 'adf-group-container',
  template: `
    <ng-container *ngFor="let item of model.items;" adfControlComponent [model]="item" >
    </ng-container>
  `
})
export class DynamicFormGroupContainerComponent implements OnChanges {
  @Input()
  model: GroupModelBase;

  constructor(public form: DynamicFormComponent) {}

  ngOnChanges(changes: SimpleChanges): void {}
}
