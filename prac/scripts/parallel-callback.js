function processJob(seconds, callback) {
  console.time(`timer-${seconds}`);
  setTimeout(() => {
    console.log(`${seconds}s task completed`);
    console.timeEnd(`timer-${seconds}`);
    callback();
  }, seconds * 1000);
}

function run() {
  console.time('total');

  let completed = 0;

  const done = () => {
    completed++;
    if (completed === 3) {
      console.log('--------------------');
      console.timeEnd('total');
    }
  }

  processJob(5, done);
  processJob(10, done);
  processJob(3, done);
}

run();
