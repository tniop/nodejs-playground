import ApiError from '../libs/api-error.js'
import Logger from '../libs/logger.js'

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
      Logger.error(error.message, { statusCode: error.statusCode, status: error.status })
    })
}

run()
