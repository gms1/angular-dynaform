import {Component, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {ValueOptions} from '@angular-dynaform/core';


export interface RadioOptions extends ValueOptions { selected: boolean; }

// TODO: forward focus-, blur- and click-events if enabled

@Component({
  selector: 'adf-custom-radiogroup',
  template: `
    <StackLayout class="radiogroup" [id]="id" *ngFor="let option of valueOptions">
      <StackLayout orientation="horizontal" verticalAlignment="center">
        <CheckBox #elem
          [isEnabled]="isEnabled"
          [checked]="option.selected"
          (checkedChange)="elem.checked != option.selected && checkedChange(option)"
          class="radiogroup" boxType="circle">
        </CheckBox>
        <StackLayout verticalAlignment="center">
            <Label [text]="option.label" textWrap="true" (tap)="checkedChange(option)"></Label>
        </StackLayout>
      </StackLayout>
    </StackLayout>
`,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CustomRadioGroupComponent, multi: true}]
})
export class CustomRadioGroupComponent implements ControlValueAccessor, OnInit {
  @Input()
  id?: string;

  @Input()
  valueOptions?: ValueOptions[];

  isEnabled: boolean;

  private radioOptions?: RadioOptions[];
  private lastOption?: RadioOptions;

  constructor() {
    this.isEnabled = true;
  }

  ngOnInit(): void {
    if (!this.valueOptions) {
      this.radioOptions = undefined;
      return;
    }
    this.radioOptions = [];
    // tslint:disable-next-line no-non-null-assertion
    this.valueOptions.forEach((opt) => this.radioOptions!.push({value: opt.value, label: opt.label, selected: false}));
  }

  private onChange = (val: any): void => {};

  // tslint:disable no-unused-variable
  private onTouched = (): void => {};

  public checkedChange(opt: RadioOptions): void {
    if (opt.selected) {
      return;
      }
    if (this.lastOption) {
      this.lastOption.selected = false;
    }
    this.lastOption = opt;
    this.lastOption.selected = true;
    this.onChange(this.lastOption.value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: any): void {
    if (this.lastOption) {
      this.lastOption.selected = false;
    }
    this.lastOption = this.radioOptions ? this.radioOptions.find((opt) => opt.value === value) : undefined;
    if (this.lastOption) {
      this.lastOption.selected = true;
    }
  }
  setDisabledState(isDisabled: boolean): void {
    this.isEnabled = !isDisabled;
  }
}
