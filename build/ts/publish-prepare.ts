import * as path from 'path';
import * as process from 'process';

import {readPackageJson, writePackageJson} from './utils/package-json';

/*
  prepare package.json for publishing
  usage: pathToPkgJson

  deletes the scripts property
*/

const appname = path.basename(process.argv[1]);

if (process.argv.length !== 3) {
  console.error(`${appname}: ERROR: usage ts-node ${appname} pathToPkgJson`);
  process.exit(1);
}

let pkgJson = readPackageJson(process.argv[2]);
delete pkgJson.scripts;
pkgJson = writePackageJson(process.argv[2], pkgJson);
console.log(`prepare publishing for ${process.argv[2]} => ${pkgJson.name}@${pkgJson.version} succeed`);
