const path = require('path');

const config = {
  rootDir: path.resolve(__dirname,'..'),
  packageDirectories: [
    'packages/core',
    'packages/basic',
    'packages/basic-example',
    'packages/material',
    'packages/material-example',
    'packages/material-cli',
    'packages/nativescript',
    'packages/nativescript-example'
  ],
};

require(`./multi/run`).run(config);
