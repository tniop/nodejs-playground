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

  processJob(5, () => {
    processJob(10, () => {
      processJob(3, () => {
        console.log('--------------------');
        console.timeEnd('total');
      });
    });
  });
}

run();
