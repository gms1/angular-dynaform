import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {ValueOptions} from '@angular-dynaform/core';

// TODO: forward focus-, blur- and click-events if enabled

@Component({
  selector: 'adf-custom-listpicker',
  template: `
    <ListPicker
      [id]="id"
      [items]="listPickerItems"
      [isEnabled]="isEnabled"
      [selectedIndex]="selectedIndex" (selectedIndexChange)="selectedIndexChanged($event.value)"
    >
    <!-- TODO: not implemented: "options.multiple" -->
    </ListPicker>
`,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CustomListPickerComponent, multi: true}]
})
export class CustomListPickerComponent implements ControlValueAccessor, OnInit {
  @Input()
  id?: string;

  @Input()
  valueOptions?: ValueOptions[];

  // array of labels used by ListPicker control:
  listPickerItems: Array<string>;

  // to disable the ListPicker control:
  isEnabled: boolean;

  // to set the index of the ListPicker control:
  selectedIndex?: number;

  // array of values to get selected value for selected index:
  private listPickerValues: Array<any>;

  constructor() {
    this.isEnabled = true;
    this.listPickerValues = [];
    this.listPickerItems = [];
  }

  ngOnInit(): void {
    if (this.valueOptions) {
      this.listPickerValues = this.valueOptions.map((opt) => opt.value);
      this.listPickerItems = this.valueOptions.map((opt) => opt.label);
    } else {
      this.listPickerValues = [];
      this.listPickerItems = [];
    }
  }

  selectedIndexChanged(index: number): void {
    const newValue = index < 0 || index >= this.listPickerValues.length ? null : this.listPickerValues[index];
    this.onChange(newValue);  // call registered onChange callback to set the form model value
  }


  private onChange = (val: any): void => {};

  // tslint:disable no-unused-variable
  private onTouched = (): void => {};

  registerOnChange(fn: (val: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isEnabled = !isDisabled;
  }

  writeValue(val: any) {
    // search for the index of the given value
    const newIdx = this.listPickerValues.indexOf(val);
    // update selectedIndex to update the ListPicker control
    this.selectedIndex = newIdx >= 0 ? newIdx : undefined;
  }
}
