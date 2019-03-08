import {
  ComponentRef,
  Directive,
  Input,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  KeyValueDiffers,
  Renderer2,
} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import { DynamicFormControl } from '../components/dynamic-form-control';
import { DynamicFormControlComponentBase } from '../components/dynamic-form-control.component';
import { DynamicFormComponent } from '../components/dynamic-form.component';
import { ControlModel } from '../models/control-model';
import { DynamicFormComponentFactoryService } from '../services/dynamic-form-component-factory.service';

import { DynamicClass } from '../utils/dynamic-class';

// this directive creates/destroys the DynamicFormControls dynamically
// and initializes the model (input-)property of the DynamicFormControls

@Directive({ selector: '[adfControlComponent]' })
export class DynamicFormControlComponentDirective implements OnInit, DoCheck, OnDestroy {
  @Input() model!: ControlModel;

  private componentRef: ComponentRef<DynamicFormControl> | undefined;
  private dynamicClass: DynamicClass | undefined;

  constructor(
    public form: DynamicFormComponent,
    private componentsFactoryService: DynamicFormComponentFactoryService,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private keyValueDiffers: KeyValueDiffers,
  ) {}

  ngOnInit(): void {
    const componentFactory = this.componentsFactoryService.getControlComponentFactory(
      this.model.config,
    );

    // create the component:
    try {
      this.componentRef = this.viewContainerRef.createComponent<DynamicFormControl>(
        componentFactory,
        undefined,
        this.viewContainerRef.injector,
      );
    } catch (e) {
      /* istanbul ignore next */
      {
        e.message = `failed to create control component for '${this.model.id}': ${e.message}`;
        throw e;
      }
    }

    // register the newly created component:
    this.form.registerComponent(this.model.id, this.componentRef.instance);

    // instantiate helper class to dynamically change CSS classes on the host element of the component:
    this.dynamicClass = new DynamicClass(
      this.keyValueDiffers,
      (this.componentRef.instance as DynamicFormControlComponentBase).elementRef,
      this.renderer,
      this.model.css.container,
    );
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
      this.form.unRegisterComponent(this.model.id);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
