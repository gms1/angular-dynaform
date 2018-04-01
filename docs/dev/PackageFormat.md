# Package Formats

## @angular package formats

[Angular Package Format v4.0](https://docs.google.com/document/d/1t7DreFnEtZCQiSzrWggK8VGf-scQ5goWHloDhRwAOOo/edit#heading=h.k0mh3o8u5hx)

[Angular Package Format v5.0](https://docs.google.com/document/d/1tdgcvdLKsYPHlgNBppGFrsaA1eINLxJi9C8KkyrH2sI/edit#heading=h.k0mh3o8u5hx)

[Angular Package Format v6.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview#heading=h.k0mh3o8u5hx)

## @angular-dynaform package format V0.2

### file layout:


location                 | module format                               | usage
-------------------------|---------------------------------------------|------------------------------------------------
lib/index.js             | ESM2015 non-flat modules                    | input for FESM2015 generation
lib/index.d.ts           | typings: type definitions non-flat modules  | Typescript
lib/index.metadata.json  | angular: metadata.json flat                 | AOT compilation
index.js                 | es2015: ESM2015 flat module (FESM2015)      | tools consuming ESM+ES2105: webpack, rollup
index.es5.js             | module: ESM5 flat module (FESM5)            | tools consuming ESM+ES5: webpack, rollup
bundles/${name}.umd.js   | main:   UMD/ES5 bundle                      | Node.js, Plunker, Nativescript...


### package.json:
```
  "main": "bundles/${name}.umd.js",
  "module": "index.es5.js",
  "es2015": "index.js",
  "typings": "./lib/index.d.ts",
```

## @angular-dynaform package format V0.6

### file layout:

TODO:
```
mv esm2015 from 'lib' to 'esm2015'
add esm5 to 'esm5'
mv 'index.js' to 'fesm2015'
mv 'index.es5.js' to 'fesm5'
cp esm2015/index.metadata.json index.metadata.json
```


location                     | module format                               | usage
-----------------------------|---------------------------------------------|------------------------------------------------
esm2015/index.js             | ESM2015 non-flat modules                    | input for FESM2015 generation
esm2015/index.d.ts           | typings: type definitions non-flat modules  | Typescript
esm5/index.js                | ESM5 non-flat modules                       | input for FESM5 generation
fesm2015/index.js            | es2015: ESM2015 flat module (FESM2015)      | tools consuming ESM2015: webpack, rollup
fesm5/index.js               | module: ESM5 flat module (FESM5)            | tools consuming ESM5: webpack, rollup
index.metadata.json          | angular: metadata.json flat                 | AOT compilation
bundles/${name}.umd.js       | main:   UMD/ES5 bundle                      | Node.js, Plunker, Nativescript...


### package.json:

```
  "main": "bundles/${name}.umd.js", 
  "module": "./fesm5/index.js", 
  "es2015": "./fesm2015/index.js", 
  "esm5": "./esm5/index.js",
  "esm2015": "./esm2015/index.js",
  "fesm5": "./fesm5/index.js",
  "fesm2015": "./fesm2015/index.js",
  "typings": "esm2015/index.d.ts"
```
