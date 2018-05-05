import * as fs from 'fs';
import * as process from 'process';
import * as path from 'path';


export function bump(pkgPath: string, version: string, indent?: number): any {
  const pkgJson = require(pkgPath);
  pkgJson.version = version;
  const tmpJsonPath = pkgPath + '.tmp';

  const pkgText = JSON.stringify(pkgJson, undefined, indent || 2) + '\n';
  fs.writeFileSync(tmpJsonPath, pkgText);
  fs.renameSync(tmpJsonPath, pkgPath);
  return pkgJson;
  }


const appname = path.basename(process.argv[1]);

if (process.argv.length !== 4) {
  console.error(`${appname}: ERROR: usage ts-node ${appname} pathToPkgJson newVersion`);
  process.exit(1);
  }


const pkgName = bump(path.resolve(process.argv[2]), process.argv[3]).name;
console.log(`setting ${process.argv[2]}: ${pkgName}@${process.argv[3]} succeed`);
