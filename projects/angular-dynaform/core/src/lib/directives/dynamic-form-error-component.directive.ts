import {
  ComponentRef,
  Directive,
  Input,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ElementRef,
  KeyValueDiffers,
  Renderer2
} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormError} from '../components/dynamic-form-error.interface';
import {DynamicFormErrorComponent} from '../components/dynamic-form-error.component';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';
import {DynamicValidationError} from '../validations/dynamic-validation-error.interface';

import {DynamicClass} from '../utils/dynamic-class';

// this directive creates, updates and destroys the error control component dynamically

@Directive({selector: '[adfErrorComponent]'})
export class DynamicFormErrorComponentDirective implements OnInit, DoCheck, OnDestroy {
  @Input()
  model!: ControlModel;

  @Input()
  error!: DynamicValidationError;

  private componentRef: ComponentRef<DynamicFormError>|undefined;
  private dynamicClass: DynamicClass|undefined;

  constructor(
      public form: DynamicFormComponent, private componentsFactoryService: DynamicFormComponentFactoryService,
      private viewContainerRef: ViewContainerRef, private renderer: Renderer2,
      private keyValueDiffers: KeyValueDiffers) {}

  ngOnInit(): void {
    const componentFactory = this.componentsFactoryService.getErrorComponentFactory();

    // create the component:
    try {
      this.componentRef = this.viewContainerRef.createComponent<DynamicFormError>(
          componentFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      /* istanbul ignore next */
      {
        e.message = `failed to create error component: ${e.message}`;
        throw(e);
      }
    }

    // instantiate helper class to dynamically change CSS classes on the host element of the component:
    this.dynamicClass = new DynamicClass(
        this.keyValueDiffers, (this.componentRef.instance as DynamicFormErrorComponent).elementRef, this.renderer,
        this.model.css.error);
  }

  ngDoCheck(): void {
    /* istanbul ignore else */
    if (this.dynamicClass) {
      this.dynamicClass.ngDoCheck();
      }
    /* istanbul ignore else */
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.instance.error = this.error;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.dynamicClass) {
      this.dynamicClass.classes = {};
      this.dynamicClass = undefined;
      }
    /* istanbul ignore else */
    if (this.componentRef) {
      this.componentRef.instance.ngOnDestroy();
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
