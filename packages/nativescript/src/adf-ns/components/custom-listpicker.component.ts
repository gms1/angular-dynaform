import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
// import {ListPicker} from 'ui/list-picker';


@Component({
  selector: 'adf-custom-listpicker',
  template: `
    <ListPicker
      [items]="items" [isEnabled]="isEnabled" [selectedIndex]="selectedIndex" (selectedIndexChange)="selectedIndexChanged($event.value)" (touch)="onTouched()"
      [id]="id"
      [ngClass]="ngClass"
    >
    </ListPicker>
`,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CustomListPicker, multi: true}]
})
export class CustomListPicker implements ControlValueAccessor {
  @Input()
  items!: string[];

  @Input()
  id!: string;

  @Input()
  ngClass!: {[key: string]: boolean};

  selectedIndex: number;
  isEnabled: boolean;

  onChange: (value: any) => void;
  onTouched: () => void;

  constructor() {
    this.selectedIndex = -1;
    this.isEnabled = true;
    this.onChange = (value: any) => {};
    this.onTouched = () => {};
  }

  public selectedIndexChanged(index: number): void {
    this.selectedIndex = index;
    console.log(`got index = ${this.selectedIndex}`);
    if (this.selectedIndex < 0 || !this.items || this.items.length <= this.selectedIndex) {
      console.log(`set value = undefined`);
      this.onChange(undefined);
    } else {
      console.log(`set value = ${this.items[this.selectedIndex]}`);
      this.onChange(this.items[this.selectedIndex]);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: any): void {
    console.log(`got value = ${value}`);
    this.selectedIndex = this.items ? this.items.indexOf(value) : -1;
    console.log(`set index = ${this.selectedIndex}`);
  }
  setDisabledState(isDisabled: boolean): void {
    this.isEnabled = !isDisabled;
  }
}
