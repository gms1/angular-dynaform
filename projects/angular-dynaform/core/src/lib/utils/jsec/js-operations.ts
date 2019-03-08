// tslint:disable only-arrow-functions object-literal-shorthand no-bitwise triple-equals restrict-plus-operands
// NOTES: we avoid using arrow functions here, which would force us to bind them to this in 'consumeAST'

export type BinaryFunction = (a: any, b: any) => any;
export interface BinaryOperations {
  [key: string]: BinaryFunction;
}

export type UnaryFunction = (a: any) => any;
export interface UnaryOperations {
  [key: string]: UnaryFunction;
}

// we do not need to unit test all of our configuration data:
/* istanbul ignore next */
export const BINARYOPS: BinaryOperations = {
  '||': function(a: any, b: any): any {
    return a || b;
  },
  '&&': function(a: any, b: any): any {
    return a && b;
  },
  '|': function(a: any, b: any): any {
    return a | b;
  },
  '^': function(a: any, b: any): any {
    return a ^ b;
  },
  '&': function(a: any, b: any): any {
    return a & b;
  },
  '==': function(a: any, b: any): any {
    return a == b;
  },
  '!=': function(a: any, b: any): any {
    return a != b;
  },
  '===': function(a: any, b: any): any {
    return a === b;
  },
  '!==': function(a: any, b: any): any {
    return a !== b;
  },
  '<': function(a: any, b: any): any {
    return a < b;
  },
  '>': function(a: any, b: any): any {
    return a > b;
  },
  '<=': function(a: any, b: any): any {
    return a <= b;
  },
  '>=': function(a: any, b: any): any {
    return a >= b;
  },
  '<<': function(a: any, b: any): any {
    return a << b;
  },
  '>>': function(a: any, b: any): any {
    return a >> b;
  },
  '>>>': function(a: any, b: any): any {
    return a >>> b;
  },
  '+': function(a: any, b: any): any {
    return a + b;
  },
  '-': function(a: any, b: any): any {
    return a - b;
  },
  '*': function(a: any, b: any): any {
    return a * b;
  },
  '/': function(a: any, b: any): any {
    return a / b;
  },
  '%': function(a: any, b: any): any {
    return a % b;
  },
};

// we do not need to unit test all of our configuration data:
/* istanbul ignore next */
export const UNARYOPS: UnaryOperations = {
  '-': function(a: any): any {
    return -a;
  },
  '+': function(a: any): any {
    return a;
  },
  '~': function(a: any): any {
    return ~a;
  },
  '!': function(a: any): any {
    return !a;
  },
};
