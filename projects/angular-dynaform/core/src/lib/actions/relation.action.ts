// THIS is an INTERNAL action, indirectly created if a
// RelationExpressions has be defined for a control

import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {DynamicFormAction} from './dynamic-form.action';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';
import {ControlModel, ArrayModel} from '../models';
import {JsExpression} from '../utils/jsec';

// tslint:disable use-life-cycle-interface
export class RelationAction extends DynamicFormAction {
  private unsubscribe: Subject<any>;

  constructor(component: DynamicFormControlComponentBase) {
    super(component);
    this.unsubscribe = new Subject<any>();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.model.enableIf) {
      this.subscribeToChanges(this.model.enableIf, (v) => {
        if (v) {
          /* istanbul ignore else */
          if (this.model.ngControl.disabled) {
            this.model.ngControl.enable();
          }
        } else {
          /* istanbul ignore else */
          if (this.model.ngControl.enabled) {
            this.model.ngControl.disable();
          }
        }
      });
      }

    if (this.model.showIf) {
      const observable = this.subscribeToChanges(this.model.showIf, (v) => {
        v ? this.model.show() : this.model.hide();
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private subscribeToChanges(expr: JsExpression, next: ((v: boolean) => void)): void {
    // binding thisArg to the ngControl is not documented yet
    // and subject for changes in the future
    expr.thisArg = this.model.ngControl;
    expr.context = {};
    const model = this.findRelatedRootModel(expr.getContextMembersRoot());
    /* istanbul ignore if */
    if (!model || !model.jpForm) {
      // NOTE: this should not happen, we should always get a model (default formModel.group) and a corresponding
      // json-pointer
      return;
      }
    const jpForm = model.jpForm;
    let run: (v: any) => any;
    if (jpForm.root) {
      run = (v: any) => {
        expr.context = v;
        return !!expr.run();
      };
    } else {
      run = (v: any) => {
        jpForm.set(expr.context, v);
        return !!expr.run();
      };
    }
    model.valueChanges.pipe(map(run), distinctUntilChanged()).pipe(takeUntil(this.unsubscribe)).subscribe(next);
  }



  private findRelatedRootModel(path: string[]): ControlModel {
    let relModel: ControlModel = this.model.formModel.group;

    for (const segment of path) {
      const foundModel = relModel.getControl(segment);
      if (!foundModel || foundModel instanceof ArrayModel) {
        return relModel;
      }
      relModel = foundModel;
      }
    return relModel;
  }
}
