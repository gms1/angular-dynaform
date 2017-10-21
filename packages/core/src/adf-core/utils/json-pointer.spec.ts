import {JsonPointer} from './json-pointer';

describe('json-pointer', () => {

  let rfcExample: any;

  beforeEach(() => {
    rfcExample =
        {foo: ['bar', 'baz'], '': 0, 'a/b': 1, 'c%d': 2, 'e^f': 3, 'g|h': 4, 'i\\j': 5, 'k"l': 6, ' ': 7, 'm~n': 8};
  });

  it('get', () => {
    expect(JsonPointer.compile('').get(rfcExample)).toEqual(rfcExample, 'get failed for ""');
    expect(JsonPointer.compile('/foo').get(rfcExample)).toEqual(rfcExample.foo, 'get failed for "/foo"');
    expect(JsonPointer.compile('/foo/0').get(rfcExample)).toEqual(rfcExample.foo[0], 'get failed for "/foo/0"');
    expect(JsonPointer.compile('/').get(rfcExample)).toEqual(rfcExample[''], 'get failed for "/"');
    expect(JsonPointer.compile('/a~1b').get(rfcExample)).toEqual(rfcExample['a/b'], 'get failed for "/a~1b"');
    expect(JsonPointer.compile('/c%d').get(rfcExample)).toEqual(rfcExample['c%d'], 'get failed for "/c%d"');
    expect(JsonPointer.compile('/e^f').get(rfcExample)).toEqual(rfcExample['e^f'], 'get failed for "/e^f"');
    expect(JsonPointer.compile('/g|h').get(rfcExample)).toEqual(rfcExample['g|h'], 'get failed for "/g|h"');
    expect(JsonPointer.compile('/i\\j').get(rfcExample)).toEqual(rfcExample['i\\j'], 'get failed for "/i\\j"');
    expect(JsonPointer.compile('/k"l').get(rfcExample)).toEqual(rfcExample['k"l'], 'get failed for "/k"l"');
    expect(JsonPointer.compile('/ ').get(rfcExample)).toEqual(rfcExample[' '], 'get failed for "/ "');
    expect(JsonPointer.compile('/m~0n').get(rfcExample)).toEqual(rfcExample['m~n'], 'get failed for "/m~0n"');

    // extended the rfc example:
    expect(JsonPointer.compile('/unknown1').get(rfcExample)).toBeUndefined('get failed for "/unknown1"');
    expect(JsonPointer.compile('/foo/unknown2').get(rfcExample)).toBeUndefined('get failed for "/foo/unknown2"');

    rfcExample.grz = {brz: 'mau'};
    expect(JsonPointer.compile('/grz/brz').get(rfcExample)).toEqual(rfcExample.grz.brz, 'get failed for "/grz/brz"');
    expect(JsonPointer.compile('/grz/unknown3').get(rfcExample)).toBeUndefined('get failed for "/grz/unknown3"');

  });

  it('set', () => {
    let setValue: any = {};

    expect(() => JsonPointer.compile('').set(rfcExample, setValue))
        .toThrowError('setting via root JSON pointer is not allowed.');

    setValue = ['baz', 'bar'];
    JsonPointer.compile('/foo').set(rfcExample, setValue);
    expect(JsonPointer.compile('/foo').get(rfcExample)).toEqual(setValue, 'set failed for "/foo"');

    setValue = 'angular';
    JsonPointer.compile('/foo/0').set(rfcExample, setValue);
    expect(JsonPointer.compile('/foo/0').get(rfcExample)).toEqual(setValue, 'set failed for "/foo/0"');

    setValue = 8;
    JsonPointer.compile('/').set(rfcExample, setValue);
    expect(JsonPointer.compile('/').get(rfcExample)).toEqual(setValue, 'set failed for "/"');

    setValue = 8;
    JsonPointer.compile('/a~1b').set(rfcExample, setValue);
    expect(JsonPointer.compile('/a~1b').get(rfcExample)).toEqual(setValue, 'set failed for "/a~1b"');

    setValue = 7;
    JsonPointer.compile('/c%d').set(rfcExample, setValue);
    expect(JsonPointer.compile('/c%d').get(rfcExample)).toEqual(setValue, 'set failed for "/c%d"');

    setValue = 6;
    JsonPointer.compile('/e^f').set(rfcExample, setValue);
    expect(JsonPointer.compile('/e^f').get(rfcExample)).toEqual(setValue, 'set failed for "/e^f"');

    setValue = 5;
    JsonPointer.compile('/g|h').set(rfcExample, setValue);
    expect(JsonPointer.compile('/g|h').get(rfcExample)).toEqual(setValue, 'set failed for "/g|h"');

    setValue = 4;
    JsonPointer.compile('/i\\j').set(rfcExample, setValue);
    expect(JsonPointer.compile('/i\\j').get(rfcExample)).toEqual(setValue, 'set failed for "/i\\j"');

    setValue = 3;
    JsonPointer.compile('/k"l').set(rfcExample, setValue);
    expect(JsonPointer.compile('/k"l').get(rfcExample)).toEqual(setValue, 'set failed for "/k"l"');

    setValue = 2;
    JsonPointer.compile('/ ').set(rfcExample, setValue);
    expect(JsonPointer.compile('/ ').get(rfcExample)).toEqual(setValue, 'set failed for "/ "');

    setValue = 1;
    JsonPointer.compile('/m~0n').set(rfcExample, setValue);
    expect(JsonPointer.compile('/m~0n').get(rfcExample)).toEqual(setValue, 'set failed for "/m~0n"');


    // extended the rfc example:
    setValue = 'brz';
    JsonPointer.compile('/unknown1/grz').set(rfcExample, setValue);
    expect(JsonPointer.compile('/unknown1/grz').get(rfcExample)).toEqual(setValue, 'set failed for "/unknown1/grz"');

    setValue = 2;

    expect(() => JsonPointer.compile('/unknown1/grz/blub/xx').set(rfcExample, setValue))
        .toThrowError('Invalid JSON pointer reference (level 2).');

    expect(() => JsonPointer.compile('/unknown1/grz/blub').set(rfcExample, setValue))
        .toThrowError('Invalid JSON pointer reference at end of pointer.');


    expect(() => JsonPointer.compile('/foo/unknown2/unknown3').set(rfcExample, setValue))
        .toThrowError('Invalid JSON pointer array index reference (level 2).');

    expect(() => JsonPointer.compile('/foo/unknown2').set(rfcExample, setValue))
        .toThrowError('Invalid JSON pointer array index reference at end of pointer.');

    rfcExample.grz = {brz: {mau: 'dau'}};

    JsonPointer.compile('/grz/brz').set(rfcExample);
    expect(rfcExample.grz.brz).toBeUndefined('set failed for "/grz/brz"');

  });

  it('concat', () => {
    expect(JsonPointer.compile('/foo').concat(JsonPointer.compile('/0')).get(rfcExample))
        .toEqual(rfcExample.foo[0], 'concat 1 failed for "/foo/0"');


    expect(JsonPointer.compile('/foo').concatKey('0').get(rfcExample))
        .toEqual(rfcExample.foo[0], 'concat 2 failed for "/foo/0"');

    expect(JsonPointer.compile('/foo').concatPointer('/0').get(rfcExample))
        .toEqual(rfcExample.foo[0], 'concat 3 failed for "/foo/0"');

  });

});
