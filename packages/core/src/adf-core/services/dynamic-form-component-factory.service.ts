import {Injectable, Type} from '@angular/core';
import {ComponentFactory, ComponentFactoryResolver} from '@angular/core';

// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';
import {DynamicFormErrorComponent} from '../components/dynamic-form-error.component';
// tslint:disable-next-line no-unused-variable  ?
import {DynamicFormFormControlComponent} from '../components/dynamic-form-form-control.component';
import {ControlConfig} from '../config/control-config.interface';
import * as ControlType from '../config/control-types.enum';

import {DynamicFormService} from './dynamic-form.service';


// provides the factories for the available (registered) types of components, which can then be instantiated using
// dependency injection

@Injectable()
export class DynamicFormComponentFactoryService {
  private formControlComponent: Type<DynamicFormFormControlComponent>;
  private controlComponentRegistry: Map<string, Type<DynamicFormControlComponentBase>>;
  private errorComponent: Type<DynamicFormErrorComponent>;

  constructor(private dynamicFormService: DynamicFormService, private resolver: ComponentFactoryResolver) {
    this.formControlComponent = this.dynamicFormService.formControlComponentType;
    this.controlComponentRegistry = this.dynamicFormService.controlComponentTypes;
    this.errorComponent = this.dynamicFormService.errorComponentType;
  }

  getFormControlComponentFactory(): ComponentFactory<DynamicFormFormControlComponent>|undefined {
    return this.resolver.resolveComponentFactory<DynamicFormFormControlComponent>(this.formControlComponent);
  }

  getControlComponentFactory(config: ControlConfig): ComponentFactory<DynamicFormControlComponentBase>|never {
    let controlType: Type<DynamicFormControlComponentBase>|undefined;
    if (Array.isArray(config.controlType)) {
      for (let typeName of config.controlType) {
        controlType = this.controlComponentRegistry.get(typeName);
        if (controlType) {
          break;
        }
      }
    } else {
      controlType = this.controlComponentRegistry.get(config.controlType) ||
          this.controlComponentRegistry.get(ControlType.CONTROL_UNKNOWN);
    }
    if (!controlType) {
      throw new Error(`control component '${config.controlType}' defined for '${config.id}' not found`);
    }
    return this.resolver.resolveComponentFactory<DynamicFormControlComponentBase>(controlType);
  }

  getErrorComponentFactory(): ComponentFactory<DynamicFormErrorComponent> {
    return this.resolver.resolveComponentFactory<DynamicFormErrorComponent>(this.errorComponent);
  }
}
