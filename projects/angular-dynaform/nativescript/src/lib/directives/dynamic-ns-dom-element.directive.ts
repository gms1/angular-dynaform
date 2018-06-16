// TODO: remove tslint:disable
// tslint:disable
import {Directive, ElementRef, Renderer2} from '@angular/core';

import {DynamicFormControlComponentBase, DynamicFormDomElementDirective} from '@angular-dynaform/core';
import {TextField} from 'tns-core-modules/ui/text-field';

// forwards blur/focus/click events to the control component and calls the lifecycle hooks for optional dynamic actions
// currently focus/blur is only implemented for textviews:
//   see https://github.com/NativeScript/NativeScript/issues/5902


// A TextField/TextView does not get a blur event, if another Control like Button is touched.
// If its FormControl has the updateOn: 'blur' option enabled, its FormControl will have an incorrect value

@Directive({
  selector: '[adfNSDomElement]',
  host: {
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()',
    '(tap)': 'onClick()',
  }
})
export class DynamicNSDomElementDirective extends DynamicFormDomElementDirective {
  constructor(elementRef: ElementRef, renderer: Renderer2, component: DynamicFormControlComponentBase) {
    super(elementRef, renderer, component);
  }

  onFocus(): void {
    // this.component.form.uiProperties.focus = this.elementRef;
    super.onFocus();
  }

  onBlur(): void {
    // this.component.form.uiProperties.focus = undefined;
    super.onBlur();
  }

  onClick(): void {
    // if (this.component.form.uiProperties.focus !== this.elementRef) {
    //   let view = this.component.form.uiProperties.focus.nativeElement as TextField;
    //   if (view.dismissSoftInput) {
    //     view.dismissSoftInput();
    //   }
    // }
    super.onClick();
  }
}
