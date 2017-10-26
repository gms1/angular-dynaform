import * as jsep from 'jsep';
import {JsonPointer} from 'jsonpointerx';


interface JsMemberVariable {
  keys: string[];
  jp?: JsonPointer;
  getObject(): any;
}

export class JsExpression {
  private _context: any;
  private _thisArg: any;

  get context(): any { return this._context; }
  set context(context: any) { this._context = context; }
  get thisArg(): any { return this._thisArg; }
  set thisArg(thisArg: any) { this._thisArg = thisArg; }

  private _contextMembers: JsMemberVariable[];
  private _thisMembers: JsMemberVariable[];
  private _resolveVariable: (variable: JsMemberVariable) => any;
  private _fnJsExpression: () => any;

  constructor() {
    this._contextMembers = [];
    this._thisMembers = [];
    this._fnJsExpression = () => undefined;
  }

  run(): any { return this._fnJsExpression(); }

  compile(expression: string): void {
    this._contextMembers = [];
    this._thisMembers = [];
    this._resolveVariable = (variable: JsMemberVariable) => variable;
    this._fnJsExpression = this.consumeAST(jsep(expression));
    this._resolveVariable = (variable: JsMemberVariable) =>
        variable.jp ? variable.jp.get(variable.getObject()) : undefined;
    this._contextMembers.forEach((variable) => { variable.jp = new JsonPointer(variable.keys); });
    this._thisMembers.forEach((variable) => { variable.jp = new JsonPointer(variable.keys); });
  }

  getContextMembersRoot(): string[] { return this.getMembersRoot(this._contextMembers); }

  getThisMembersRoot(): string[] { return this.getMembersRoot(this._thisMembers); }


  private consumeAST(node: jsep.IExpression): () => any {
    // NOTES: make sure the AST is consumed before/outside of the returned function
    //   see arg1, arg2 in BinaryExpression
    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      const binaryNode = node as jsep.IBinaryExpression;
      let binaryOp = (BINARYOPS)[binaryNode.operator];
      if (!binaryOp) {
        throw new Error(`unsupported expression: ${binaryNode.operator}(arg1, arg2)`);
      }
      let arg1 = this.consumeAST(binaryNode.left);
      let arg2 = this.consumeAST(binaryNode.right);
      return () => binaryOp(arg1(), arg2());
    } else if (node.type === 'UnaryExpression') {
      const unaryNode = node as jsep.IUnaryExpression;
      let unaryOp = UNARYOPS[unaryNode.operator];
      if (!unaryOp) {
        throw new Error(`unsupported expression: ${unaryNode.operator}(arg)`);
      }
      let arg = this.consumeAST(unaryNode.argument);
      return () => unaryOp(arg());
    } else if (node.type === 'ConditionalExpression') {
      let test = this.consumeAST((node as any).test);
      let consequent = this.consumeAST((node as any).consequent);
      let alternate = this.consumeAST((node as any).alternate);
      return () => test() ? consequent() : alternate();
    } else if (node.type === 'ArrayExpression') {
      let elements: any[] = [];
      (node as any).elements.forEach((element: any) => { elements.push(this.consumeAST(element)); });
      return () => {
        let res: any = [];
        elements.forEach((element: any) => { res.push(element()); });
        return res;
      };
    } else if (node.type === 'Literal') {
      return () => (node as jsep.ILiteral).value;
    } else if (node.type === 'MemberExpression') {
      const memberNode = node as jsep.IMemberExpression;
      let variable = this.consumeAST(memberNode.object)();
      if (memberNode.computed) {
        let keys = this.consumeAST(memberNode.property)();
        variable.keys.push(keys);
      } else {
        variable.keys.push((memberNode.property as jsep.IIdentifier).name);
      }
      return this.consumeVariable.bind(this, variable);
    } else if (node.type === 'Identifier') {
      let variable: JsMemberVariable = {getObject: () => this.context, keys: [(node as jsep.IIdentifier).name]};
      this._contextMembers.push(variable);
      return this.consumeVariable.bind(this, variable);
    } else if (node.type === 'ThisExpression') {
      let variable: JsMemberVariable = {getObject: () => this.thisArg, keys: []};
      this._thisMembers.push(variable);
      return this.consumeVariable.bind(this, variable);
    }
    throw new Error(`unsupported expression type ${node.type}`);
  }

  private consumeVariable(variable: JsMemberVariable): any { return this._resolveVariable(variable); }

  private getMembersRoot(members: JsMemberVariable[]): string[] {
    return members.map((curr) => curr.keys).reduce((prev, curr, idx, arr) => {
      let minLen = Math.min(prev.length, curr.length);
      for (let i = 0; i < minLen; i++) {
        if (curr[i] !== prev[i]) {
          return prev.slice(0, i);
        }
      }
      return minLen === prev.length ? prev : prev.slice(0, minLen);
    });
  }


  static compile(expression: string): JsExpression {
    let self = new JsExpression();
    self.compile(expression);
    return self;
  }
}



// tslint:disable only-arrow-functions object-literal-shorthand no-bitwise triple-equals
// NOTES: we avoid using arrow functions here, which would force us to bind them to this in 'consumeAST'

type BinaryFunction = (a: any, b: any) => any;

const BINARYOPS: {[key: string]: BinaryFunction} = {
  '||': function(a: any, b: any): any { return a || b; },
  '&&': function(a: any, b: any): any { return a && b; },
  '|': function(a: any, b: any): any { return a | b; },
  '^': function(a: any, b: any): any { return a ^ b; },
  '&': function(a: any, b: any): any { return a & b; },
  '==': function(a: any, b: any): any { return a == b; },
  '!=': function(a: any, b: any): any { return a != b; },
  '===': function(a: any, b: any): any { return a === b; },
  '!==': function(a: any, b: any): any { return a !== b; },
  '<': function(a: any, b: any): any { return a < b; },
  '>': function(a: any, b: any): any { return a > b; },
  '<=': function(a: any, b: any): any { return a <= b; },
  '>=': function(a: any, b: any): any { return a >= b; },
  '<<': function(a: any, b: any): any { return a << b; },
  '>>': function(a: any, b: any): any { return a >> b; },
  '>>>': function(a: any, b: any): any { return a >>> b; },
  '+': function(a: any, b: any): any { return a + b; },
  '-': function(a: any, b: any): any { return a - b; },
  '*': function(a: any, b: any): any { return a * b; },
  '/': function(a: any, b: any): any { return a / b; },
  '%': function(a: any, b: any): any { return a % b; }
};

type UnaryFunction = (a: any) => any;

const UNARYOPS: {[key: string]: UnaryFunction} = {
  '-': function(a: any): any { return -a; },
  '+': function(a: any): any { return a; },
  '~': function(a: any): any { return ~a; },
  '!': function(a: any): any { return !a; }
};
