import {Directive, ElementRef, Renderer} from '@angular/core';

import {DynamicFormDomElementDirective} from './dynamic-form-dom-element.directive';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// forwards blur/focus/click events to the control component and calls the lifecycle hooks for optional dynamic actions

@Directive({
  selector: '[adfHTMLDomElement]',
  host: {'(blur)': 'onBlur($event)', '(focus)': 'onFocus($event)', '(click)': 'onClick($event)'}
})
export class DynamicFormHTMLDomElementDirective extends DynamicFormDomElementDirective {
  constructor(elementRef: ElementRef, renderer: Renderer, component: DynamicFormControlComponentBase) {
    super(elementRef, renderer, component);
  }
}
