function processJob (seconds) {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(seconds) || seconds <= 0) {
      return reject(new Error(`'${seconds}' is not a natural number.`))
    }

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
    console.error(error)
  }
}

run()
