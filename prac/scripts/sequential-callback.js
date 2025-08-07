import ApiError from '../libs/api-error.js'

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

  processJob(5, (error, message) => {
    if (error) {
      console.log(`Error: ${error.statusCode} ${error.status} : ${error.message}`)
      return
    }
    console.log(`- ${message}`)

    processJob(10, (error, message) => {
      if (error) {
        console.log(`Error: ${error.statusCode} ${error.status} : ${error.message}`)
        return
      }
      console.log(`- ${message}`)

      processJob(3, (error, message) => {
        if (error) {
          console.log(`Error: ${error.statusCode} ${error.status} : ${error.message}`)
          return
        }
        console.log(`- ${message}`)
        console.log('--------------------')
        console.timeEnd('total')
      })
    })
  })
}

run()
