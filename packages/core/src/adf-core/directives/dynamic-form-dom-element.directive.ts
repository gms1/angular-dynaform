// TODO: remove tslint:disable
// tslint:disable
import {Directive, ElementRef, Renderer} from '@angular/core';

import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// forwards blur/focus/click events on the element to the component

@Directive({
  selector: '[adfDomElement]',
})
export class DynamicFormDomElementDirective {
  constructor(
      protected elementRef: ElementRef, protected renderer: Renderer,
      protected component: DynamicFormControlComponentBase) {}

  onBlur(event?: Event): void { this.component.onElementBlur(event); }

  onFocus(event?: Event): void { this.component.onElementFocus(event); }

  onClick(event?: Event): void { this.component.onElementClick(event); }
}
