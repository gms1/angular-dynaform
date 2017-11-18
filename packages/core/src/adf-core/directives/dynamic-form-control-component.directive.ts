import {ComponentRef, Directive, Input, DoCheck, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormControl} from '../components/dynamic-form-control.interface';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {ControlModel} from '../models/control-model.interface';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';

// this directive creates/destroys the DynamicFormControls dynamically
// and initializes the model (input-)property of the DynamicFormControls

@Directive({selector: '[adfControlComponent]'})
export class DynamicFormControlComponentDirective implements OnInit, DoCheck, OnDestroy {
  @Input()
  model: ControlModel;

  private componentRef: ComponentRef<DynamicFormControl>|undefined;

  constructor(
      public form: DynamicFormComponent, private componentsFactoryService: DynamicFormComponentFactoryService,
      private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void { this.createComponent(); }

  ngDoCheck(): void { this.checkComponent(); }

  ngOnDestroy(): void { this.destroyComponent(); }

  private createComponent(): void {
    let componentFactory = this.componentsFactoryService.getControlComponentFactory(this.model.config);

    try {
      this.componentRef = this.viewContainerRef.createComponent<DynamicFormControl>(
          componentFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      e.message = `failed to create control component for '${this.model.id}': ${e.message}`;
      throw(e);
    }
    this.form.registerComponent(this.model.id, this.componentRef.instance);
  }

  private checkComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private destroyComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.ngOnDestroy();
      this.form.unRegisterComponent(this.model.id);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
