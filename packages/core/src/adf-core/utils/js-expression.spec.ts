import {JsExpression} from './js-expression';

function newTestExpression(expression: string, context?: any, thisArg?: any): JsExpression {
  let res = JsExpression.compile(expression);
  res.context = context;
  res.thisArg = thisArg;
  return res;
}

function testExpression(expression: string, result: any, context?: any, thisArg?: any): boolean {
  let compiled = newTestExpression(expression, context, thisArg);
  return expect(compiled.run()).toEqual(result, `result of ${expression} is not ${result}`);
}

describe('js-expression', () => {
  let expr: string;
  let context: any;
  let thisArg: any;
  let compiled: JsExpression;

  it('variable identifier', () => {
    context = {a: 42, b: {c: {d: 9}}};
    thisArg = undefined;

    expr = 'a';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(context.a, `expr ${expr} failed for context ${compiled.context}`);
    context.a = 13;
    expect(compiled.run()).toEqual(context.a, `expr ${expr} failed for context ${compiled.context}`);

    expr = 'b.c[\'d\']';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(context.b.c.d, `expr ${expr} failed for context ${compiled.context}`);
    context.b.c.d += 1;
    expect(compiled.run()).toEqual(context.b.c.d, `expr ${expr} failed for context ${compiled.context}`);

    expr = 'b[\'c\'].d';
    compiled = newTestExpression(expr, context, thisArg);
    context.b.c.d += 1;
    expect(compiled.run()).toEqual(context.b.c.d, `expr ${expr} failed for context ${compiled.context}`);
    context.b.c.d += 1;
    expect(compiled.run()).toEqual(context.b.c.d, `expr ${expr} failed for context ${compiled.context}`);

    expr = 'r';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for undefined variable`);

    expr = 'r.s';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for member of undefined variable`);

  });

  it('this members', () => {

    context = undefined;
    thisArg = {a: 42, b: {c: {d: 9}}};

    expr = 'this.a';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(thisArg.a, `expr ${expr} failed for this ${compiled.thisArg}`);
    thisArg.a = 13;
    expect(compiled.run()).toEqual(thisArg.a, `expr ${expr} failed for this ${compiled.thisArg}`);

    expr = 'this.b.c[\'d\']';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toEqual(thisArg.b.c.d, `expr ${expr} failed for this ${compiled.thisArg}`);
    thisArg.b.c.d += 1;
    expect(compiled.run()).toEqual(thisArg.b.c.d, `expr ${expr} failed for this ${compiled.thisArg}`);

    expr = 'this.b[\'c\'].d';
    compiled = newTestExpression(expr, context, thisArg);
    thisArg.b.c.d += 1;
    expect(compiled.run()).toEqual(thisArg.b.c.d, `expr ${expr} failed for this ${compiled.thisArg}`);
    thisArg.b.c.d += 1;
    expect(compiled.run()).toEqual(thisArg.b.c.d, `expr ${expr} failed for this ${compiled.thisArg}`);

    expr = 'this.r';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for undefined member`);

    expr = 'this.r.s';
    compiled = newTestExpression(expr, context, thisArg);
    expect(compiled.run()).toBeUndefined(`expr ${expr} failed for member of undefined member`);
  });

  it('expressions', () => {
    context = {a: 4, b: 0};
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

  });


});
