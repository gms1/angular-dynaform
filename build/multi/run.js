const TaskRunner = require('./TaskRunner').TaskRunner;

module.exports.run = function(config) {
  let tr = new TaskRunner(config);

  let currTask;
  try {
    let args = process.argv.slice(2);
    if (args.length === 0) {
      console.log('available tasks:');
      Object.getOwnPropertyNames(tr.tasks).sort().forEach((task) => { console.log(`  ${task}`); });
    } else {
      args.forEach((task) => {
        if (!tr.tasks[task]) {
          throw new Error(`task '${task}' is not defined`);
        }
        currTask = task;
        tr.tasks[currTask]();
      });
    }
  } catch (err) {
    if (currTask)
      console.error(`ERROR: '${currTask}': ${err.message}`);
    else
      console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
};
