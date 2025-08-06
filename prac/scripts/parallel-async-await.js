function processJob(seconds) {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(seconds) || seconds <= 0) {
      return reject(`Error: '${seconds}' is not a natural number.`);
    }

    console.time(`timer-${seconds}`);
    setTimeout(() => {
      console.timeEnd(`timer-${seconds}`);
      resolve(`${seconds}s task completed`);
    }, seconds * 1000);
  });
}

async function run() {
  console.time('total');

  const jobs = [processJob(5), processJob(10), processJob(3)];
  
  const results = await Promise.all(jobs.map(p => p.then(message => {
      console.log(`- ${message}`);
      return message;
  })));

  console.log('--------------------');
  console.timeEnd('total');
}

run();
