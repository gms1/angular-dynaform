import * as fs from 'fs';
import * as process from 'process';
import * as path from 'path';

const appname = path.basename(process.argv[1]);

const distFolder = './dist';
const pkgJsonMain = require(path.resolve('./package.json'));

const peerDeps: {[key: string]: string[]} = {
  '@angular-dynaform/core': ['rxjs', '@angular/core', '@angular/common', '@angular/forms', 'jsonpointerx', 'jsep'],
  '@angular-dynaform/material': ['@angular/cdk', '@angular/material', '@angular/platform-browser'],
  '@angular-dynaform/nativescript': ['tns-core-modules', 'nativescript-angular', 'nativescript-checkbox']
};


export function preparePublish(pkgName: string, indent?: number): any {
  const pkgDir = path.join(distFolder, pkgName);
  const pkgJsonPath = path.resolve(pkgDir, 'package.json');
  const pkgJsonTmpPath = path.join(pkgDir, 'package.tmp');

  const pkgJson = require(pkgJsonPath);
  delete pkgJson.scripts;

  pkgJson.peerDependencies = pkgJson.peerDependencies || {};

  if (pkgJson.name !== '@angular-dynaform/core') {
    const pkgJsonCore = require(path.resolve(distFolder, '@angular-dynaform/core', 'package.json'));
    pkgJson.peerDependencies['@angular-dynaform/core'] = pkgJsonCore.version;
    }

  const myPeerDeps: string[]|undefined = peerDeps[pkgName];
  if (peerDeps[pkgName]) {
    peerDeps[pkgName].forEach((depName) => {
      console.log(`${pkgName}: ${depName}`);
      pkgJson.peerDependencies[depName] = pkgJsonMain.dependencies[depName] || pkgJsonMain.peerDependencies[depName];
    });
    }

  const pkgText = JSON.stringify(pkgJson, undefined, indent || 2) + '\n';
  fs.writeFileSync(pkgJsonTmpPath, pkgText);
  fs.renameSync(pkgJsonTmpPath, pkgJsonPath);
  return pkgJson;
  }



if (process.argv.length !== 3) {
  console.error(`${appname}: ERROR: usage ts-node ${appname} pkgName`);
  process.exit(1);
  }


const manifest = preparePublish(process.argv[2]);
console.log(`prepare for publishing ${process.argv[2]}: ${manifest.name}@${manifest.version} succeed`);
