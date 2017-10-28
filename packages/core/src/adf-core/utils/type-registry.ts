// tslint:disable no-unused-variable
import {Type, Injector} from '@angular/core';


export class TypeRegistry<T> {
  private _reg: Map<string, Type<T>>;

  get snapshot(): Map<string, Type<T>> { return new Map<string, Type<T>>(this._reg); }

  constructor() { this._reg = new Map<string, Type<T>>(); }

  hasType(name: string): boolean { return this._reg.has(name); }

  getType(name: string): Type<T>|undefined { return this._reg.get(name); }

  setType(name: string, value: Type<T>, ifNotExist?: boolean): void {
    if (!ifNotExist || !this.hasType(name)) {
      this._reg.set(name, value);
    }
  }

  getInstance(injector: Injector, name: string): T {
    let type = this.getType(name);
    if (!type) {
      throw new Error(`no type registered for '${name}'`);
    }
    return injector.get(type);
  }

  getInstances(injector: Injector, names: string|string[]): {name: string, instance: T}[] {
    let types: {name: string, instance: T}[] = [];
    if (Array.isArray(names)) {
      names.forEach((name) => { types.push({name, instance: this.getInstance(injector, name)}); });
    } else {
      types.push({name, instance: this.getInstance(injector, names)});
    }
    return types;
  }
}
