import {ComponentRef, Directive, Input, DoCheck, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormError} from '../components/dynamic-form-error.interface';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';
import {DynamicValidationError} from '../validations/dynamic-validation-error.interface';

// this directive creates, updates and destroys the error control component dynamically

@Directive({selector: '[adfErrorComponent]'})
export class DynamicFormErrorComponentDirective implements OnInit, DoCheck, OnDestroy {
  @Input()
  model: ControlModel;

  @Input()
  error: DynamicValidationError;

  private componentRef: ComponentRef<DynamicFormError>|undefined;

  constructor(
      public form: DynamicFormComponent, private componentsFactoryService: DynamicFormComponentFactoryService,
      private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void { this.createComponent(); }

  ngDoCheck(): void { this.checkComponent(); }

  ngOnDestroy(): void { this.destroyComponent(); }

  private createComponent(): void {
    let componentFactory = this.componentsFactoryService.getErrorComponentFactory();
    try {
      this.componentRef = this.viewContainerRef.createComponent<DynamicFormError>(
          componentFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      e.message = `failed to create error component: ${e.message}`;
      throw(e);
    }
  }

  private checkComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.instance.error = this.error;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private destroyComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.ngOnDestroy();
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
