const yargs = require('yargs')
const { sleep } = require('./util')
const { ViewPage } = require('./pom/ViewPage')

const ID = yargs.argv.id;
const TABS = yargs.argv.n;

const PATH = `/play/${ID}`

console.log(`Starting on: ${PATH} with ${TABS} tabs`);

const createTab = async (id) => {
  const tab = await new ViewPage(PATH).launch()

  await sleep(1000)
  await tab.toggleVideo()
  await sleep(1000)
  await tab.enterName(`Alfredo #${id}`)
  await tab.joinViewing()
  await tab.turnOffAudio()
}

;(async function() {
  await Promise.all((Array.from(new Array(TABS))).map((el, i) => createTab(i)))
  console.log('Waiting to close...');
  await sleep(20 * 60 * 1000)
})()
