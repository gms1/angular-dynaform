// TODO: remove tslint:disable
// tslint:disable
import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer,
  SimpleChanges
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import {
  ModelType,
  ControlConfig,
  DynamicFormControlComponentBase,
  DynamicFormDomElementDirective
} from '@angular-dynaform/core';

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
