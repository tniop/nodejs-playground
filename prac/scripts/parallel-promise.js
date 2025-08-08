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

  const jobs = [processJob(5), processJob(10), processJob(3)]

  Promise.all(jobs.map(p => p.then(message => {
    console.log(`- ${message}`)
    return message
  })))
    .then(() => {
      console.log('--------------------')
      console.timeEnd('total')
    })
    .catch((error) => {
      console.log(`Error: ${error.statusCode} ${error.status} : ${error.message}`)
    })
}

run()
