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
    this.createComponent();
  }

  ngDoCheck(): void {
    this.checkComponent();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }

  private createComponent(): void {
    const formControlFactory = this.componentsFactoryService.getFormControlComponentFactory();
    if (!formControlFactory) {
      throw new Error('failed to resolve factory for DynamicFormFormControl');
      }
    try {
      this.componentRef = this.viewContainerRef.createComponent<DynamicFormFormControl>(
          formControlFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      e.message = `failed to create form control component: ${e.message}`;
      throw(e);
    }

    this.componentRef.instance.submit.subscribe(() => this.form.adfSubmit.emit());
    this.componentRef.instance.reset.subscribe(() => this.form.adfReset.emit());

    this.form.formControlRef = this.componentRef;
    this.form.registerComponent(this.model.id, this.componentRef.instance);

    // tslint:disable no-unnecessary-type-assertion
    if ((this.componentRef.instance as any).elementRef) {
      // TODO: test for instanceof ElementRef
      this.dynamicClass = new DynamicClass(
          this.keyValueDiffers, (this.componentRef.instance as any).elementRef as ElementRef, this.renderer);
      this.dynamicClass.classes = this.model.css.container;
    }
  }

  private checkComponent(): void {
    if (this.dynamicClass) {
      this.dynamicClass.ngDoCheck();
      }
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private destroyComponent(): void {
    this.dynamicClass = undefined;
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
