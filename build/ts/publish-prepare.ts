import * as fs from 'fs';
import * as process from 'process';
import * as path from 'path';


export function preparePublish(pkgPath: string, indent?: number): any {
  const pkgJson = require(pkgPath);
  const tmpJsonPath = pkgPath + '.tmp';
  delete pkgJson.scripts;

  if (pkgJson.name !== '@angular-dynaform/core') {
    pkgJson.peerDependencies = pkgJson.peerDependencies || {};
    pkgJson.peerDependencies['@angular-dynaform/core'] = pkgJson.version;
    }

  const pkgText = JSON.stringify(pkgJson, undefined, indent || 2) + '\n';
  fs.writeFileSync(tmpJsonPath, pkgText);
  fs.renameSync(tmpJsonPath, pkgPath);
  return pkgJson;
  }


const appname = path.basename(process.argv[1]);

if (process.argv.length !== 3) {
  console.error(`${appname}: ERROR: usage ts-node ${appname} pathToPkgJson`);
  process.exit(1);
  }


const manifest = preparePublish(path.resolve(process.argv[2]));
console.log(`prepare for publishing ${process.argv[2]}: ${manifest.name}@${manifest.version} succeed`);
