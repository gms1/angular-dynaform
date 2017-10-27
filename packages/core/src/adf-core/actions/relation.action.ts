// THIS is an INTERNAL action, indirectly created if a
// RelationExpressions has be defined for a control

// tslint:disable use-life-cycle-interface
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {DynamicFormAction} from './dynamic-form.action';
import {ControlModel, ArrayModel} from '../models';
import {JsExpression} from '../utils/js-expression';
import {JsonPointer} from 'jsonpointerx';

export class RelationAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;

  constructor(model: ControlModel) {
    super();
    this.model = model;
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.model.enableIf) {
      let observable = this.getObservable(this.model.enableIf);
      if (observable) {
        observable.subscribe((v) => { v ? this.model.enable() : this.model.disable(); });
      }
    }
    if (this.model.showIf) {
      let observable = this.getObservable(this.model.showIf);
      if (observable) {
        observable.subscribe((v) => { v ? this.model.show() : this.model.hide(); });
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getObservable(expr: JsExpression): Observable<boolean>|undefined {
    // binding thisArg to the ngControl is not documented yet
    // and subject for changes in the future
    expr.thisArg = this.model.ngControl;
    expr.context = {};
    let model = this.findRelatedRootModel(expr.getContextMembersRoot());
    if (!model || !model.jpForm) {
      return undefined;
    }
    let run: (v: any) => any;
    if (model.jpForm.root) {
      run = (v: any) => {
        expr.context = v;
        return !!expr.run();
      };
    } else {
      run = (v: any) => {
        (model.jpForm as JsonPointer).set(expr.context, v);
        return !!expr.run();
      };
    }
    return model.valueChanges.pipe(map(run), distinctUntilChanged()).pipe(takeUntil(this.unsubscribe));
  }



  private findRelatedRootModel(path: string[]): ControlModel {
    let relModel: ControlModel = this.model.formModel.group;

    for (let segment of path) {
      let foundModel = relModel.getControl(segment);
      if (!foundModel || foundModel instanceof ArrayModel) {
        return relModel;
      }
      relModel = foundModel;
    }
    return relModel;
  }
}
