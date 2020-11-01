const argv = require('yargs').argv
const { sleep } = require('./util')
const { ViewPage } = require('./pom/ViewPage')

const URL = argv._[0];
const TABS = argv.n;

console.log(`Starting on: ${URL} with ${TABS} tabs`);

const createTab = async (id) => {
  if (argv.delay) {
    await sleep(id * argv.delay);
  }
  console.log(`adding tab ${id}`);
  const tab = await new ViewPage(URL).launch()

  await sleep(1000)
  await tab.toggleVideo()
  await sleep(1000)
  await tab.enterName(`Alfredo #${id}`)
  await tab.joinViewing()
  if (argv.audio !== false) {
    await tab.turnOffAudio();
  }
}

;(async function() {
  await Promise.all((Array.from(new Array(TABS))).map((el, i) => createTab(i)))
  console.log('Waiting to close...');
  await sleep(20 * 60 * 1000)
})()
