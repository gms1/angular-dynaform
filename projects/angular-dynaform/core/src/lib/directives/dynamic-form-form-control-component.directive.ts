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
import {DynamicFormFormControl} from '../components/dynamic-form-form-control.interface';
import {DynamicFormFormControlComponent} from '../components/dynamic-form-form-control.component';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {GroupModel} from '../models/group-model';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';

import {DynamicClass} from '../utils/dynamic-class';

// this directive creates, updates and destroys the DynamicFormFormControlComponent dynamically,
// initializes the model (input-)property of the DynamicFormFormControlComponent
// and forwards the (output-)-submit/reset-events of the DynamicFormFormControlComponent
// to the DynamicFormComponent

@Directive({selector: '[adfFormControlComponent]'})
export class DynamicFormFormControlComponentDirective implements OnInit, DoCheck, OnDestroy {
  @Input()
  model!: GroupModel;

  private componentRef: ComponentRef<DynamicFormFormControl>|undefined;
  private dynamicClass: DynamicClass|undefined;

  constructor(
      public form: DynamicFormComponent, private componentsFactoryService: DynamicFormComponentFactoryService,
      private viewContainerRef: ViewContainerRef, private renderer: Renderer2,
      private keyValueDiffers: KeyValueDiffers) {}

  ngOnInit(): void {
    const formControlFactory = this.componentsFactoryService.getFormControlComponentFactory();

    /* istanbul ignore if */
    if (!formControlFactory) {
      throw new Error('failed to resolve factory for DynamicFormFormControl');
      }

    // create the component:
    try {
      this.componentRef = this.viewContainerRef.createComponent<DynamicFormFormControl>(
          formControlFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      /* istanbul ignore next */
      {
        e.message = `failed to create form control component: ${e.message}`;
        throw(e);
      }
    }

    // register the newly created component:

    this.form.formControlRef = this.componentRef;
    this.form.registerComponent(this.model.id, this.componentRef.instance);

    this.componentRef.instance.submit.subscribe(() => this.form.adfSubmit.emit());
    this.componentRef.instance.reset.subscribe(() => this.form.adfReset.emit());

    // instantiate helper class to dynamically change CSS classes on the host element of the component:
    this.dynamicClass = new DynamicClass(
        this.keyValueDiffers, (this.componentRef.instance as DynamicFormFormControlComponent).elementRef as ElementRef,
        this.renderer, this.model.css.container);
  }

  ngDoCheck(): void {
    /* istanbul ignore else */
    if (this.dynamicClass) {
      this.dynamicClass.ngDoCheck();
      }
    /* istanbul ignore else */
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
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
      this.form.formControlRef = undefined;
      this.form.unRegisterComponent(this.model.id);
      this.componentRef.instance.submit.unsubscribe();
      this.componentRef.instance.reset.unsubscribe();
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
