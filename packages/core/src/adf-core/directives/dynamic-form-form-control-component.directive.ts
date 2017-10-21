import {
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormFormControl} from '../components/dynamic-form-form-control.interface';
import {DynamicFormComponent} from '../components/dynamic-form.component';
import {GroupModel} from '../models/group-model';
import {DynamicFormComponentFactoryService} from '../services/dynamic-form-component-factory.service';

// this directive creates, updates and destroys the DynamicFormFormControlComponent dynamically,
// initializes the model (input-)property of the DynamicFormFormControlComponent
// and forwards the (output-)-submit/reset-events of the DynamicFormFormControlComponent
// to the DynamicFormComponent

@Directive({selector: '[adfFormControlComponent]'})
export class DynamicFormFormControlComponentDirective implements OnChanges, OnInit, OnDestroy {
  @Input()
  model: GroupModel;

  private componentRef: ComponentRef<DynamicFormFormControl>|undefined;

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
    let formControlFactory = this.componentsFactoryService.getFormControlComponentFactory();
    if (!formControlFactory) {
      throw new Error('failed to resolve factory for DynamicFormFormControl');
    }
    let componentRef: ComponentRef<DynamicFormFormControl>;
    try {
      componentRef = this.viewContainerRef.createComponent<DynamicFormFormControl>(
          formControlFactory, undefined, this.viewContainerRef.injector);
    } catch (e) {
      e.message = `failed to create form control component: ${e.message}`;
      throw(e);
    }

    componentRef.instance.submit.subscribe(() => this.form.adfSubmit.emit());
    componentRef.instance.reset.subscribe(() => this.form.adfReset.emit());

    this.componentRef = componentRef;
    this.form.formControlRef = this.componentRef;
  }

  private updateComponent(): void {
    if (this.componentRef) {
      this.componentRef.instance.model = this.model;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private destroyComponent(): void {
    if (this.componentRef) {
      this.form.formControlRef = undefined;
      this.componentRef.instance.submit.unsubscribe();
      this.componentRef.instance.reset.unsubscribe();
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
