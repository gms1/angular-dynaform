//
// NOTES:
// 1) tested and reviewed multiple JSON pointer implmentations, especially 'jsonpointer'.
// Some did not have support for 'compiling' the JSON pointer,
// 'jsonpointer' did have, but did not unescape the array items in the compiled form
// => this implementation of a JSON pointer was 4 times faster!
//
// 2) wanted to have a JSON pointer implementation which supports the concatenation of compiled JSON pointers


export class JsonPointer {
  static escapedMatcher: RegExp = /~[01]/g;
  static unescapedMatcher: RegExp = /[~\/]/g;

  private constructor(private pointer: string[]) {}

  get(input: any): any {
    let node = input;

    for (let idx = 0; idx < this.pointer.length;) {
      if (node === null || typeof node !== 'object') {
        return undefined;
      }
      node = node[this.pointer[idx++]];
    }
    return node;
  }

  /**
   * set value
   *
   * @param {*} input
   * @param {*} value
   * @returns {*}       returns 'value' if pointer.length === 1 or 'input' otherwise
   *
   * throws if 'input' is not an object
   * throws if one of the ancestors is a scalar
   */
  set(input: any, value: any): any {
    if (typeof input !== 'object') {
      throw new Error('Invalid input object.');
    }
    if (this.pointer.length === 0) {
      throw new Error(`setting via root JSON pointer is not allowed.`);
    }

    const len = this.pointer.length - 1;
    let node = input;
    let nextnode: any;
    let part: string;

    for (let idx = 0; idx < len;) {
      if (node === null || typeof node !== 'object') {
        throw new Error(`Invalid JSON pointer reference (level ${idx}).`);
      }
      part = this.pointer[idx++];
      nextnode = node[part];
      if (nextnode === undefined) {
        if (this.pointer[idx] === '-') {
          nextnode = [];
        } else {
          nextnode = {};
        }
        if (Array.isArray(node)) {
          if (part === '-') {
            node.push(nextnode);
          } else {
            let i = parseInt(part, 10);
            if (isNaN(i)) {
              throw Error(`Invalid JSON pointer array index reference (level ${idx}).`);
            }
            node[i] = nextnode;
          }
        } else {
          node[part] = nextnode;
        }
      }
      node = nextnode;
    }

    if (value === undefined) {
      delete node[this.pointer[len]];
    } else {
      if (Array.isArray(node)) {
        let i = parseInt(this.pointer[len], 10);
        if (isNaN(i)) {
          throw Error(`Invalid JSON pointer array index reference at end of pointer.`);
        }
        node[i] = value;
      } else {
        if (typeof node !== 'object') {
          throw new Error(`Invalid JSON pointer reference at end of pointer.`);
        }
        node[this.pointer[len]] = value;
      }
    }
    return input;
  }

  concat(p: JsonPointer): JsonPointer { return new JsonPointer(this.pointer.concat(p.pointer)); }
  concatKey(name: string): JsonPointer { return new JsonPointer(this.pointer.concat(name)); }
  concatPointer(pointer: string): JsonPointer { return this.concat(JsonPointer.compile(pointer)); }

  toString(): string {
    return '/'.concat(
        this.pointer.map((v: string) => v.replace(JsonPointer.unescapedMatcher, JsonPointer.unescapedReplacer))
            .join('/'));
  }

  static get(obj: any, pointer: string): any {
    let jp = JsonPointer.compile(pointer);
    return jp.get(obj);
  }
  static set(obj: any, pointer: string, value: any): any {
    let jp = JsonPointer.compile(pointer);
    return jp.set(obj, value);
  }

  static compile(pointer: string): JsonPointer {
    let compiled = pointer.split('/');
    let firstPart = compiled.length >= 1 ? compiled.shift() : undefined;
    if (firstPart !== '') {
      throw new Error(`JSON pointer '${pointer}' is invalid.`);
    }
    return new JsonPointer(
        compiled.map((v: string) => v.replace(JsonPointer.escapedMatcher, JsonPointer.escapedReplacer)));
  }

  static escapedReplacer(v: string): string {
    switch (v) {
      case '~1':
        return '/';
      case '~0':
        return '~';
    }
    throw new Error('JsonPointer.escapedReplacer: this should not happen');
  }

  static unescapedReplacer(v: string): string {
    switch (v) {
      case '/':
        return '~1';
      case '~':
        return '~0';
    }
    throw new Error('JsonPointer.unescapedReplacer: this should not happen');
  }
}
