const path = require('path');
const sh = require('shelljs');
const packageDir = path.resolve(__dirname, '..', '..')

sh.cd(packageDir);
sh.mkdir('-p', 'dist/@angular-dynaform/core');

if (!sh.test('-f', 'dist/@angular-dynaform/core/package.json')) {
  console.log(`creating fake @angular-dynaform/core package`);
  sh.cp('projects/angular-dynaform/core/package.json', 'dist/@angular-dynaform/core/');
  }

if (!sh.test('-f', 'dist/@angular-dynaform/basic/@angular-dynaform/core/package.json')) {
  console.log(`npm install in @angular-dynaform/basic`);
  sh.cd('projects/angular-dynaform/basic');
  sh.exec('npm install');
  sh.cd('../../..');
  }

if (!sh.test('-f', 'dist/@angular-dynaform/material/@angular-dynaform/core/package.json')) {
  console.log(`npm install in @angular-dynaform/material`);
  sh.cd('projects/angular-dynaform/material');
  sh.exec('npm install');
  sh.cd('../../..');
  }

if (!sh.test('-f', 'dist/@angular-dynaform/nativescript/@angular-dynaform/core/package.json')) {
  console.log(`npm install in @angular-dynaform/nativescript`);
  sh.cd('projects/angular-dynaform/nativescript');
  sh.exec('npm install');
  sh.cd('../../..');
}
