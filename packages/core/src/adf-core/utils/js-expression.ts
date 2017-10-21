import * as jsep from 'jsep';
import {JsonPointer} from './json-pointer';

interface JsVariable {
  keys: string[];
  jp?: JsonPointer;
  getter(): any;
}


export class JsExpression {
  private _variables: JsVariable[] = [];
  private _compiling: boolean = false;
  private _context: any;
  private _thisArg: any;

  get context(): any { return this._context; }
  set context(context: any) { this._context = context; }
  get thisArg(): any { return this._thisArg; }
  set thisArg(thisArg: any) { this._thisArg = thisArg; }

  constructor() {}


  private _fn: () => any = () => {};


  run(): any { return this._fn(); }

  private getContext(): any { return this.context; }
  private getThisArg(): any { return this.thisArg; }

  private resolveVariable(variable: JsVariable): any {
    return this._compiling ? variable : (variable.jp ? variable.jp.get(variable.getter()) : undefined);
  }

  private compile(expression: string): void {
    this._variables = [];
    this._compiling = true;
    this._fn = this.consumeAst(jsep(expression));
    this._compiling = false;
    this._variables.forEach((variable) => { variable.jp = new JsonPointer(variable.keys); });
  }

  private consumeAst(node: jsep.IExpression): () => any {
    // NOTES: make sure the AST expression is consumed before/outside of the returned function
    //   see arg1, arg2 in BinaryExpression
    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      const binaryNode = node as jsep.IBinaryExpression;
      let binaryOp = (BINARYOPS)[binaryNode.operator];
      if (!binaryOp) {
        throw new Error(`unsupported expression: ${binaryNode.operator}(arg1, arg2)`);
      }
      let arg1 = this.consumeAst(binaryNode.left);
      let arg2 = this.consumeAst(binaryNode.right);
      return () => binaryOp.bind(this)(arg1(), arg2());
    } else if (node.type === 'UnaryExpression') {
      const unaryNode = node as jsep.IUnaryExpression;
      let unaryOp = UNARYOPS[unaryNode.operator];
      if (!unaryOp) {
        throw new Error(`unsupported expression: ${unaryNode.operator}(arg)`);
      }
      let arg = this.consumeAst(unaryNode.argument);
      return () => unaryOp.bind(this)(arg());
    } else if (node.type === 'ConditionalExpression') {
      let test = this.consumeAst((node as any).test);
      let consequent = this.consumeAst((node as any).consequent);
      let alternate = this.consumeAst((node as any).alternate);
      return () => test() ? consequent() : alternate();
    } else if (node.type === 'ArrayExpression') {
      let elements: any[] = [];
      (node as any).elements.forEach((element: any) => { elements.push(this.consumeAst(element)); });
      return () => {
        let res: any = [];
        elements.forEach((element: any) => { res.push(element()); });
        return res;
      };
    } else if (node.type === 'Literal') {
      return () => (node as jsep.ILiteral).value;
    } else if (node.type === 'MemberExpression') {
      const memberNode = node as jsep.IMemberExpression;
      let variable = this.consumeAst(memberNode.object)();
      if (memberNode.computed) {
        let keys = this.consumeAst(memberNode.property)();
        variable.keys.push(keys);
      } else {
        variable.keys.push((memberNode.property as jsep.IIdentifier).name);
      }
      return this.resolveVariable.bind(this, variable);
    } else if (node.type === 'Identifier') {
      let variable: JsVariable = {keys: [(node as jsep.IIdentifier).name], getter: this.getContext.bind(this)};
      this._variables.push(variable);
      return this.resolveVariable.bind(this, variable);
    } else if (node.type === 'ThisExpression') {
      let variable: JsVariable = {keys: [], getter: this.getThisArg.bind(this)};
      this._variables.push(variable);
      return this.resolveVariable.bind(this, variable);
    }
    throw new Error(`unsupported expression type ${node.type}`);
  }


  static compile(expression: string): JsExpression {
    let self = new JsExpression();
    self.compile(expression);
    return self;
  }
}



// tslint:disable no-bitwise

type BinaryFunction = (a: any, b: any) => any;

const BINARYOPS: {[key: string]: BinaryFunction} = {
  '||': (a: any, b: any) => a || b,
  '&&': (a: any, b: any) => a && b,
  '|': (a: any, b: any) => a | b,
  '^': (a: any, b: any) => a ^ b,
  '&': (a: any, b: any) => a & b,
  // tslint:disable-next-line triple-equals
  '==': (a: any, b: any) => a == b,
  // tslint:disable-next-line triple-equals
  '!=': (a: any, b: any) => a != b,
  '===': (a: any, b: any) => a === b,
  '!==': (a: any, b: any) => a !== b,
  '<': (a: any, b: any) => a < b,
  '>': (a: any, b: any) => a > b,
  '<=': (a: any, b: any) => a <= b,
  '>=': (a: any, b: any) => a >= b,
  '<<': (a: any, b: any) => a << b,
  '>>': (a: any, b: any) => a >> b,
  '>>>': (a: any, b: any) => a >>> b,
  '+': (a: any, b: any) => a + b,
  '-': (a: any, b: any) => a - b,
  '*': (a: any, b: any) => a * b,
  '/': (a: any, b: any) => a / b,
  '%': (a: any, b: any) => a % b
};
// tslint:disable only-arrow-functions

type UnaryFunction = (a: any) => any;

const UNARYOPS: {[key: string]: UnaryFunction} = {
  '-': (a: any) => -a,
  '+': (a: any) => a,
  '~': (a: any) => ~a,
  '!': (a: any) => !a
};
