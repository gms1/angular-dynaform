// TODO: remove tslint:disable
// tslint:disable
import {Directive, ElementRef, Renderer} from '@angular/core';

import {DynamicFormControlComponentBase, DynamicFormDomElementDirective} from '@angular-dynaform/core';

// forwards blur/focus/click events to the control component and calls the lifecycle hooks for optional dynamic actions

@Directive({
  selector: '[adfNSDomElement]',
  host: {
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()',
    '(tap)': 'onClick()',
  }
})
export class DynamicNSDomElementDirective extends DynamicFormDomElementDirective {
  constructor(elementRef: ElementRef, renderer: Renderer, component: DynamicFormControlComponentBase) {
    super(elementRef, renderer, component);
  }

  onBlur(): void { super.onBlur(); }

  onFocus(): void { super.onFocus(); }

  onClick(): void { super.onClick(); }
}
