module.exports = function(config) {
  config.set({
    basePath: './src',
    frameworks: ['jasmine', 'karma-typescript'],
    plugins: [
      require('karma-jasmine'), require('karma-chrome-launcher'), require('karma-jasmine-html-reporter'),
      require('karma-typescript')
    ],
    client: {clearContext: false},
    files: [{pattern: '**/test.ts'}, {pattern: '**/*.+(ts|html)'}],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome'],
    browserNoActivityTimeout: 30000,
    singleRun: false,
    // logLevel: 'LOG_DEBUG',
    karmaTypescriptConfig: {
      bundlerOptions: {entrypoints: /\/test.ts$/},
      coverageOptions: {
        instrumentation: true,
        exclude: /(^|\.)(test(\..*)?|spec|d)\.ts$/,
      },
      compilerOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: 'commonjs',
        sourceMap: true,
        target: 'ES5',
        lib: ['es2015', 'es2016', 'es2017', 'dom']
      },
    }

  });
};
