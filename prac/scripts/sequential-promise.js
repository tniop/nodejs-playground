function processJob (seconds) {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(seconds) || seconds <= 0) {
      return reject(new Error(`Error: '${seconds}' is not a natural number.`))
    }

    console.time(`timer-${seconds}`)
    setTimeout(() => {
      console.timeEnd(`timer-${seconds}`)
      resolve(`${seconds}s task completed`)
    }, seconds * 1000)
  })
}

function run () {
  console.time('total')

  processJob(5)
    .then((message) => {
      console.log(`- ${message}`)
      return processJob(10)
    })
    .then((message) => {
      console.log(`- ${message}`)
      return processJob(3)
    })
    .then((message) => {
      console.log(`- ${message}`)
      console.log('--------------------')
      console.timeEnd('total')
    })
    .catch((error) => {
      console.error(error)
    })
}

run()
