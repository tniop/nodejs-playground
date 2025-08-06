function processJob(seconds, callback) {
  if (!Number.isInteger(seconds) || seconds <= 0) {
    callback(`Error: '${seconds}' is not a natural number.`, null);
    return;
  }

  console.time(`timer-${seconds}`);
  setTimeout(() => {
    console.timeEnd(`timer-${seconds}`);
    callback(null, `${seconds}s task completed`);
  }, seconds * 1000);
}

function run() {
  console.time('total');

  processJob(5, (error, message) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`- ${message}`);

    processJob(10, (error, message) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(`- ${message}`);

      processJob(3, (error, message) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(`- ${message}`);
        console.log('--------------------');
        console.timeEnd('total');
      });
    });
  });
}

run();
