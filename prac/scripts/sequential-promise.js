function processJob(seconds) {
  console.time(`timer-${seconds}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${seconds}s task completed`);
      console.timeEnd(`timer-${seconds}`);
      resolve();
    }, seconds * 1000);
  });
}

function run() {
  console.time('total');

  processJob(5)
    .then(() => processJob(10))
    .then(() => processJob(3))
    .then(() => {
      console.log('--------------------');
      console.timeEnd('total');
    });
}

run();
