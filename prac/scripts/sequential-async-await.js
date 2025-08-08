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
    console.log(`Error: ${error.statusCode} ${error.status} : ${error.message}`)
  }
}

run()
