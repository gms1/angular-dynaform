import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {TNSCheckBoxModule} from 'nativescript-checkbox/angular';


@Component({
  selector: 'adf-custom-checkbox',
  template: `
    <CheckBox
      [items]="items" [isEnabled]="isEnabled" [selectedIndex]="selectedIndex" (checkedChange)="checkedChange($event.value)" (touch)="onTouched()"
      [id]="id"
      [ngClass]="ngClass"
    >
    </CheckBox>
`,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CustomCheckBox, multi: true}]
})
export class CustomCheckBox implements ControlValueAccessor {
  @Input()
  id: string;

  @Input()
  ngClass: {[key: string]: boolean};

  checked: boolean;
  isEnabled: boolean;

  onChange: (value: any) => void;
  onTouched: () => void;

  constructor() {
    this.checked = false;
    this.isEnabled = true;
    this.onChange = (value: any) => {};
    this.onTouched = () => {};
  }

  public checkedChange(checked: boolean): void {
    this.checked = !!checked;
    this.onChange(this.checked);
  }

  public registerOnChange(fn: any): void { this.onChange = fn; }
  public registerOnTouched(fn: any): void { this.onTouched = fn; }
  writeValue(value: any): void { this.checked = !!value; }
  setDisabledState(isDisabled: boolean): void { this.isEnabled = !isDisabled; }
}
