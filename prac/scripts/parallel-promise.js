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

  const job1 = processJob(5);
  const job2 = processJob(10);
  const job3 = processJob(3);

  Promise.all([job1, job2, job3])
    .then(() => {
      console.log('--------------------');
      console.timeEnd('total');
    });
}

run();
