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

  let completed = 0

  const done = () => {
    completed++
    if (completed === 3) {
      console.log('--------------------')
      console.timeEnd('total')
    }
  }

  processJob(5)
    .then((message) => {
      console.log(`- ${message}`)
      done()
    })
    .catch((error) => {
      console.error(error)
      done()
    })

  processJob(10)
    .then((message) => {
      console.log(`- ${message}`)
      done()
    })
    .catch((error) => {
      console.error(error)
      done()
    })

  processJob(3)
    .then((message) => {
      console.log(`- ${message}`)
      done()
    })
    .catch((error) => {
      console.error(error)
      done()
    })
}

run()
