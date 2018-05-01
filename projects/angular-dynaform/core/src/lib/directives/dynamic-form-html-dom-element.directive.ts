import {Directive, ElementRef, Renderer2} from '@angular/core';

import {DynamicFormDomElementDirective} from './dynamic-form-dom-element.directive';
import {DynamicFormControlComponentBase} from '../components/dynamic-form-control.component';

// forwards blur/focus/click events to the control component and calls the lifecycle hooks for optional dynamic actions

// tslint:disable use-host-property-decorator
@Directive({
  selector: '[adfHTMLDomElement]',
  host: {'(blur)': 'onBlur($event)', '(focus)': 'onFocus($event)', '(click)': 'onClick($event)'}
})
export class DynamicFormHTMLDomElementDirective extends DynamicFormDomElementDirective {
  constructor(elementRef: ElementRef, renderer: Renderer2, component: DynamicFormControlComponentBase) {
    super(elementRef, renderer, component);
  }
}
