// tslint:disable no-use-before-declare
// tslint:disable-next-line no-require-imports no-var-requires
import * as jsep from 'jsep';

// to make rollup happy: (should normally be able to use imported 'jsep' instead)
const jsepCall = jsep;

import { JsonPointer } from 'jsonpointerx';

import {
  BINARYOPS,
  BinaryOperations,
  BinaryFunction,
  UNARYOPS,
  UnaryOperations,
  UnaryFunction,
} from './js-operations';

interface JsMemberVariable {
  keys: string[];
  jp?: JsonPointer;
  getObject(): () => any;
}

type resolveVariableFn = (variable: JsMemberVariable) => any;

const getVariableReference: resolveVariableFn = (variable: JsMemberVariable) => variable;
const getVariableValue: resolveVariableFn = (variable: JsMemberVariable) =>
  (variable.jp as JsonPointer).get(variable.getObject());

export class JsExpression {
  static binaryOps: BinaryOperations = BINARYOPS;
  static unaryOps: UnaryOperations = UNARYOPS;

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
    this._resolveVariable = getVariableReference;
  }

  /**
   * run:
   * execute compiled expression
   *
   */
  run(): any {
    return this._fnJsExpression();
  }

  /**
   * compile expression
   *
   */
  compile(expression: string): void {
    this._contextMembers = [];
    this._thisMembers = [];
    this._fnJsExpression = this.consumeAST(expression);
    this._contextMembers.forEach((variable) => {
      variable.jp = new JsonPointer(variable.keys);
    });
    this._thisMembers.forEach((variable) => {
      variable.jp = new JsonPointer(variable.keys);
    });
  }

  /**
   * get keys to root of all referenced context member variables
   *
   */
  getContextMembersRoot(): string[] {
    return this.getMembersRoot(this._contextMembers);
  }

  /**
   * get keys to root of all referenced this member variables
   *
   */
  getThisMembersRoot(): string[] {
    return this.getMembersRoot(this._thisMembers);
  }

  private consumeAST(expression: string): () => any {
    this._resolveVariable = getVariableReference;
    const fn = this.consumeASTPart(jsepCall(expression));
    this._resolveVariable = getVariableValue;
    return fn;
  }

  private consumeASTPart(node: jsep.Expression): () => any {
    // NOTES: make sure the AST is consumed before/outside of the returned function
    //   see arg1, arg2 in BinaryExpression
    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      const binaryNode = node as jsep.BinaryExpression;
      const binaryOp = JsExpression.binaryOps[binaryNode.operator];
      if (!binaryOp) {
        throw new Error(`unsupported expression: ${binaryNode.operator}(arg1, arg2)`);
      }
      const arg1 = this.consumeASTPart(binaryNode.left);
      const arg2 = this.consumeASTPart(binaryNode.right);
      return () => binaryOp(arg1(), arg2());
    } else if (node.type === 'UnaryExpression') {
      const unaryNode = node as jsep.UnaryExpression;
      const unaryOp = JsExpression.unaryOps[unaryNode.operator];
      if (!unaryOp) {
        throw new Error(`unsupported expression: ${unaryNode.operator}(arg)`);
      }
      const arg = this.consumeASTPart(unaryNode.argument);
      return () => unaryOp(arg());
    } else if (node.type === 'ConditionalExpression') {
      const test = this.consumeASTPart((node as any).test);
      const consequent = this.consumeASTPart((node as any).consequent);
      const alternate = this.consumeASTPart((node as any).alternate);
      return () => (test() ? consequent() : alternate());
    } else if (node.type === 'ArrayExpression') {
      const elements: any[] = [];
      (node as any).elements.forEach((element: any) => {
        elements.push(this.consumeASTPart(element));
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
      const variable = this.consumeASTPart(memberNode.object)();
      if (memberNode.computed) {
        const keys = this.consumeASTPart(memberNode.property)();
        variable.keys.push(keys);
      } else {
        variable.keys.push((memberNode.property as jsep.Identifier).name);
      }
      return this.consumeVariable.bind(this, variable);
    } else if (node.type === 'Identifier') {
      const variable: JsMemberVariable = {
        getObject: () => this.context,
        keys: [(node as jsep.Identifier).name],
      };
      this._contextMembers.push(variable);
      return this.consumeVariable.bind(this, variable);
    } else {
      /* istanbul ignore else */
      if (node.type === 'ThisExpression') {
        const variable: JsMemberVariable = { getObject: () => this.thisArg, keys: [] };
        this._thisMembers.push(variable);
        return this.consumeVariable.bind(this, variable);
      }
    }
    // TODO: should not happen
    /* istanbul ignore next */
    throw new Error(`unsupported expression type ${node.type}`);
  }

  private consumeVariable(variable: JsMemberVariable): any {
    return this._resolveVariable(variable);
  }

  private getMembersRoot(members: JsMemberVariable[]): string[] {
    return members
      .map((curr) => curr.keys)
      .reduce((prev, curr, idx, arr) => {
        const minLen = Math.min(prev.length, curr.length);
        for (let i = 0; i < minLen; i++) {
          if (curr[i] !== prev[i]) {
            return prev.slice(0, i);
          }
        }
        return prev.slice(0, minLen);
      });
  }

  /**
   * compile expression
   *
   */
  static compile(expression: string): JsExpression {
    const self = new JsExpression();
    self.compile(expression);
    return self;
  }

  static compiledFn(expression: string): (thisArg: any, context: any) => any {
    const le = JsExpression.compile(expression);
    return (thisArg: any, context: any) => {
      le.thisArg = thisArg;
      le.context = context;
      return le.run();
    };
  }

  static addBinaryOp(operatorName: string, precedence: number, operation: BinaryFunction): void {
    jsep.addBinaryOp(operatorName, precedence);
    JsExpression.binaryOps[operatorName] = operation;
  }

  static removeBinaryOp(operatorName: string): void {
    jsep.removeBinaryOp(operatorName);
    delete JsExpression.binaryOps[operatorName];
  }

  static addUnaryOp(operatorName: string, operation: UnaryFunction): void {
    jsep.addUnaryOp(operatorName);
    JsExpression.unaryOps[operatorName] = operation;
  }

  static removeUnaryOp(operatorName: string): void {
    jsep.removeUnaryOp(operatorName);
    delete JsExpression.binaryOps[operatorName];
  }
}
