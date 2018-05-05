// tslint:disable no-use-before-declare
// tslint:disable-next-line no-require-imports no-var-requires
// const jsep = require('jsep')(true);
import * as jsep from 'jsep';

// to make rollup happy: (should normally be able to use imported 'jsep' instead)
const jsepCall = jsep;

import {JsonPointer} from 'jsonpointerx';


interface JsMemberVariable {
  keys: string[];
  jp?: JsonPointer;
  getObject(): any;
  }

export class JsExpression {
  private _context: any;
  private _thisArg: any;

  get context(): any {
    return this._context;
  }
  set context(context: any) {
    this._context = context;
  }
  get thisArg(): any {
    return this._thisArg;
  }
  set thisArg(thisArg: any) {
    this._thisArg = thisArg;
  }

  private _contextMembers: JsMemberVariable[];
  private _thisMembers: JsMemberVariable[];
  private _resolveVariable: (variable: JsMemberVariable) => any;
  private _fnJsExpression: () => any;

  constructor() {
    this._contextMembers = [];
    this._thisMembers = [];
    this._fnJsExpression = () => undefined;
    this._resolveVariable = (variable: JsMemberVariable) => variable;
  }

  run(): any {
    return this._fnJsExpression();
  }

  compile(expression: string): void {
    this._contextMembers = [];
    this._thisMembers = [];
    this._resolveVariable = (variable: JsMemberVariable) => variable;
    this._fnJsExpression = this.consumeAST(jsepCall(expression));
    this._resolveVariable = (variable: JsMemberVariable) =>
        variable.jp ? variable.jp.get(variable.getObject()) : undefined;
    this._contextMembers.forEach((variable) => {
      variable.jp = new JsonPointer(variable.keys);
    });
    this._thisMembers.forEach((variable) => {
      variable.jp = new JsonPointer(variable.keys);
    });
  }

  getContextMembersRoot(): string[] {
    return this.getMembersRoot(this._contextMembers);
  }

  getThisMembersRoot(): string[] {
    return this.getMembersRoot(this._thisMembers);
  }


  private consumeAST(node: jsep.Expression): () => any {
    // NOTES: make sure the AST is consumed before/outside of the returned function
    //   see arg1, arg2 in BinaryExpression
    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      const binaryNode = node as jsep.BinaryExpression;
      const binaryOp = (BINARYOPS)[binaryNode.operator];
      if (!binaryOp) {
        throw new Error(`unsupported expression: ${binaryNode.operator}(arg1, arg2)`);
        }
      const arg1 = this.consumeAST(binaryNode.left);
      const arg2 = this.consumeAST(binaryNode.right);
      return () => binaryOp(arg1(), arg2());
    } else if (node.type === 'UnaryExpression') {
      const unaryNode = node as jsep.UnaryExpression;
      const unaryOp = UNARYOPS[unaryNode.operator];
      if (!unaryOp) {
        throw new Error(`unsupported expression: ${unaryNode.operator}(arg)`);
        }
      const arg = this.consumeAST(unaryNode.argument);
      return () => unaryOp(arg());
    } else if (node.type === 'ConditionalExpression') {
      const test = this.consumeAST((node as any).test);
      const consequent = this.consumeAST((node as any).consequent);
      const alternate = this.consumeAST((node as any).alternate);
      return () => test() ? consequent() : alternate();
    } else if (node.type === 'ArrayExpression') {
      const elements: any[] = [];
      (node as any).elements.forEach((element: any) => {
        elements.push(this.consumeAST(element));
      });
      return () => {
        const res: any = [];
        elements.forEach((element: any) => {
          res.push(element());
        });
        return res;
      };
    } else if (node.type === 'Literal') {
      return () => (node as jsep.Literal).value;
    } else if (node.type === 'MemberExpression') {
      const memberNode = node as jsep.MemberExpression;
      const variable = this.consumeAST(memberNode.object)();
      if (memberNode.computed) {
        const keys = this.consumeAST(memberNode.property)();
        variable.keys.push(keys);
      } else {
        variable.keys.push((memberNode.property as jsep.Identifier).name);
        }
      return this.consumeVariable.bind(this, variable);
    } else if (node.type === 'Identifier') {
      const variable: JsMemberVariable = {getObject: () => this.context, keys: [(node as jsep.Identifier).name]};
      this._contextMembers.push(variable);
      return this.consumeVariable.bind(this, variable);
    } else if (node.type === 'ThisExpression') {
      const variable: JsMemberVariable = {getObject: () => this.thisArg, keys: []};
      this._thisMembers.push(variable);
      return this.consumeVariable.bind(this, variable);
      }
    throw new Error(`unsupported expression type ${node.type}`);
  }

  private consumeVariable(variable: JsMemberVariable): any {
    return this._resolveVariable(variable);
  }

  private getMembersRoot(members: JsMemberVariable[]): string[] {
    return members.map((curr) => curr.keys).reduce((prev, curr, idx, arr) => {
      const minLen = Math.min(prev.length, curr.length);
      for (let i = 0; i < minLen; i++) {
        if (curr[i] !== prev[i]) {
          return prev.slice(0, i);
        }
        }
      return minLen === prev.length ? prev : prev.slice(0, minLen);
    });
  }


  static compile(expression: string): JsExpression {
    const self = new JsExpression();
    self.compile(expression);
    return self;
  }
}



// tslint:disable only-arrow-functions object-literal-shorthand no-bitwise triple-equals restrict-plus-operands
// NOTES: we avoid using arrow functions here, which would force us to bind them to this in 'consumeAST'

type BinaryFunction = (a: any, b: any) => any;

const BINARYOPS: {[key: string]: BinaryFunction} = {
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
  }
};

type UnaryFunction = (a: any) => any;

const UNARYOPS: {[key: string]: UnaryFunction} = {
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
  }
};