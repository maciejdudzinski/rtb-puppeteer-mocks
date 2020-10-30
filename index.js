const { sleep } = require('./util')
const { ViewPage } = require('./pom/ViewPage')

const path = `/play/${process.argv[2]}`

const createTab = async () => {
  const tab = await new ViewPage(path).launch()

  await sleep(1000)
  await tab.toggleVideo()
  await sleep(1000)
  await tab.enterName('Al')
  await tab.joinViewing()
  await tab.turnOffAudio()
}

;(async function() {
  await Promise.all([createTab(), createTab(), createTab()])
  await sleep(1000000)
})()
