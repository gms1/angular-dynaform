## Package Formats:

### @angular package format:

see [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit)

### @angular-dynaform package format:

location                 | module format                               | usage
-------------------------|---------------------------------------------|------------------------------------------------
/lib/index.js            | ESM+ES2015 non-flat modules                 | input for FESM15 generation
/lib/index.d.ts          | typings: type definitions non-flat modules  | Typescript
/lib/index.metadata.json | angular: metadata.json flat                 | AOT compilation

/index.js                | es2015: ESM+ES2015 flat module (FESM15)     | tools consuming ESM+ES2105: webpack, rollup  
/index.es5.js            | module: ESM+ES5 flat module (FESM5)         | tools consuming ESM+ES5: webpack, rollup  

/bundles/<pkg>.umd.js    | main:   UMD/ES5 bundle                      | Node.js, Plunker, Nativescript...  

