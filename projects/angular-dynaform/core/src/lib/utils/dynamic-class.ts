import {DoCheck, ElementRef, KeyValueDiffer, KeyValueDiffers, Renderer2} from '@angular/core';

export class DynamicClass implements DoCheck {
  private _classes: {[clazz: string]: any};
  private keyValueDiffer!: KeyValueDiffer<string, any>;

  get classes(): {[clazz: string]: any} {
    return this._classes;
  }
  set classes(classes: {[clazz: string]: any}) {
    this.cleanupElementClasses();

    this._classes = classes;

    this.keyValueDiffer = this.keyValueDiffers.find(this._classes).create();
  }


  constructor(
      private keyValueDiffers: KeyValueDiffers, private elRef: ElementRef, private renderer: Renderer2,
      classes: {[clazz: string]: any}) {
    this._classes = {};
    this.classes = classes;
  }

  ngDoCheck(): void {
    const changes = this.keyValueDiffer.diff(this._classes);
    if (changes) {
      changes.forEachAddedItem((record) => this.setElementClass(record.key, record.currentValue));
      changes.forEachChangedItem((record) => this.setElementClass(record.key, record.currentValue));
      changes.forEachRemovedItem((record) => {
        if (record.previousValue) {
          this.setElementClass(record.key, false);
        }
      });
    }
  }

  private cleanupElementClasses(): void {
    Object.keys(this._classes).forEach((clazz) => {
      this.setElementClass(clazz, false);
    });
  }

  private setElementClass(clazz: string, enabled: boolean): void {
    if (enabled) {
      this.renderer.addClass(this.elRef.nativeElement, clazz);
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, clazz);
    }
  }
}
