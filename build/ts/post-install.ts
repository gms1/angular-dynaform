import * as path from 'path';
import * as process from 'process';
import {readPackageJson, writePackageJson, getPackageDependencies} from './utils/package-json';

/*
  update peerDeps versions according to first package.json
 */

const appname = path.basename(process.argv[1]);

if (process.argv.length <= 2) {
  console.error(`${appname}: ERROR: usage ts-node ${appname} packageJson...`);
  process.exit(1);
}

const pkgJsonPaths = process.argv.slice(2);
const pkgJsons: {path: string, json: any}[] = [];

pkgJsonPaths.forEach((pkgJsonPath) => pkgJsons.push({path: pkgJsonPath, json: readPackageJson(pkgJsonPath)}));

const depMap = getPackageDependencies(pkgJsons[0].json);
pkgJsons.forEach((pkgJson) => depMap.set(pkgJson.json.name, pkgJson.json.version));

pkgJsons.slice(1).forEach(
    (pkgJson) => {
      if (!pkgJson.json.peerDependencies) { return; }
      let update = false;
      Object.keys(pkgJson.json.peerDependencies).forEach((name) => {
        const newVer = depMap.get(name);
        if (newVer && newVer !== pkgJson.json.peerDependencies[name]) {
          const oldVer = pkgJson.json.peerDependencies[name];
          pkgJson.json.peerDependencies[name] = newVer;
          console.log(`${pkgJson.path}:  peer-dependency ${name}: changed ${oldVer} => ${newVer}`);
          update = true;
        }

      });
      if (update) {
        writePackageJson(pkgJson.path, pkgJson.json);
        console.log(`${pkgJson.path}:  succeeded`);
      }
    }

);
