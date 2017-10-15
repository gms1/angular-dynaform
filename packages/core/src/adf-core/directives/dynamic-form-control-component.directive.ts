import {OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ComponentRef, Directive, Input, SimpleChanges, ViewContainerRef} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormControl} from '../components/dynamic-form-control.interface';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';

// this directive creates, updates and destroys the control components dynamically

// this directive creates/destroys the DynamicFormControls dynamically
// and initializes the model (input-)property of the DynamicFormControls

@Directive({selector: '[adfControlComponent]'})
export class DynamicFormControlComponentDirective implements OnChanges, OnInit, OnDestroy {
  @Input()
  model: ControlModel;

  private componentRef: ComponentRef<DynamicFormControl>|undefined;

  constructor(
      public form: DynamicFormComponent, private componentsFactoryService: DynamicFormComponentFactoryService,
      private viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.componentRef) {
      this.createComponent();
    }
    this.updateComponent();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.ngOnDestroy();
      this.destroyComponent();
    }
  }

  private createComponent(): void {
    let componentFactory = this.componentsFactoryService.getControlComponentFactory(this.model.config);

    let componentRef: ComponentRef<DynamicFormControl>;
    try {
      componentRef = this.viewContainerRef.createComponent<DynamicFormControl>(
          componentFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      e.message = `failed to create control component for '${this.model.id}': ${e.message}`;
      throw(e);
    }

    this.componentRef = componentRef;
    this.form.registerComponent(this.model.id, this.componentRef.instance);
  }

  private updateComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private destroyComponent(): void {
    if (this.componentRef) {
      this.form.unRegisterComponent(this.model.id);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
