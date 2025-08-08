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

async function run () {
  console.time('total')

  try {
    const message1 = await processJob(5)
    console.log(`- ${message1}`)

    const message2 = await processJob(10)
    console.log(`- ${message2}`)

    const message3 = await processJob(3)
    console.log(`- ${message3}`)

    console.log('--------------------')
    console.timeEnd('total')
  } catch (error) {
    Logger.error(error.message, { statusCode: error.statusCode, status: error.status })
  }
}

run()
