// clang-format off
'use strict';
var sh = require('shelljs');

// exit on error
sh.config.fatal = true;

const os = require('os');
const path = require('path');

var TaskRunner = (function() {

  // ========================================================
  function TaskRunner(config) {
    if (!config) {
      throw new Error(`missing 'config' argument`);
    }
    if (!config.rootDir) {
      throw new Error(`property 'rootDir' is not defined in config`);
    }
    if (!Array.isArray(config.packageDirectories) ) {
      throw new Error(`no 'packageDirectories' defined in config`);
    }
    this.config = config;
    this.packagePath = this.config.rootDir;
    this.packageBinPath = path.join(this.packagePath, 'node_modules', '.bin');

    this.etcPath = path.join(this.packagePath, 'etc');

    this.initPackages();

    try {
      var hostConfig = require(path.join(this.etcPath, 'build_' + os.hostname() + '.json'));
      if (!hostConfig) {
        if (hostConfig.packageDirectories) {
          this.config.packageDirectories = Object.assign(this.config.packageDirectories || {}, hostConfig);
        }
        if (hostConfig.build) {
          this.config.build = Object.assign(this.config.build || {}, hostConfig);
        }
      }
    } catch (ignore) { }

    this.tasks = {
      clean: () => { this.clean(); },
      build: () => { this.build(); },
      rebuild: () => { this.rebuild(); },
      test: () => { this.test(); },
      releaseBuild: () => { this.releaseBuild(); },
      releasePublish: () => { this.releasePublish(); },
      bootstrap: () => { this.bootstrap(); },
      reinstall: () => { this.reinstall(); },
      listPackages: () => { this.listPackages(); },
      listOutdated: () => { this.listOutdated(); },
    };

  };

  // ========================================================

  TaskRunner.prototype.initPackages = function() {
    this._packages = [];
    let pkgNameMap = new Map();

    this.config.packageDirectories.forEach((pkgRelDir) => {
      if (this.config.build && this.config.build.hasOwnProperty(pkgRelDir) && !this.config.build[pkgRelDir]) {
        // optional packages not selected for the build
        return;
      }
      let pkgDir = path.join(this.packagePath, pkgRelDir);
      const pkgJson = require(path.join(pkgDir, 'package.json'));

      let pkgDef = {
        name: pkgJson.name,
        dir: pkgDir,
        relDir: pkgRelDir,
        isMain: pkgRelDir === '..' || pkgRelDir === '.' ? true : false,
        json: pkgJson,
        publish: this.config.publish && this.config.publish[pkgRelDir]
      };

      if (pkgNameMap.has(pkgJson.name)) {
        throw new Error(`INIT FAILED: duplicate package name '${pkgJson.name}' detected`);
      }
      pkgNameMap.set(pkgJson.name, pkgDef);

      this._packages.push(pkgDef);
    });
  }
  // ========================================================

  TaskRunner.prototype.execTask = function(task, options, callback) {
    sh.config.fatal = false;
    if (sh.exec(task, options, callback).code !== 0) {
      sh.config.fatal = true;
      throw new Error(`FAILED: ${task}`);
    }
    sh.config.fatal = true;
    return 0;
  }

  // ========================================================
  // runTasksForPackage
  // runs specified tasks for specified package
  //------------------------------------------------------
  TaskRunner.prototype.runTasksForPackage = function(pkg, tasks, taskOptions) {
    let prompt = `${pkg.name}$`;
    let relDir;
    try {
      sh.cd(pkg.dir);
      console.log("____________________________________________________________");
      tasks.forEach((task) => {
        console.log(`${prompt} ${task}`);
        let matches = task.match(/^\s*cd(\s+([\S]+))?\s*$/);
        if (matches) {
          if (matches[2]) {
            relDir = relDir ? path.join(relDir, matches[2]) : matches[2];
            sh.cd(pkg.dir);
            if (relDir === '.') {
              relDir = undefined;
              prompt = `${pkg.name}$`;
            } else {
              sh.cd(relDir);
              prompt = `${pkg.name}/${relDir}$`;
            }
          } else {
            sh.cd(pkg.dir);
            relDir = undefined;
            prompt = `${pkg.name}$`;
          }
          return;
        }
        this.execTask(task, taskOptions);
      });
    } catch (err) {
      err.message = `${prompt} ${err.message}`;
      throw (err);
    }
  }
  // ========================================================
  // runTasksForPackages
  // runs specified tasks for all specified packages
  //------------------------------------------------------
  TaskRunner.prototype.runTasksForPackages = function(packages, tasks, taskOptions) {
    let rc = 0;
    packages.forEach((pkg) => {
      try {
        this.runTasksForPackage(pkg, tasks, taskOptions);
      } catch (err) {
        console.error(err.message);
        rc = 1;
      } finally {
        sh.cd(this.packagePath);
      }
    });
    if (rc) {
      throw new Error('failed');
    }
  }

  // ========================================================
  // runTasksForAllPackages
  // runs specified tasks for all known packages
  //------------------------------------------------------

  TaskRunner.prototype.runTasksForAllPackages = function(tasks, taskOptions) {
    this.runTasksForPackages(this._packages, tasks, taskOptions);
  }

  // ========================================================
  // npmRunScriptForAllPackages
  // runs specified script for all known packages
  //------------------------------------------------------
  TaskRunner.prototype.npmRunScriptForAllPackages = function (script) {
    this.runTasksForPackages(this._packages.filter((pkg) => { return pkg.json && pkg.json.scripts && pkg.json.scripts[script]; }),
      [`npm run-script ${script}`]);
  }

  // ========================================================
  // clean
  //------------------------------------------------------
  // run 'clean' on all projects except for the 'main' project
  TaskRunner.prototype.clean = function() {
    this.npmRunScriptForAllPackages('clean');
  }

  // ========================================================
  // build
  //------------------------------------------------------
  // run 'build' on all projects except for the 'main' project
  TaskRunner.prototype.build = function() {
    this.npmRunScriptForAllPackages('build');
  }

  // ========================================================
  // rebuild
  //------------------------------------------------------
  // run 'rebuild' all projects except for the 'main' project
  TaskRunner.prototype.rebuild = function () {
    this.npmRunScriptForAllPackages('rebuild');
  }

  // ========================================================
  // test
  //------------------------------------------------------
  // run 'test' on all projects except for the 'main' project
  TaskRunner.prototype.test = function() {
    this.npmRunScriptForAllPackages('test');
  }

  // ========================================================
  // releaseBuild
  //------------------------------------------------------
  // run 'release:build' on all projects except for the 'main' project
  TaskRunner.prototype.releaseBuild = function() {
    this.npmRunScriptForAllPackages('release:build');
  }

  // ========================================================
  // releasePublish
  //------------------------------------------------------
  // run 'release:publish' on all projects except for the 'main' project
  TaskRunner.prototype.releasePublish = function() {
    this.npmRunScriptForAllPackages('release:publish');
  }


  // ========================================================
  // bootstrap
  //------------------------------------------------------
  // npm link and npm install for all projects
  // TODO: install global packages
  //		GLOBALS=$$(npm -g ls -depth 0 2>/dev/null);\
  //		echo $$GLOBALS | grep -qw gulp-cli    || { echo "global gulp-cli is not installed" >&2; exit 1; }; \
  //		echo $$GLOBALS | grep -qw angular-cli || { echo "global angular-cli is not installed" >&2; exit 1; }; \


  TaskRunner.prototype.bootstrap = function() {
    // TODO: command 'npm -g ls -depth 0' does not work
    // console.log(`${pkgJson.name}$ npm -g ls -depth 0`);
    // this.execTask('npm -g ls -depth 0', `${pkgJson.name}$`, { silent: true }, (code, stdout, stderr) => {
    //    console.log(`stdout='${stdout}`);
    // });
    this._packages.forEach((pkg) => {
      let tasks = [];
      let depPackages = [];
      this._packages.forEach((otherPkg) => {
        if (pkg.json.dependencies && pkg.json.dependencies[otherPkg.name]
          || pkg.json.devDependencies && pkg.json.devDependencies[otherPkg.name]
          || pkg.json.optionalDependencies && pkg.json.optionalDependencies[otherPkg.name]
        ) {
          depPackages.push(otherPkg);
        }
      });
      // link dependencies
      depPackages.forEach((depPkg) => {
        tasks.push(`npm link ${depPkg.name}`);
      });
      // install and build
      tasks.push(`npm install`);
      if (!pkg.isMain) {
        tasks.push(`npm run-script clean`);
        tasks.push(`npm run-script build`);
        // handle dist package
        tasks.push(`cd dist`);
        // link dist dependencies
        depPackages.forEach((depPkg) => {
          tasks.push(`npm link ${depPkg.name}`);
        });
        // create link for this project
        tasks.push(`npm link .`);
      }
      this.runTasksForPackage(pkg, tasks);
    });
  }



  // ========================================================
  // reinstall
  //------------------------------------------------------
  // delete all node_modules directory and run bootstrap
  TaskRunner.prototype.reinstall = function() {
    let rimrafpath = path.join(this.packageBinPath, 'rimraf');
    this.runTasksForAllPackages([
      `${rimrafpath} node_modules package-lock.json`,
      `${rimrafpath} dist/node_modules dist/package-lock.json`
    ]);
    this.bootstrap();
  }


  // ========================================================
  // listPackages
  //------------------------------------------------------
  // list non-optional and selected optional packages
  TaskRunner.prototype.listPackages = function() {
    let usedPackages = {};
    this._packages.filter((pkg) => {
      console.log(`${pkg.name}: ${pkg.relDir}`);
      usedPackages[pkg.relDir] = true;
    });
    if (this.config.optional) {
      Object.keys(this.config.optional).forEach((relDir) => {
        if (!usedPackages.hasOwnProperty(relDir)) {
          console.log(`${relDir}: disabled`);
        }
      });
    }
  }

  // ========================================================
  // listOutdated
  //------------------------------------------------------
  // list outdated npm-packages for all non-optional and selected optional packages

  TaskRunner.prototype.listOutdated = function() {
    // npm-check-updates provides 'ncu' and must be installed globally
    this.runTasksForAllPackages([
      'echo "" | ncu '
    ]);
  }

  // ========================================================

  return TaskRunner;
}());
module.exports.TaskRunner = TaskRunner;




