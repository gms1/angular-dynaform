// tslint:disable no-null-keyword no-unbound-method no-unused-variable prefer-const
import { JsExpression } from './js-expression';
import { JsonPointer } from 'jsonpointerx';

function newTestExpression(expression: string, context?: any, thisArg?: any): JsExpression {
  let res = JsExpression.compile(expression);
  res.context = context;
  res.thisArg = thisArg;
  return res;
}

function testExpression(expression: string, result: any, context?: any, thisArg?: any): void {
  let compiled = newTestExpression(expression, context, thisArg);
  expect(compiled.run()).toEqual(result, `result of ${expression} is not ${result}`);
}

describe('js-expression test suite', () => {
  let expr: string;
  let context: any;
  let thisArg: any;
  let compiled: JsExpression;

  it('context members', () => {
    context = { a: 42, b: { c: { d: 9 } } };
    thisArg = undefined;

    expr = 'a';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(
      context.a,
      `expr ${expr} failed for context ${compiled.context}`,
    );
    context.a = 13;
    expect(compiled.run()).toEqual(
      context.a,
      `expr ${expr} failed for context ${compiled.context}`,
    );

    expr = "b.c['d']";
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(
      context.b.c.d,
      `expr ${expr} failed for context ${compiled.context}`,
    );
    context.b.c.d += 1;
    expect(compiled.run()).toEqual(
      context.b.c.d,
      `expr ${expr} failed for context ${compiled.context}`,
    );

    expr = "b['c'].d";
    compiled = newTestExpression(expr, context, thisArg);
    context.b.c.d += 1;
    expect(compiled.run()).toEqual(
      context.b.c.d,
      `expr ${expr} failed for context ${compiled.context}`,
    );
    context.b.c.d += 1;
    expect(compiled.run()).toEqual(
      context.b.c.d,
      `expr ${expr} failed for context ${compiled.context}`,
    );

    expr = 'r';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for undefined variable`);

    expr = 'r.s';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for member of undefined variable`);

    expr = 'a.b.c && a.b.d';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.getContextMembersRoot()).toEqual(['a', 'b']);

    expr = 'a.b.c && b.c.d && c.d.e';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.getContextMembersRoot()).toEqual([]);
  });

  it('this members', () => {
    context = undefined;
    thisArg = { a: 42, b: { c: { d: 9 } } };

    expr = 'this.a';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(thisArg.a, `expr ${expr} failed for this ${compiled.thisArg}`);
    thisArg.a = 13;
    expect(compiled.run()).toEqual(thisArg.a, `expr ${expr} failed for this ${compiled.thisArg}`);

    expr = "this.b.c['d']";
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(
      thisArg.b.c.d,
      `expr ${expr} failed for this ${compiled.thisArg}`,
    );
    thisArg.b.c.d += 1;
    expect(compiled.run()).toEqual(
      thisArg.b.c.d,
      `expr ${expr} failed for this ${compiled.thisArg}`,
    );

    expr = "this.b['c'].d";
    compiled = newTestExpression(expr, context, thisArg);
    thisArg.b.c.d += 1;
    expect(compiled.run()).toEqual(
      thisArg.b.c.d,
      `expr ${expr} failed for this ${compiled.thisArg}`,
    );
    thisArg.b.c.d += 1;
    expect(compiled.run()).toEqual(
      thisArg.b.c.d,
      `expr ${expr} failed for this ${compiled.thisArg}`,
    );

    expr = 'this.r';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for undefined member`);

    expr = 'this.r.s';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for member of undefined member`);

    expr = 'this.a.b.c && this.a.x.y';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.getThisMembersRoot()).toEqual(['a']);
  });

  it('expressions', () => {
    context = { a: 4, b: 0 };
    testExpression('a < 5', true, context);
    testExpression('a >= 4', true, context);
    testExpression('a > 4', false, context);

    testExpression('!a', false, context);
    testExpression('!b', true, context);

    testExpression('!!a', true, context);
    testExpression('!!b', false, context);

    testExpression('a < 5 && b <= 0', true, context);

    testExpression('!(a < 5) && !(b <= 0)', false, context);
    testExpression('a > 5 && b >= 0', false, context);

    testExpression('b == 0', true, context);
    testExpression('b === 0', true, context);

    context.c = 7;
    testExpression('c ? a : b', 4, context);
    context.c = 0;
    testExpression('c ? a : b', 0, context);

    testExpression('[1,2]', [1, 2], undefined);
  });

  it('expect run to return undefined if no expression has been compiled', () => {
    let jse = new JsExpression();
    expect(jse.run()).toBeUndefined();
  });

  it('expect unknown variable to be undefined', () => {
    context = {};
    testExpression('a', undefined, context);
  });

  it('expect unsupported binary operation to throw', () => {
    compiled = newTestExpression('5 % 3', undefined, undefined);
    expect(compiled.run()).toEqual(2, `result of 5 % 3 is not 2`);
    let modOp = JsExpression.binaryOps['%'];
    delete JsExpression.binaryOps['%'];
    expect(() => {
      JsExpression.compile('5 % 3');
    }).toThrow();
    JsExpression.binaryOps['%'] = modOp;
  });

  it('expect unsupported unary operation to throw', () => {
    context = { a: 4, b: 0 };
    compiled = newTestExpression('-a', context, undefined);
    expect(compiled.run()).toEqual(-context.a, `result of '-a' is not -${context.a}`);
    let negateOp = JsExpression.unaryOps['-'];
    delete JsExpression.unaryOps['-'];
    expect(() => {
      JsExpression.compile('-a');
    }).toThrow();
    JsExpression.unaryOps['-'] = negateOp;
  });

  it('add and remove binary operation should work', () => {
    JsExpression.addBinaryOp('^', 10, (a, b) => Math.pow(a, b));
    compiled = newTestExpression('5 ^ 3', undefined, undefined);
    expect(compiled.run()).toEqual(125, `result of 5 ^ 3 is not 125`);
    JsExpression.removeBinaryOp('^');
    expect(() => {
      JsExpression.compile('5 ^ 3');
    }).toThrow();
  });

  it('add and remove unary operation should work', () => {
    // tslint:disable-next-line no-bitwise
    JsExpression.addUnaryOp('~', (a) => ~a);
    compiled = newTestExpression('~3', undefined, undefined);
    expect(compiled.run()).toEqual(-4, `result of ~3 is not -4`);
    JsExpression.removeUnaryOp('~');
    expect(() => {
      JsExpression.compile('~3');
    }).toThrow();
  });

  it('expect compiledFn to work', () => {
    let compiledFnd = JsExpression.compiledFn('(a % b) + this.c');
    expect(compiledFnd({ c: 7 }, { a: 5, b: 3 })).toEqual(9);
  });

  it('expect compiledFn to work', () => {
    let compiledFnd = JsExpression.compiledFn('(a % b) + this.c');
    class TestClass {
      c = 7;
      testFunc: (context: any) => any;
      constructor() {
        this.testFunc = compiledFnd.bind(this, this);
      }
    }
    let testObj = new TestClass();
    expect(testObj.testFunc({ a: 5, b: 3 })).toEqual(9);
  });
});
