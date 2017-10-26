// THIS is an INTERNAL action, indirectly created if a
// RelationExpressions has be defined for a control

// tslint:disable use-life-cycle-interface
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {DynamicFormAction} from './dynamic-form.action';
import {ControlModel, GroupModelBase} from '../models';
import {JsExpression} from '../utils/js-expression';

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
      this.getObservable(this.model.enableIf).subscribe((v) => { v ? this.model.enable() : this.model.disable(); });
    }
    if (this.model.showIf) {
      this.getObservable(this.model.showIf).subscribe((v) => { v ? this.model.show() : this.model.hide(); });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getObservable(expr: JsExpression): Observable<boolean> {
    expr.thisArg = this.model.ngControl;
    expr.context = {};
    let model = this.findRootModel(expr.getContextMembersRoot());
    let run = model.jpForm.root ? (v: any) => {
      expr.context = v;
      return !!expr.run();
    } : (v: any) => {
      model.jpForm.set(expr.context, v);
      return !!expr.run();
    };
    return model.valueChanges.pipe(map(run), distinctUntilChanged()).pipe(takeUntil(this.unsubscribe));
  }



  private findRootModel(path: string[]): ControlModel {
    let relModel: ControlModel = this.model.formModel.group;

    for (let segment of path) {
      if (relModel instanceof GroupModelBase) {
        let foundModel: ControlModel|undefined;
        for (let item of relModel.items) {
          if (segment === item.key) {
            foundModel = item;
            break;
          }
        }
        if (foundModel) {
          relModel = foundModel;
          break;
        }
        return relModel;
      } else {
        // NOTES: if we are in an array we should not walk down here
        // because array items may be inserted/deleted dynamically
        return relModel;
      }
    }
    return relModel;
  }
}
