import async from 'async'

import ApiError from '../libs/api-error.js'
import Logger from '../libs/logger.js'

function processJob (seconds, callback) {
  if (!Number.isInteger(seconds) || seconds <= 0) {
    const apiError = ApiError.BAD_REQUEST(new Error(`'${seconds}' is not a natural number.`))
    callback(apiError, null)
    return
  }

  console.time(`timer-${seconds}`)
  setTimeout(() => {
    console.timeEnd(`timer-${seconds}`)
    callback(null, `${seconds}s task completed`)
  }, seconds * 1000)
}

function run () {
  console.time('total')

  async.parallel([
    (callback) => processJob(5, callback),
    (callback) => processJob(10, callback),
    (callback) => processJob(3, callback)
  ], (error, results) => {
    console.log(results)
    if (error) {
      Logger.error(error.message, { statusCode: error.statusCode, status: error.status })
    }
    console.log('--------------------')
    console.timeEnd('total')
  })
}

run()
