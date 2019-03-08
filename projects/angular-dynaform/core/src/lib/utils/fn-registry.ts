// tslint:disable no-unused-variable

export class FnRegistry<Fn> {
  private _reg: Map<string, Fn>;

  constructor() {
    this._reg = new Map<string, Fn>();
  }

  hasFn(name: string): boolean {
    return this._reg.has(name);
  }

  getFn(name: string): Fn | undefined {
    return this._reg.get(name);
  }

  setFn(name: string, value: Fn, ifNotExist?: boolean): void {
    if (!ifNotExist || !this.hasFn(name)) {
      this._reg.set(name, value);
    }
  }
}
