import {ComponentRef, Directive, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormError} from '../components/dynamic-form-error.interface';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';
import {DynamicValidationError} from '../validations/dynamic-validation-error.interface';

// this directive creates, updates and destroys the error control component dynamically

@Directive({selector: '[adfErrorComponent]'})
export class DynamicFormErrorComponentDirective implements OnChanges, OnDestroy {
  @Input()
  model: ControlModel;

  @Input()
  error: DynamicValidationError;

  private componentRef: ComponentRef<DynamicFormError>|undefined;

  constructor(
      public form: DynamicFormComponent, private componentsFactoryService: DynamicFormComponentFactoryService,
      private viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.componentRef) {
      this.createComponent();
    }
    this.updateComponent();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.ngOnDestroy();
      this.destroyComponent();
    }
  }

  private createComponent(): void {
    let componentFactory = this.componentsFactoryService.getErrorComponentFactory();
    let componentRef: ComponentRef<DynamicFormError>;
    try {
      componentRef = this.viewContainerRef.createComponent<DynamicFormError>(
          componentFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      e.message = `failed to create error component: ${e.message}`;
      throw(e);
    }
    this.componentRef = componentRef;
  }

  private updateComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.instance.error = this.error;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private destroyComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
