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

async function run() {
  console.time('total');

  await processJob(5);
  await processJob(10);
  await processJob(3);

  console.log('--------------------');
  console.timeEnd('total');
}

run();
