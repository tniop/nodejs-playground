import ApiError from '../libs/api-error.js'

function processJob (seconds) {
  if (!Number.isInteger(seconds) || seconds <= 0) {
    return Promise.reject(ApiError.BAD_REQUEST(new Error(`'${seconds}' is not a natural number.`)))
  }

  return new Promise((resolve, reject) => {
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
      console.log(`Error: ${error.statusCode} ${error.status} : ${error.message}`)
    })
}

run()
