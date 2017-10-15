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
    exclude: ['aot/**/*'],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    // logLevel: 'LOG_DEBUG',
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\/test.ts$/,
        compilerOptions: {lib: ['es2015', 'es2016', 'es2017', 'dom']},
        transforms: [require('karma-typescript-es6-transform')()],
      },
      coverageOptions: {
        instrumentation: true,
        exclude: /(\.(d|spec)|test)\.ts$/,
      }
    }

  });
};
