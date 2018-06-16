import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

// TODO: forward focus-, blur- and click-events if enabled

@Component({
  selector: 'adf-custom-checkbox',
  template: `
    <CheckBox
      [id]="id"
      [text]="text"
      [isEnabled]="isEnabled" [checked]="checked" (checkedChange)="checkedChange($event.value)"
      class="checkbox"
    >
    </CheckBox>
`,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CustomCheckBoxComponent, multi: true}]
})
export class CustomCheckBoxComponent implements ControlValueAccessor {
  @Input()
  id?: string;

  @Input()
  text?: string;

  checked: boolean;
  isEnabled: boolean;

  constructor() {
    this.checked = false;
    this.isEnabled = true;
  }

  private onChange = (val: any): void => {};

  // tslint:disable no-unused-variable
  private onTouched = (): void => {};

  public checkedChange(checked: boolean): void {
    this.checked = !!checked;
    this.onChange(this.checked);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: any): void {
    this.checked = !!value;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isEnabled = !isDisabled;
  }
}
